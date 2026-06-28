var dh=Object.defineProperty;var hh=(e,t,n)=>t in e?dh(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Qe=(e,t,n)=>hh(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();var Lg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function $r(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Dg(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function a(){return this instanceof a?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(a){var r=Object.getOwnPropertyDescriptor(e,a);Object.defineProperty(n,a,r.get?r:{enumerable:!0,get:function(){return e[a]}})}),n}var Cu={exports:{}},Vr={},Ru={exports:{}},L={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ka=Symbol.for("react.element"),fh=Symbol.for("react.portal"),mh=Symbol.for("react.fragment"),ph=Symbol.for("react.strict_mode"),yh=Symbol.for("react.profiler"),gh=Symbol.for("react.provider"),xh=Symbol.for("react.context"),vh=Symbol.for("react.forward_ref"),Th=Symbol.for("react.suspense"),wh=Symbol.for("react.memo"),bh=Symbol.for("react.lazy"),Js=Symbol.iterator;function Sh(e){return e===null||typeof e!="object"?null:(e=Js&&e[Js]||e["@@iterator"],typeof e=="function"?e:null)}var Eu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Au=Object.assign,Iu={};function Cn(e,t,n){this.props=e,this.context=t,this.refs=Iu,this.updater=n||Eu}Cn.prototype.isReactComponent={};Cn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Cn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ju(){}ju.prototype=Cn.prototype;function Go(e,t,n){this.props=e,this.context=t,this.refs=Iu,this.updater=n||Eu}var Qo=Go.prototype=new ju;Qo.constructor=Go;Au(Qo,Cn.prototype);Qo.isPureReactComponent=!0;var Zs=Array.isArray,Pu=Object.prototype.hasOwnProperty,Xo={current:null},Fu={key:!0,ref:!0,__self:!0,__source:!0};function Lu(e,t,n){var a,r={},i=null,o=null;if(t!=null)for(a in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)Pu.call(t,a)&&!Fu.hasOwnProperty(a)&&(r[a]=t[a]);var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];r.children=u}if(e&&e.defaultProps)for(a in l=e.defaultProps,l)r[a]===void 0&&(r[a]=l[a]);return{$$typeof:ka,type:e,key:i,ref:o,props:r,_owner:Xo.current}}function Nh(e,t){return{$$typeof:ka,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Jo(e){return typeof e=="object"&&e!==null&&e.$$typeof===ka}function kh(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var el=/\/+/g;function fi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?kh(""+e.key):t.toString(36)}function tr(e,t,n,a,r){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case ka:case fh:o=!0}}if(o)return o=e,r=r(o),e=a===""?"."+fi(o,0):a,Zs(r)?(n="",e!=null&&(n=e.replace(el,"$&/")+"/"),tr(r,t,n,"",function(c){return c})):r!=null&&(Jo(r)&&(r=Nh(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(el,"$&/")+"/")+e)),t.push(r)),1;if(o=0,a=a===""?".":a+":",Zs(e))for(var l=0;l<e.length;l++){i=e[l];var u=a+fi(i,l);o+=tr(i,t,n,u,r)}else if(u=Sh(e),typeof u=="function")for(e=u.call(e),l=0;!(i=e.next()).done;)i=i.value,u=a+fi(i,l++),o+=tr(i,t,n,u,r);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function La(e,t,n){if(e==null)return e;var a=[],r=0;return tr(e,a,"","",function(i){return t.call(n,i,r++)}),a}function Ch(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var he={current:null},nr={transition:null},Rh={ReactCurrentDispatcher:he,ReactCurrentBatchConfig:nr,ReactCurrentOwner:Xo};function Du(){throw Error("act(...) is not supported in production builds of React.")}L.Children={map:La,forEach:function(e,t,n){La(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return La(e,function(){t++}),t},toArray:function(e){return La(e,function(t){return t})||[]},only:function(e){if(!Jo(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};L.Component=Cn;L.Fragment=mh;L.Profiler=yh;L.PureComponent=Go;L.StrictMode=ph;L.Suspense=Th;L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rh;L.act=Du;L.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=Au({},e.props),r=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=Xo.current),t.key!==void 0&&(r=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(u in t)Pu.call(t,u)&&!Fu.hasOwnProperty(u)&&(a[u]=t[u]===void 0&&l!==void 0?l[u]:t[u])}var u=arguments.length-2;if(u===1)a.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];a.children=l}return{$$typeof:ka,type:e.type,key:r,ref:i,props:a,_owner:o}};L.createContext=function(e){return e={$$typeof:xh,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:gh,_context:e},e.Consumer=e};L.createElement=Lu;L.createFactory=function(e){var t=Lu.bind(null,e);return t.type=e,t};L.createRef=function(){return{current:null}};L.forwardRef=function(e){return{$$typeof:vh,render:e}};L.isValidElement=Jo;L.lazy=function(e){return{$$typeof:bh,_payload:{_status:-1,_result:e},_init:Ch}};L.memo=function(e,t){return{$$typeof:wh,type:e,compare:t===void 0?null:t}};L.startTransition=function(e){var t=nr.transition;nr.transition={};try{e()}finally{nr.transition=t}};L.unstable_act=Du;L.useCallback=function(e,t){return he.current.useCallback(e,t)};L.useContext=function(e){return he.current.useContext(e)};L.useDebugValue=function(){};L.useDeferredValue=function(e){return he.current.useDeferredValue(e)};L.useEffect=function(e,t){return he.current.useEffect(e,t)};L.useId=function(){return he.current.useId()};L.useImperativeHandle=function(e,t,n){return he.current.useImperativeHandle(e,t,n)};L.useInsertionEffect=function(e,t){return he.current.useInsertionEffect(e,t)};L.useLayoutEffect=function(e,t){return he.current.useLayoutEffect(e,t)};L.useMemo=function(e,t){return he.current.useMemo(e,t)};L.useReducer=function(e,t,n){return he.current.useReducer(e,t,n)};L.useRef=function(e){return he.current.useRef(e)};L.useState=function(e){return he.current.useState(e)};L.useSyncExternalStore=function(e,t,n){return he.current.useSyncExternalStore(e,t,n)};L.useTransition=function(){return he.current.useTransition()};L.version="18.3.1";Ru.exports=L;var x=Ru.exports;const Ke=$r(x);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Eh=x,Ah=Symbol.for("react.element"),Ih=Symbol.for("react.fragment"),jh=Object.prototype.hasOwnProperty,Ph=Eh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Fh={key:!0,ref:!0,__self:!0,__source:!0};function Mu(e,t,n){var a,r={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(a in t)jh.call(t,a)&&!Fh.hasOwnProperty(a)&&(r[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)r[a]===void 0&&(r[a]=t[a]);return{$$typeof:Ah,type:e,key:i,ref:o,props:r,_owner:Ph.current}}Vr.Fragment=Ih;Vr.jsx=Mu;Vr.jsxs=Mu;Cu.exports=Vr;var s=Cu.exports,gr={},Ou={exports:{}},Se={},_u={exports:{}},Uu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(E,P){var F=E.length;E.push(P);e:for(;0<F;){var q=F-1>>>1,Z=E[q];if(0<r(Z,P))E[q]=P,E[F]=Z,F=q;else break e}}function n(E){return E.length===0?null:E[0]}function a(E){if(E.length===0)return null;var P=E[0],F=E.pop();if(F!==P){E[0]=F;e:for(var q=0,Z=E.length,Pa=Z>>>1;q<Pa;){var It=2*(q+1)-1,hi=E[It],jt=It+1,Fa=E[jt];if(0>r(hi,F))jt<Z&&0>r(Fa,hi)?(E[q]=Fa,E[jt]=F,q=jt):(E[q]=hi,E[It]=F,q=It);else if(jt<Z&&0>r(Fa,F))E[q]=Fa,E[jt]=F,q=jt;else break e}}return P}function r(E,P){var F=E.sortIndex-P.sortIndex;return F!==0?F:E.id-P.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();e.unstable_now=function(){return o.now()-l}}var u=[],c=[],m=1,d=null,y=3,g=!1,v=!1,T=!1,b=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function p(E){for(var P=n(c);P!==null;){if(P.callback===null)a(c);else if(P.startTime<=E)a(c),P.sortIndex=P.expirationTime,t(u,P);else break;P=n(c)}}function w(E){if(T=!1,p(E),!v)if(n(u)!==null)v=!0,ci(N);else{var P=n(c);P!==null&&di(w,P.startTime-E)}}function N(E,P){v=!1,T&&(T=!1,f(A),A=-1),g=!0;var F=y;try{for(p(P),d=n(u);d!==null&&(!(d.expirationTime>P)||E&&!ie());){var q=d.callback;if(typeof q=="function"){d.callback=null,y=d.priorityLevel;var Z=q(d.expirationTime<=P);P=e.unstable_now(),typeof Z=="function"?d.callback=Z:d===n(u)&&a(u),p(P)}else a(u);d=n(u)}if(d!==null)var Pa=!0;else{var It=n(c);It!==null&&di(w,It.startTime-P),Pa=!1}return Pa}finally{d=null,y=F,g=!1}}var k=!1,C=null,A=-1,M=5,j=-1;function ie(){return!(e.unstable_now()-j<M)}function Pn(){if(C!==null){var E=e.unstable_now();j=E;var P=!0;try{P=C(!0,E)}finally{P?Fn():(k=!1,C=null)}}else k=!1}var Fn;if(typeof h=="function")Fn=function(){h(Pn)};else if(typeof MessageChannel<"u"){var Xs=new MessageChannel,ch=Xs.port2;Xs.port1.onmessage=Pn,Fn=function(){ch.postMessage(null)}}else Fn=function(){b(Pn,0)};function ci(E){C=E,k||(k=!0,Fn())}function di(E,P){A=b(function(){E(e.unstable_now())},P)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){v||g||(v=!0,ci(N))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return y},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(E){switch(y){case 1:case 2:case 3:var P=3;break;default:P=y}var F=y;y=P;try{return E()}finally{y=F}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,P){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var F=y;y=E;try{return P()}finally{y=F}},e.unstable_scheduleCallback=function(E,P,F){var q=e.unstable_now();switch(typeof F=="object"&&F!==null?(F=F.delay,F=typeof F=="number"&&0<F?q+F:q):F=q,E){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=F+Z,E={id:m++,callback:P,priorityLevel:E,startTime:F,expirationTime:Z,sortIndex:-1},F>q?(E.sortIndex=F,t(c,E),n(u)===null&&E===n(c)&&(T?(f(A),A=-1):T=!0,di(w,F-q))):(E.sortIndex=Z,t(u,E),v||g||(v=!0,ci(N))),E},e.unstable_shouldYield=ie,e.unstable_wrapCallback=function(E){var P=y;return function(){var F=y;y=P;try{return E.apply(this,arguments)}finally{y=F}}}})(Uu);_u.exports=Uu;var Lh=_u.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dh=x,be=Lh;function S(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Hu=new Set,oa={};function Vt(e,t){gn(e,t),gn(e+"Capture",t)}function gn(e,t){for(oa[e]=t,e=0;e<t.length;e++)Hu.add(t[e])}var at=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),qi=Object.prototype.hasOwnProperty,Mh=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,tl={},nl={};function Oh(e){return qi.call(nl,e)?!0:qi.call(tl,e)?!1:Mh.test(e)?nl[e]=!0:(tl[e]=!0,!1)}function _h(e,t,n,a){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return a?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Uh(e,t,n,a){if(t===null||typeof t>"u"||_h(e,t,n,a))return!0;if(a)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function fe(e,t,n,a,r,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=a,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var re={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){re[e]=new fe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];re[t]=new fe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){re[e]=new fe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){re[e]=new fe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){re[e]=new fe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){re[e]=new fe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){re[e]=new fe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){re[e]=new fe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){re[e]=new fe(e,5,!1,e.toLowerCase(),null,!1,!1)});var Zo=/[\-:]([a-z])/g;function es(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Zo,es);re[t]=new fe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Zo,es);re[t]=new fe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Zo,es);re[t]=new fe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){re[e]=new fe(e,1,!1,e.toLowerCase(),null,!1,!1)});re.xlinkHref=new fe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){re[e]=new fe(e,1,!1,e.toLowerCase(),null,!0,!0)});function ts(e,t,n,a){var r=re.hasOwnProperty(t)?re[t]:null;(r!==null?r.type!==0:a||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Uh(t,n,r,a)&&(n=null),a||r===null?Oh(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):r.mustUseProperty?e[r.propertyName]=n===null?r.type===3?!1:"":n:(t=r.attributeName,a=r.attributeNamespace,n===null?e.removeAttribute(t):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,a?e.setAttributeNS(a,t,n):e.setAttribute(t,n))))}var lt=Dh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Da=Symbol.for("react.element"),Qt=Symbol.for("react.portal"),Xt=Symbol.for("react.fragment"),ns=Symbol.for("react.strict_mode"),Gi=Symbol.for("react.profiler"),Bu=Symbol.for("react.provider"),Wu=Symbol.for("react.context"),as=Symbol.for("react.forward_ref"),Qi=Symbol.for("react.suspense"),Xi=Symbol.for("react.suspense_list"),rs=Symbol.for("react.memo"),dt=Symbol.for("react.lazy"),zu=Symbol.for("react.offscreen"),al=Symbol.iterator;function Ln(e){return e===null||typeof e!="object"?null:(e=al&&e[al]||e["@@iterator"],typeof e=="function"?e:null)}var Y=Object.assign,mi;function Yn(e){if(mi===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);mi=t&&t[1]||""}return`
`+mi+e}var pi=!1;function yi(e,t){if(!e||pi)return"";pi=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var a=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){a=c}e.call(t.prototype)}else{try{throw Error()}catch(c){a=c}e()}}catch(c){if(c&&a&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),i=a.stack.split(`
`),o=r.length-1,l=i.length-1;1<=o&&0<=l&&r[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(r[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||r[o]!==i[l]){var u=`
`+r[o].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=o&&0<=l);break}}}finally{pi=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Yn(e):""}function Hh(e){switch(e.tag){case 5:return Yn(e.type);case 16:return Yn("Lazy");case 13:return Yn("Suspense");case 19:return Yn("SuspenseList");case 0:case 2:case 15:return e=yi(e.type,!1),e;case 11:return e=yi(e.type.render,!1),e;case 1:return e=yi(e.type,!0),e;default:return""}}function Ji(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Xt:return"Fragment";case Qt:return"Portal";case Gi:return"Profiler";case ns:return"StrictMode";case Qi:return"Suspense";case Xi:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Wu:return(e.displayName||"Context")+".Consumer";case Bu:return(e._context.displayName||"Context")+".Provider";case as:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case rs:return t=e.displayName||null,t!==null?t:Ji(e.type)||"Memo";case dt:t=e._payload,e=e._init;try{return Ji(e(t))}catch{}}return null}function Bh(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ji(t);case 8:return t===ns?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function kt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function $u(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Wh(e){var t=$u(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),a=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(o){a=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(o){a=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ma(e){e._valueTracker||(e._valueTracker=Wh(e))}function Vu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=$u(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function xr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Zi(e,t){var n=t.checked;return Y({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function rl(e,t){var n=t.defaultValue==null?"":t.defaultValue,a=t.checked!=null?t.checked:t.defaultChecked;n=kt(t.value!=null?t.value:n),e._wrapperState={initialChecked:a,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Yu(e,t){t=t.checked,t!=null&&ts(e,"checked",t,!1)}function eo(e,t){Yu(e,t);var n=kt(t.value),a=t.type;if(n!=null)a==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?to(e,t.type,n):t.hasOwnProperty("defaultValue")&&to(e,t.type,kt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function il(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type;if(!(a!=="submit"&&a!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function to(e,t,n){(t!=="number"||xr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Kn=Array.isArray;function un(e,t,n,a){if(e=e.options,t){t={};for(var r=0;r<n.length;r++)t["$"+n[r]]=!0;for(n=0;n<e.length;n++)r=t.hasOwnProperty("$"+e[n].value),e[n].selected!==r&&(e[n].selected=r),r&&a&&(e[n].defaultSelected=!0)}else{for(n=""+kt(n),t=null,r=0;r<e.length;r++){if(e[r].value===n){e[r].selected=!0,a&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function no(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(S(91));return Y({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ol(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(S(92));if(Kn(n)){if(1<n.length)throw Error(S(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:kt(n)}}function Ku(e,t){var n=kt(t.value),a=kt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),a!=null&&(e.defaultValue=""+a)}function sl(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function qu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ao(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?qu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Oa,Gu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,a,r){MSApp.execUnsafeLocalFunction(function(){return e(t,n,a,r)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Oa=Oa||document.createElement("div"),Oa.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Oa.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function sa(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Xn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},zh=["Webkit","ms","Moz","O"];Object.keys(Xn).forEach(function(e){zh.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Xn[t]=Xn[e]})});function Qu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Xn.hasOwnProperty(e)&&Xn[e]?(""+t).trim():t+"px"}function Xu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var a=n.indexOf("--")===0,r=Qu(n,t[n],a);n==="float"&&(n="cssFloat"),a?e.setProperty(n,r):e[n]=r}}var $h=Y({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ro(e,t){if(t){if($h[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(S(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(S(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(S(61))}if(t.style!=null&&typeof t.style!="object")throw Error(S(62))}}function io(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var oo=null;function is(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var so=null,cn=null,dn=null;function ll(e){if(e=Ea(e)){if(typeof so!="function")throw Error(S(280));var t=e.stateNode;t&&(t=Qr(t),so(e.stateNode,e.type,t))}}function Ju(e){cn?dn?dn.push(e):dn=[e]:cn=e}function Zu(){if(cn){var e=cn,t=dn;if(dn=cn=null,ll(e),t)for(e=0;e<t.length;e++)ll(t[e])}}function ec(e,t){return e(t)}function tc(){}var gi=!1;function nc(e,t,n){if(gi)return e(t,n);gi=!0;try{return ec(e,t,n)}finally{gi=!1,(cn!==null||dn!==null)&&(tc(),Zu())}}function la(e,t){var n=e.stateNode;if(n===null)return null;var a=Qr(n);if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(S(231,t,typeof n));return n}var lo=!1;if(at)try{var Dn={};Object.defineProperty(Dn,"passive",{get:function(){lo=!0}}),window.addEventListener("test",Dn,Dn),window.removeEventListener("test",Dn,Dn)}catch{lo=!1}function Vh(e,t,n,a,r,i,o,l,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(m){this.onError(m)}}var Jn=!1,vr=null,Tr=!1,uo=null,Yh={onError:function(e){Jn=!0,vr=e}};function Kh(e,t,n,a,r,i,o,l,u){Jn=!1,vr=null,Vh.apply(Yh,arguments)}function qh(e,t,n,a,r,i,o,l,u){if(Kh.apply(this,arguments),Jn){if(Jn){var c=vr;Jn=!1,vr=null}else throw Error(S(198));Tr||(Tr=!0,uo=c)}}function Yt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ac(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ul(e){if(Yt(e)!==e)throw Error(S(188))}function Gh(e){var t=e.alternate;if(!t){if(t=Yt(e),t===null)throw Error(S(188));return t!==e?null:e}for(var n=e,a=t;;){var r=n.return;if(r===null)break;var i=r.alternate;if(i===null){if(a=r.return,a!==null){n=a;continue}break}if(r.child===i.child){for(i=r.child;i;){if(i===n)return ul(r),e;if(i===a)return ul(r),t;i=i.sibling}throw Error(S(188))}if(n.return!==a.return)n=r,a=i;else{for(var o=!1,l=r.child;l;){if(l===n){o=!0,n=r,a=i;break}if(l===a){o=!0,a=r,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,a=r;break}if(l===a){o=!0,a=i,n=r;break}l=l.sibling}if(!o)throw Error(S(189))}}if(n.alternate!==a)throw Error(S(190))}if(n.tag!==3)throw Error(S(188));return n.stateNode.current===n?e:t}function rc(e){return e=Gh(e),e!==null?ic(e):null}function ic(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=ic(e);if(t!==null)return t;e=e.sibling}return null}var oc=be.unstable_scheduleCallback,cl=be.unstable_cancelCallback,Qh=be.unstable_shouldYield,Xh=be.unstable_requestPaint,G=be.unstable_now,Jh=be.unstable_getCurrentPriorityLevel,os=be.unstable_ImmediatePriority,sc=be.unstable_UserBlockingPriority,wr=be.unstable_NormalPriority,Zh=be.unstable_LowPriority,lc=be.unstable_IdlePriority,Yr=null,qe=null;function ef(e){if(qe&&typeof qe.onCommitFiberRoot=="function")try{qe.onCommitFiberRoot(Yr,e,void 0,(e.current.flags&128)===128)}catch{}}var Ue=Math.clz32?Math.clz32:af,tf=Math.log,nf=Math.LN2;function af(e){return e>>>=0,e===0?32:31-(tf(e)/nf|0)|0}var _a=64,Ua=4194304;function qn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function br(e,t){var n=e.pendingLanes;if(n===0)return 0;var a=0,r=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var l=o&~r;l!==0?a=qn(l):(i&=o,i!==0&&(a=qn(i)))}else o=n&~r,o!==0?a=qn(o):i!==0&&(a=qn(i));if(a===0)return 0;if(t!==0&&t!==a&&!(t&r)&&(r=a&-a,i=t&-t,r>=i||r===16&&(i&4194240)!==0))return t;if(a&4&&(a|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=a;0<t;)n=31-Ue(t),r=1<<n,a|=e[n],t&=~r;return a}function rf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function of(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,r=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-Ue(i),l=1<<o,u=r[o];u===-1?(!(l&n)||l&a)&&(r[o]=rf(l,t)):u<=t&&(e.expiredLanes|=l),i&=~l}}function co(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function uc(){var e=_a;return _a<<=1,!(_a&4194240)&&(_a=64),e}function xi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ca(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ue(t),e[t]=n}function sf(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<n;){var r=31-Ue(n),i=1<<r;t[r]=0,a[r]=-1,e[r]=-1,n&=~i}}function ss(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-Ue(n),r=1<<a;r&t|e[a]&t&&(e[a]|=t),n&=~r}}var O=0;function cc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var dc,ls,hc,fc,mc,ho=!1,Ha=[],gt=null,xt=null,vt=null,ua=new Map,ca=new Map,ft=[],lf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function dl(e,t){switch(e){case"focusin":case"focusout":gt=null;break;case"dragenter":case"dragleave":xt=null;break;case"mouseover":case"mouseout":vt=null;break;case"pointerover":case"pointerout":ua.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ca.delete(t.pointerId)}}function Mn(e,t,n,a,r,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[r]},t!==null&&(t=Ea(t),t!==null&&ls(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function uf(e,t,n,a,r){switch(t){case"focusin":return gt=Mn(gt,e,t,n,a,r),!0;case"dragenter":return xt=Mn(xt,e,t,n,a,r),!0;case"mouseover":return vt=Mn(vt,e,t,n,a,r),!0;case"pointerover":var i=r.pointerId;return ua.set(i,Mn(ua.get(i)||null,e,t,n,a,r)),!0;case"gotpointercapture":return i=r.pointerId,ca.set(i,Mn(ca.get(i)||null,e,t,n,a,r)),!0}return!1}function pc(e){var t=Lt(e.target);if(t!==null){var n=Yt(t);if(n!==null){if(t=n.tag,t===13){if(t=ac(n),t!==null){e.blockedOn=t,mc(e.priority,function(){hc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ar(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=fo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);oo=a,n.target.dispatchEvent(a),oo=null}else return t=Ea(n),t!==null&&ls(t),e.blockedOn=n,!1;t.shift()}return!0}function hl(e,t,n){ar(e)&&n.delete(t)}function cf(){ho=!1,gt!==null&&ar(gt)&&(gt=null),xt!==null&&ar(xt)&&(xt=null),vt!==null&&ar(vt)&&(vt=null),ua.forEach(hl),ca.forEach(hl)}function On(e,t){e.blockedOn===t&&(e.blockedOn=null,ho||(ho=!0,be.unstable_scheduleCallback(be.unstable_NormalPriority,cf)))}function da(e){function t(r){return On(r,e)}if(0<Ha.length){On(Ha[0],e);for(var n=1;n<Ha.length;n++){var a=Ha[n];a.blockedOn===e&&(a.blockedOn=null)}}for(gt!==null&&On(gt,e),xt!==null&&On(xt,e),vt!==null&&On(vt,e),ua.forEach(t),ca.forEach(t),n=0;n<ft.length;n++)a=ft[n],a.blockedOn===e&&(a.blockedOn=null);for(;0<ft.length&&(n=ft[0],n.blockedOn===null);)pc(n),n.blockedOn===null&&ft.shift()}var hn=lt.ReactCurrentBatchConfig,Sr=!0;function df(e,t,n,a){var r=O,i=hn.transition;hn.transition=null;try{O=1,us(e,t,n,a)}finally{O=r,hn.transition=i}}function hf(e,t,n,a){var r=O,i=hn.transition;hn.transition=null;try{O=4,us(e,t,n,a)}finally{O=r,hn.transition=i}}function us(e,t,n,a){if(Sr){var r=fo(e,t,n,a);if(r===null)Ei(e,t,a,Nr,n),dl(e,a);else if(uf(r,e,t,n,a))a.stopPropagation();else if(dl(e,a),t&4&&-1<lf.indexOf(e)){for(;r!==null;){var i=Ea(r);if(i!==null&&dc(i),i=fo(e,t,n,a),i===null&&Ei(e,t,a,Nr,n),i===r)break;r=i}r!==null&&a.stopPropagation()}else Ei(e,t,a,null,n)}}var Nr=null;function fo(e,t,n,a){if(Nr=null,e=is(a),e=Lt(e),e!==null)if(t=Yt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ac(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Nr=e,null}function yc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Jh()){case os:return 1;case sc:return 4;case wr:case Zh:return 16;case lc:return 536870912;default:return 16}default:return 16}}var pt=null,cs=null,rr=null;function gc(){if(rr)return rr;var e,t=cs,n=t.length,a,r="value"in pt?pt.value:pt.textContent,i=r.length;for(e=0;e<n&&t[e]===r[e];e++);var o=n-e;for(a=1;a<=o&&t[n-a]===r[i-a];a++);return rr=r.slice(e,1<a?1-a:void 0)}function ir(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ba(){return!0}function fl(){return!1}function Ne(e){function t(n,a,r,i,o){this._reactName=n,this._targetInst=r,this.type=a,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ba:fl,this.isPropagationStopped=fl,this}return Y(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ba)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ba)},persist:function(){},isPersistent:Ba}),t}var Rn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ds=Ne(Rn),Ra=Y({},Rn,{view:0,detail:0}),ff=Ne(Ra),vi,Ti,_n,Kr=Y({},Ra,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:hs,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==_n&&(_n&&e.type==="mousemove"?(vi=e.screenX-_n.screenX,Ti=e.screenY-_n.screenY):Ti=vi=0,_n=e),vi)},movementY:function(e){return"movementY"in e?e.movementY:Ti}}),ml=Ne(Kr),mf=Y({},Kr,{dataTransfer:0}),pf=Ne(mf),yf=Y({},Ra,{relatedTarget:0}),wi=Ne(yf),gf=Y({},Rn,{animationName:0,elapsedTime:0,pseudoElement:0}),xf=Ne(gf),vf=Y({},Rn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Tf=Ne(vf),wf=Y({},Rn,{data:0}),pl=Ne(wf),bf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Nf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Nf[e])?!!t[e]:!1}function hs(){return kf}var Cf=Y({},Ra,{key:function(e){if(e.key){var t=bf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ir(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Sf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:hs,charCode:function(e){return e.type==="keypress"?ir(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ir(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Rf=Ne(Cf),Ef=Y({},Kr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),yl=Ne(Ef),Af=Y({},Ra,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:hs}),If=Ne(Af),jf=Y({},Rn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Pf=Ne(jf),Ff=Y({},Kr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Lf=Ne(Ff),Df=[9,13,27,32],fs=at&&"CompositionEvent"in window,Zn=null;at&&"documentMode"in document&&(Zn=document.documentMode);var Mf=at&&"TextEvent"in window&&!Zn,xc=at&&(!fs||Zn&&8<Zn&&11>=Zn),gl=" ",xl=!1;function vc(e,t){switch(e){case"keyup":return Df.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Tc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Jt=!1;function Of(e,t){switch(e){case"compositionend":return Tc(t);case"keypress":return t.which!==32?null:(xl=!0,gl);case"textInput":return e=t.data,e===gl&&xl?null:e;default:return null}}function _f(e,t){if(Jt)return e==="compositionend"||!fs&&vc(e,t)?(e=gc(),rr=cs=pt=null,Jt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return xc&&t.locale!=="ko"?null:t.data;default:return null}}var Uf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Uf[e.type]:t==="textarea"}function wc(e,t,n,a){Ju(a),t=kr(t,"onChange"),0<t.length&&(n=new ds("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var ea=null,ha=null;function Hf(e){Pc(e,0)}function qr(e){var t=tn(e);if(Vu(t))return e}function Bf(e,t){if(e==="change")return t}var bc=!1;if(at){var bi;if(at){var Si="oninput"in document;if(!Si){var Tl=document.createElement("div");Tl.setAttribute("oninput","return;"),Si=typeof Tl.oninput=="function"}bi=Si}else bi=!1;bc=bi&&(!document.documentMode||9<document.documentMode)}function wl(){ea&&(ea.detachEvent("onpropertychange",Sc),ha=ea=null)}function Sc(e){if(e.propertyName==="value"&&qr(ha)){var t=[];wc(t,ha,e,is(e)),nc(Hf,t)}}function Wf(e,t,n){e==="focusin"?(wl(),ea=t,ha=n,ea.attachEvent("onpropertychange",Sc)):e==="focusout"&&wl()}function zf(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return qr(ha)}function $f(e,t){if(e==="click")return qr(t)}function Vf(e,t){if(e==="input"||e==="change")return qr(t)}function Yf(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Be=typeof Object.is=="function"?Object.is:Yf;function fa(e,t){if(Be(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var r=n[a];if(!qi.call(t,r)||!Be(e[r],t[r]))return!1}return!0}function bl(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Sl(e,t){var n=bl(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=bl(n)}}function Nc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Nc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function kc(){for(var e=window,t=xr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=xr(e.document)}return t}function ms(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Kf(e){var t=kc(),n=e.focusedElem,a=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Nc(n.ownerDocument.documentElement,n)){if(a!==null&&ms(n)){if(t=a.start,e=a.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var r=n.textContent.length,i=Math.min(a.start,r);a=a.end===void 0?i:Math.min(a.end,r),!e.extend&&i>a&&(r=a,a=i,i=r),r=Sl(n,i);var o=Sl(n,a);r&&o&&(e.rangeCount!==1||e.anchorNode!==r.node||e.anchorOffset!==r.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(r.node,r.offset),e.removeAllRanges(),i>a?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var qf=at&&"documentMode"in document&&11>=document.documentMode,Zt=null,mo=null,ta=null,po=!1;function Nl(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;po||Zt==null||Zt!==xr(a)||(a=Zt,"selectionStart"in a&&ms(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),ta&&fa(ta,a)||(ta=a,a=kr(mo,"onSelect"),0<a.length&&(t=new ds("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=Zt)))}function Wa(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var en={animationend:Wa("Animation","AnimationEnd"),animationiteration:Wa("Animation","AnimationIteration"),animationstart:Wa("Animation","AnimationStart"),transitionend:Wa("Transition","TransitionEnd")},Ni={},Cc={};at&&(Cc=document.createElement("div").style,"AnimationEvent"in window||(delete en.animationend.animation,delete en.animationiteration.animation,delete en.animationstart.animation),"TransitionEvent"in window||delete en.transitionend.transition);function Gr(e){if(Ni[e])return Ni[e];if(!en[e])return e;var t=en[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Cc)return Ni[e]=t[n];return e}var Rc=Gr("animationend"),Ec=Gr("animationiteration"),Ac=Gr("animationstart"),Ic=Gr("transitionend"),jc=new Map,kl="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Rt(e,t){jc.set(e,t),Vt(t,[e])}for(var ki=0;ki<kl.length;ki++){var Ci=kl[ki],Gf=Ci.toLowerCase(),Qf=Ci[0].toUpperCase()+Ci.slice(1);Rt(Gf,"on"+Qf)}Rt(Rc,"onAnimationEnd");Rt(Ec,"onAnimationIteration");Rt(Ac,"onAnimationStart");Rt("dblclick","onDoubleClick");Rt("focusin","onFocus");Rt("focusout","onBlur");Rt(Ic,"onTransitionEnd");gn("onMouseEnter",["mouseout","mouseover"]);gn("onMouseLeave",["mouseout","mouseover"]);gn("onPointerEnter",["pointerout","pointerover"]);gn("onPointerLeave",["pointerout","pointerover"]);Vt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Vt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Vt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Vt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Vt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Vt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Gn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xf=new Set("cancel close invalid load scroll toggle".split(" ").concat(Gn));function Cl(e,t,n){var a=e.type||"unknown-event";e.currentTarget=n,qh(a,t,void 0,e),e.currentTarget=null}function Pc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],r=a.event;a=a.listeners;e:{var i=void 0;if(t)for(var o=a.length-1;0<=o;o--){var l=a[o],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==i&&r.isPropagationStopped())break e;Cl(r,l,c),i=u}else for(o=0;o<a.length;o++){if(l=a[o],u=l.instance,c=l.currentTarget,l=l.listener,u!==i&&r.isPropagationStopped())break e;Cl(r,l,c),i=u}}}if(Tr)throw e=uo,Tr=!1,uo=null,e}function U(e,t){var n=t[To];n===void 0&&(n=t[To]=new Set);var a=e+"__bubble";n.has(a)||(Fc(t,e,2,!1),n.add(a))}function Ri(e,t,n){var a=0;t&&(a|=4),Fc(n,e,a,t)}var za="_reactListening"+Math.random().toString(36).slice(2);function ma(e){if(!e[za]){e[za]=!0,Hu.forEach(function(n){n!=="selectionchange"&&(Xf.has(n)||Ri(n,!1,e),Ri(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[za]||(t[za]=!0,Ri("selectionchange",!1,t))}}function Fc(e,t,n,a){switch(yc(t)){case 1:var r=df;break;case 4:r=hf;break;default:r=us}n=r.bind(null,t,n,e),r=void 0,!lo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),a?r!==void 0?e.addEventListener(t,n,{capture:!0,passive:r}):e.addEventListener(t,n,!0):r!==void 0?e.addEventListener(t,n,{passive:r}):e.addEventListener(t,n,!1)}function Ei(e,t,n,a,r){var i=a;if(!(t&1)&&!(t&2)&&a!==null)e:for(;;){if(a===null)return;var o=a.tag;if(o===3||o===4){var l=a.stateNode.containerInfo;if(l===r||l.nodeType===8&&l.parentNode===r)break;if(o===4)for(o=a.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===r||u.nodeType===8&&u.parentNode===r))return;o=o.return}for(;l!==null;){if(o=Lt(l),o===null)return;if(u=o.tag,u===5||u===6){a=i=o;continue e}l=l.parentNode}}a=a.return}nc(function(){var c=i,m=is(n),d=[];e:{var y=jc.get(e);if(y!==void 0){var g=ds,v=e;switch(e){case"keypress":if(ir(n)===0)break e;case"keydown":case"keyup":g=Rf;break;case"focusin":v="focus",g=wi;break;case"focusout":v="blur",g=wi;break;case"beforeblur":case"afterblur":g=wi;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=ml;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=pf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=If;break;case Rc:case Ec:case Ac:g=xf;break;case Ic:g=Pf;break;case"scroll":g=ff;break;case"wheel":g=Lf;break;case"copy":case"cut":case"paste":g=Tf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=yl}var T=(t&4)!==0,b=!T&&e==="scroll",f=T?y!==null?y+"Capture":null:y;T=[];for(var h=c,p;h!==null;){p=h;var w=p.stateNode;if(p.tag===5&&w!==null&&(p=w,f!==null&&(w=la(h,f),w!=null&&T.push(pa(h,w,p)))),b)break;h=h.return}0<T.length&&(y=new g(y,v,null,n,m),d.push({event:y,listeners:T}))}}if(!(t&7)){e:{if(y=e==="mouseover"||e==="pointerover",g=e==="mouseout"||e==="pointerout",y&&n!==oo&&(v=n.relatedTarget||n.fromElement)&&(Lt(v)||v[rt]))break e;if((g||y)&&(y=m.window===m?m:(y=m.ownerDocument)?y.defaultView||y.parentWindow:window,g?(v=n.relatedTarget||n.toElement,g=c,v=v?Lt(v):null,v!==null&&(b=Yt(v),v!==b||v.tag!==5&&v.tag!==6)&&(v=null)):(g=null,v=c),g!==v)){if(T=ml,w="onMouseLeave",f="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(T=yl,w="onPointerLeave",f="onPointerEnter",h="pointer"),b=g==null?y:tn(g),p=v==null?y:tn(v),y=new T(w,h+"leave",g,n,m),y.target=b,y.relatedTarget=p,w=null,Lt(m)===c&&(T=new T(f,h+"enter",v,n,m),T.target=p,T.relatedTarget=b,w=T),b=w,g&&v)t:{for(T=g,f=v,h=0,p=T;p;p=qt(p))h++;for(p=0,w=f;w;w=qt(w))p++;for(;0<h-p;)T=qt(T),h--;for(;0<p-h;)f=qt(f),p--;for(;h--;){if(T===f||f!==null&&T===f.alternate)break t;T=qt(T),f=qt(f)}T=null}else T=null;g!==null&&Rl(d,y,g,T,!1),v!==null&&b!==null&&Rl(d,b,v,T,!0)}}e:{if(y=c?tn(c):window,g=y.nodeName&&y.nodeName.toLowerCase(),g==="select"||g==="input"&&y.type==="file")var N=Bf;else if(vl(y))if(bc)N=Vf;else{N=zf;var k=Wf}else(g=y.nodeName)&&g.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(N=$f);if(N&&(N=N(e,c))){wc(d,N,n,m);break e}k&&k(e,y,c),e==="focusout"&&(k=y._wrapperState)&&k.controlled&&y.type==="number"&&to(y,"number",y.value)}switch(k=c?tn(c):window,e){case"focusin":(vl(k)||k.contentEditable==="true")&&(Zt=k,mo=c,ta=null);break;case"focusout":ta=mo=Zt=null;break;case"mousedown":po=!0;break;case"contextmenu":case"mouseup":case"dragend":po=!1,Nl(d,n,m);break;case"selectionchange":if(qf)break;case"keydown":case"keyup":Nl(d,n,m)}var C;if(fs)e:{switch(e){case"compositionstart":var A="onCompositionStart";break e;case"compositionend":A="onCompositionEnd";break e;case"compositionupdate":A="onCompositionUpdate";break e}A=void 0}else Jt?vc(e,n)&&(A="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(A="onCompositionStart");A&&(xc&&n.locale!=="ko"&&(Jt||A!=="onCompositionStart"?A==="onCompositionEnd"&&Jt&&(C=gc()):(pt=m,cs="value"in pt?pt.value:pt.textContent,Jt=!0)),k=kr(c,A),0<k.length&&(A=new pl(A,e,null,n,m),d.push({event:A,listeners:k}),C?A.data=C:(C=Tc(n),C!==null&&(A.data=C)))),(C=Mf?Of(e,n):_f(e,n))&&(c=kr(c,"onBeforeInput"),0<c.length&&(m=new pl("onBeforeInput","beforeinput",null,n,m),d.push({event:m,listeners:c}),m.data=C))}Pc(d,t)})}function pa(e,t,n){return{instance:e,listener:t,currentTarget:n}}function kr(e,t){for(var n=t+"Capture",a=[];e!==null;){var r=e,i=r.stateNode;r.tag===5&&i!==null&&(r=i,i=la(e,n),i!=null&&a.unshift(pa(e,i,r)),i=la(e,t),i!=null&&a.push(pa(e,i,r))),e=e.return}return a}function qt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Rl(e,t,n,a,r){for(var i=t._reactName,o=[];n!==null&&n!==a;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===a)break;l.tag===5&&c!==null&&(l=c,r?(u=la(n,i),u!=null&&o.unshift(pa(n,u,l))):r||(u=la(n,i),u!=null&&o.push(pa(n,u,l)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Jf=/\r\n?/g,Zf=/\u0000|\uFFFD/g;function El(e){return(typeof e=="string"?e:""+e).replace(Jf,`
`).replace(Zf,"")}function $a(e,t,n){if(t=El(t),El(e)!==t&&n)throw Error(S(425))}function Cr(){}var yo=null,go=null;function xo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var vo=typeof setTimeout=="function"?setTimeout:void 0,em=typeof clearTimeout=="function"?clearTimeout:void 0,Al=typeof Promise=="function"?Promise:void 0,tm=typeof queueMicrotask=="function"?queueMicrotask:typeof Al<"u"?function(e){return Al.resolve(null).then(e).catch(nm)}:vo;function nm(e){setTimeout(function(){throw e})}function Ai(e,t){var n=t,a=0;do{var r=n.nextSibling;if(e.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(a===0){e.removeChild(r),da(t);return}a--}else n!=="$"&&n!=="$?"&&n!=="$!"||a++;n=r}while(n);da(t)}function Tt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Il(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var En=Math.random().toString(36).slice(2),Ye="__reactFiber$"+En,ya="__reactProps$"+En,rt="__reactContainer$"+En,To="__reactEvents$"+En,am="__reactListeners$"+En,rm="__reactHandles$"+En;function Lt(e){var t=e[Ye];if(t)return t;for(var n=e.parentNode;n;){if(t=n[rt]||n[Ye]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Il(e);e!==null;){if(n=e[Ye])return n;e=Il(e)}return t}e=n,n=e.parentNode}return null}function Ea(e){return e=e[Ye]||e[rt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function tn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(S(33))}function Qr(e){return e[ya]||null}var wo=[],nn=-1;function Et(e){return{current:e}}function H(e){0>nn||(e.current=wo[nn],wo[nn]=null,nn--)}function _(e,t){nn++,wo[nn]=e.current,e.current=t}var Ct={},ue=Et(Ct),ye=Et(!1),Ht=Ct;function xn(e,t){var n=e.type.contextTypes;if(!n)return Ct;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var r={},i;for(i in n)r[i]=t[i];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=r),r}function ge(e){return e=e.childContextTypes,e!=null}function Rr(){H(ye),H(ue)}function jl(e,t,n){if(ue.current!==Ct)throw Error(S(168));_(ue,t),_(ye,n)}function Lc(e,t,n){var a=e.stateNode;if(t=t.childContextTypes,typeof a.getChildContext!="function")return n;a=a.getChildContext();for(var r in a)if(!(r in t))throw Error(S(108,Bh(e)||"Unknown",r));return Y({},n,a)}function Er(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ct,Ht=ue.current,_(ue,e),_(ye,ye.current),!0}function Pl(e,t,n){var a=e.stateNode;if(!a)throw Error(S(169));n?(e=Lc(e,t,Ht),a.__reactInternalMemoizedMergedChildContext=e,H(ye),H(ue),_(ue,e)):H(ye),_(ye,n)}var Je=null,Xr=!1,Ii=!1;function Dc(e){Je===null?Je=[e]:Je.push(e)}function im(e){Xr=!0,Dc(e)}function At(){if(!Ii&&Je!==null){Ii=!0;var e=0,t=O;try{var n=Je;for(O=1;e<n.length;e++){var a=n[e];do a=a(!0);while(a!==null)}Je=null,Xr=!1}catch(r){throw Je!==null&&(Je=Je.slice(e+1)),oc(os,At),r}finally{O=t,Ii=!1}}return null}var an=[],rn=0,Ar=null,Ir=0,Re=[],Ee=0,Bt=null,Ze=1,et="";function Pt(e,t){an[rn++]=Ir,an[rn++]=Ar,Ar=e,Ir=t}function Mc(e,t,n){Re[Ee++]=Ze,Re[Ee++]=et,Re[Ee++]=Bt,Bt=e;var a=Ze;e=et;var r=32-Ue(a)-1;a&=~(1<<r),n+=1;var i=32-Ue(t)+r;if(30<i){var o=r-r%5;i=(a&(1<<o)-1).toString(32),a>>=o,r-=o,Ze=1<<32-Ue(t)+r|n<<r|a,et=i+e}else Ze=1<<i|n<<r|a,et=e}function ps(e){e.return!==null&&(Pt(e,1),Mc(e,1,0))}function ys(e){for(;e===Ar;)Ar=an[--rn],an[rn]=null,Ir=an[--rn],an[rn]=null;for(;e===Bt;)Bt=Re[--Ee],Re[Ee]=null,et=Re[--Ee],Re[Ee]=null,Ze=Re[--Ee],Re[Ee]=null}var we=null,Te=null,B=!1,Oe=null;function Oc(e,t){var n=Ae(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Fl(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,we=e,Te=Tt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,we=e,Te=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Bt!==null?{id:Ze,overflow:et}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ae(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,we=e,Te=null,!0):!1;default:return!1}}function bo(e){return(e.mode&1)!==0&&(e.flags&128)===0}function So(e){if(B){var t=Te;if(t){var n=t;if(!Fl(e,t)){if(bo(e))throw Error(S(418));t=Tt(n.nextSibling);var a=we;t&&Fl(e,t)?Oc(a,n):(e.flags=e.flags&-4097|2,B=!1,we=e)}}else{if(bo(e))throw Error(S(418));e.flags=e.flags&-4097|2,B=!1,we=e}}}function Ll(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;we=e}function Va(e){if(e!==we)return!1;if(!B)return Ll(e),B=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!xo(e.type,e.memoizedProps)),t&&(t=Te)){if(bo(e))throw _c(),Error(S(418));for(;t;)Oc(e,t),t=Tt(t.nextSibling)}if(Ll(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(S(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Te=Tt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Te=null}}else Te=we?Tt(e.stateNode.nextSibling):null;return!0}function _c(){for(var e=Te;e;)e=Tt(e.nextSibling)}function vn(){Te=we=null,B=!1}function gs(e){Oe===null?Oe=[e]:Oe.push(e)}var om=lt.ReactCurrentBatchConfig;function Un(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(S(309));var a=n.stateNode}if(!a)throw Error(S(147,e));var r=a,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var l=r.refs;o===null?delete l[i]:l[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(S(284));if(!n._owner)throw Error(S(290,e))}return e}function Ya(e,t){throw e=Object.prototype.toString.call(t),Error(S(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Dl(e){var t=e._init;return t(e._payload)}function Uc(e){function t(f,h){if(e){var p=f.deletions;p===null?(f.deletions=[h],f.flags|=16):p.push(h)}}function n(f,h){if(!e)return null;for(;h!==null;)t(f,h),h=h.sibling;return null}function a(f,h){for(f=new Map;h!==null;)h.key!==null?f.set(h.key,h):f.set(h.index,h),h=h.sibling;return f}function r(f,h){return f=Nt(f,h),f.index=0,f.sibling=null,f}function i(f,h,p){return f.index=p,e?(p=f.alternate,p!==null?(p=p.index,p<h?(f.flags|=2,h):p):(f.flags|=2,h)):(f.flags|=1048576,h)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function l(f,h,p,w){return h===null||h.tag!==6?(h=Oi(p,f.mode,w),h.return=f,h):(h=r(h,p),h.return=f,h)}function u(f,h,p,w){var N=p.type;return N===Xt?m(f,h,p.props.children,w,p.key):h!==null&&(h.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===dt&&Dl(N)===h.type)?(w=r(h,p.props),w.ref=Un(f,h,p),w.return=f,w):(w=hr(p.type,p.key,p.props,null,f.mode,w),w.ref=Un(f,h,p),w.return=f,w)}function c(f,h,p,w){return h===null||h.tag!==4||h.stateNode.containerInfo!==p.containerInfo||h.stateNode.implementation!==p.implementation?(h=_i(p,f.mode,w),h.return=f,h):(h=r(h,p.children||[]),h.return=f,h)}function m(f,h,p,w,N){return h===null||h.tag!==7?(h=Ut(p,f.mode,w,N),h.return=f,h):(h=r(h,p),h.return=f,h)}function d(f,h,p){if(typeof h=="string"&&h!==""||typeof h=="number")return h=Oi(""+h,f.mode,p),h.return=f,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Da:return p=hr(h.type,h.key,h.props,null,f.mode,p),p.ref=Un(f,null,h),p.return=f,p;case Qt:return h=_i(h,f.mode,p),h.return=f,h;case dt:var w=h._init;return d(f,w(h._payload),p)}if(Kn(h)||Ln(h))return h=Ut(h,f.mode,p,null),h.return=f,h;Ya(f,h)}return null}function y(f,h,p,w){var N=h!==null?h.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return N!==null?null:l(f,h,""+p,w);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Da:return p.key===N?u(f,h,p,w):null;case Qt:return p.key===N?c(f,h,p,w):null;case dt:return N=p._init,y(f,h,N(p._payload),w)}if(Kn(p)||Ln(p))return N!==null?null:m(f,h,p,w,null);Ya(f,p)}return null}function g(f,h,p,w,N){if(typeof w=="string"&&w!==""||typeof w=="number")return f=f.get(p)||null,l(h,f,""+w,N);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Da:return f=f.get(w.key===null?p:w.key)||null,u(h,f,w,N);case Qt:return f=f.get(w.key===null?p:w.key)||null,c(h,f,w,N);case dt:var k=w._init;return g(f,h,p,k(w._payload),N)}if(Kn(w)||Ln(w))return f=f.get(p)||null,m(h,f,w,N,null);Ya(h,w)}return null}function v(f,h,p,w){for(var N=null,k=null,C=h,A=h=0,M=null;C!==null&&A<p.length;A++){C.index>A?(M=C,C=null):M=C.sibling;var j=y(f,C,p[A],w);if(j===null){C===null&&(C=M);break}e&&C&&j.alternate===null&&t(f,C),h=i(j,h,A),k===null?N=j:k.sibling=j,k=j,C=M}if(A===p.length)return n(f,C),B&&Pt(f,A),N;if(C===null){for(;A<p.length;A++)C=d(f,p[A],w),C!==null&&(h=i(C,h,A),k===null?N=C:k.sibling=C,k=C);return B&&Pt(f,A),N}for(C=a(f,C);A<p.length;A++)M=g(C,f,A,p[A],w),M!==null&&(e&&M.alternate!==null&&C.delete(M.key===null?A:M.key),h=i(M,h,A),k===null?N=M:k.sibling=M,k=M);return e&&C.forEach(function(ie){return t(f,ie)}),B&&Pt(f,A),N}function T(f,h,p,w){var N=Ln(p);if(typeof N!="function")throw Error(S(150));if(p=N.call(p),p==null)throw Error(S(151));for(var k=N=null,C=h,A=h=0,M=null,j=p.next();C!==null&&!j.done;A++,j=p.next()){C.index>A?(M=C,C=null):M=C.sibling;var ie=y(f,C,j.value,w);if(ie===null){C===null&&(C=M);break}e&&C&&ie.alternate===null&&t(f,C),h=i(ie,h,A),k===null?N=ie:k.sibling=ie,k=ie,C=M}if(j.done)return n(f,C),B&&Pt(f,A),N;if(C===null){for(;!j.done;A++,j=p.next())j=d(f,j.value,w),j!==null&&(h=i(j,h,A),k===null?N=j:k.sibling=j,k=j);return B&&Pt(f,A),N}for(C=a(f,C);!j.done;A++,j=p.next())j=g(C,f,A,j.value,w),j!==null&&(e&&j.alternate!==null&&C.delete(j.key===null?A:j.key),h=i(j,h,A),k===null?N=j:k.sibling=j,k=j);return e&&C.forEach(function(Pn){return t(f,Pn)}),B&&Pt(f,A),N}function b(f,h,p,w){if(typeof p=="object"&&p!==null&&p.type===Xt&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case Da:e:{for(var N=p.key,k=h;k!==null;){if(k.key===N){if(N=p.type,N===Xt){if(k.tag===7){n(f,k.sibling),h=r(k,p.props.children),h.return=f,f=h;break e}}else if(k.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===dt&&Dl(N)===k.type){n(f,k.sibling),h=r(k,p.props),h.ref=Un(f,k,p),h.return=f,f=h;break e}n(f,k);break}else t(f,k);k=k.sibling}p.type===Xt?(h=Ut(p.props.children,f.mode,w,p.key),h.return=f,f=h):(w=hr(p.type,p.key,p.props,null,f.mode,w),w.ref=Un(f,h,p),w.return=f,f=w)}return o(f);case Qt:e:{for(k=p.key;h!==null;){if(h.key===k)if(h.tag===4&&h.stateNode.containerInfo===p.containerInfo&&h.stateNode.implementation===p.implementation){n(f,h.sibling),h=r(h,p.children||[]),h.return=f,f=h;break e}else{n(f,h);break}else t(f,h);h=h.sibling}h=_i(p,f.mode,w),h.return=f,f=h}return o(f);case dt:return k=p._init,b(f,h,k(p._payload),w)}if(Kn(p))return v(f,h,p,w);if(Ln(p))return T(f,h,p,w);Ya(f,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,h!==null&&h.tag===6?(n(f,h.sibling),h=r(h,p),h.return=f,f=h):(n(f,h),h=Oi(p,f.mode,w),h.return=f,f=h),o(f)):n(f,h)}return b}var Tn=Uc(!0),Hc=Uc(!1),jr=Et(null),Pr=null,on=null,xs=null;function vs(){xs=on=Pr=null}function Ts(e){var t=jr.current;H(jr),e._currentValue=t}function No(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function fn(e,t){Pr=e,xs=on=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(pe=!0),e.firstContext=null)}function je(e){var t=e._currentValue;if(xs!==e)if(e={context:e,memoizedValue:t,next:null},on===null){if(Pr===null)throw Error(S(308));on=e,Pr.dependencies={lanes:0,firstContext:e}}else on=on.next=e;return t}var Dt=null;function ws(e){Dt===null?Dt=[e]:Dt.push(e)}function Bc(e,t,n,a){var r=t.interleaved;return r===null?(n.next=n,ws(t)):(n.next=r.next,r.next=n),t.interleaved=n,it(e,a)}function it(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ht=!1;function bs(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Wc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function tt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function wt(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,D&2){var r=a.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),a.pending=t,it(e,n)}return r=a.interleaved,r===null?(t.next=t,ws(a)):(t.next=r.next,r.next=t),a.interleaved=t,it(e,n)}function or(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,ss(e,n)}}function Ml(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var r=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?r=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?r=i=t:i=i.next=t}else r=i=t;n={baseState:a.baseState,firstBaseUpdate:r,lastBaseUpdate:i,shared:a.shared,effects:a.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Fr(e,t,n,a){var r=e.updateQueue;ht=!1;var i=r.firstBaseUpdate,o=r.lastBaseUpdate,l=r.shared.pending;if(l!==null){r.shared.pending=null;var u=l,c=u.next;u.next=null,o===null?i=c:o.next=c,o=u;var m=e.alternate;m!==null&&(m=m.updateQueue,l=m.lastBaseUpdate,l!==o&&(l===null?m.firstBaseUpdate=c:l.next=c,m.lastBaseUpdate=u))}if(i!==null){var d=r.baseState;o=0,m=c=u=null,l=i;do{var y=l.lane,g=l.eventTime;if((a&y)===y){m!==null&&(m=m.next={eventTime:g,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var v=e,T=l;switch(y=t,g=n,T.tag){case 1:if(v=T.payload,typeof v=="function"){d=v.call(g,d,y);break e}d=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=T.payload,y=typeof v=="function"?v.call(g,d,y):v,y==null)break e;d=Y({},d,y);break e;case 2:ht=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,y=r.effects,y===null?r.effects=[l]:y.push(l))}else g={eventTime:g,lane:y,tag:l.tag,payload:l.payload,callback:l.callback,next:null},m===null?(c=m=g,u=d):m=m.next=g,o|=y;if(l=l.next,l===null){if(l=r.shared.pending,l===null)break;y=l,l=y.next,y.next=null,r.lastBaseUpdate=y,r.shared.pending=null}}while(!0);if(m===null&&(u=d),r.baseState=u,r.firstBaseUpdate=c,r.lastBaseUpdate=m,t=r.shared.interleaved,t!==null){r=t;do o|=r.lane,r=r.next;while(r!==t)}else i===null&&(r.shared.lanes=0);zt|=o,e.lanes=o,e.memoizedState=d}}function Ol(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var a=e[t],r=a.callback;if(r!==null){if(a.callback=null,a=n,typeof r!="function")throw Error(S(191,r));r.call(a)}}}var Aa={},Ge=Et(Aa),ga=Et(Aa),xa=Et(Aa);function Mt(e){if(e===Aa)throw Error(S(174));return e}function Ss(e,t){switch(_(xa,t),_(ga,e),_(Ge,Aa),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ao(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ao(t,e)}H(Ge),_(Ge,t)}function wn(){H(Ge),H(ga),H(xa)}function zc(e){Mt(xa.current);var t=Mt(Ge.current),n=ao(t,e.type);t!==n&&(_(ga,e),_(Ge,n))}function Ns(e){ga.current===e&&(H(Ge),H(ga))}var z=Et(0);function Lr(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ji=[];function ks(){for(var e=0;e<ji.length;e++)ji[e]._workInProgressVersionPrimary=null;ji.length=0}var sr=lt.ReactCurrentDispatcher,Pi=lt.ReactCurrentBatchConfig,Wt=0,V=null,X=null,ee=null,Dr=!1,na=!1,va=0,sm=0;function oe(){throw Error(S(321))}function Cs(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Be(e[n],t[n]))return!1;return!0}function Rs(e,t,n,a,r,i){if(Wt=i,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,sr.current=e===null||e.memoizedState===null?dm:hm,e=n(a,r),na){i=0;do{if(na=!1,va=0,25<=i)throw Error(S(301));i+=1,ee=X=null,t.updateQueue=null,sr.current=fm,e=n(a,r)}while(na)}if(sr.current=Mr,t=X!==null&&X.next!==null,Wt=0,ee=X=V=null,Dr=!1,t)throw Error(S(300));return e}function Es(){var e=va!==0;return va=0,e}function Ve(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ee===null?V.memoizedState=ee=e:ee=ee.next=e,ee}function Pe(){if(X===null){var e=V.alternate;e=e!==null?e.memoizedState:null}else e=X.next;var t=ee===null?V.memoizedState:ee.next;if(t!==null)ee=t,X=e;else{if(e===null)throw Error(S(310));X=e,e={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},ee===null?V.memoizedState=ee=e:ee=ee.next=e}return ee}function Ta(e,t){return typeof t=="function"?t(e):t}function Fi(e){var t=Pe(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var a=X,r=a.baseQueue,i=n.pending;if(i!==null){if(r!==null){var o=r.next;r.next=i.next,i.next=o}a.baseQueue=r=i,n.pending=null}if(r!==null){i=r.next,a=a.baseState;var l=o=null,u=null,c=i;do{var m=c.lane;if((Wt&m)===m)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),a=c.hasEagerState?c.eagerState:e(a,c.action);else{var d={lane:m,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=d,o=a):u=u.next=d,V.lanes|=m,zt|=m}c=c.next}while(c!==null&&c!==i);u===null?o=a:u.next=l,Be(a,t.memoizedState)||(pe=!0),t.memoizedState=a,t.baseState=o,t.baseQueue=u,n.lastRenderedState=a}if(e=n.interleaved,e!==null){r=e;do i=r.lane,V.lanes|=i,zt|=i,r=r.next;while(r!==e)}else r===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Li(e){var t=Pe(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var a=n.dispatch,r=n.pending,i=t.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do i=e(i,o.action),o=o.next;while(o!==r);Be(i,t.memoizedState)||(pe=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,a]}function $c(){}function Vc(e,t){var n=V,a=Pe(),r=t(),i=!Be(a.memoizedState,r);if(i&&(a.memoizedState=r,pe=!0),a=a.queue,As(qc.bind(null,n,a,e),[e]),a.getSnapshot!==t||i||ee!==null&&ee.memoizedState.tag&1){if(n.flags|=2048,wa(9,Kc.bind(null,n,a,r,t),void 0,null),te===null)throw Error(S(349));Wt&30||Yc(n,t,r)}return r}function Yc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=V.updateQueue,t===null?(t={lastEffect:null,stores:null},V.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Kc(e,t,n,a){t.value=n,t.getSnapshot=a,Gc(t)&&Qc(e)}function qc(e,t,n){return n(function(){Gc(t)&&Qc(e)})}function Gc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Be(e,n)}catch{return!0}}function Qc(e){var t=it(e,1);t!==null&&He(t,e,1,-1)}function _l(e){var t=Ve();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ta,lastRenderedState:e},t.queue=e,e=e.dispatch=cm.bind(null,V,e),[t.memoizedState,e]}function wa(e,t,n,a){return e={tag:e,create:t,destroy:n,deps:a,next:null},t=V.updateQueue,t===null?(t={lastEffect:null,stores:null},V.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e)),e}function Xc(){return Pe().memoizedState}function lr(e,t,n,a){var r=Ve();V.flags|=e,r.memoizedState=wa(1|t,n,void 0,a===void 0?null:a)}function Jr(e,t,n,a){var r=Pe();a=a===void 0?null:a;var i=void 0;if(X!==null){var o=X.memoizedState;if(i=o.destroy,a!==null&&Cs(a,o.deps)){r.memoizedState=wa(t,n,i,a);return}}V.flags|=e,r.memoizedState=wa(1|t,n,i,a)}function Ul(e,t){return lr(8390656,8,e,t)}function As(e,t){return Jr(2048,8,e,t)}function Jc(e,t){return Jr(4,2,e,t)}function Zc(e,t){return Jr(4,4,e,t)}function ed(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function td(e,t,n){return n=n!=null?n.concat([e]):null,Jr(4,4,ed.bind(null,t,e),n)}function Is(){}function nd(e,t){var n=Pe();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&Cs(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function ad(e,t){var n=Pe();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&Cs(t,a[1])?a[0]:(e=e(),n.memoizedState=[e,t],e)}function rd(e,t,n){return Wt&21?(Be(n,t)||(n=uc(),V.lanes|=n,zt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,pe=!0),e.memoizedState=n)}function lm(e,t){var n=O;O=n!==0&&4>n?n:4,e(!0);var a=Pi.transition;Pi.transition={};try{e(!1),t()}finally{O=n,Pi.transition=a}}function id(){return Pe().memoizedState}function um(e,t,n){var a=St(e);if(n={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null},od(e))sd(t,n);else if(n=Bc(e,t,n,a),n!==null){var r=de();He(n,e,a,r),ld(n,t,a)}}function cm(e,t,n){var a=St(e),r={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(od(e))sd(t,r);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,l=i(o,n);if(r.hasEagerState=!0,r.eagerState=l,Be(l,o)){var u=t.interleaved;u===null?(r.next=r,ws(t)):(r.next=u.next,u.next=r),t.interleaved=r;return}}catch{}finally{}n=Bc(e,t,r,a),n!==null&&(r=de(),He(n,e,a,r),ld(n,t,a))}}function od(e){var t=e.alternate;return e===V||t!==null&&t===V}function sd(e,t){na=Dr=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ld(e,t,n){if(n&4194240){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,ss(e,n)}}var Mr={readContext:je,useCallback:oe,useContext:oe,useEffect:oe,useImperativeHandle:oe,useInsertionEffect:oe,useLayoutEffect:oe,useMemo:oe,useReducer:oe,useRef:oe,useState:oe,useDebugValue:oe,useDeferredValue:oe,useTransition:oe,useMutableSource:oe,useSyncExternalStore:oe,useId:oe,unstable_isNewReconciler:!1},dm={readContext:je,useCallback:function(e,t){return Ve().memoizedState=[e,t===void 0?null:t],e},useContext:je,useEffect:Ul,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,lr(4194308,4,ed.bind(null,t,e),n)},useLayoutEffect:function(e,t){return lr(4194308,4,e,t)},useInsertionEffect:function(e,t){return lr(4,2,e,t)},useMemo:function(e,t){var n=Ve();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var a=Ve();return t=n!==void 0?n(t):t,a.memoizedState=a.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},a.queue=e,e=e.dispatch=um.bind(null,V,e),[a.memoizedState,e]},useRef:function(e){var t=Ve();return e={current:e},t.memoizedState=e},useState:_l,useDebugValue:Is,useDeferredValue:function(e){return Ve().memoizedState=e},useTransition:function(){var e=_l(!1),t=e[0];return e=lm.bind(null,e[1]),Ve().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var a=V,r=Ve();if(B){if(n===void 0)throw Error(S(407));n=n()}else{if(n=t(),te===null)throw Error(S(349));Wt&30||Yc(a,t,n)}r.memoizedState=n;var i={value:n,getSnapshot:t};return r.queue=i,Ul(qc.bind(null,a,i,e),[e]),a.flags|=2048,wa(9,Kc.bind(null,a,i,n,t),void 0,null),n},useId:function(){var e=Ve(),t=te.identifierPrefix;if(B){var n=et,a=Ze;n=(a&~(1<<32-Ue(a)-1)).toString(32)+n,t=":"+t+"R"+n,n=va++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=sm++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},hm={readContext:je,useCallback:nd,useContext:je,useEffect:As,useImperativeHandle:td,useInsertionEffect:Jc,useLayoutEffect:Zc,useMemo:ad,useReducer:Fi,useRef:Xc,useState:function(){return Fi(Ta)},useDebugValue:Is,useDeferredValue:function(e){var t=Pe();return rd(t,X.memoizedState,e)},useTransition:function(){var e=Fi(Ta)[0],t=Pe().memoizedState;return[e,t]},useMutableSource:$c,useSyncExternalStore:Vc,useId:id,unstable_isNewReconciler:!1},fm={readContext:je,useCallback:nd,useContext:je,useEffect:As,useImperativeHandle:td,useInsertionEffect:Jc,useLayoutEffect:Zc,useMemo:ad,useReducer:Li,useRef:Xc,useState:function(){return Li(Ta)},useDebugValue:Is,useDeferredValue:function(e){var t=Pe();return X===null?t.memoizedState=e:rd(t,X.memoizedState,e)},useTransition:function(){var e=Li(Ta)[0],t=Pe().memoizedState;return[e,t]},useMutableSource:$c,useSyncExternalStore:Vc,useId:id,unstable_isNewReconciler:!1};function De(e,t){if(e&&e.defaultProps){t=Y({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ko(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:Y({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Zr={isMounted:function(e){return(e=e._reactInternals)?Yt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var a=de(),r=St(e),i=tt(a,r);i.payload=t,n!=null&&(i.callback=n),t=wt(e,i,r),t!==null&&(He(t,e,r,a),or(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=de(),r=St(e),i=tt(a,r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=wt(e,i,r),t!==null&&(He(t,e,r,a),or(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=de(),a=St(e),r=tt(n,a);r.tag=2,t!=null&&(r.callback=t),t=wt(e,r,a),t!==null&&(He(t,e,a,n),or(t,e,a))}};function Hl(e,t,n,a,r,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,i,o):t.prototype&&t.prototype.isPureReactComponent?!fa(n,a)||!fa(r,i):!0}function ud(e,t,n){var a=!1,r=Ct,i=t.contextType;return typeof i=="object"&&i!==null?i=je(i):(r=ge(t)?Ht:ue.current,a=t.contextTypes,i=(a=a!=null)?xn(e,r):Ct),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Zr,e.stateNode=t,t._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=i),t}function Bl(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&Zr.enqueueReplaceState(t,t.state,null)}function Co(e,t,n,a){var r=e.stateNode;r.props=n,r.state=e.memoizedState,r.refs={},bs(e);var i=t.contextType;typeof i=="object"&&i!==null?r.context=je(i):(i=ge(t)?Ht:ue.current,r.context=xn(e,i)),r.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(ko(e,t,i,n),r.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(t=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),t!==r.state&&Zr.enqueueReplaceState(r,r.state,null),Fr(e,n,r,a),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308)}function bn(e,t){try{var n="",a=t;do n+=Hh(a),a=a.return;while(a);var r=n}catch(i){r=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:r,digest:null}}function Di(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ro(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var mm=typeof WeakMap=="function"?WeakMap:Map;function cd(e,t,n){n=tt(-1,n),n.tag=3,n.payload={element:null};var a=t.value;return n.callback=function(){_r||(_r=!0,Oo=a),Ro(e,t)},n}function dd(e,t,n){n=tt(-1,n),n.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var r=t.value;n.payload=function(){return a(r)},n.callback=function(){Ro(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Ro(e,t),typeof a!="function"&&(bt===null?bt=new Set([this]):bt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Wl(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new mm;var r=new Set;a.set(t,r)}else r=a.get(t),r===void 0&&(r=new Set,a.set(t,r));r.has(n)||(r.add(n),e=Em.bind(null,e,t,n),t.then(e,e))}function zl(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function $l(e,t,n,a,r){return e.mode&1?(e.flags|=65536,e.lanes=r,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=tt(-1,1),t.tag=2,wt(n,t,1))),n.lanes|=1),e)}var pm=lt.ReactCurrentOwner,pe=!1;function ce(e,t,n,a){t.child=e===null?Hc(t,null,n,a):Tn(t,e.child,n,a)}function Vl(e,t,n,a,r){n=n.render;var i=t.ref;return fn(t,r),a=Rs(e,t,n,a,i,r),n=Es(),e!==null&&!pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,ot(e,t,r)):(B&&n&&ps(t),t.flags|=1,ce(e,t,a,r),t.child)}function Yl(e,t,n,a,r){if(e===null){var i=n.type;return typeof i=="function"&&!_s(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,hd(e,t,i,a,r)):(e=hr(n.type,null,a,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&r)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:fa,n(o,a)&&e.ref===t.ref)return ot(e,t,r)}return t.flags|=1,e=Nt(i,a),e.ref=t.ref,e.return=t,t.child=e}function hd(e,t,n,a,r){if(e!==null){var i=e.memoizedProps;if(fa(i,a)&&e.ref===t.ref)if(pe=!1,t.pendingProps=a=i,(e.lanes&r)!==0)e.flags&131072&&(pe=!0);else return t.lanes=e.lanes,ot(e,t,r)}return Eo(e,t,n,a,r)}function fd(e,t,n){var a=t.pendingProps,r=a.children,i=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},_(ln,ve),ve|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,_(ln,ve),ve|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=i!==null?i.baseLanes:n,_(ln,ve),ve|=a}else i!==null?(a=i.baseLanes|n,t.memoizedState=null):a=n,_(ln,ve),ve|=a;return ce(e,t,r,n),t.child}function md(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Eo(e,t,n,a,r){var i=ge(n)?Ht:ue.current;return i=xn(t,i),fn(t,r),n=Rs(e,t,n,a,i,r),a=Es(),e!==null&&!pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,ot(e,t,r)):(B&&a&&ps(t),t.flags|=1,ce(e,t,n,r),t.child)}function Kl(e,t,n,a,r){if(ge(n)){var i=!0;Er(t)}else i=!1;if(fn(t,r),t.stateNode===null)ur(e,t),ud(t,n,a),Co(t,n,a,r),a=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=je(c):(c=ge(n)?Ht:ue.current,c=xn(t,c));var m=n.getDerivedStateFromProps,d=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==a||u!==c)&&Bl(t,o,a,c),ht=!1;var y=t.memoizedState;o.state=y,Fr(t,a,o,r),u=t.memoizedState,l!==a||y!==u||ye.current||ht?(typeof m=="function"&&(ko(t,n,m,a),u=t.memoizedState),(l=ht||Hl(t,n,l,a,y,u,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=u),o.props=a,o.state=u,o.context=c,a=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{o=t.stateNode,Wc(e,t),l=t.memoizedProps,c=t.type===t.elementType?l:De(t.type,l),o.props=c,d=t.pendingProps,y=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=je(u):(u=ge(n)?Ht:ue.current,u=xn(t,u));var g=n.getDerivedStateFromProps;(m=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==d||y!==u)&&Bl(t,o,a,u),ht=!1,y=t.memoizedState,o.state=y,Fr(t,a,o,r);var v=t.memoizedState;l!==d||y!==v||ye.current||ht?(typeof g=="function"&&(ko(t,n,g,a),v=t.memoizedState),(c=ht||Hl(t,n,c,a,y,v,u)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(a,v,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(a,v,u)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=v),o.props=a,o.state=v,o.context=u,a=c):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),a=!1)}return Ao(e,t,n,a,i,r)}function Ao(e,t,n,a,r,i){md(e,t);var o=(t.flags&128)!==0;if(!a&&!o)return r&&Pl(t,n,!1),ot(e,t,i);a=t.stateNode,pm.current=t;var l=o&&typeof n.getDerivedStateFromError!="function"?null:a.render();return t.flags|=1,e!==null&&o?(t.child=Tn(t,e.child,null,i),t.child=Tn(t,null,l,i)):ce(e,t,l,i),t.memoizedState=a.state,r&&Pl(t,n,!0),t.child}function pd(e){var t=e.stateNode;t.pendingContext?jl(e,t.pendingContext,t.pendingContext!==t.context):t.context&&jl(e,t.context,!1),Ss(e,t.containerInfo)}function ql(e,t,n,a,r){return vn(),gs(r),t.flags|=256,ce(e,t,n,a),t.child}var Io={dehydrated:null,treeContext:null,retryLane:0};function jo(e){return{baseLanes:e,cachePool:null,transitions:null}}function yd(e,t,n){var a=t.pendingProps,r=z.current,i=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(r&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(r|=1),_(z,r&1),e===null)return So(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=a.children,e=a.fallback,i?(a=t.mode,i=t.child,o={mode:"hidden",children:o},!(a&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=ni(o,a,0,null),e=Ut(e,a,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=jo(n),t.memoizedState=Io,e):js(t,o));if(r=e.memoizedState,r!==null&&(l=r.dehydrated,l!==null))return ym(e,t,o,a,l,r,n);if(i){i=a.fallback,o=t.mode,r=e.child,l=r.sibling;var u={mode:"hidden",children:a.children};return!(o&1)&&t.child!==r?(a=t.child,a.childLanes=0,a.pendingProps=u,t.deletions=null):(a=Nt(r,u),a.subtreeFlags=r.subtreeFlags&14680064),l!==null?i=Nt(l,i):(i=Ut(i,o,n,null),i.flags|=2),i.return=t,a.return=t,a.sibling=i,t.child=a,a=i,i=t.child,o=e.child.memoizedState,o=o===null?jo(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=Io,a}return i=e.child,e=i.sibling,a=Nt(i,{mode:"visible",children:a.children}),!(t.mode&1)&&(a.lanes=n),a.return=t,a.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a}function js(e,t){return t=ni({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ka(e,t,n,a){return a!==null&&gs(a),Tn(t,e.child,null,n),e=js(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function ym(e,t,n,a,r,i,o){if(n)return t.flags&256?(t.flags&=-257,a=Di(Error(S(422))),Ka(e,t,o,a)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=a.fallback,r=t.mode,a=ni({mode:"visible",children:a.children},r,0,null),i=Ut(i,r,o,null),i.flags|=2,a.return=t,i.return=t,a.sibling=i,t.child=a,t.mode&1&&Tn(t,e.child,null,o),t.child.memoizedState=jo(o),t.memoizedState=Io,i);if(!(t.mode&1))return Ka(e,t,o,null);if(r.data==="$!"){if(a=r.nextSibling&&r.nextSibling.dataset,a)var l=a.dgst;return a=l,i=Error(S(419)),a=Di(i,a,void 0),Ka(e,t,o,a)}if(l=(o&e.childLanes)!==0,pe||l){if(a=te,a!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(a.suspendedLanes|o)?0:r,r!==0&&r!==i.retryLane&&(i.retryLane=r,it(e,r),He(a,e,r,-1))}return Os(),a=Di(Error(S(421))),Ka(e,t,o,a)}return r.data==="$?"?(t.flags|=128,t.child=e.child,t=Am.bind(null,e),r._reactRetry=t,null):(e=i.treeContext,Te=Tt(r.nextSibling),we=t,B=!0,Oe=null,e!==null&&(Re[Ee++]=Ze,Re[Ee++]=et,Re[Ee++]=Bt,Ze=e.id,et=e.overflow,Bt=t),t=js(t,a.children),t.flags|=4096,t)}function Gl(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),No(e.return,t,n)}function Mi(e,t,n,a,r){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:r}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=a,i.tail=n,i.tailMode=r)}function gd(e,t,n){var a=t.pendingProps,r=a.revealOrder,i=a.tail;if(ce(e,t,a.children,n),a=z.current,a&2)a=a&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Gl(e,n,t);else if(e.tag===19)Gl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(_(z,a),!(t.mode&1))t.memoizedState=null;else switch(r){case"forwards":for(n=t.child,r=null;n!==null;)e=n.alternate,e!==null&&Lr(e)===null&&(r=n),n=n.sibling;n=r,n===null?(r=t.child,t.child=null):(r=n.sibling,n.sibling=null),Mi(t,!1,r,n,i);break;case"backwards":for(n=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&Lr(e)===null){t.child=r;break}e=r.sibling,r.sibling=n,n=r,r=e}Mi(t,!0,n,null,i);break;case"together":Mi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ur(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ot(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),zt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(S(153));if(t.child!==null){for(e=t.child,n=Nt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Nt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function gm(e,t,n){switch(t.tag){case 3:pd(t),vn();break;case 5:zc(t);break;case 1:ge(t.type)&&Er(t);break;case 4:Ss(t,t.stateNode.containerInfo);break;case 10:var a=t.type._context,r=t.memoizedProps.value;_(jr,a._currentValue),a._currentValue=r;break;case 13:if(a=t.memoizedState,a!==null)return a.dehydrated!==null?(_(z,z.current&1),t.flags|=128,null):n&t.child.childLanes?yd(e,t,n):(_(z,z.current&1),e=ot(e,t,n),e!==null?e.sibling:null);_(z,z.current&1);break;case 19:if(a=(n&t.childLanes)!==0,e.flags&128){if(a)return gd(e,t,n);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),_(z,z.current),a)break;return null;case 22:case 23:return t.lanes=0,fd(e,t,n)}return ot(e,t,n)}var xd,Po,vd,Td;xd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Po=function(){};vd=function(e,t,n,a){var r=e.memoizedProps;if(r!==a){e=t.stateNode,Mt(Ge.current);var i=null;switch(n){case"input":r=Zi(e,r),a=Zi(e,a),i=[];break;case"select":r=Y({},r,{value:void 0}),a=Y({},a,{value:void 0}),i=[];break;case"textarea":r=no(e,r),a=no(e,a),i=[];break;default:typeof r.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=Cr)}ro(n,a);var o;n=null;for(c in r)if(!a.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var l=r[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(oa.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in a){var u=a[c];if(l=r!=null?r[c]:void 0,a.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(oa.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&U("scroll",e),i||l===u||(i=[])):(i=i||[]).push(c,u))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};Td=function(e,t,n,a){n!==a&&(t.flags|=4)};function Hn(e,t){if(!B)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function se(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var r=e.child;r!==null;)n|=r.lanes|r.childLanes,a|=r.subtreeFlags&14680064,a|=r.flags&14680064,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)n|=r.lanes|r.childLanes,a|=r.subtreeFlags,a|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function xm(e,t,n){var a=t.pendingProps;switch(ys(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return se(t),null;case 1:return ge(t.type)&&Rr(),se(t),null;case 3:return a=t.stateNode,wn(),H(ye),H(ue),ks(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Va(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Oe!==null&&(Ho(Oe),Oe=null))),Po(e,t),se(t),null;case 5:Ns(t);var r=Mt(xa.current);if(n=t.type,e!==null&&t.stateNode!=null)vd(e,t,n,a,r),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!a){if(t.stateNode===null)throw Error(S(166));return se(t),null}if(e=Mt(Ge.current),Va(t)){a=t.stateNode,n=t.type;var i=t.memoizedProps;switch(a[Ye]=t,a[ya]=i,e=(t.mode&1)!==0,n){case"dialog":U("cancel",a),U("close",a);break;case"iframe":case"object":case"embed":U("load",a);break;case"video":case"audio":for(r=0;r<Gn.length;r++)U(Gn[r],a);break;case"source":U("error",a);break;case"img":case"image":case"link":U("error",a),U("load",a);break;case"details":U("toggle",a);break;case"input":rl(a,i),U("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!i.multiple},U("invalid",a);break;case"textarea":ol(a,i),U("invalid",a)}ro(n,i),r=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?a.textContent!==l&&(i.suppressHydrationWarning!==!0&&$a(a.textContent,l,e),r=["children",l]):typeof l=="number"&&a.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&$a(a.textContent,l,e),r=["children",""+l]):oa.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&U("scroll",a)}switch(n){case"input":Ma(a),il(a,i,!0);break;case"textarea":Ma(a),sl(a);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(a.onclick=Cr)}a=r,t.updateQueue=a,a!==null&&(t.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=qu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=o.createElement(n,{is:a.is}):(e=o.createElement(n),n==="select"&&(o=e,a.multiple?o.multiple=!0:a.size&&(o.size=a.size))):e=o.createElementNS(e,n),e[Ye]=t,e[ya]=a,xd(e,t,!1,!1),t.stateNode=e;e:{switch(o=io(n,a),n){case"dialog":U("cancel",e),U("close",e),r=a;break;case"iframe":case"object":case"embed":U("load",e),r=a;break;case"video":case"audio":for(r=0;r<Gn.length;r++)U(Gn[r],e);r=a;break;case"source":U("error",e),r=a;break;case"img":case"image":case"link":U("error",e),U("load",e),r=a;break;case"details":U("toggle",e),r=a;break;case"input":rl(e,a),r=Zi(e,a),U("invalid",e);break;case"option":r=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},r=Y({},a,{value:void 0}),U("invalid",e);break;case"textarea":ol(e,a),r=no(e,a),U("invalid",e);break;default:r=a}ro(n,r),l=r;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?Xu(e,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Gu(e,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&sa(e,u):typeof u=="number"&&sa(e,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(oa.hasOwnProperty(i)?u!=null&&i==="onScroll"&&U("scroll",e):u!=null&&ts(e,i,u,o))}switch(n){case"input":Ma(e),il(e,a,!1);break;case"textarea":Ma(e),sl(e);break;case"option":a.value!=null&&e.setAttribute("value",""+kt(a.value));break;case"select":e.multiple=!!a.multiple,i=a.value,i!=null?un(e,!!a.multiple,i,!1):a.defaultValue!=null&&un(e,!!a.multiple,a.defaultValue,!0);break;default:typeof r.onClick=="function"&&(e.onclick=Cr)}switch(n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return se(t),null;case 6:if(e&&t.stateNode!=null)Td(e,t,e.memoizedProps,a);else{if(typeof a!="string"&&t.stateNode===null)throw Error(S(166));if(n=Mt(xa.current),Mt(Ge.current),Va(t)){if(a=t.stateNode,n=t.memoizedProps,a[Ye]=t,(i=a.nodeValue!==n)&&(e=we,e!==null))switch(e.tag){case 3:$a(a.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&$a(a.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else a=(n.nodeType===9?n:n.ownerDocument).createTextNode(a),a[Ye]=t,t.stateNode=a}return se(t),null;case 13:if(H(z),a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(B&&Te!==null&&t.mode&1&&!(t.flags&128))_c(),vn(),t.flags|=98560,i=!1;else if(i=Va(t),a!==null&&a.dehydrated!==null){if(e===null){if(!i)throw Error(S(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(S(317));i[Ye]=t}else vn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;se(t),i=!1}else Oe!==null&&(Ho(Oe),Oe=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(t.child.flags|=8192,t.mode&1&&(e===null||z.current&1?J===0&&(J=3):Os())),t.updateQueue!==null&&(t.flags|=4),se(t),null);case 4:return wn(),Po(e,t),e===null&&ma(t.stateNode.containerInfo),se(t),null;case 10:return Ts(t.type._context),se(t),null;case 17:return ge(t.type)&&Rr(),se(t),null;case 19:if(H(z),i=t.memoizedState,i===null)return se(t),null;if(a=(t.flags&128)!==0,o=i.rendering,o===null)if(a)Hn(i,!1);else{if(J!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Lr(e),o!==null){for(t.flags|=128,Hn(i,!1),a=o.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),t.subtreeFlags=0,a=n,n=t.child;n!==null;)i=n,e=a,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return _(z,z.current&1|2),t.child}e=e.sibling}i.tail!==null&&G()>Sn&&(t.flags|=128,a=!0,Hn(i,!1),t.lanes=4194304)}else{if(!a)if(e=Lr(o),e!==null){if(t.flags|=128,a=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Hn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!B)return se(t),null}else 2*G()-i.renderingStartTime>Sn&&n!==1073741824&&(t.flags|=128,a=!0,Hn(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=G(),t.sibling=null,n=z.current,_(z,a?n&1|2:n&1),t):(se(t),null);case 22:case 23:return Ms(),a=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(t.flags|=8192),a&&t.mode&1?ve&1073741824&&(se(t),t.subtreeFlags&6&&(t.flags|=8192)):se(t),null;case 24:return null;case 25:return null}throw Error(S(156,t.tag))}function vm(e,t){switch(ys(t),t.tag){case 1:return ge(t.type)&&Rr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return wn(),H(ye),H(ue),ks(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ns(t),null;case 13:if(H(z),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(S(340));vn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return H(z),null;case 4:return wn(),null;case 10:return Ts(t.type._context),null;case 22:case 23:return Ms(),null;case 24:return null;default:return null}}var qa=!1,le=!1,Tm=typeof WeakSet=="function"?WeakSet:Set,R=null;function sn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(a){K(e,t,a)}else n.current=null}function Fo(e,t,n){try{n()}catch(a){K(e,t,a)}}var Ql=!1;function wm(e,t){if(yo=Sr,e=kc(),ms(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var r=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,c=0,m=0,d=e,y=null;t:for(;;){for(var g;d!==n||r!==0&&d.nodeType!==3||(l=o+r),d!==i||a!==0&&d.nodeType!==3||(u=o+a),d.nodeType===3&&(o+=d.nodeValue.length),(g=d.firstChild)!==null;)y=d,d=g;for(;;){if(d===e)break t;if(y===n&&++c===r&&(l=o),y===i&&++m===a&&(u=o),(g=d.nextSibling)!==null)break;d=y,y=d.parentNode}d=g}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(go={focusedElem:e,selectionRange:n},Sr=!1,R=t;R!==null;)if(t=R,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,R=e;else for(;R!==null;){t=R;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var T=v.memoizedProps,b=v.memoizedState,f=t.stateNode,h=f.getSnapshotBeforeUpdate(t.elementType===t.type?T:De(t.type,T),b);f.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(S(163))}}catch(w){K(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,R=e;break}R=t.return}return v=Ql,Ql=!1,v}function aa(e,t,n){var a=t.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var r=a=a.next;do{if((r.tag&e)===e){var i=r.destroy;r.destroy=void 0,i!==void 0&&Fo(t,n,i)}r=r.next}while(r!==a)}}function ei(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var a=n.create;n.destroy=a()}n=n.next}while(n!==t)}}function Lo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function wd(e){var t=e.alternate;t!==null&&(e.alternate=null,wd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ye],delete t[ya],delete t[To],delete t[am],delete t[rm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function bd(e){return e.tag===5||e.tag===3||e.tag===4}function Xl(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||bd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Do(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Cr));else if(a!==4&&(e=e.child,e!==null))for(Do(e,t,n),e=e.sibling;e!==null;)Do(e,t,n),e=e.sibling}function Mo(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(Mo(e,t,n),e=e.sibling;e!==null;)Mo(e,t,n),e=e.sibling}var ne=null,Me=!1;function ut(e,t,n){for(n=n.child;n!==null;)Sd(e,t,n),n=n.sibling}function Sd(e,t,n){if(qe&&typeof qe.onCommitFiberUnmount=="function")try{qe.onCommitFiberUnmount(Yr,n)}catch{}switch(n.tag){case 5:le||sn(n,t);case 6:var a=ne,r=Me;ne=null,ut(e,t,n),ne=a,Me=r,ne!==null&&(Me?(e=ne,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ne.removeChild(n.stateNode));break;case 18:ne!==null&&(Me?(e=ne,n=n.stateNode,e.nodeType===8?Ai(e.parentNode,n):e.nodeType===1&&Ai(e,n),da(e)):Ai(ne,n.stateNode));break;case 4:a=ne,r=Me,ne=n.stateNode.containerInfo,Me=!0,ut(e,t,n),ne=a,Me=r;break;case 0:case 11:case 14:case 15:if(!le&&(a=n.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){r=a=a.next;do{var i=r,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Fo(n,t,o),r=r.next}while(r!==a)}ut(e,t,n);break;case 1:if(!le&&(sn(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=n.memoizedProps,a.state=n.memoizedState,a.componentWillUnmount()}catch(l){K(n,t,l)}ut(e,t,n);break;case 21:ut(e,t,n);break;case 22:n.mode&1?(le=(a=le)||n.memoizedState!==null,ut(e,t,n),le=a):ut(e,t,n);break;default:ut(e,t,n)}}function Jl(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Tm),t.forEach(function(a){var r=Im.bind(null,e,a);n.has(a)||(n.add(a),a.then(r,r))})}}function Le(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];try{var i=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:ne=l.stateNode,Me=!1;break e;case 3:ne=l.stateNode.containerInfo,Me=!0;break e;case 4:ne=l.stateNode.containerInfo,Me=!0;break e}l=l.return}if(ne===null)throw Error(S(160));Sd(i,o,r),ne=null,Me=!1;var u=r.alternate;u!==null&&(u.return=null),r.return=null}catch(c){K(r,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Nd(t,e),t=t.sibling}function Nd(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Le(t,e),$e(e),a&4){try{aa(3,e,e.return),ei(3,e)}catch(T){K(e,e.return,T)}try{aa(5,e,e.return)}catch(T){K(e,e.return,T)}}break;case 1:Le(t,e),$e(e),a&512&&n!==null&&sn(n,n.return);break;case 5:if(Le(t,e),$e(e),a&512&&n!==null&&sn(n,n.return),e.flags&32){var r=e.stateNode;try{sa(r,"")}catch(T){K(e,e.return,T)}}if(a&4&&(r=e.stateNode,r!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,l=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&Yu(r,i),io(l,o);var c=io(l,i);for(o=0;o<u.length;o+=2){var m=u[o],d=u[o+1];m==="style"?Xu(r,d):m==="dangerouslySetInnerHTML"?Gu(r,d):m==="children"?sa(r,d):ts(r,m,d,c)}switch(l){case"input":eo(r,i);break;case"textarea":Ku(r,i);break;case"select":var y=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!i.multiple;var g=i.value;g!=null?un(r,!!i.multiple,g,!1):y!==!!i.multiple&&(i.defaultValue!=null?un(r,!!i.multiple,i.defaultValue,!0):un(r,!!i.multiple,i.multiple?[]:"",!1))}r[ya]=i}catch(T){K(e,e.return,T)}}break;case 6:if(Le(t,e),$e(e),a&4){if(e.stateNode===null)throw Error(S(162));r=e.stateNode,i=e.memoizedProps;try{r.nodeValue=i}catch(T){K(e,e.return,T)}}break;case 3:if(Le(t,e),$e(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{da(t.containerInfo)}catch(T){K(e,e.return,T)}break;case 4:Le(t,e),$e(e);break;case 13:Le(t,e),$e(e),r=e.child,r.flags&8192&&(i=r.memoizedState!==null,r.stateNode.isHidden=i,!i||r.alternate!==null&&r.alternate.memoizedState!==null||(Ls=G())),a&4&&Jl(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(le=(c=le)||m,Le(t,e),le=c):Le(t,e),$e(e),a&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!m&&e.mode&1)for(R=e,m=e.child;m!==null;){for(d=R=m;R!==null;){switch(y=R,g=y.child,y.tag){case 0:case 11:case 14:case 15:aa(4,y,y.return);break;case 1:sn(y,y.return);var v=y.stateNode;if(typeof v.componentWillUnmount=="function"){a=y,n=y.return;try{t=a,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(T){K(a,n,T)}}break;case 5:sn(y,y.return);break;case 22:if(y.memoizedState!==null){eu(d);continue}}g!==null?(g.return=y,R=g):eu(d)}m=m.sibling}e:for(m=null,d=e;;){if(d.tag===5){if(m===null){m=d;try{r=d.stateNode,c?(i=r.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=d.stateNode,u=d.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=Qu("display",o))}catch(T){K(e,e.return,T)}}}else if(d.tag===6){if(m===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(T){K(e,e.return,T)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===e)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===e)break e;for(;d.sibling===null;){if(d.return===null||d.return===e)break e;m===d&&(m=null),d=d.return}m===d&&(m=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Le(t,e),$e(e),a&4&&Jl(e);break;case 21:break;default:Le(t,e),$e(e)}}function $e(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(bd(n)){var a=n;break e}n=n.return}throw Error(S(160))}switch(a.tag){case 5:var r=a.stateNode;a.flags&32&&(sa(r,""),a.flags&=-33);var i=Xl(e);Mo(e,i,r);break;case 3:case 4:var o=a.stateNode.containerInfo,l=Xl(e);Do(e,l,o);break;default:throw Error(S(161))}}catch(u){K(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function bm(e,t,n){R=e,kd(e)}function kd(e,t,n){for(var a=(e.mode&1)!==0;R!==null;){var r=R,i=r.child;if(r.tag===22&&a){var o=r.memoizedState!==null||qa;if(!o){var l=r.alternate,u=l!==null&&l.memoizedState!==null||le;l=qa;var c=le;if(qa=o,(le=u)&&!c)for(R=r;R!==null;)o=R,u=o.child,o.tag===22&&o.memoizedState!==null?tu(r):u!==null?(u.return=o,R=u):tu(r);for(;i!==null;)R=i,kd(i),i=i.sibling;R=r,qa=l,le=c}Zl(e)}else r.subtreeFlags&8772&&i!==null?(i.return=r,R=i):Zl(e)}}function Zl(e){for(;R!==null;){var t=R;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:le||ei(5,t);break;case 1:var a=t.stateNode;if(t.flags&4&&!le)if(n===null)a.componentDidMount();else{var r=t.elementType===t.type?n.memoizedProps:De(t.type,n.memoizedProps);a.componentDidUpdate(r,n.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Ol(t,i,a);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ol(t,o,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var m=c.memoizedState;if(m!==null){var d=m.dehydrated;d!==null&&da(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(S(163))}le||t.flags&512&&Lo(t)}catch(y){K(t,t.return,y)}}if(t===e){R=null;break}if(n=t.sibling,n!==null){n.return=t.return,R=n;break}R=t.return}}function eu(e){for(;R!==null;){var t=R;if(t===e){R=null;break}var n=t.sibling;if(n!==null){n.return=t.return,R=n;break}R=t.return}}function tu(e){for(;R!==null;){var t=R;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ei(4,t)}catch(u){K(t,n,u)}break;case 1:var a=t.stateNode;if(typeof a.componentDidMount=="function"){var r=t.return;try{a.componentDidMount()}catch(u){K(t,r,u)}}var i=t.return;try{Lo(t)}catch(u){K(t,i,u)}break;case 5:var o=t.return;try{Lo(t)}catch(u){K(t,o,u)}}}catch(u){K(t,t.return,u)}if(t===e){R=null;break}var l=t.sibling;if(l!==null){l.return=t.return,R=l;break}R=t.return}}var Sm=Math.ceil,Or=lt.ReactCurrentDispatcher,Ps=lt.ReactCurrentOwner,Ie=lt.ReactCurrentBatchConfig,D=0,te=null,Q=null,ae=0,ve=0,ln=Et(0),J=0,ba=null,zt=0,ti=0,Fs=0,ra=null,me=null,Ls=0,Sn=1/0,Xe=null,_r=!1,Oo=null,bt=null,Ga=!1,yt=null,Ur=0,ia=0,_o=null,cr=-1,dr=0;function de(){return D&6?G():cr!==-1?cr:cr=G()}function St(e){return e.mode&1?D&2&&ae!==0?ae&-ae:om.transition!==null?(dr===0&&(dr=uc()),dr):(e=O,e!==0||(e=window.event,e=e===void 0?16:yc(e.type)),e):1}function He(e,t,n,a){if(50<ia)throw ia=0,_o=null,Error(S(185));Ca(e,n,a),(!(D&2)||e!==te)&&(e===te&&(!(D&2)&&(ti|=n),J===4&&mt(e,ae)),xe(e,a),n===1&&D===0&&!(t.mode&1)&&(Sn=G()+500,Xr&&At()))}function xe(e,t){var n=e.callbackNode;of(e,t);var a=br(e,e===te?ae:0);if(a===0)n!==null&&cl(n),e.callbackNode=null,e.callbackPriority=0;else if(t=a&-a,e.callbackPriority!==t){if(n!=null&&cl(n),t===1)e.tag===0?im(nu.bind(null,e)):Dc(nu.bind(null,e)),tm(function(){!(D&6)&&At()}),n=null;else{switch(cc(a)){case 1:n=os;break;case 4:n=sc;break;case 16:n=wr;break;case 536870912:n=lc;break;default:n=wr}n=Fd(n,Cd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Cd(e,t){if(cr=-1,dr=0,D&6)throw Error(S(327));var n=e.callbackNode;if(mn()&&e.callbackNode!==n)return null;var a=br(e,e===te?ae:0);if(a===0)return null;if(a&30||a&e.expiredLanes||t)t=Hr(e,a);else{t=a;var r=D;D|=2;var i=Ed();(te!==e||ae!==t)&&(Xe=null,Sn=G()+500,_t(e,t));do try{Cm();break}catch(l){Rd(e,l)}while(!0);vs(),Or.current=i,D=r,Q!==null?t=0:(te=null,ae=0,t=J)}if(t!==0){if(t===2&&(r=co(e),r!==0&&(a=r,t=Uo(e,r))),t===1)throw n=ba,_t(e,0),mt(e,a),xe(e,G()),n;if(t===6)mt(e,a);else{if(r=e.current.alternate,!(a&30)&&!Nm(r)&&(t=Hr(e,a),t===2&&(i=co(e),i!==0&&(a=i,t=Uo(e,i))),t===1))throw n=ba,_t(e,0),mt(e,a),xe(e,G()),n;switch(e.finishedWork=r,e.finishedLanes=a,t){case 0:case 1:throw Error(S(345));case 2:Ft(e,me,Xe);break;case 3:if(mt(e,a),(a&130023424)===a&&(t=Ls+500-G(),10<t)){if(br(e,0)!==0)break;if(r=e.suspendedLanes,(r&a)!==a){de(),e.pingedLanes|=e.suspendedLanes&r;break}e.timeoutHandle=vo(Ft.bind(null,e,me,Xe),t);break}Ft(e,me,Xe);break;case 4:if(mt(e,a),(a&4194240)===a)break;for(t=e.eventTimes,r=-1;0<a;){var o=31-Ue(a);i=1<<o,o=t[o],o>r&&(r=o),a&=~i}if(a=r,a=G()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*Sm(a/1960))-a,10<a){e.timeoutHandle=vo(Ft.bind(null,e,me,Xe),a);break}Ft(e,me,Xe);break;case 5:Ft(e,me,Xe);break;default:throw Error(S(329))}}}return xe(e,G()),e.callbackNode===n?Cd.bind(null,e):null}function Uo(e,t){var n=ra;return e.current.memoizedState.isDehydrated&&(_t(e,t).flags|=256),e=Hr(e,t),e!==2&&(t=me,me=n,t!==null&&Ho(t)),e}function Ho(e){me===null?me=e:me.push.apply(me,e)}function Nm(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var a=0;a<n.length;a++){var r=n[a],i=r.getSnapshot;r=r.value;try{if(!Be(i(),r))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function mt(e,t){for(t&=~Fs,t&=~ti,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ue(t),a=1<<n;e[n]=-1,t&=~a}}function nu(e){if(D&6)throw Error(S(327));mn();var t=br(e,0);if(!(t&1))return xe(e,G()),null;var n=Hr(e,t);if(e.tag!==0&&n===2){var a=co(e);a!==0&&(t=a,n=Uo(e,a))}if(n===1)throw n=ba,_t(e,0),mt(e,t),xe(e,G()),n;if(n===6)throw Error(S(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ft(e,me,Xe),xe(e,G()),null}function Ds(e,t){var n=D;D|=1;try{return e(t)}finally{D=n,D===0&&(Sn=G()+500,Xr&&At())}}function $t(e){yt!==null&&yt.tag===0&&!(D&6)&&mn();var t=D;D|=1;var n=Ie.transition,a=O;try{if(Ie.transition=null,O=1,e)return e()}finally{O=a,Ie.transition=n,D=t,!(D&6)&&At()}}function Ms(){ve=ln.current,H(ln)}function _t(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,em(n)),Q!==null)for(n=Q.return;n!==null;){var a=n;switch(ys(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&Rr();break;case 3:wn(),H(ye),H(ue),ks();break;case 5:Ns(a);break;case 4:wn();break;case 13:H(z);break;case 19:H(z);break;case 10:Ts(a.type._context);break;case 22:case 23:Ms()}n=n.return}if(te=e,Q=e=Nt(e.current,null),ae=ve=t,J=0,ba=null,Fs=ti=zt=0,me=ra=null,Dt!==null){for(t=0;t<Dt.length;t++)if(n=Dt[t],a=n.interleaved,a!==null){n.interleaved=null;var r=a.next,i=n.pending;if(i!==null){var o=i.next;i.next=r,a.next=o}n.pending=a}Dt=null}return e}function Rd(e,t){do{var n=Q;try{if(vs(),sr.current=Mr,Dr){for(var a=V.memoizedState;a!==null;){var r=a.queue;r!==null&&(r.pending=null),a=a.next}Dr=!1}if(Wt=0,ee=X=V=null,na=!1,va=0,Ps.current=null,n===null||n.return===null){J=1,ba=t,Q=null;break}e:{var i=e,o=n.return,l=n,u=t;if(t=ae,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,m=l,d=m.tag;if(!(m.mode&1)&&(d===0||d===11||d===15)){var y=m.alternate;y?(m.updateQueue=y.updateQueue,m.memoizedState=y.memoizedState,m.lanes=y.lanes):(m.updateQueue=null,m.memoizedState=null)}var g=zl(o);if(g!==null){g.flags&=-257,$l(g,o,l,i,t),g.mode&1&&Wl(i,c,t),t=g,u=c;var v=t.updateQueue;if(v===null){var T=new Set;T.add(u),t.updateQueue=T}else v.add(u);break e}else{if(!(t&1)){Wl(i,c,t),Os();break e}u=Error(S(426))}}else if(B&&l.mode&1){var b=zl(o);if(b!==null){!(b.flags&65536)&&(b.flags|=256),$l(b,o,l,i,t),gs(bn(u,l));break e}}i=u=bn(u,l),J!==4&&(J=2),ra===null?ra=[i]:ra.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var f=cd(i,u,t);Ml(i,f);break e;case 1:l=u;var h=i.type,p=i.stateNode;if(!(i.flags&128)&&(typeof h.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(bt===null||!bt.has(p)))){i.flags|=65536,t&=-t,i.lanes|=t;var w=dd(i,l,t);Ml(i,w);break e}}i=i.return}while(i!==null)}Id(n)}catch(N){t=N,Q===n&&n!==null&&(Q=n=n.return);continue}break}while(!0)}function Ed(){var e=Or.current;return Or.current=Mr,e===null?Mr:e}function Os(){(J===0||J===3||J===2)&&(J=4),te===null||!(zt&268435455)&&!(ti&268435455)||mt(te,ae)}function Hr(e,t){var n=D;D|=2;var a=Ed();(te!==e||ae!==t)&&(Xe=null,_t(e,t));do try{km();break}catch(r){Rd(e,r)}while(!0);if(vs(),D=n,Or.current=a,Q!==null)throw Error(S(261));return te=null,ae=0,J}function km(){for(;Q!==null;)Ad(Q)}function Cm(){for(;Q!==null&&!Qh();)Ad(Q)}function Ad(e){var t=Pd(e.alternate,e,ve);e.memoizedProps=e.pendingProps,t===null?Id(e):Q=t,Ps.current=null}function Id(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=vm(n,t),n!==null){n.flags&=32767,Q=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{J=6,Q=null;return}}else if(n=xm(n,t,ve),n!==null){Q=n;return}if(t=t.sibling,t!==null){Q=t;return}Q=t=e}while(t!==null);J===0&&(J=5)}function Ft(e,t,n){var a=O,r=Ie.transition;try{Ie.transition=null,O=1,Rm(e,t,n,a)}finally{Ie.transition=r,O=a}return null}function Rm(e,t,n,a){do mn();while(yt!==null);if(D&6)throw Error(S(327));n=e.finishedWork;var r=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(S(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(sf(e,i),e===te&&(Q=te=null,ae=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ga||(Ga=!0,Fd(wr,function(){return mn(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Ie.transition,Ie.transition=null;var o=O;O=1;var l=D;D|=4,Ps.current=null,wm(e,n),Nd(n,e),Kf(go),Sr=!!yo,go=yo=null,e.current=n,bm(n),Xh(),D=l,O=o,Ie.transition=i}else e.current=n;if(Ga&&(Ga=!1,yt=e,Ur=r),i=e.pendingLanes,i===0&&(bt=null),ef(n.stateNode),xe(e,G()),t!==null)for(a=e.onRecoverableError,n=0;n<t.length;n++)r=t[n],a(r.value,{componentStack:r.stack,digest:r.digest});if(_r)throw _r=!1,e=Oo,Oo=null,e;return Ur&1&&e.tag!==0&&mn(),i=e.pendingLanes,i&1?e===_o?ia++:(ia=0,_o=e):ia=0,At(),null}function mn(){if(yt!==null){var e=cc(Ur),t=Ie.transition,n=O;try{if(Ie.transition=null,O=16>e?16:e,yt===null)var a=!1;else{if(e=yt,yt=null,Ur=0,D&6)throw Error(S(331));var r=D;for(D|=4,R=e.current;R!==null;){var i=R,o=i.child;if(R.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for(R=c;R!==null;){var m=R;switch(m.tag){case 0:case 11:case 15:aa(8,m,i)}var d=m.child;if(d!==null)d.return=m,R=d;else for(;R!==null;){m=R;var y=m.sibling,g=m.return;if(wd(m),m===c){R=null;break}if(y!==null){y.return=g,R=y;break}R=g}}}var v=i.alternate;if(v!==null){var T=v.child;if(T!==null){v.child=null;do{var b=T.sibling;T.sibling=null,T=b}while(T!==null)}}R=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,R=o;else e:for(;R!==null;){if(i=R,i.flags&2048)switch(i.tag){case 0:case 11:case 15:aa(9,i,i.return)}var f=i.sibling;if(f!==null){f.return=i.return,R=f;break e}R=i.return}}var h=e.current;for(R=h;R!==null;){o=R;var p=o.child;if(o.subtreeFlags&2064&&p!==null)p.return=o,R=p;else e:for(o=h;R!==null;){if(l=R,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:ei(9,l)}}catch(N){K(l,l.return,N)}if(l===o){R=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,R=w;break e}R=l.return}}if(D=r,At(),qe&&typeof qe.onPostCommitFiberRoot=="function")try{qe.onPostCommitFiberRoot(Yr,e)}catch{}a=!0}return a}finally{O=n,Ie.transition=t}}return!1}function au(e,t,n){t=bn(n,t),t=cd(e,t,1),e=wt(e,t,1),t=de(),e!==null&&(Ca(e,1,t),xe(e,t))}function K(e,t,n){if(e.tag===3)au(e,e,n);else for(;t!==null;){if(t.tag===3){au(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(bt===null||!bt.has(a))){e=bn(n,e),e=dd(t,e,1),t=wt(t,e,1),e=de(),t!==null&&(Ca(t,1,e),xe(t,e));break}}t=t.return}}function Em(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),t=de(),e.pingedLanes|=e.suspendedLanes&n,te===e&&(ae&n)===n&&(J===4||J===3&&(ae&130023424)===ae&&500>G()-Ls?_t(e,0):Fs|=n),xe(e,t)}function jd(e,t){t===0&&(e.mode&1?(t=Ua,Ua<<=1,!(Ua&130023424)&&(Ua=4194304)):t=1);var n=de();e=it(e,t),e!==null&&(Ca(e,t,n),xe(e,n))}function Am(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),jd(e,n)}function Im(e,t){var n=0;switch(e.tag){case 13:var a=e.stateNode,r=e.memoizedState;r!==null&&(n=r.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(S(314))}a!==null&&a.delete(t),jd(e,n)}var Pd;Pd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ye.current)pe=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return pe=!1,gm(e,t,n);pe=!!(e.flags&131072)}else pe=!1,B&&t.flags&1048576&&Mc(t,Ir,t.index);switch(t.lanes=0,t.tag){case 2:var a=t.type;ur(e,t),e=t.pendingProps;var r=xn(t,ue.current);fn(t,n),r=Rs(null,t,a,e,r,n);var i=Es();return t.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ge(a)?(i=!0,Er(t)):i=!1,t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,bs(t),r.updater=Zr,t.stateNode=r,r._reactInternals=t,Co(t,a,e,n),t=Ao(null,t,a,!0,i,n)):(t.tag=0,B&&i&&ps(t),ce(null,t,r,n),t=t.child),t;case 16:a=t.elementType;e:{switch(ur(e,t),e=t.pendingProps,r=a._init,a=r(a._payload),t.type=a,r=t.tag=Pm(a),e=De(a,e),r){case 0:t=Eo(null,t,a,e,n);break e;case 1:t=Kl(null,t,a,e,n);break e;case 11:t=Vl(null,t,a,e,n);break e;case 14:t=Yl(null,t,a,De(a.type,e),n);break e}throw Error(S(306,a,""))}return t;case 0:return a=t.type,r=t.pendingProps,r=t.elementType===a?r:De(a,r),Eo(e,t,a,r,n);case 1:return a=t.type,r=t.pendingProps,r=t.elementType===a?r:De(a,r),Kl(e,t,a,r,n);case 3:e:{if(pd(t),e===null)throw Error(S(387));a=t.pendingProps,i=t.memoizedState,r=i.element,Wc(e,t),Fr(t,a,null,n);var o=t.memoizedState;if(a=o.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){r=bn(Error(S(423)),t),t=ql(e,t,a,n,r);break e}else if(a!==r){r=bn(Error(S(424)),t),t=ql(e,t,a,n,r);break e}else for(Te=Tt(t.stateNode.containerInfo.firstChild),we=t,B=!0,Oe=null,n=Hc(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(vn(),a===r){t=ot(e,t,n);break e}ce(e,t,a,n)}t=t.child}return t;case 5:return zc(t),e===null&&So(t),a=t.type,r=t.pendingProps,i=e!==null?e.memoizedProps:null,o=r.children,xo(a,r)?o=null:i!==null&&xo(a,i)&&(t.flags|=32),md(e,t),ce(e,t,o,n),t.child;case 6:return e===null&&So(t),null;case 13:return yd(e,t,n);case 4:return Ss(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=Tn(t,null,a,n):ce(e,t,a,n),t.child;case 11:return a=t.type,r=t.pendingProps,r=t.elementType===a?r:De(a,r),Vl(e,t,a,r,n);case 7:return ce(e,t,t.pendingProps,n),t.child;case 8:return ce(e,t,t.pendingProps.children,n),t.child;case 12:return ce(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(a=t.type._context,r=t.pendingProps,i=t.memoizedProps,o=r.value,_(jr,a._currentValue),a._currentValue=o,i!==null)if(Be(i.value,o)){if(i.children===r.children&&!ye.current){t=ot(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var u=l.firstContext;u!==null;){if(u.context===a){if(i.tag===1){u=tt(-1,n&-n),u.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var m=c.pending;m===null?u.next=u:(u.next=m.next,m.next=u),c.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),No(i.return,n,t),l.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(S(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),No(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ce(e,t,r.children,n),t=t.child}return t;case 9:return r=t.type,a=t.pendingProps.children,fn(t,n),r=je(r),a=a(r),t.flags|=1,ce(e,t,a,n),t.child;case 14:return a=t.type,r=De(a,t.pendingProps),r=De(a.type,r),Yl(e,t,a,r,n);case 15:return hd(e,t,t.type,t.pendingProps,n);case 17:return a=t.type,r=t.pendingProps,r=t.elementType===a?r:De(a,r),ur(e,t),t.tag=1,ge(a)?(e=!0,Er(t)):e=!1,fn(t,n),ud(t,a,r),Co(t,a,r,n),Ao(null,t,a,!0,e,n);case 19:return gd(e,t,n);case 22:return fd(e,t,n)}throw Error(S(156,t.tag))};function Fd(e,t){return oc(e,t)}function jm(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ae(e,t,n,a){return new jm(e,t,n,a)}function _s(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Pm(e){if(typeof e=="function")return _s(e)?1:0;if(e!=null){if(e=e.$$typeof,e===as)return 11;if(e===rs)return 14}return 2}function Nt(e,t){var n=e.alternate;return n===null?(n=Ae(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function hr(e,t,n,a,r,i){var o=2;if(a=e,typeof e=="function")_s(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Xt:return Ut(n.children,r,i,t);case ns:o=8,r|=8;break;case Gi:return e=Ae(12,n,t,r|2),e.elementType=Gi,e.lanes=i,e;case Qi:return e=Ae(13,n,t,r),e.elementType=Qi,e.lanes=i,e;case Xi:return e=Ae(19,n,t,r),e.elementType=Xi,e.lanes=i,e;case zu:return ni(n,r,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Bu:o=10;break e;case Wu:o=9;break e;case as:o=11;break e;case rs:o=14;break e;case dt:o=16,a=null;break e}throw Error(S(130,e==null?e:typeof e,""))}return t=Ae(o,n,t,r),t.elementType=e,t.type=a,t.lanes=i,t}function Ut(e,t,n,a){return e=Ae(7,e,a,t),e.lanes=n,e}function ni(e,t,n,a){return e=Ae(22,e,a,t),e.elementType=zu,e.lanes=n,e.stateNode={isHidden:!1},e}function Oi(e,t,n){return e=Ae(6,e,null,t),e.lanes=n,e}function _i(e,t,n){return t=Ae(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Fm(e,t,n,a,r){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=xi(0),this.expirationTimes=xi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xi(0),this.identifierPrefix=a,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Us(e,t,n,a,r,i,o,l,u){return e=new Fm(e,t,n,l,u),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Ae(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},bs(i),e}function Lm(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Qt,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}function Ld(e){if(!e)return Ct;e=e._reactInternals;e:{if(Yt(e)!==e||e.tag!==1)throw Error(S(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ge(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(S(171))}if(e.tag===1){var n=e.type;if(ge(n))return Lc(e,n,t)}return t}function Dd(e,t,n,a,r,i,o,l,u){return e=Us(n,a,!0,e,r,i,o,l,u),e.context=Ld(null),n=e.current,a=de(),r=St(n),i=tt(a,r),i.callback=t??null,wt(n,i,r),e.current.lanes=r,Ca(e,r,a),xe(e,a),e}function ai(e,t,n,a){var r=t.current,i=de(),o=St(r);return n=Ld(n),t.context===null?t.context=n:t.pendingContext=n,t=tt(i,o),t.payload={element:e},a=a===void 0?null:a,a!==null&&(t.callback=a),e=wt(r,t,o),e!==null&&(He(e,r,o,i),or(e,r,o)),o}function Br(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ru(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Hs(e,t){ru(e,t),(e=e.alternate)&&ru(e,t)}function Dm(){return null}var Md=typeof reportError=="function"?reportError:function(e){console.error(e)};function Bs(e){this._internalRoot=e}ri.prototype.render=Bs.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(S(409));ai(e,t,null,null)};ri.prototype.unmount=Bs.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;$t(function(){ai(null,e,null,null)}),t[rt]=null}};function ri(e){this._internalRoot=e}ri.prototype.unstable_scheduleHydration=function(e){if(e){var t=fc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ft.length&&t!==0&&t<ft[n].priority;n++);ft.splice(n,0,e),n===0&&pc(e)}};function Ws(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ii(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function iu(){}function Mm(e,t,n,a,r){if(r){if(typeof a=="function"){var i=a;a=function(){var c=Br(o);i.call(c)}}var o=Dd(t,a,e,0,null,!1,!1,"",iu);return e._reactRootContainer=o,e[rt]=o.current,ma(e.nodeType===8?e.parentNode:e),$t(),o}for(;r=e.lastChild;)e.removeChild(r);if(typeof a=="function"){var l=a;a=function(){var c=Br(u);l.call(c)}}var u=Us(e,0,!1,null,null,!1,!1,"",iu);return e._reactRootContainer=u,e[rt]=u.current,ma(e.nodeType===8?e.parentNode:e),$t(function(){ai(t,u,n,a)}),u}function oi(e,t,n,a,r){var i=n._reactRootContainer;if(i){var o=i;if(typeof r=="function"){var l=r;r=function(){var u=Br(o);l.call(u)}}ai(t,o,e,r)}else o=Mm(n,t,e,r,a);return Br(o)}dc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=qn(t.pendingLanes);n!==0&&(ss(t,n|1),xe(t,G()),!(D&6)&&(Sn=G()+500,At()))}break;case 13:$t(function(){var a=it(e,1);if(a!==null){var r=de();He(a,e,1,r)}}),Hs(e,1)}};ls=function(e){if(e.tag===13){var t=it(e,134217728);if(t!==null){var n=de();He(t,e,134217728,n)}Hs(e,134217728)}};hc=function(e){if(e.tag===13){var t=St(e),n=it(e,t);if(n!==null){var a=de();He(n,e,t,a)}Hs(e,t)}};fc=function(){return O};mc=function(e,t){var n=O;try{return O=e,t()}finally{O=n}};so=function(e,t,n){switch(t){case"input":if(eo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var r=Qr(a);if(!r)throw Error(S(90));Vu(a),eo(a,r)}}}break;case"textarea":Ku(e,n);break;case"select":t=n.value,t!=null&&un(e,!!n.multiple,t,!1)}};ec=Ds;tc=$t;var Om={usingClientEntryPoint:!1,Events:[Ea,tn,Qr,Ju,Zu,Ds]},Bn={findFiberByHostInstance:Lt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},_m={bundleType:Bn.bundleType,version:Bn.version,rendererPackageName:Bn.rendererPackageName,rendererConfig:Bn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:lt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=rc(e),e===null?null:e.stateNode},findFiberByHostInstance:Bn.findFiberByHostInstance||Dm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Qa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Qa.isDisabled&&Qa.supportsFiber)try{Yr=Qa.inject(_m),qe=Qa}catch{}}Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Om;Se.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ws(t))throw Error(S(200));return Lm(e,t,null,n)};Se.createRoot=function(e,t){if(!Ws(e))throw Error(S(299));var n=!1,a="",r=Md;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Us(e,1,!1,null,null,n,!1,a,r),e[rt]=t.current,ma(e.nodeType===8?e.parentNode:e),new Bs(t)};Se.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(S(188)):(e=Object.keys(e).join(","),Error(S(268,e)));return e=rc(t),e=e===null?null:e.stateNode,e};Se.flushSync=function(e){return $t(e)};Se.hydrate=function(e,t,n){if(!ii(t))throw Error(S(200));return oi(null,e,t,!0,n)};Se.hydrateRoot=function(e,t,n){if(!Ws(e))throw Error(S(405));var a=n!=null&&n.hydratedSources||null,r=!1,i="",o=Md;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Dd(t,null,e,1,n??null,r,!1,i,o),e[rt]=t.current,ma(e),a)for(e=0;e<a.length;e++)n=a[e],r=n._getVersion,r=r(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,r]:t.mutableSourceEagerHydrationData.push(n,r);return new ri(t)};Se.render=function(e,t,n){if(!ii(t))throw Error(S(200));return oi(null,e,t,!1,n)};Se.unmountComponentAtNode=function(e){if(!ii(e))throw Error(S(40));return e._reactRootContainer?($t(function(){oi(null,null,e,!1,function(){e._reactRootContainer=null,e[rt]=null})}),!0):!1};Se.unstable_batchedUpdates=Ds;Se.unstable_renderSubtreeIntoContainer=function(e,t,n,a){if(!ii(n))throw Error(S(200));if(e==null||e._reactInternals===void 0)throw Error(S(38));return oi(e,t,n,!1,a)};Se.version="18.3.1-next-f1338f8080-20240426";function Od(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Od)}catch(e){console.error(e)}}Od(),Ou.exports=Se;var Um=Ou.exports,ou=Um;gr.createRoot=ou.createRoot,gr.hydrateRoot=ou.hydrateRoot;/**
 * react-router v7.13.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var su="popstate";function Hm(e={}){function t(a,r){let{pathname:i,search:o,hash:l}=a.location;return Bo("",{pathname:i,search:o,hash:l},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(a,r){return typeof r=="string"?r:Sa(r)}return Wm(t,n,null,e)}function W(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Fe(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Bm(){return Math.random().toString(36).substring(2,10)}function lu(e,t){return{usr:e.state,key:e.key,idx:t}}function Bo(e,t,n=null,a){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?An(t):t,state:n,key:t&&t.key||a||Bm()}}function Sa({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function An(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substring(a),e=e.substring(0,a)),e&&(t.pathname=e)}return t}function Wm(e,t,n,a={}){let{window:r=document.defaultView,v5Compat:i=!1}=a,o=r.history,l="POP",u=null,c=m();c==null&&(c=0,o.replaceState({...o.state,idx:c},""));function m(){return(o.state||{idx:null}).idx}function d(){l="POP";let b=m(),f=b==null?null:b-c;c=b,u&&u({action:l,location:T.location,delta:f})}function y(b,f){l="PUSH";let h=Bo(T.location,b,f);c=m()+1;let p=lu(h,c),w=T.createHref(h);try{o.pushState(p,"",w)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;r.location.assign(w)}i&&u&&u({action:l,location:T.location,delta:1})}function g(b,f){l="REPLACE";let h=Bo(T.location,b,f);c=m();let p=lu(h,c),w=T.createHref(h);o.replaceState(p,"",w),i&&u&&u({action:l,location:T.location,delta:0})}function v(b){return zm(b)}let T={get action(){return l},get location(){return e(r,o)},listen(b){if(u)throw new Error("A history only accepts one active listener");return r.addEventListener(su,d),u=b,()=>{r.removeEventListener(su,d),u=null}},createHref(b){return t(r,b)},createURL:v,encodeLocation(b){let f=v(b);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:y,replace:g,go(b){return o.go(b)}};return T}function zm(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),W(n,"No window.location.(origin|href) available to create URL");let a=typeof e=="string"?e:Sa(e);return a=a.replace(/ $/,"%20"),!t&&a.startsWith("//")&&(a=n+a),new URL(a,n)}function _d(e,t,n="/"){return $m(e,t,n,!1)}function $m(e,t,n,a){let r=typeof t=="string"?An(t):t,i=st(r.pathname||"/",n);if(i==null)return null;let o=Ud(e);Vm(o);let l=null;for(let u=0;l==null&&u<o.length;++u){let c=np(i);l=ep(o[u],c,a)}return l}function Ud(e,t=[],n=[],a="",r=!1){let i=(o,l,u=r,c)=>{let m={relativePath:c===void 0?o.path||"":c,caseSensitive:o.caseSensitive===!0,childrenIndex:l,route:o};if(m.relativePath.startsWith("/")){if(!m.relativePath.startsWith(a)&&u)return;W(m.relativePath.startsWith(a),`Absolute route path "${m.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),m.relativePath=m.relativePath.slice(a.length)}let d=nt([a,m.relativePath]),y=n.concat(m);o.children&&o.children.length>0&&(W(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),Ud(o.children,t,y,d,u)),!(o.path==null&&!o.index)&&t.push({path:d,score:Jm(d,o.index),routesMeta:y})};return e.forEach((o,l)=>{var u;if(o.path===""||!((u=o.path)!=null&&u.includes("?")))i(o,l);else for(let c of Hd(o.path))i(o,l,!0,c)}),t}function Hd(e){let t=e.split("/");if(t.length===0)return[];let[n,...a]=t,r=n.endsWith("?"),i=n.replace(/\?$/,"");if(a.length===0)return r?[i,""]:[i];let o=Hd(a.join("/")),l=[];return l.push(...o.map(u=>u===""?i:[i,u].join("/"))),r&&l.push(...o),l.map(u=>e.startsWith("/")&&u===""?"/":u)}function Vm(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Zm(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}var Ym=/^:[\w-]+$/,Km=3,qm=2,Gm=1,Qm=10,Xm=-2,uu=e=>e==="*";function Jm(e,t){let n=e.split("/"),a=n.length;return n.some(uu)&&(a+=Xm),t&&(a+=qm),n.filter(r=>!uu(r)).reduce((r,i)=>r+(Ym.test(i)?Km:i===""?Gm:Qm),a)}function Zm(e,t){return e.length===t.length&&e.slice(0,-1).every((a,r)=>a===t[r])?e[e.length-1]-t[t.length-1]:0}function ep(e,t,n=!1){let{routesMeta:a}=e,r={},i="/",o=[];for(let l=0;l<a.length;++l){let u=a[l],c=l===a.length-1,m=i==="/"?t:t.slice(i.length)||"/",d=Wr({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},m),y=u.route;if(!d&&c&&n&&!a[a.length-1].route.index&&(d=Wr({path:u.relativePath,caseSensitive:u.caseSensitive,end:!1},m)),!d)return null;Object.assign(r,d.params),o.push({params:r,pathname:nt([i,d.pathname]),pathnameBase:op(nt([i,d.pathnameBase])),route:y}),d.pathnameBase!=="/"&&(i=nt([i,d.pathnameBase]))}return o}function Wr(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=tp(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let i=r[0],o=i.replace(/(.)\/+$/,"$1"),l=r.slice(1);return{params:a.reduce((c,{paramName:m,isOptional:d},y)=>{if(m==="*"){let v=l[y]||"";o=i.slice(0,i.length-v.length).replace(/(.)\/+$/,"$1")}const g=l[y];return d&&!g?c[m]=void 0:c[m]=(g||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:o,pattern:e}}function tp(e,t=!1,n=!0){Fe(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,u)=>(a.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(a.push({paramName:"*"}),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":e!==""&&e!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,t?void 0:"i"),a]}function np(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Fe(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function st(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&a!=="/"?null:e.slice(n)||"/"}var ap=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function rp(e,t="/"){let{pathname:n,search:a="",hash:r=""}=typeof e=="string"?An(e):e,i;return n?(n=n.replace(/\/\/+/g,"/"),n.startsWith("/")?i=cu(n.substring(1),"/"):i=cu(n,t)):i=t,{pathname:i,search:sp(a),hash:lp(r)}}function cu(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function Ui(e,t,n,a){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function ip(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function zs(e){let t=ip(e);return t.map((n,a)=>a===t.length-1?n.pathname:n.pathnameBase)}function $s(e,t,n,a=!1){let r;typeof e=="string"?r=An(e):(r={...e},W(!r.pathname||!r.pathname.includes("?"),Ui("?","pathname","search",r)),W(!r.pathname||!r.pathname.includes("#"),Ui("#","pathname","hash",r)),W(!r.search||!r.search.includes("#"),Ui("#","search","hash",r)));let i=e===""||r.pathname==="",o=i?"/":r.pathname,l;if(o==null)l=n;else{let d=t.length-1;if(!a&&o.startsWith("..")){let y=o.split("/");for(;y[0]==="..";)y.shift(),d-=1;r.pathname=y.join("/")}l=d>=0?t[d]:"/"}let u=rp(r,l),c=o&&o!=="/"&&o.endsWith("/"),m=(i||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||m)&&(u.pathname+="/"),u}var nt=e=>e.join("/").replace(/\/\/+/g,"/"),op=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),sp=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,lp=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,up=class{constructor(e,t,n,a=!1){this.status=e,this.statusText=t||"",this.internal=a,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function cp(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function dp(e){return e.map(t=>t.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Bd=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Wd(e,t){let n=e;if(typeof n!="string"||!ap.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let a=n,r=!1;if(Bd)try{let i=new URL(window.location.href),o=n.startsWith("//")?new URL(i.protocol+n):new URL(n),l=st(o.pathname,t);o.origin===i.origin&&l!=null?n=l+o.search+o.hash:r=!0}catch{Fe(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:a,isExternal:r,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var zd=["POST","PUT","PATCH","DELETE"];new Set(zd);var hp=["GET",...zd];new Set(hp);var In=x.createContext(null);In.displayName="DataRouter";var si=x.createContext(null);si.displayName="DataRouterState";var fp=x.createContext(!1),$d=x.createContext({isTransitioning:!1});$d.displayName="ViewTransition";var mp=x.createContext(new Map);mp.displayName="Fetchers";var pp=x.createContext(null);pp.displayName="Await";var ke=x.createContext(null);ke.displayName="Navigation";var Ia=x.createContext(null);Ia.displayName="Location";var We=x.createContext({outlet:null,matches:[],isDataRoute:!1});We.displayName="Route";var Vs=x.createContext(null);Vs.displayName="RouteError";var Vd="REACT_ROUTER_ERROR",yp="REDIRECT",gp="ROUTE_ERROR_RESPONSE";function xp(e){if(e.startsWith(`${Vd}:${yp}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function vp(e){if(e.startsWith(`${Vd}:${gp}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new up(t.status,t.statusText,t.data)}catch{}}function Tp(e,{relative:t}={}){W(jn(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:a}=x.useContext(ke),{hash:r,pathname:i,search:o}=ja(e,{relative:t}),l=i;return n!=="/"&&(l=i==="/"?n:nt([n,i])),a.createHref({pathname:l,search:o,hash:r})}function jn(){return x.useContext(Ia)!=null}function ze(){return W(jn(),"useLocation() may be used only in the context of a <Router> component."),x.useContext(Ia).location}var Yd="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Kd(e){x.useContext(ke).static||x.useLayoutEffect(e)}function li(){let{isDataRoute:e}=x.useContext(We);return e?Lp():wp()}function wp(){W(jn(),"useNavigate() may be used only in the context of a <Router> component.");let e=x.useContext(In),{basename:t,navigator:n}=x.useContext(ke),{matches:a}=x.useContext(We),{pathname:r}=ze(),i=JSON.stringify(zs(a)),o=x.useRef(!1);return Kd(()=>{o.current=!0}),x.useCallback((u,c={})=>{if(Fe(o.current,Yd),!o.current)return;if(typeof u=="number"){n.go(u);return}let m=$s(u,JSON.parse(i),r,c.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:nt([t,m.pathname])),(c.replace?n.replace:n.push)(m,c.state,c)},[t,n,i,r,e])}x.createContext(null);function bp(){let{matches:e}=x.useContext(We),t=e[e.length-1];return t?t.params:{}}function ja(e,{relative:t}={}){let{matches:n}=x.useContext(We),{pathname:a}=ze(),r=JSON.stringify(zs(n));return x.useMemo(()=>$s(e,JSON.parse(r),a,t==="path"),[e,r,a,t])}function Sp(e,t){return qd(e,t)}function qd(e,t,n,a,r){var h;W(jn(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:i}=x.useContext(ke),{matches:o}=x.useContext(We),l=o[o.length-1],u=l?l.params:{},c=l?l.pathname:"/",m=l?l.pathnameBase:"/",d=l&&l.route;{let p=d&&d.path||"";Qd(c,!d||p.endsWith("*")||p.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${p}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${p}"> to <Route path="${p==="/"?"*":`${p}/*`}">.`)}let y=ze(),g;if(t){let p=typeof t=="string"?An(t):t;W(m==="/"||((h=p.pathname)==null?void 0:h.startsWith(m)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${p.pathname}" was given in the \`location\` prop.`),g=p}else g=y;let v=g.pathname||"/",T=v;if(m!=="/"){let p=m.replace(/^\//,"").split("/");T="/"+v.replace(/^\//,"").split("/").slice(p.length).join("/")}let b=_d(e,{pathname:T});Fe(d||b!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),Fe(b==null||b[b.length-1].route.element!==void 0||b[b.length-1].route.Component!==void 0||b[b.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let f=Ep(b&&b.map(p=>Object.assign({},p,{params:Object.assign({},u,p.params),pathname:nt([m,i.encodeLocation?i.encodeLocation(p.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:p.pathname]),pathnameBase:p.pathnameBase==="/"?m:nt([m,i.encodeLocation?i.encodeLocation(p.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:p.pathnameBase])})),o,n,a,r);return t&&f?x.createElement(Ia.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},f):f}function Np(){let e=Fp(),t=cp(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:a},i={padding:"2px 4px",backgroundColor:a},o=null;return console.error("Error handled by React Router default ErrorBoundary:",e),o=x.createElement(x.Fragment,null,x.createElement("p",null,"💿 Hey developer 👋"),x.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",x.createElement("code",{style:i},"ErrorBoundary")," or"," ",x.createElement("code",{style:i},"errorElement")," prop on your route.")),x.createElement(x.Fragment,null,x.createElement("h2",null,"Unexpected Application Error!"),x.createElement("h3",{style:{fontStyle:"italic"}},t),n?x.createElement("pre",{style:r},n):null,o)}var kp=x.createElement(Np,null),Gd=class extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=vp(e.digest);n&&(e=n)}let t=e!==void 0?x.createElement(We.Provider,{value:this.props.routeContext},x.createElement(Vs.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?x.createElement(Cp,{error:e},t):t}};Gd.contextType=fp;var Hi=new WeakMap;function Cp({children:e,error:t}){let{basename:n}=x.useContext(ke);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let a=xp(t.digest);if(a){let r=Hi.get(t);if(r)throw r;let i=Wd(a.location,n);if(Bd&&!Hi.get(t))if(i.isExternal||a.reloadDocument)window.location.href=i.absoluteURL||i.to;else{const o=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:a.replace}));throw Hi.set(t,o),o}return x.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return e}function Rp({routeContext:e,match:t,children:n}){let a=x.useContext(In);return a&&a.static&&a.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=t.route.id),x.createElement(We.Provider,{value:e},n)}function Ep(e,t=[],n=null,a=null,r=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let i=e,o=n==null?void 0:n.errors;if(o!=null){let m=i.findIndex(d=>d.route.id&&(o==null?void 0:o[d.route.id])!==void 0);W(m>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),i=i.slice(0,Math.min(i.length,m+1))}let l=!1,u=-1;if(n)for(let m=0;m<i.length;m++){let d=i[m];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(u=m),d.route.id){let{loaderData:y,errors:g}=n,v=d.route.loader&&!y.hasOwnProperty(d.route.id)&&(!g||g[d.route.id]===void 0);if(d.route.lazy||v){l=!0,u>=0?i=i.slice(0,u+1):i=[i[0]];break}}}let c=n&&a?(m,d)=>{var y,g;a(m,{location:n.location,params:((g=(y=n.matches)==null?void 0:y[0])==null?void 0:g.params)??{},unstable_pattern:dp(n.matches),errorInfo:d})}:void 0;return i.reduceRight((m,d,y)=>{let g,v=!1,T=null,b=null;n&&(g=o&&d.route.id?o[d.route.id]:void 0,T=d.route.errorElement||kp,l&&(u<0&&y===0?(Qd("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),v=!0,b=null):u===y&&(v=!0,b=d.route.hydrateFallbackElement||null)));let f=t.concat(i.slice(0,y+1)),h=()=>{let p;return g?p=T:v?p=b:d.route.Component?p=x.createElement(d.route.Component,null):d.route.element?p=d.route.element:p=m,x.createElement(Rp,{match:d,routeContext:{outlet:m,matches:f,isDataRoute:n!=null},children:p})};return n&&(d.route.ErrorBoundary||d.route.errorElement||y===0)?x.createElement(Gd,{location:n.location,revalidation:n.revalidation,component:T,error:g,children:h(),routeContext:{outlet:null,matches:f,isDataRoute:!0},onError:c}):h()},null)}function Ys(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Ap(e){let t=x.useContext(In);return W(t,Ys(e)),t}function Ip(e){let t=x.useContext(si);return W(t,Ys(e)),t}function jp(e){let t=x.useContext(We);return W(t,Ys(e)),t}function Ks(e){let t=jp(e),n=t.matches[t.matches.length-1];return W(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Pp(){return Ks("useRouteId")}function Fp(){var a;let e=x.useContext(Vs),t=Ip("useRouteError"),n=Ks("useRouteError");return e!==void 0?e:(a=t.errors)==null?void 0:a[n]}function Lp(){let{router:e}=Ap("useNavigate"),t=Ks("useNavigate"),n=x.useRef(!1);return Kd(()=>{n.current=!0}),x.useCallback(async(r,i={})=>{Fe(n.current,Yd),n.current&&(typeof r=="number"?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var du={};function Qd(e,t,n){!t&&!du[e]&&(du[e]=!0,Fe(!1,n))}x.memo(Dp);function Dp({routes:e,future:t,state:n,onError:a}){return qd(e,void 0,n,a,t)}function Mp({to:e,replace:t,state:n,relative:a}){W(jn(),"<Navigate> may be used only in the context of a <Router> component.");let{static:r}=x.useContext(ke);Fe(!r,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:i}=x.useContext(We),{pathname:o}=ze(),l=li(),u=$s(e,zs(i),o,a==="path"),c=JSON.stringify(u);return x.useEffect(()=>{l(JSON.parse(c),{replace:t,state:n,relative:a})},[l,c,a,t,n]),null}function ct(e){W(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Op({basename:e="/",children:t=null,location:n,navigationType:a="POP",navigator:r,static:i=!1,unstable_useTransitions:o}){W(!jn(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let l=e.replace(/^\/*/,"/"),u=x.useMemo(()=>({basename:l,navigator:r,static:i,unstable_useTransitions:o,future:{}}),[l,r,i,o]);typeof n=="string"&&(n=An(n));let{pathname:c="/",search:m="",hash:d="",state:y=null,key:g="default"}=n,v=x.useMemo(()=>{let T=st(c,l);return T==null?null:{location:{pathname:T,search:m,hash:d,state:y,key:g},navigationType:a}},[l,c,m,d,y,g,a]);return Fe(v!=null,`<Router basename="${l}"> is not able to match the URL "${c}${m}${d}" because it does not start with the basename, so the <Router> won't render anything.`),v==null?null:x.createElement(ke.Provider,{value:u},x.createElement(Ia.Provider,{children:t,value:v}))}function _p({children:e,location:t}){return Sp(Wo(e),t)}function Wo(e,t=[]){let n=[];return x.Children.forEach(e,(a,r)=>{if(!x.isValidElement(a))return;let i=[...t,r];if(a.type===x.Fragment){n.push.apply(n,Wo(a.props.children,i));return}W(a.type===ct,`[${typeof a.type=="string"?a.type:a.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),W(!a.props.index||!a.props.children,"An index route cannot have child routes.");let o={id:a.props.id||i.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,middleware:a.props.middleware,loader:a.props.loader,action:a.props.action,hydrateFallbackElement:a.props.hydrateFallbackElement,HydrateFallback:a.props.HydrateFallback,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.hasErrorBoundary===!0||a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(o.children=Wo(a.props.children,i)),n.push(o)}),n}var fr="get",mr="application/x-www-form-urlencoded";function ui(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function Up(e){return ui(e)&&e.tagName.toLowerCase()==="button"}function Hp(e){return ui(e)&&e.tagName.toLowerCase()==="form"}function Bp(e){return ui(e)&&e.tagName.toLowerCase()==="input"}function Wp(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function zp(e,t){return e.button===0&&(!t||t==="_self")&&!Wp(e)}function zo(e=""){return new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let a=e[n];return t.concat(Array.isArray(a)?a.map(r=>[n,r]):[[n,a]])},[]))}function $p(e,t){let n=zo(e);return t&&t.forEach((a,r)=>{n.has(r)||t.getAll(r).forEach(i=>{n.append(r,i)})}),n}var Xa=null;function Vp(){if(Xa===null)try{new FormData(document.createElement("form"),0),Xa=!1}catch{Xa=!0}return Xa}var Yp=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Bi(e){return e!=null&&!Yp.has(e)?(Fe(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${mr}"`),null):e}function Kp(e,t){let n,a,r,i,o;if(Hp(e)){let l=e.getAttribute("action");a=l?st(l,t):null,n=e.getAttribute("method")||fr,r=Bi(e.getAttribute("enctype"))||mr,i=new FormData(e)}else if(Up(e)||Bp(e)&&(e.type==="submit"||e.type==="image")){let l=e.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let u=e.getAttribute("formaction")||l.getAttribute("action");if(a=u?st(u,t):null,n=e.getAttribute("formmethod")||l.getAttribute("method")||fr,r=Bi(e.getAttribute("formenctype"))||Bi(l.getAttribute("enctype"))||mr,i=new FormData(l,e),!Vp()){let{name:c,type:m,value:d}=e;if(m==="image"){let y=c?`${c}.`:"";i.append(`${y}x`,"0"),i.append(`${y}y`,"0")}else c&&i.append(c,d)}}else{if(ui(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=fr,a=null,r=mr,o=e}return i&&r==="text/plain"&&(o=i,i=void 0),{action:a,method:n.toLowerCase(),encType:r,formData:i,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function qs(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function qp(e,t,n,a){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?r.pathname.endsWith("/")?r.pathname=`${r.pathname}_.${a}`:r.pathname=`${r.pathname}.${a}`:r.pathname==="/"?r.pathname=`_root.${a}`:t&&st(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.${a}`:r.pathname=`${r.pathname.replace(/\/$/,"")}.${a}`,r}async function Gp(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Qp(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function Xp(e,t,n){let a=await Promise.all(e.map(async r=>{let i=t.routes[r.route.id];if(i){let o=await Gp(i,n);return o.links?o.links():[]}return[]}));return ty(a.flat(1).filter(Qp).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function hu(e,t,n,a,r,i){let o=(u,c)=>n[c]?u.route.id!==n[c].route.id:!0,l=(u,c)=>{var m;return n[c].pathname!==u.pathname||((m=n[c].route.path)==null?void 0:m.endsWith("*"))&&n[c].params["*"]!==u.params["*"]};return i==="assets"?t.filter((u,c)=>o(u,c)||l(u,c)):i==="data"?t.filter((u,c)=>{var d;let m=a.routes[u.route.id];if(!m||!m.hasLoader)return!1;if(o(u,c)||l(u,c))return!0;if(u.route.shouldRevalidate){let y=u.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:((d=n[0])==null?void 0:d.params)||{},nextUrl:new URL(e,window.origin),nextParams:u.params,defaultShouldRevalidate:!0});if(typeof y=="boolean")return y}return!0}):[]}function Jp(e,t,{includeHydrateFallback:n}={}){return Zp(e.map(a=>{let r=t.routes[a.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function Zp(e){return[...new Set(e)]}function ey(e){let t={},n=Object.keys(e).sort();for(let a of n)t[a]=e[a];return t}function ty(e,t){let n=new Set;return new Set(t),e.reduce((a,r)=>{let i=JSON.stringify(ey(r));return n.has(i)||(n.add(i),a.push({key:i,link:r})),a},[])}function Xd(){let e=x.useContext(In);return qs(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function ny(){let e=x.useContext(si);return qs(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Gs=x.createContext(void 0);Gs.displayName="FrameworkContext";function Jd(){let e=x.useContext(Gs);return qs(e,"You must render this element inside a <HydratedRouter> element"),e}function ay(e,t){let n=x.useContext(Gs),[a,r]=x.useState(!1),[i,o]=x.useState(!1),{onFocus:l,onBlur:u,onMouseEnter:c,onMouseLeave:m,onTouchStart:d}=t,y=x.useRef(null);x.useEffect(()=>{if(e==="render"&&o(!0),e==="viewport"){let T=f=>{f.forEach(h=>{o(h.isIntersecting)})},b=new IntersectionObserver(T,{threshold:.5});return y.current&&b.observe(y.current),()=>{b.disconnect()}}},[e]),x.useEffect(()=>{if(a){let T=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(T)}}},[a]);let g=()=>{r(!0)},v=()=>{r(!1),o(!1)};return n?e!=="intent"?[i,y,{}]:[i,y,{onFocus:Wn(l,g),onBlur:Wn(u,v),onMouseEnter:Wn(c,g),onMouseLeave:Wn(m,v),onTouchStart:Wn(d,g)}]:[!1,y,{}]}function Wn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function ry({page:e,...t}){let{router:n}=Xd(),a=x.useMemo(()=>_d(n.routes,e,n.basename),[n.routes,e,n.basename]);return a?x.createElement(oy,{page:e,matches:a,...t}):null}function iy(e){let{manifest:t,routeModules:n}=Jd(),[a,r]=x.useState([]);return x.useEffect(()=>{let i=!1;return Xp(e,t,n).then(o=>{i||r(o)}),()=>{i=!0}},[e,t,n]),a}function oy({page:e,matches:t,...n}){let a=ze(),{future:r,manifest:i,routeModules:o}=Jd(),{basename:l}=Xd(),{loaderData:u,matches:c}=ny(),m=x.useMemo(()=>hu(e,t,c,i,a,"data"),[e,t,c,i,a]),d=x.useMemo(()=>hu(e,t,c,i,a,"assets"),[e,t,c,i,a]),y=x.useMemo(()=>{if(e===a.pathname+a.search+a.hash)return[];let T=new Set,b=!1;if(t.forEach(h=>{var w;let p=i.routes[h.route.id];!p||!p.hasLoader||(!m.some(N=>N.route.id===h.route.id)&&h.route.id in u&&((w=o[h.route.id])!=null&&w.shouldRevalidate)||p.hasClientLoader?b=!0:T.add(h.route.id))}),T.size===0)return[];let f=qp(e,l,r.unstable_trailingSlashAwareDataRequests,"data");return b&&T.size>0&&f.searchParams.set("_routes",t.filter(h=>T.has(h.route.id)).map(h=>h.route.id).join(",")),[f.pathname+f.search]},[l,r.unstable_trailingSlashAwareDataRequests,u,a,i,m,t,e,o]),g=x.useMemo(()=>Jp(d,i),[d,i]),v=iy(d);return x.createElement(x.Fragment,null,y.map(T=>x.createElement("link",{key:T,rel:"prefetch",as:"fetch",href:T,...n})),g.map(T=>x.createElement("link",{key:T,rel:"modulepreload",href:T,...n})),v.map(({key:T,link:b})=>x.createElement("link",{key:T,nonce:n.nonce,...b,crossOrigin:b.crossOrigin??n.crossOrigin})))}function sy(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var ly=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{ly&&(window.__reactRouterVersion="7.13.0")}catch{}function uy({basename:e,children:t,unstable_useTransitions:n,window:a}){let r=x.useRef();r.current==null&&(r.current=Hm({window:a,v5Compat:!0}));let i=r.current,[o,l]=x.useState({action:i.action,location:i.location}),u=x.useCallback(c=>{n===!1?l(c):x.startTransition(()=>l(c))},[n]);return x.useLayoutEffect(()=>i.listen(u),[i,u]),x.createElement(Op,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:i,unstable_useTransitions:n})}var Zd=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,$=x.forwardRef(function({onClick:t,discover:n="render",prefetch:a="none",relative:r,reloadDocument:i,replace:o,state:l,target:u,to:c,preventScrollReset:m,viewTransition:d,unstable_defaultShouldRevalidate:y,...g},v){let{basename:T,unstable_useTransitions:b}=x.useContext(ke),f=typeof c=="string"&&Zd.test(c),h=Wd(c,T);c=h.to;let p=Tp(c,{relative:r}),[w,N,k]=ay(a,g),C=fy(c,{replace:o,state:l,target:u,preventScrollReset:m,relative:r,viewTransition:d,unstable_defaultShouldRevalidate:y,unstable_useTransitions:b});function A(j){t&&t(j),j.defaultPrevented||C(j)}let M=x.createElement("a",{...g,...k,href:h.absoluteURL||p,onClick:h.isExternal||i?t:A,ref:sy(v,N),target:u,"data-discover":!f&&n==="render"?"true":void 0});return w&&!f?x.createElement(x.Fragment,null,M,x.createElement(ry,{page:p})):M});$.displayName="Link";var cy=x.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:a="",end:r=!1,style:i,to:o,viewTransition:l,children:u,...c},m){let d=ja(o,{relative:c.relative}),y=ze(),g=x.useContext(si),{navigator:v,basename:T}=x.useContext(ke),b=g!=null&&vy(d)&&l===!0,f=v.encodeLocation?v.encodeLocation(d).pathname:d.pathname,h=y.pathname,p=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;n||(h=h.toLowerCase(),p=p?p.toLowerCase():null,f=f.toLowerCase()),p&&T&&(p=st(p,T)||p);const w=f!=="/"&&f.endsWith("/")?f.length-1:f.length;let N=h===f||!r&&h.startsWith(f)&&h.charAt(w)==="/",k=p!=null&&(p===f||!r&&p.startsWith(f)&&p.charAt(f.length)==="/"),C={isActive:N,isPending:k,isTransitioning:b},A=N?t:void 0,M;typeof a=="function"?M=a(C):M=[a,N?"active":null,k?"pending":null,b?"transitioning":null].filter(Boolean).join(" ");let j=typeof i=="function"?i(C):i;return x.createElement($,{...c,"aria-current":A,className:M,ref:m,style:j,to:o,viewTransition:l},typeof u=="function"?u(C):u)});cy.displayName="NavLink";var dy=x.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:a,replace:r,state:i,method:o=fr,action:l,onSubmit:u,relative:c,preventScrollReset:m,viewTransition:d,unstable_defaultShouldRevalidate:y,...g},v)=>{let{unstable_useTransitions:T}=x.useContext(ke),b=gy(),f=xy(l,{relative:c}),h=o.toLowerCase()==="get"?"get":"post",p=typeof l=="string"&&Zd.test(l),w=N=>{if(u&&u(N),N.defaultPrevented)return;N.preventDefault();let k=N.nativeEvent.submitter,C=(k==null?void 0:k.getAttribute("formmethod"))||o,A=()=>b(k||N.currentTarget,{fetcherKey:t,method:C,navigate:n,replace:r,state:i,relative:c,preventScrollReset:m,viewTransition:d,unstable_defaultShouldRevalidate:y});T&&n!==!1?x.startTransition(()=>A()):A()};return x.createElement("form",{ref:v,method:h,action:f,onSubmit:a?u:w,...g,"data-discover":!p&&e==="render"?"true":void 0})});dy.displayName="Form";function hy(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function eh(e){let t=x.useContext(In);return W(t,hy(e)),t}function fy(e,{target:t,replace:n,state:a,preventScrollReset:r,relative:i,viewTransition:o,unstable_defaultShouldRevalidate:l,unstable_useTransitions:u}={}){let c=li(),m=ze(),d=ja(e,{relative:i});return x.useCallback(y=>{if(zp(y,t)){y.preventDefault();let g=n!==void 0?n:Sa(m)===Sa(d),v=()=>c(e,{replace:g,state:a,preventScrollReset:r,relative:i,viewTransition:o,unstable_defaultShouldRevalidate:l});u?x.startTransition(()=>v()):v()}},[m,c,d,n,a,t,e,r,i,o,l,u])}function my(e){Fe(typeof URLSearchParams<"u","You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=x.useRef(zo(e)),n=x.useRef(!1),a=ze(),r=x.useMemo(()=>$p(a.search,n.current?null:t.current),[a.search]),i=li(),o=x.useCallback((l,u)=>{const c=zo(typeof l=="function"?l(new URLSearchParams(r)):l);n.current=!0,i("?"+c,u)},[i,r]);return[r,o]}var py=0,yy=()=>`__${String(++py)}__`;function gy(){let{router:e}=eh("useSubmit"),{basename:t}=x.useContext(ke),n=Pp(),a=e.fetch,r=e.navigate;return x.useCallback(async(i,o={})=>{let{action:l,method:u,encType:c,formData:m,body:d}=Kp(i,t);if(o.navigate===!1){let y=o.fetcherKey||yy();await a(y,n,o.action||l,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:m,body:d,formMethod:o.method||u,formEncType:o.encType||c,flushSync:o.flushSync})}else await r(o.action||l,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:m,body:d,formMethod:o.method||u,formEncType:o.encType||c,replace:o.replace,state:o.state,fromRouteId:n,flushSync:o.flushSync,viewTransition:o.viewTransition})},[a,r,t,n])}function xy(e,{relative:t}={}){let{basename:n}=x.useContext(ke),a=x.useContext(We);W(a,"useFormAction must be used inside a RouteContext");let[r]=a.matches.slice(-1),i={...ja(e||".",{relative:t})},o=ze();if(e==null){i.search=o.search;let l=new URLSearchParams(i.search),u=l.getAll("index");if(u.some(m=>m==="")){l.delete("index"),u.filter(d=>d).forEach(d=>l.append("index",d));let m=l.toString();i.search=m?`?${m}`:""}}return(!e||e===".")&&r.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(i.pathname=i.pathname==="/"?n:nt([n,i.pathname])),Sa(i)}function vy(e,{relative:t}={}){let n=x.useContext($d);W(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=eh("useViewTransitionState"),r=ja(e,{relative:t});if(!n.isTransitioning)return!1;let i=st(n.currentLocation.pathname,a)||n.currentLocation.pathname,o=st(n.nextLocation.pathname,a)||n.nextLocation.pathname;return Wr(r.pathname,o)!=null||Wr(r.pathname,i)!=null}var Ty=typeof Element<"u",wy=typeof Map=="function",by=typeof Set=="function",Sy=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function pr(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,a,r;if(Array.isArray(e)){if(n=e.length,n!=t.length)return!1;for(a=n;a--!==0;)if(!pr(e[a],t[a]))return!1;return!0}var i;if(wy&&e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(i=e.entries();!(a=i.next()).done;)if(!t.has(a.value[0]))return!1;for(i=e.entries();!(a=i.next()).done;)if(!pr(a.value[1],t.get(a.value[0])))return!1;return!0}if(by&&e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(i=e.entries();!(a=i.next()).done;)if(!t.has(a.value[0]))return!1;return!0}if(Sy&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if(n=e.length,n!=t.length)return!1;for(a=n;a--!==0;)if(e[a]!==t[a])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf&&typeof e.valueOf=="function"&&typeof t.valueOf=="function")return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString&&typeof e.toString=="function"&&typeof t.toString=="function")return e.toString()===t.toString();if(r=Object.keys(e),n=r.length,n!==Object.keys(t).length)return!1;for(a=n;a--!==0;)if(!Object.prototype.hasOwnProperty.call(t,r[a]))return!1;if(Ty&&e instanceof Element)return!1;for(a=n;a--!==0;)if(!((r[a]==="_owner"||r[a]==="__v"||r[a]==="__o")&&e.$$typeof)&&!pr(e[r[a]],t[r[a]]))return!1;return!0}return e!==e&&t!==t}var Ny=function(t,n){try{return pr(t,n)}catch(a){if((a.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw a}};const ky=$r(Ny);var Cy=function(e,t,n,a,r,i,o,l){if(!e){var u;if(t===void 0)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,a,r,i,o,l],m=0;u=new Error(t.replace(/%s/g,function(){return c[m++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}},Ry=Cy;const fu=$r(Ry);var Ey=function(t,n,a,r){var i=a?a.call(r,t,n):void 0;if(i!==void 0)return!!i;if(t===n)return!0;if(typeof t!="object"||!t||typeof n!="object"||!n)return!1;var o=Object.keys(t),l=Object.keys(n);if(o.length!==l.length)return!1;for(var u=Object.prototype.hasOwnProperty.bind(n),c=0;c<o.length;c++){var m=o[c];if(!u(m))return!1;var d=t[m],y=n[m];if(i=a?a.call(r,d,y,m):void 0,i===!1||i===void 0&&d!==y)return!1}return!0};const Ay=$r(Ey);var th=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(th||{}),Wi={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},mu=Object.values(th),Qs={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},Iy=Object.entries(Qs).reduce((e,[t,n])=>(e[n]=t,e),{}),_e="data-rh",pn={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},yn=(e,t)=>{for(let n=e.length-1;n>=0;n-=1){const a=e[n];if(Object.prototype.hasOwnProperty.call(a,t))return a[t]}return null},jy=e=>{let t=yn(e,"title");const n=yn(e,pn.TITLE_TEMPLATE);if(Array.isArray(t)&&(t=t.join("")),n&&t)return n.replace(/%s/g,()=>t);const a=yn(e,pn.DEFAULT_TITLE);return t||a||void 0},Py=e=>yn(e,pn.ON_CHANGE_CLIENT_STATE)||(()=>{}),zi=(e,t)=>t.filter(n=>typeof n[e]<"u").map(n=>n[e]).reduce((n,a)=>({...n,...a}),{}),Fy=(e,t)=>t.filter(n=>typeof n.base<"u").map(n=>n.base).reverse().reduce((n,a)=>{if(!n.length){const r=Object.keys(a);for(let i=0;i<r.length;i+=1){const l=r[i].toLowerCase();if(e.indexOf(l)!==-1&&a[l])return n.concat(a)}}return n},[]),Ly=e=>console&&typeof console.warn=="function"&&console.warn(e),zn=(e,t,n)=>{const a={};return n.filter(r=>Array.isArray(r[e])?!0:(typeof r[e]<"u"&&Ly(`Helmet: ${e} should be of type "Array". Instead found type "${typeof r[e]}"`),!1)).map(r=>r[e]).reverse().reduce((r,i)=>{const o={};i.filter(u=>{let c;const m=Object.keys(u);for(let y=0;y<m.length;y+=1){const g=m[y],v=g.toLowerCase();t.indexOf(v)!==-1&&!(c==="rel"&&u[c].toLowerCase()==="canonical")&&!(v==="rel"&&u[v].toLowerCase()==="stylesheet")&&(c=v),t.indexOf(g)!==-1&&(g==="innerHTML"||g==="cssText"||g==="itemprop")&&(c=g)}if(!c||!u[c])return!1;const d=u[c].toLowerCase();return a[c]||(a[c]={}),o[c]||(o[c]={}),a[c][d]?!1:(o[c][d]=!0,!0)}).reverse().forEach(u=>r.push(u));const l=Object.keys(o);for(let u=0;u<l.length;u+=1){const c=l[u],m={...a[c],...o[c]};a[c]=m}return r},[]).reverse()},Dy=(e,t)=>{if(Array.isArray(e)&&e.length){for(let n=0;n<e.length;n+=1)if(e[n][t])return!0}return!1},My=e=>({baseTag:Fy(["href"],e),bodyAttributes:zi("bodyAttributes",e),defer:yn(e,pn.DEFER),encode:yn(e,pn.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:zi("htmlAttributes",e),linkTags:zn("link",["rel","href"],e),metaTags:zn("meta",["name","charset","http-equiv","property","itemprop"],e),noscriptTags:zn("noscript",["innerHTML"],e),onChangeClientState:Py(e),scriptTags:zn("script",["src","innerHTML"],e),styleTags:zn("style",["cssText"],e),title:jy(e),titleAttributes:zi("titleAttributes",e),prioritizeSeoTags:Dy(e,pn.PRIORITIZE_SEO_TAGS)}),nh=e=>Array.isArray(e)?e.join(""):e,Oy=(e,t)=>{const n=Object.keys(e);for(let a=0;a<n.length;a+=1)if(t[n[a]]&&t[n[a]].includes(e[n[a]]))return!0;return!1},$i=(e,t)=>Array.isArray(e)?e.reduce((n,a)=>(Oy(a,t)?n.priority.push(a):n.default.push(a),n),{priority:[],default:[]}):{default:e,priority:[]},pu=(e,t)=>({...e,[t]:void 0}),_y=["noscript","script","style"],$o=(e,t=!0)=>t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),ah=e=>Object.keys(e).reduce((t,n)=>{const a=typeof e[n]<"u"?`${n}="${e[n]}"`:`${n}`;return t?`${t} ${a}`:a},""),Uy=(e,t,n,a)=>{const r=ah(n),i=nh(t);return r?`<${e} ${_e}="true" ${r}>${$o(i,a)}</${e}>`:`<${e} ${_e}="true">${$o(i,a)}</${e}>`},Hy=(e,t,n=!0)=>t.reduce((a,r)=>{const i=r,o=Object.keys(i).filter(c=>!(c==="innerHTML"||c==="cssText")).reduce((c,m)=>{const d=typeof i[m]>"u"?m:`${m}="${$o(i[m],n)}"`;return c?`${c} ${d}`:d},""),l=i.innerHTML||i.cssText||"",u=_y.indexOf(e)===-1;return`${a}<${e} ${_e}="true" ${o}${u?"/>":`>${l}</${e}>`}`},""),rh=(e,t={})=>Object.keys(e).reduce((n,a)=>{const r=Qs[a];return n[r||a]=e[a],n},t),By=(e,t,n)=>{const a={key:t,[_e]:!0},r=rh(n,a);return[Ke.createElement("title",r,t)]},yr=(e,t)=>t.map((n,a)=>{const r={key:a,[_e]:!0};return Object.keys(n).forEach(i=>{const l=Qs[i]||i;if(l==="innerHTML"||l==="cssText"){const u=n.innerHTML||n.cssText;r.dangerouslySetInnerHTML={__html:u}}else r[l]=n[i]}),Ke.createElement(e,r)}),Ce=(e,t,n=!0)=>{switch(e){case"title":return{toComponent:()=>By(e,t.title,t.titleAttributes),toString:()=>Uy(e,t.title,t.titleAttributes,n)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>rh(t),toString:()=>ah(t)};default:return{toComponent:()=>yr(e,t),toString:()=>Hy(e,t,n)}}},Wy=({metaTags:e,linkTags:t,scriptTags:n,encode:a})=>{const r=$i(e,Wi.meta),i=$i(t,Wi.link),o=$i(n,Wi.script);return{priorityMethods:{toComponent:()=>[...yr("meta",r.priority),...yr("link",i.priority),...yr("script",o.priority)],toString:()=>`${Ce("meta",r.priority,a)} ${Ce("link",i.priority,a)} ${Ce("script",o.priority,a)}`},metaTags:r.default,linkTags:i.default,scriptTags:o.default}},zy=e=>{const{baseTag:t,bodyAttributes:n,encode:a=!0,htmlAttributes:r,noscriptTags:i,styleTags:o,title:l="",titleAttributes:u,prioritizeSeoTags:c}=e;let{linkTags:m,metaTags:d,scriptTags:y}=e,g={toComponent:()=>{},toString:()=>""};return c&&({priorityMethods:g,linkTags:m,metaTags:d,scriptTags:y}=Wy(e)),{priority:g,base:Ce("base",t,a),bodyAttributes:Ce("bodyAttributes",n,a),htmlAttributes:Ce("htmlAttributes",r,a),link:Ce("link",m,a),meta:Ce("meta",d,a),noscript:Ce("noscript",i,a),script:Ce("script",y,a),style:Ce("style",o,a),title:Ce("title",{title:l,titleAttributes:u},a)}},Vo=zy,Ja=[],ih=!!(typeof window<"u"&&window.document&&window.document.createElement),Yo=class{constructor(e,t){Qe(this,"instances",[]);Qe(this,"canUseDOM",ih);Qe(this,"context");Qe(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?Ja:this.instances,add:e=>{(this.canUseDOM?Ja:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?Ja:this.instances).indexOf(e);(this.canUseDOM?Ja:this.instances).splice(t,1)}}});this.context=e,this.canUseDOM=t||!1,t||(e.helmet=Vo({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},$y={},oh=Ke.createContext($y),Ot,sh=(Ot=class extends x.Component{constructor(n){super(n);Qe(this,"helmetData");this.helmetData=new Yo(this.props.context||{},Ot.canUseDOM)}render(){return Ke.createElement(oh.Provider,{value:this.helmetData.value},this.props.children)}},Qe(Ot,"canUseDOM",ih),Ot),Gt=(e,t)=>{const n=document.head||document.querySelector("head"),a=n.querySelectorAll(`${e}[${_e}]`),r=[].slice.call(a),i=[];let o;return t&&t.length&&t.forEach(l=>{const u=document.createElement(e);for(const c in l)if(Object.prototype.hasOwnProperty.call(l,c))if(c==="innerHTML")u.innerHTML=l.innerHTML;else if(c==="cssText")u.styleSheet?u.styleSheet.cssText=l.cssText:u.appendChild(document.createTextNode(l.cssText));else{const m=c,d=typeof l[m]>"u"?"":l[m];u.setAttribute(c,d)}u.setAttribute(_e,"true"),r.some((c,m)=>(o=m,u.isEqualNode(c)))?r.splice(o,1):i.push(u)}),r.forEach(l=>{var u;return(u=l.parentNode)==null?void 0:u.removeChild(l)}),i.forEach(l=>n.appendChild(l)),{oldTags:r,newTags:i}},Ko=(e,t)=>{const n=document.getElementsByTagName(e)[0];if(!n)return;const a=n.getAttribute(_e),r=a?a.split(","):[],i=[...r],o=Object.keys(t);for(const l of o){const u=t[l]||"";n.getAttribute(l)!==u&&n.setAttribute(l,u),r.indexOf(l)===-1&&r.push(l);const c=i.indexOf(l);c!==-1&&i.splice(c,1)}for(let l=i.length-1;l>=0;l-=1)n.removeAttribute(i[l]);r.length===i.length?n.removeAttribute(_e):n.getAttribute(_e)!==o.join(",")&&n.setAttribute(_e,o.join(","))},Vy=(e,t)=>{typeof e<"u"&&document.title!==e&&(document.title=nh(e)),Ko("title",t)},yu=(e,t)=>{const{baseTag:n,bodyAttributes:a,htmlAttributes:r,linkTags:i,metaTags:o,noscriptTags:l,onChangeClientState:u,scriptTags:c,styleTags:m,title:d,titleAttributes:y}=e;Ko("body",a),Ko("html",r),Vy(d,y);const g={baseTag:Gt("base",n),linkTags:Gt("link",i),metaTags:Gt("meta",o),noscriptTags:Gt("noscript",l),scriptTags:Gt("script",c),styleTags:Gt("style",m)},v={},T={};Object.keys(g).forEach(b=>{const{newTags:f,oldTags:h}=g[b];f.length&&(v[b]=f),h.length&&(T[b]=g[b].oldTags)}),t&&t(),u(e,v,T)},$n=null,Yy=e=>{$n&&cancelAnimationFrame($n),e.defer?$n=requestAnimationFrame(()=>{yu(e,()=>{$n=null})}):(yu(e),$n=null)},Ky=Yy,gu=class extends x.Component{constructor(){super(...arguments);Qe(this,"rendered",!1)}shouldComponentUpdate(t){return!Ay(t,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:t}=this.props.context;t.remove(this),this.emitChange()}emitChange(){const{helmetInstances:t,setHelmet:n}=this.props.context;let a=null;const r=My(t.get().map(i=>{const o={...i.props};return delete o.context,o}));sh.canUseDOM?Ky(r):Vo&&(a=Vo(r)),n(a)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:t}=this.props.context;t.add(this),this.emitChange()}render(){return this.init(),null}},Ki,Kt=(Ki=class extends x.Component{shouldComponentUpdate(e){return!ky(pu(this.props,"helmetData"),pu(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null;switch(e.type){case"script":case"noscript":return{innerHTML:t};case"style":return{cssText:t};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,t,n,a){return{...t,[e.type]:[...t[e.type]||[],{...n,...this.mapNestedChildrenToProps(e,a)}]}}mapObjectTypeChildren(e,t,n,a){switch(e.type){case"title":return{...t,[e.type]:a,titleAttributes:{...n}};case"body":return{...t,bodyAttributes:{...n}};case"html":return{...t,htmlAttributes:{...n}};default:return{...t,[e.type]:{...n}}}}mapArrayTypeChildrenToProps(e,t){let n={...t};return Object.keys(e).forEach(a=>{n={...n,[a]:e[a]}}),n}warnOnInvalidChildren(e,t){return fu(mu.some(n=>e.type===n),typeof e.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${mu.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),fu(!t||typeof t=="string"||Array.isArray(t)&&!t.some(n=>typeof n!="string"),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,t){let n={};return Ke.Children.forEach(e,a=>{if(!a||!a.props)return;const{children:r,...i}=a.props,o=Object.keys(i).reduce((u,c)=>(u[Iy[c]||c]=i[c],u),{});let{type:l}=a;switch(typeof l=="symbol"?l=l.toString():this.warnOnInvalidChildren(a,r),l){case"Symbol(react.fragment)":t=this.mapChildrenToProps(r,t);break;case"link":case"meta":case"noscript":case"script":case"style":n=this.flattenArrayTypeChildren(a,n,o,r);break;default:t=this.mapObjectTypeChildren(a,t,o,r);break}}),this.mapArrayTypeChildrenToProps(n,t)}render(){const{children:e,...t}=this.props;let n={...t},{helmetData:a}=t;if(e&&(n=this.mapChildrenToProps(e,n)),a&&!(a instanceof Yo)){const r=a;a=new Yo(r.context,!0),delete n.helmetData}return a?Ke.createElement(gu,{...n,context:a.value}):Ke.createElement(oh.Consumer,null,r=>Ke.createElement(gu,{...n,context:r}))}},Qe(Ki,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),Ki);const qy="modulepreload",Gy=function(e){return"/"+e},xu={},Qy=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));r=Promise.allSettled(n.map(u=>{if(u=Gy(u),u in xu)return;xu[u]=!0;const c=u.endsWith(".css"),m=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${m}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":qy,c||(d.as="script"),d.crossOrigin="",d.href=u,l&&d.setAttribute("nonce",l),document.head.appendChild(d),c)return new Promise((y,g)=>{d.addEventListener("load",y),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return r.then(o=>{for(const l of o||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})},Xy=()=>{const[e,t]=x.useState(!1),[n,a]=x.useState(!1),[r,i]=x.useState(""),o=ze(),l=li(),u=x.useRef(null);if(x.useEffect(()=>{var g;n&&((g=u.current)==null||g.focus())},[n]),x.useEffect(()=>{if(!n)return;const g=v=>{v.key==="Escape"&&(a(!1),i(""))};return document.addEventListener("keydown",g),()=>document.removeEventListener("keydown",g)},[n]),o.pathname==="/annual-tax"||o.pathname==="/monthly-withholding")return null;const m=[{path:"/",label:"Calculator"},{path:"/articles/",label:"Articles"},{path:"/faq/",label:"FAQ"}],d=g=>g==="/"?o.pathname==="/":o.pathname.startsWith(g.replace(/\/$/,"")),y=g=>{g.preventDefault();const v=r.trim();v&&(l(`/search?q=${encodeURIComponent(v)}`),a(!1),i(""),t(!1))};return s.jsx("header",{className:"bg-white shadow-sm sticky top-0 z-50",children:s.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[s.jsxs("div",{className:"flex items-center justify-between h-16",children:[s.jsx($,{to:"/",className:"flex items-center gap-2 shrink-0",children:s.jsx("span",{className:"text-xl font-bold text-blue-500",children:"Thai Tax Calculator"})}),s.jsx("div",{className:"hidden md:flex items-center gap-6",children:n?s.jsxs("form",{onSubmit:y,className:"flex items-center gap-2",children:[s.jsx("input",{ref:u,type:"text",value:r,onChange:g=>i(g.target.value),placeholder:"Search articles and FAQs...",className:"w-72 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors text-sm"}),s.jsx("button",{type:"submit",className:"text-blue-500 hover:text-blue-700 font-medium text-sm whitespace-nowrap",children:"Search"}),s.jsx("button",{type:"button",onClick:()=>{a(!1),i("")},"aria-label":"Close search",className:"text-gray-400 hover:text-gray-600",children:s.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}):s.jsxs(s.Fragment,{children:[s.jsx("nav",{className:"flex items-center gap-6",children:m.map(g=>s.jsx($,{to:g.path,className:`font-medium transition-colors ${d(g.path)?"text-blue-500":"text-gray-600 hover:text-blue-500"}`,children:g.label},g.path))}),s.jsx("button",{onClick:()=>a(!0),"aria-label":"Search",className:"text-gray-500 hover:text-blue-500 transition-colors",children:s.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})})]})}),s.jsx("button",{className:"md:hidden p-2 text-gray-600 hover:text-gray-900",onClick:()=>t(!e),"aria-label":e?"Close menu":"Open menu","aria-expanded":e,children:e?s.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}):s.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})})]}),e&&s.jsx("nav",{className:"md:hidden py-4 border-t border-gray-100",children:s.jsxs("div",{className:"flex flex-col gap-2",children:[s.jsx("form",{onSubmit:y,className:"px-4 mb-2",children:s.jsxs("div",{className:"relative",children:[s.jsx("input",{type:"text",value:r,onChange:g=>i(g.target.value),placeholder:"Search articles and FAQs...",className:"w-full px-4 py-2 pl-9 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"}),s.jsx("svg",{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})]})}),m.map(g=>s.jsx($,{to:g.path,onClick:()=>t(!1),className:`py-2 px-4 rounded-lg font-medium transition-colors ${d(g.path)?"bg-blue-50 text-blue-500":"text-gray-600 hover:bg-gray-50"}`,children:g.label},g.path))]})})]})})},Jy=()=>{const e=ze();return e.pathname==="/annual-tax"||e.pathname==="/monthly-withholding"?null:s.jsx("footer",{className:"bg-gray-50 border-t border-gray-200",children:s.jsxs("div",{className:"max-w-6xl mx-auto px-4 py-8",children:[s.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center gap-4",children:[s.jsxs("div",{className:"text-gray-600 text-sm",children:[new Date().getFullYear()," Thai Tax Calculator. For informational purposes only."]}),s.jsxs("nav",{className:"flex gap-6 text-sm",children:[s.jsx($,{to:"/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Calculator"}),s.jsx($,{to:"/articles/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Articles"}),s.jsx($,{to:"/faq/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"FAQ"})]})]}),s.jsx("div",{className:"mt-4 text-center text-xs text-gray-500",children:"This calculator provides estimates only. Consult a qualified tax professional for official advice."})]})})},Zy=({children:e})=>s.jsxs("div",{className:"min-h-screen flex flex-col bg-gray-100",children:[s.jsx(Xy,{}),s.jsx("main",{className:"flex-grow",children:e}),s.jsx(Jy,{})]}),eg=[{value:"basic",label:"Basic Estimate",description:"Quick calculation without deductions",icon:"⚡"},{value:"detailed",label:"Detailed Estimate",description:"Include deductions for a more accurate result",icon:"📋"}],tg=({formData:e,setFormData:t,nextStep:n})=>{const a=r=>{t({...e,estimateType:r}),n()};return s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Choose your estimate type"}),s.jsx("p",{className:"text-gray-600 mb-6",children:"You can choose a quick estimate without deductions, or a more detailed estimate where deductions are included."}),s.jsx("div",{className:"space-y-4",children:eg.map(r=>s.jsx("button",{onClick:()=>a(r.value),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.estimateType===r.value?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.estimateType===r.value,children:s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx("span",{className:"text-3xl",children:r.icon}),s.jsxs("div",{children:[s.jsx("h3",{className:"font-semibold text-gray-800",children:r.label}),s.jsx("p",{className:"text-sm text-gray-500",children:r.description})]})]})},r.value))})]})},ng=[{value:"fixed",label:"Fixed Monthly Income",description:"Same salary every month",icon:"📅"},{value:"variable",label:"Variable Monthly Income",description:"Different income each month (bonuses, allowances, etc.)",icon:"📊"}],ag=({formData:e,setFormData:t,nextStep:n})=>{const a=r=>{t({...e,incomeType:r}),n()};return s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"How do you receive your income?"}),s.jsx("p",{className:"text-gray-600 mb-6",children:"Choose based on whether your monthly income is consistent or varies throughout the year."}),s.jsx("div",{className:"space-y-4",children:ng.map(r=>s.jsx("button",{onClick:()=>a(r.value),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.incomeType===r.value?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.incomeType===r.value,children:s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx("span",{className:"text-3xl",children:r.icon}),s.jsxs("div",{children:[s.jsx("h3",{className:"font-semibold text-gray-800",children:r.label}),s.jsx("p",{className:"text-sm text-gray-500",children:r.description})]})]})},r.value))})]})},I={STANDARD_DEDUCTION_RATE:.5,MAX_STANDARD_DEDUCTION:1e5,MAX_SOCIAL_SECURITY:10500,PERSONAL_ALLOWANCE:6e4,SPOUSE_ALLOWANCE:6e4,SENIOR_ALLOWANCE:19e4,CHILD_ALLOWANCE_BASE:3e4,CHILD_ALLOWANCE_BONUS:3e4,CHILD_BONUS_BIRTH_YEAR:2018,PARENT_ALLOWANCE:3e4,MAX_PARENTS:4,MAX_LIFE_INSURANCE:1e5,MAX_HEALTH_INSURANCE:25e3,MAX_PENSION_FUND:5e5,MAX_PROVIDENT_FUND:5e5,MAX_RMF:5e5,MAX_SSF:2e5,MAX_DONATION_PERCENT:.1},Qn={STANDARD_DEDUCTION_RATE:.5,MAX_STANDARD_DEDUCTION:1e5,MAX_SOCIAL_SECURITY:9e3,PERSONAL_ALLOWANCE:6e4,SPOUSE_ALLOWANCE:6e4,SENIOR_ALLOWANCE:19e4,CHILD_ALLOWANCE_BASE:3e4,CHILD_ALLOWANCE_BONUS:3e4,PARENT_ALLOWANCE:3e4,MAX_PARENTS:4,MAX_LIFE_INSURANCE:1e5,MAX_HEALTH_INSURANCE:25e3,MAX_PENSION_FUND:5e5,MAX_PROVIDENT_FUND:5e5,MAX_RMF:5e5,MAX_SSF:2e5,MAX_DONATION_PERCENT:.1,CHILD_BONUS_BIRTH_YEAR:2018},rg=[{upTo:15e4,rate:0,label:"0-150k"},{upTo:3e5,rate:.05,label:"150k-300k"},{upTo:5e5,rate:.1,label:"300k-500k"},{upTo:75e4,rate:.15,label:"500k-750k"},{upTo:1e6,rate:.2,label:"750k-1M"},{upTo:2e6,rate:.25,label:"1M-2M"},{upTo:5e6,rate:.3,label:"2M-5M"},{upTo:1/0,rate:.35,label:"5M+"}],ig=({formData:e,setFormData:t})=>{const[n,a]=x.useState(e.monthlySalary?e.monthlySalary.toString():""),[r,i]=x.useState(e.annualBonus?e.annualBonus.toString():""),[o,l]=x.useState(e.annualOtherIncome?e.annualOtherIncome.toString():""),[u,c]=x.useState(e.includeSocialSecurity||!1),[m,d]=x.useState(e.socialSecurityContribution?e.socialSecurityContribution.toString():"");x.useEffect(()=>{const f=parseFloat(n.replace(/,/g,""))||0,h=parseFloat(r.replace(/,/g,""))||0,p=parseFloat(o.replace(/,/g,""))||0,w=u?Math.min(parseFloat(m.replace(/,/g,""))||0,I.MAX_SOCIAL_SECURITY):0;t({...e,monthlySalary:f,annualBonus:h,annualOtherIncome:p,includeSocialSecurity:u,socialSecurityContribution:w})},[n,r,o,u,m]);const y=f=>{const h=f.target.value.replace(/[^0-9]/g,"");a(h)},g=f=>{const h=f.target.value.replace(/[^0-9]/g,"");i(h)},v=f=>{const h=f.target.value.replace(/[^0-9]/g,"");l(h)},T=f=>{const h=f.target.value.replace(/[^0-9]/g,"");(parseInt(h)||0)<=I.MAX_SOCIAL_SECURITY&&d(h)},b=f=>{const h=parseInt(f.replace(/,/g,""))||0;return h>0?h.toLocaleString():""};return s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4",children:"Assessable Income"}),s.jsx("p",{className:"text-gray-600 mb-6",children:"Enter your income details below. Include your regular monthly salary, plus any bonus or other income you expect to receive this year."}),s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Salary per month (THB)"}),s.jsxs("div",{className:"relative",children:[s.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),s.jsx("input",{type:"text",value:b(n),onChange:y,className:"w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]})]}),s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Bonus per year (THB)"}),s.jsxs("div",{className:"relative",children:[s.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),s.jsx("input",{type:"text",value:b(r),onChange:g,className:"w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]}),s.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Expected annual bonus amount"})]}),s.jsxs("div",{className:"mb-6",children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Other income per year (THB)"}),s.jsxs("div",{className:"relative",children:[s.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),s.jsx("input",{type:"text",value:b(o),onChange:v,className:"w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]}),s.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Housing allowance, overtime, commissions, etc."})]}),s.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[s.jsxs("label",{className:"flex items-start gap-3 cursor-pointer",children:[s.jsx("input",{type:"checkbox",checked:u,onChange:f=>c(f.target.checked),className:"mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),s.jsxs("div",{children:[s.jsx("span",{className:"font-medium text-gray-800",children:"Include Social Security Contributions"}),s.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Social security contributions are tax-deductible up to ฿10,500 per year (2026 limit)."})]})]}),u&&s.jsxs("div",{className:"mt-4 ml-8",children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Estimated annual contribution (THB)"}),s.jsxs("div",{className:"relative",children:[s.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),s.jsx("input",{type:"text",value:b(m),onChange:T,className:"w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]}),s.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Maximum: ฿",I.MAX_SOCIAL_SECURITY.toLocaleString()," per year"]})]})]})]})},og=["January","February","March","April","May","June","July","August","September","October","November","December"],sg=()=>({salary:0,bonus:0,housingAllowance:0,otherIncome:0}),lg=({formData:e,setFormData:t})=>{var T;const[n,a]=x.useState(((T=e.variableIncome)==null?void 0:T.length)===12?e.variableIncome:Array(12).fill(null).map(()=>sg())),[r,i]=x.useState(e.includeSocialSecurity||!1),[o,l]=x.useState(e.socialSecurityContribution?e.socialSecurityContribution.toString():""),[u,c]=x.useState(null);x.useEffect(()=>{const b=r?Math.min(parseFloat(o.replace(/,/g,""))||0,I.MAX_SOCIAL_SECURITY):0;t({...e,variableIncome:n,includeSocialSecurity:r,socialSecurityContribution:b})},[n,r,o]);const m=(b,f,h)=>{const p=parseFloat(h.replace(/[^0-9]/g,""))||0,w=[...n];w[b]={...w[b],[f]:p},a(w)},d=b=>{const f=b.target.value.replace(/[^0-9]/g,"");(parseInt(f)||0)<=I.MAX_SOCIAL_SECURITY&&l(f)},y=b=>b.salary+b.bonus+b.housingAllowance+b.otherIncome,g=()=>n.reduce((b,f)=>b+y(f),0),v=b=>b>0?b.toLocaleString():"";return s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Enter your monthly income"}),s.jsx("p",{className:"text-gray-600 mb-4",children:"Enter your income for each month. All taxable income including bonuses and housing allowances by the company should be included."}),s.jsx("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6",children:s.jsxs("div",{className:"flex justify-between items-center",children:[s.jsx("span",{className:"text-sm text-blue-700",children:"Total Annual Income"}),s.jsxs("span",{className:"text-xl font-bold text-blue-700",children:["฿",g().toLocaleString()]})]})}),s.jsx("div",{className:"space-y-2 mb-6 max-h-80 overflow-y-auto",children:og.map((b,f)=>s.jsxs("div",{className:"border border-gray-200 rounded-lg overflow-hidden",children:[s.jsxs("button",{onClick:()=>c(u===f?null:f),className:"w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100",children:[s.jsx("span",{className:"font-medium text-gray-800",children:b}),s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsxs("span",{className:"text-gray-600",children:["฿",y(n[f]).toLocaleString()]}),s.jsx("span",{className:"text-gray-400",children:u===f?"▲":"▼"})]})]}),u===f&&s.jsxs("div",{className:"p-4 space-y-3 bg-white",children:[s.jsxs("div",{children:[s.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Salary"}),s.jsxs("div",{className:"relative",children:[s.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),s.jsx("input",{type:"text",value:v(n[f].salary),onChange:h=>m(f,"salary",h.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]}),s.jsxs("div",{children:[s.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Bonus"}),s.jsxs("div",{className:"relative",children:[s.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),s.jsx("input",{type:"text",value:v(n[f].bonus),onChange:h=>m(f,"bonus",h.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]}),s.jsxs("div",{children:[s.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Housing Allowance"}),s.jsxs("div",{className:"relative",children:[s.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),s.jsx("input",{type:"text",value:v(n[f].housingAllowance),onChange:h=>m(f,"housingAllowance",h.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]}),s.jsxs("div",{children:[s.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Other Taxable Income"}),s.jsxs("div",{className:"relative",children:[s.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),s.jsx("input",{type:"text",value:v(n[f].otherIncome),onChange:h=>m(f,"otherIncome",h.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]})]})]},b))}),s.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[s.jsxs("label",{className:"flex items-start gap-3 cursor-pointer",children:[s.jsx("input",{type:"checkbox",checked:r,onChange:b=>i(b.target.checked),className:"mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),s.jsxs("div",{children:[s.jsx("span",{className:"font-medium text-gray-800",children:"Include Social Security Contributions"}),s.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Social security contributions are tax-deductible up to ฿10,500 per year (2026 limit)."})]})]}),r&&s.jsxs("div",{className:"mt-4 ml-8",children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Estimated annual contribution (THB)"}),s.jsxs("div",{className:"relative",children:[s.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),s.jsx("input",{type:"text",value:o?parseInt(o).toLocaleString():"",onChange:d,className:"w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500",placeholder:"0"})]}),s.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Maximum: ฿",I.MAX_SOCIAL_SECURITY.toLocaleString()," per year"]})]})]})]})},ug=({formData:e,setFormData:t,nextStep:n})=>{const[a,r]=x.useState(e.maritalStatus==="married"),i=l=>{l==="single"?(t({...e,maritalStatus:l,spouseHasNoIncome:!1}),r(!1),n()):(t({...e,maritalStatus:l}),r(!0))},o=l=>{t({...e,spouseHasNoIncome:l})};return s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"What is your marital status?"}),s.jsx("p",{className:"text-gray-600 mb-6",children:"Your marital status affects your tax allowances."}),s.jsxs("div",{className:"space-y-4 mb-6",children:[s.jsx("button",{onClick:()=>i("single"),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.maritalStatus==="single"?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.maritalStatus==="single",children:s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx("span",{className:"text-3xl",children:"👤"}),s.jsxs("div",{children:[s.jsx("h3",{className:"font-semibold text-gray-800",children:"Single"}),s.jsx("p",{className:"text-sm text-gray-500",children:"Not married or legally separated"})]})]})}),s.jsx("button",{onClick:()=>i("married"),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.maritalStatus==="married"?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.maritalStatus==="married",children:s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx("span",{className:"text-3xl",children:"👫"}),s.jsxs("div",{children:[s.jsx("h3",{className:"font-semibold text-gray-800",children:"Married"}),s.jsx("p",{className:"text-sm text-gray-500",children:"Legally married"})]})]})})]}),a&&s.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4",children:[s.jsxs("div",{className:"flex items-start gap-3 mb-4",children:[s.jsx("div",{className:"flex-shrink-0 mt-0.5",children:s.jsx("svg",{className:"h-5 w-5 text-blue-500",viewBox:"0 0 20 20",fill:"currentColor",children:s.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})})}),s.jsxs("p",{className:"text-sm text-blue-700",children:["You can claim a ฿",I.SPOUSE_ALLOWANCE.toLocaleString()," spouse allowance only if your spouse has no income during the tax year."]})]}),s.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[s.jsx("input",{type:"checkbox",checked:e.spouseHasNoIncome,onChange:l=>o(l.target.checked),className:"w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),s.jsx("span",{className:"text-gray-800",children:"My spouse has no income"})]})]})]})},Za=new Date().getFullYear(),cg=({formData:e,setFormData:t,showValidationErrors:n=!1})=>{const[a,r]=x.useState(e.childrenEligibilityConfirmed||e.children.length>0),[i,o]=x.useState(e.parentsEligibilityConfirmed||e.numberOfParents>0),l=f=>Za-f,u=f=>{const h=l(f);return h>=20&&h<=25},c=(f,h)=>{let p=I.CHILD_ALLOWANCE_BASE;return h>=1&&f.birthYear>=I.CHILD_BONUS_BIRTH_YEAR&&(p+=I.CHILD_ALLOWANCE_BONUS),p},m=()=>e.children.reduce((f,h,p)=>f+c(h,p),0),d=()=>{const f=[...e.children,{birthYear:Za-10,isStudent:!1}];t({...e,children:f})},y=()=>{if(e.children.length>0){const f=e.children.slice(0,-1);t({...e,children:f})}},g=(f,h)=>{const p=[...e.children];p[f]={...p[f],birthYear:h},u(h)||(p[f].isStudent=!1),t({...e,children:p})},v=(f,h)=>{const p=[...e.children];p[f]={...p[f],isStudent:h},t({...e,children:p})},T=f=>{const h=Math.max(0,Math.min(I.MAX_PARENTS,e.numberOfParents+f));t({...e,numberOfParents:h})},b=I.PERSONAL_ALLOWANCE+(e.maritalStatus==="married"&&e.spouseHasNoIncome?I.SPOUSE_ALLOWANCE:0)+(e.isAge65OrOlder?I.SENIOR_ALLOWANCE:0)+m()+e.numberOfParents*I.PARENT_ALLOWANCE;return s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Dependents & Allowances"}),s.jsx("p",{className:"text-gray-600 mb-6",children:"Tell us about your dependents to calculate your allowances."}),s.jsxs("div",{className:"mb-6",children:[s.jsx("h3",{className:"text-lg font-semibold text-gray-800 mb-3",children:"Children"}),s.jsxs("div",{className:"bg-gray-50 rounded-lg p-4",children:[s.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm",children:[s.jsx("p",{className:"font-medium text-blue-800 mb-1",children:"Eligibility Criteria:"}),s.jsxs("ul",{className:"text-blue-700 space-y-1",children:[s.jsx("li",{children:"• Under 20 years old, OR under 25 and studying, OR legally incompetent"}),s.jsx("li",{children:"• Earning less than ฿30,000 per year"})]})]}),s.jsxs("label",{className:`flex items-center gap-3 cursor-pointer p-3 border rounded-lg bg-white ${n&&a&&e.children.length===0?"border-red-500":"border-gray-200"}`,children:[s.jsx("input",{type:"checkbox",checked:a,onChange:f=>{r(f.target.checked),f.target.checked?t({...e,childrenEligibilityConfirmed:!0}):t({...e,children:[],childrenEligibilityConfirmed:!1})},className:"w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),s.jsx("span",{className:"text-gray-800",children:"I have children who meet these criteria"})]}),n&&a&&e.children.length===0&&s.jsx("p",{className:"mt-2 text-sm text-red-600",children:"Please add at least one child or uncheck the box above."}),a&&s.jsxs("div",{className:"mt-4",children:[s.jsxs("div",{className:"flex items-center gap-4 mb-4",children:[s.jsx("span",{className:"text-gray-700",children:"Number of children:"}),s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx("button",{onClick:y,disabled:e.children.length===0,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed","aria-label":"Remove child",children:"-"}),s.jsx("span",{className:"w-8 text-center font-medium",children:e.children.length}),s.jsx("button",{onClick:d,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100","aria-label":"Add child",children:"+"})]})]}),e.children.map((f,h)=>{const p=l(f.birthYear),w=u(f.birthYear),N=c(f,h),k=h>=1&&f.birthYear>=I.CHILD_BONUS_BIRTH_YEAR;return s.jsxs("div",{className:"bg-white border border-gray-200 rounded-lg p-3 mb-3",children:[s.jsxs("div",{className:"flex items-center justify-between mb-2",children:[s.jsxs("span",{className:"font-medium text-gray-700",children:["Child ",h+1]}),s.jsxs("span",{className:"text-sm text-green-600 font-medium",children:["฿",N.toLocaleString(),k&&s.jsx("span",{className:"text-xs text-green-500 ml-1",children:"(+฿30k bonus)"})]})]}),s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx("label",{className:"text-sm text-gray-600",children:"Birth year:"}),s.jsx("input",{type:"number",value:f.birthYear,onChange:C=>g(h,parseInt(C.target.value)||Za),min:1900,max:Za,className:"w-24 px-2 py-1 border border-gray-300 rounded text-center"}),s.jsxs("span",{className:"text-sm text-gray-500",children:["Age: ",p]})]}),w&&s.jsxs("label",{className:"flex items-center gap-2 mt-2 cursor-pointer",children:[s.jsx("input",{type:"checkbox",checked:f.isStudent||!1,onChange:C=>v(h,C.target.checked),className:"w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),s.jsx("span",{className:"text-sm text-gray-600",children:"Currently studying (required for ages 20-25)"})]})]},h)}),e.children.length>0&&s.jsxs("div",{className:"text-right text-sm text-gray-600",children:["Total children allowance: ",s.jsxs("span",{className:"font-medium text-green-600",children:["฿",m().toLocaleString()]})]})]})]})]}),s.jsxs("div",{className:"mb-6",children:[s.jsx("h3",{className:"text-lg font-semibold text-gray-800 mb-3",children:"Parents"}),s.jsxs("div",{className:"bg-gray-50 rounded-lg p-4",children:[s.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm",children:[s.jsx("p",{className:"font-medium text-blue-800 mb-1",children:"Eligibility Criteria:"}),s.jsxs("ul",{className:"text-blue-700 space-y-1",children:[s.jsx("li",{children:"• Parent is 60 years or older"}),s.jsx("li",{children:"• Parent's annual income is less than ฿30,000"}),s.jsxs("li",{children:["• You can claim up to ",I.MAX_PARENTS," parents (yours and spouse's)"]})]}),s.jsxs("p",{className:"text-blue-600 mt-2",children:["Allowance: ฿",I.PARENT_ALLOWANCE.toLocaleString()," per eligible parent"]})]}),s.jsxs("label",{className:`flex items-center gap-3 cursor-pointer p-3 border rounded-lg bg-white ${n&&i&&e.numberOfParents===0?"border-red-500":"border-gray-200"}`,children:[s.jsx("input",{type:"checkbox",checked:i,onChange:f=>{o(f.target.checked),f.target.checked?t({...e,parentsEligibilityConfirmed:!0}):t({...e,numberOfParents:0,parentsEligibilityConfirmed:!1})},className:"w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),s.jsx("span",{className:"text-gray-800",children:"I have parents who meet these criteria"})]}),n&&i&&e.numberOfParents===0&&s.jsx("p",{className:"mt-2 text-sm text-red-600",children:"Please add at least one parent or uncheck the box above."}),i&&s.jsx("div",{className:"mt-4",children:s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx("span",{className:"text-gray-700",children:"Number of parents:"}),s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx("button",{onClick:()=>T(-1),disabled:e.numberOfParents===0,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed","aria-label":"Remove parent",children:"-"}),s.jsx("span",{className:"w-8 text-center font-medium",children:e.numberOfParents}),s.jsx("button",{onClick:()=>T(1),disabled:e.numberOfParents>=I.MAX_PARENTS,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed","aria-label":"Add parent",children:"+"})]}),s.jsxs("span",{className:"text-sm text-green-600 font-medium",children:["฿",(e.numberOfParents*I.PARENT_ALLOWANCE).toLocaleString()]})]})})]})]}),s.jsxs("div",{className:"bg-green-50 border border-green-200 rounded-lg p-4",children:[s.jsx("h3",{className:"font-semibold text-green-800 mb-2",children:"Total Allowances"}),s.jsxs("div",{className:"text-sm text-green-700 space-y-1",children:[s.jsxs("div",{className:"flex justify-between",children:[s.jsx("span",{children:"Personal:"}),s.jsxs("span",{children:["฿",I.PERSONAL_ALLOWANCE.toLocaleString()]})]}),e.maritalStatus==="married"&&e.spouseHasNoIncome&&s.jsxs("div",{className:"flex justify-between",children:[s.jsx("span",{children:"Spouse:"}),s.jsxs("span",{children:["฿",I.SPOUSE_ALLOWANCE.toLocaleString()]})]}),e.isAge65OrOlder&&s.jsxs("div",{className:"flex justify-between",children:[s.jsx("span",{children:"Senior (65+):"}),s.jsxs("span",{children:["฿",I.SENIOR_ALLOWANCE.toLocaleString()]})]}),e.children.length>0&&s.jsxs("div",{className:"flex justify-between",children:[s.jsx("span",{children:"Children:"}),s.jsxs("span",{children:["฿",m().toLocaleString()]})]}),e.numberOfParents>0&&s.jsxs("div",{className:"flex justify-between",children:[s.jsx("span",{children:"Parents:"}),s.jsxs("span",{children:["฿",(e.numberOfParents*I.PARENT_ALLOWANCE).toLocaleString()]})]}),s.jsxs("div",{className:"flex justify-between font-semibold border-t border-green-300 pt-1 mt-2",children:[s.jsx("span",{children:"Total:"}),s.jsxs("span",{children:["฿",b.toLocaleString()]})]})]})]})]})},dg=({formData:e,setFormData:t,showValidationErrors:n=!1})=>{const r=(()=>{var d;return e.incomeType==="variable"&&((d=e.variableIncome)==null?void 0:d.length)===12?e.variableIncome.reduce((y,g)=>y+g.salary+g.bonus+g.housingAllowance+g.otherIncome,0):e.monthlySalary*12})(),i=x.useMemo(()=>[{key:"lifeInsurance",hasKey:"hasLifeInsurance",label:"Life Insurance",description:"Life insurance premiums paid during the year",maxValue:I.MAX_LIFE_INSURANCE},{key:"healthInsurance",hasKey:"hasHealthInsurance",label:"Health Insurance",description:"Health insurance premiums paid during the year",maxValue:I.MAX_HEALTH_INSURANCE},{key:"pensionFund",hasKey:"hasPensionFund",label:"Pension Fund",description:"Government pension fund contributions",maxValue:I.MAX_PENSION_FUND},{key:"providentFund",hasKey:"hasProvidentFund",label:"Provident Fund",description:"Private provident fund contributions",maxValue:I.MAX_PROVIDENT_FUND},{key:"rmf",hasKey:"hasRMF",label:"RMF (Retirement Mutual Fund)",description:"RMF investments for retirement",maxValue:I.MAX_RMF},{key:"ssf",hasKey:"hasSSF",label:"SSF (Super Savings Fund)",description:"SSF long-term investments",maxValue:I.MAX_SSF},{key:"donations",hasKey:"hasDonations",label:"Charitable Donations",description:"Donations to approved charities (limited to 10% of income)",maxValue:Math.floor(r*I.MAX_DONATION_PERCENT)}],[r]),[o,l]=x.useState({hasLifeInsurance:e.hasLifeInsurance||!1,lifeInsurance:e.lifeInsurance||0,hasHealthInsurance:e.hasHealthInsurance||!1,healthInsurance:e.healthInsurance||0,hasPensionFund:e.hasPensionFund||!1,pensionFund:e.pensionFund||0,hasProvidentFund:e.hasProvidentFund||!1,providentFund:e.providentFund||0,hasRMF:e.hasRMF||!1,rmf:e.rmf||0,hasSSF:e.hasSSF||!1,ssf:e.ssf||0,hasDonations:e.hasDonations||!1,donations:e.donations||0});x.useEffect(()=>{t({...e,...o})},[o]);const u=(d,y)=>{l({...o,[d]:y})},c=(d,y,g)=>{const v=Math.min(parseFloat(y.replace(/[^0-9]/g,""))||0,g);l({...o,[d]:v})},m=d=>d>0?d.toLocaleString():"";return s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Tax Deductions"}),s.jsx("p",{className:"text-gray-600 mb-6",children:"Select any deductions you qualify for. These will reduce your taxable income."}),s.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4",children:[s.jsxs("div",{className:"flex items-start gap-3 mb-3",children:[s.jsx("div",{className:"flex-shrink-0 mt-0.5",children:s.jsx("svg",{className:"h-5 w-5 text-amber-500",viewBox:"0 0 20 20",fill:"currentColor",children:s.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})})}),s.jsxs("p",{className:"text-sm text-amber-700",children:["Taxpayers aged 65 or older are entitled to an additional ฿",I.SENIOR_ALLOWANCE.toLocaleString()," allowance."]})]}),s.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[s.jsx("input",{type:"checkbox",checked:e.isAge65OrOlder,onChange:d=>t({...e,isAge65OrOlder:d.target.checked}),className:"w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"}),s.jsx("span",{className:"text-gray-800",children:"I am 65 years or older"})]})]}),s.jsx("div",{className:"space-y-4 mb-6",children:i.map(d=>{const y=o[d.hasKey],g=o[d.key],v=n&&y&&g===0;return s.jsxs("div",{className:`border rounded-lg p-4 ${v?"border-red-500":"border-gray-200"}`,children:[s.jsxs("label",{className:"flex items-start gap-3 cursor-pointer",children:[s.jsx("input",{type:"checkbox",checked:y,onChange:T=>u(d.hasKey,T.target.checked),className:"mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),s.jsxs("div",{className:"flex-1",children:[s.jsx("span",{className:"font-medium text-gray-800",children:d.label}),s.jsx("p",{className:"text-sm text-gray-500",children:d.description})]})]}),y&&s.jsxs("div",{className:"mt-3 ml-8",children:[s.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Amount (THB)"}),s.jsxs("div",{className:"relative",children:[s.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",children:"฿"}),s.jsx("input",{type:"text",value:m(g),onChange:T=>c(d.key,T.target.value,d.maxValue),className:`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 ${v?"border-red-500 focus:ring-red-200":"border-gray-300 focus:ring-blue-500"}`,placeholder:"0"})]}),v?s.jsx("p",{className:"text-sm text-red-600 mt-1",children:"Please enter an amount or uncheck this deduction."}):s.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Maximum: ฿",d.maxValue.toLocaleString()," per year"]})]})]},d.key)})})]})};function lh(e){if(e<=0)return 0;let t=0,n=e,a=0;for(const r of rg){if(n<=0)break;const i=r.upTo-a,o=Math.min(n,i);t+=o*r.rate,n-=o,a=r.upTo}return t}const vu=e=>e.reduce((t,n,a)=>{let r=I.CHILD_ALLOWANCE_BASE;return a>=1&&n.birthYear>=I.CHILD_BONUS_BIRTH_YEAR&&(r+=I.CHILD_ALLOWANCE_BONUS),t+r},0),hg=({formData:e,setFormData:t,onStartOver:n})=>{const[a,r]=x.useState(!1),[i,o]=x.useState(null),l=()=>{var d;return e.incomeType==="variable"&&((d=e.variableIncome)==null?void 0:d.length)===12?e.variableIncome.reduce((y,g)=>y+g.salary+g.bonus+g.housingAllowance+g.otherIncome,0):e.monthlySalary*12+(e.annualBonus||0)+(e.annualOtherIncome||0)},u=x.useMemo(()=>{const d=l(),y=Math.min(d*I.STANDARD_DEDUCTION_RATE,I.MAX_STANDARD_DEDUCTION),g=I.PERSONAL_ALLOWANCE;let v=y+g;if(e.includeSocialSecurity&&e.socialSecurityContribution>0&&(v+=Math.min(e.socialSecurityContribution,I.MAX_SOCIAL_SECURITY)),e.estimateType==="detailed"){e.maritalStatus==="married"&&e.spouseHasNoIncome&&(v+=I.SPOUSE_ALLOWANCE);const h=vu(e.children||[]);v+=h;const p=(e.numberOfParents||0)*I.PARENT_ALLOWANCE;if(v+=p,e.hasLifeInsurance&&(v+=Math.min(e.lifeInsurance||0,I.MAX_LIFE_INSURANCE)),e.hasHealthInsurance&&(v+=Math.min(e.healthInsurance||0,I.MAX_HEALTH_INSURANCE)),e.hasPensionFund&&(v+=Math.min(e.pensionFund||0,I.MAX_PENSION_FUND)),e.hasProvidentFund&&(v+=Math.min(e.providentFund||0,I.MAX_PROVIDENT_FUND)),e.hasRMF&&(v+=Math.min(e.rmf||0,I.MAX_RMF)),e.hasSSF&&(v+=Math.min(e.ssf||0,I.MAX_SSF)),e.hasDonations){const w=Math.floor(d*I.MAX_DONATION_PERCENT);v+=Math.min(e.donations||0,w)}}const T=Math.max(0,d-v),b=lh(T),f=b/12;return{annualIncome:d,standardDeduction:y,personalAllowance:g,socialSecurity:e.includeSocialSecurity?Math.min(e.socialSecurityContribution||0,I.MAX_SOCIAL_SECURITY):0,totalDeductions:v,taxableIncome:T,annualTax:b,monthlyWithholding:f,effectiveRate:d>0?b/d*100:0}},[e]),c=x.useMemo(()=>{const d=[];if(e.incomeType==="fixed"&&(d.push({key:"monthlySalary",label:"Monthly Salary",value:e.monthlySalary,editable:!0}),d.push({key:"annualBonus",label:"Annual Bonus",value:e.annualBonus||0,editable:!0}),d.push({key:"annualOtherIncome",label:"Other Annual Income",value:e.annualOtherIncome||0,editable:!0})),d.push({key:"standardDeduction",label:"Expense Deduction (50%)",value:u.standardDeduction,editable:!1}),d.push({key:"personalAllowance",label:"Personal Allowance",value:I.PERSONAL_ALLOWANCE,editable:!1}),e.includeSocialSecurity&&d.push({key:"socialSecurityContribution",label:"Social Security",value:e.socialSecurityContribution,editable:!0,maxValue:I.MAX_SOCIAL_SECURITY}),e.estimateType==="detailed"){if(e.maritalStatus==="married"&&e.spouseHasNoIncome&&d.push({key:"spouseAllowance",label:"Spouse Allowance",value:I.SPOUSE_ALLOWANCE,editable:!1}),e.children&&e.children.length>0){const y=vu(e.children);d.push({key:"childAllowance",label:`Child Allowance (${e.children.length})`,value:y,editable:!1})}if(e.numberOfParents>0&&d.push({key:"parentAllowance",label:`Parent Allowance (${e.numberOfParents})`,value:e.numberOfParents*I.PARENT_ALLOWANCE,editable:!1}),e.hasLifeInsurance&&d.push({key:"lifeInsurance",label:"Life Insurance",value:e.lifeInsurance,editable:!0,maxValue:I.MAX_LIFE_INSURANCE}),e.hasHealthInsurance&&d.push({key:"healthInsurance",label:"Health Insurance",value:e.healthInsurance,editable:!0,maxValue:I.MAX_HEALTH_INSURANCE}),e.hasPensionFund&&d.push({key:"pensionFund",label:"Pension Fund",value:e.pensionFund,editable:!0,maxValue:I.MAX_PENSION_FUND}),e.hasProvidentFund&&d.push({key:"providentFund",label:"Provident Fund",value:e.providentFund,editable:!0,maxValue:I.MAX_PROVIDENT_FUND}),e.hasRMF&&d.push({key:"rmf",label:"RMF",value:e.rmf,editable:!0,maxValue:I.MAX_RMF}),e.hasSSF&&d.push({key:"ssf",label:"SSF",value:e.ssf,editable:!0,maxValue:I.MAX_SSF}),e.hasDonations){const y=l(),g=Math.floor(y*I.MAX_DONATION_PERCENT);d.push({key:"donations",label:"Donations",value:e.donations,editable:!0,maxValue:g})}}return d},[e,u.standardDeduction]),m=(d,y,g)=>{const v=parseFloat(y.replace(/[^0-9]/g,""))||0,T=g?Math.min(v,g):v;t({...e,[d]:T})};return s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4 text-center",children:"Estimated Monthly Withholding"}),s.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-center",children:[s.jsx("p",{className:"text-sm text-gray-500 mb-1",children:"Monthly Tax Withholding"}),s.jsxs("p",{className:"text-4xl font-bold text-blue-600",children:["฿",u.monthlyWithholding.toLocaleString("en-US",{maximumFractionDigits:0})]}),s.jsxs("p",{className:"text-sm text-gray-500 mt-2",children:["Effective Rate: ",u.effectiveRate.toFixed(2),"%"]})]}),s.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 mb-6 space-y-2",children:[s.jsxs("div",{className:"flex justify-between text-sm",children:[s.jsx("span",{className:"text-gray-600",children:"Annual Income"}),s.jsxs("span",{className:"font-medium",children:["฿",u.annualIncome.toLocaleString()]})]}),s.jsxs("div",{className:"flex justify-between text-sm",children:[s.jsx("span",{className:"text-gray-600",children:"Total Deductions"}),s.jsxs("span",{className:"font-medium",children:["-฿",u.totalDeductions.toLocaleString()]})]}),s.jsxs("div",{className:"flex justify-between text-sm",children:[s.jsx("span",{className:"text-gray-600",children:"Taxable Income"}),s.jsxs("span",{className:"font-medium",children:["฿",u.taxableIncome.toLocaleString()]})]}),s.jsxs("div",{className:"flex justify-between text-sm border-t border-gray-200 pt-2",children:[s.jsx("span",{className:"text-gray-600",children:"Annual Tax"}),s.jsxs("span",{className:"font-medium",children:["฿",u.annualTax.toLocaleString("en-US",{maximumFractionDigits:0})]})]})]}),s.jsxs("button",{onClick:()=>r(!a),className:"w-full py-2 text-blue-600 font-medium flex items-center justify-center gap-2 hover:bg-blue-50 rounded-lg mb-4",children:[a?"Hide Details":"Show All Values & Edit",s.jsx("span",{children:a?"▲":"▼"})]}),a&&s.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 mb-6",children:[s.jsx("p",{className:"text-sm text-gray-500 mb-4",children:"Edit values below to see how changes affect your tax estimate. Changes update instantly."}),s.jsx("div",{className:"space-y-3",children:c.map(d=>s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx("span",{className:"text-sm text-gray-700",children:d.label}),d.editable?s.jsxs("div",{className:"relative",children:[i===d.key?s.jsx("input",{type:"text",value:d.value.toLocaleString(),onChange:y=>m(d.key,y.target.value,d.maxValue),onBlur:()=>o(null),autoFocus:!0,className:"w-32 px-2 py-1 text-right border border-blue-500 rounded text-sm focus:ring-2 focus:ring-blue-500"}):s.jsxs("button",{onClick:()=>o(d.key),className:"w-32 px-2 py-1 text-right text-blue-600 hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 text-sm",children:["฿",d.value.toLocaleString(),s.jsx("span",{className:"ml-1 text-xs",children:"✎"})]}),d.maxValue&&s.jsxs("p",{className:"text-xs text-gray-400 text-right",children:["Max: ฿",d.maxValue.toLocaleString()]})]}):s.jsxs("span",{className:"text-sm text-gray-500 w-32 text-right",children:["฿",d.value.toLocaleString(),s.jsx("span",{className:"ml-1 text-xs text-gray-400",children:"(fixed)"})]})]},d.key))})]}),s.jsx("button",{onClick:n,className:"w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300",children:"Start Over"})]})},fg=()=>({salary:0,bonus:0,housingAllowance:0,otherIncome:0});function Tu(){return{estimateType:"",incomeType:"",monthlySalary:0,annualBonus:0,annualOtherIncome:0,variableIncome:Array(12).fill(null).map(()=>fg()),includeSocialSecurity:!1,socialSecurityContribution:0,maritalStatus:"",spouseHasNoIncome:!1,isAge65OrOlder:!1,children:[],childrenEligibilityConfirmed:!1,numberOfParents:0,parentsEligibilityConfirmed:!1,hasLifeInsurance:!1,lifeInsurance:0,hasHealthInsurance:!1,healthInsurance:0,hasPensionFund:!1,pensionFund:0,hasProvidentFund:!1,providentFund:0,hasRMF:!1,rmf:0,hasSSF:!1,ssf:0,hasDonations:!1,donations:0}}const mg=()=>{var f,h;const[e,t]=x.useState(0),[n,a]=x.useState(Tu),[r,i]=x.useState(!1),o=()=>{t(e+1)},l=()=>{c()?(i(!1),t(e+1)):i(!0)},u=()=>{e>0&&(i(!1),t(e-1))},c=()=>{var w,N;switch((w=y[e])==null?void 0:w.id){case"estimate-type":return n.estimateType!=="";case"income-type":return n.incomeType!=="";case"monthly-income":return n.monthlySalary>0;case"variable-income":return((N=n.variableIncome)==null?void 0:N.length)===12?n.variableIncome.reduce((j,ie)=>j+ie.salary+ie.bonus+ie.housingAllowance+ie.otherIncome,0)>0:!1;case"marital-status":return n.maritalStatus!=="";case"dependents":const k=!n.childrenEligibilityConfirmed||n.children.length>0,C=!n.parentsEligibilityConfirmed||n.numberOfParents>0;return k&&C;case"deductions":return[{has:n.hasLifeInsurance,amount:n.lifeInsurance},{has:n.hasHealthInsurance,amount:n.healthInsurance},{has:n.hasPensionFund,amount:n.pensionFund},{has:n.hasProvidentFund,amount:n.providentFund},{has:n.hasRMF,amount:n.rmf},{has:n.hasSSF,amount:n.ssf},{has:n.hasDonations,amount:n.donations}].every(M=>!M.has||M.amount>0);default:return!0}},m=()=>{a(Tu()),t(0)},d=p=>{p>=0&&p<y.length&&t(p)},y=x.useMemo(()=>{const p=[];return p.push({id:"estimate-type",title:"Estimate Type",component:s.jsx(tg,{formData:n,setFormData:a,nextStep:o})}),p.push({id:"income-type",title:"Income Type",component:s.jsx(ag,{formData:n,setFormData:a,nextStep:o})}),n.incomeType==="variable"?p.push({id:"variable-income",title:"Monthly Income",component:s.jsx(lg,{formData:n,setFormData:a,nextStep:l,showValidationErrors:r})}):p.push({id:"monthly-income",title:"Assessable Income",component:s.jsx(ig,{formData:n,setFormData:a,nextStep:l,showValidationErrors:r})}),n.estimateType==="detailed"&&(p.push({id:"marital-status",title:"Marital Status",component:s.jsx(ug,{formData:n,setFormData:a,nextStep:o,showValidationErrors:r})}),p.push({id:"dependents",title:"Dependents",component:s.jsx(cg,{formData:n,setFormData:a,nextStep:l,showValidationErrors:r})}),p.push({id:"deductions",title:"Deductions",component:s.jsx(dg,{formData:n,setFormData:a,nextStep:l,showValidationErrors:r})})),p.push({id:"results",title:"Results",component:s.jsx(hg,{formData:n,setFormData:a,onStartOver:m})}),p},[n,e]),g=y.length,v=e===g-1,T=e===0,b=(e+1)/g*100;return s.jsxs("div",{className:"bg-gray-100 min-h-screen flex items-center justify-center py-8 px-4",children:[s.jsxs(Kt,{children:[s.jsx("title",{children:"Monthly Tax Withholding Estimator | Thai Tax Calculator"}),s.jsx("meta",{name:"description",content:"Estimate how much Thai income tax should be withheld from your monthly salary. Free calculator for salaried employees and freelancers in Thailand."}),s.jsx("link",{rel:"canonical",href:"https://mythaitaxes.com/monthly-withholding/"})]}),s.jsxs("div",{className:"bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-2xl w-full",children:[s.jsx("h1",{className:"sr-only",children:"Monthly Tax Withholding Estimator"}),s.jsxs("div",{className:"flex justify-between items-center mb-6",children:[s.jsxs($,{to:"/",className:"text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm","aria-label":"Go to home page",children:[s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:s.jsx("path",{d:"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"})}),"Home"]}),!v&&s.jsx("button",{onClick:m,className:"text-red-500 hover:text-red-700 text-sm","aria-label":"Start over",children:"Start Over"})]}),s.jsxs("div",{className:"mb-8",children:[s.jsxs("div",{className:"flex justify-between items-center mb-2",children:[s.jsxs("span",{className:"text-sm font-medium text-gray-700",children:["Step ",e+1," of ",g,": ",(f=y[e])==null?void 0:f.title]}),s.jsxs("span",{className:"text-sm text-gray-500",children:[Math.round(b),"%"]})]}),s.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2.5",children:s.jsx("div",{className:"bg-blue-500 h-2.5 rounded-full transition-all duration-300",style:{width:`${b}%`},role:"progressbar","aria-valuenow":e+1,"aria-valuemin":1,"aria-valuemax":g})}),s.jsx("div",{className:"flex justify-between mt-3",children:y.map((p,w)=>s.jsxs("button",{onClick:()=>w<e&&d(w),disabled:w>=e,className:`flex flex-col items-center group ${w<e?"cursor-pointer":"cursor-default"}`,"aria-label":`${w<e?"Go to ":""}Step ${w+1}: ${p.title}`,children:[s.jsx("div",{className:`w-3 h-3 rounded-full transition-all ${w<e?"bg-blue-500 group-hover:bg-blue-600":w===e?"bg-blue-500 ring-2 ring-blue-200":"bg-gray-300"}`}),s.jsx("span",{className:`text-xs mt-1 hidden md:block ${w===e?"text-blue-600 font-medium":"text-gray-400"}`,children:p.title})]},p.id))})]}),s.jsx("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4",children:s.jsx("p",{className:"text-sm text-blue-700",children:"This estimate is based on Thai tax rules for Fiscal Year 2026."})}),s.jsx("div",{className:"min-h-[300px]",children:(h=y[e])==null?void 0:h.component}),!v&&!T&&s.jsxs("div",{className:"flex justify-between mt-8 pt-6 border-t border-gray-200",children:[s.jsxs("button",{onClick:u,className:"px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2","aria-label":"Go to previous step",children:[s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",viewBox:"0 0 20 20",fill:"currentColor",children:s.jsx("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})}),"Previous"]}),s.jsxs("button",{onClick:l,className:"px-6 py-2 rounded-lg transition-colors flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600","aria-label":"Go to next step",children:["Next",s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",viewBox:"0 0 20 20",fill:"currentColor",children:s.jsx("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})})]})]})]})]})},Na=({article:e})=>s.jsx($,{to:`/articles/${e.slug}/`,className:"block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden",children:s.jsxs("div",{className:"p-5",children:[s.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[s.jsx("span",{className:"text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded",children:e.category}),s.jsxs("span",{className:"text-xs text-gray-500",children:[e.readTime," min read"]})]}),s.jsx("h3",{className:"font-semibold text-gray-900 mb-2 line-clamp-2",children:e.title}),s.jsx("p",{className:"text-gray-600 text-sm line-clamp-2",children:e.excerpt})]})}),pg="ca-pub-4471962643516217",yg={leaderboard:{width:728,height:90},rectangle:{width:300,height:250},"mobile-banner":{width:320,height:100}},Nn=({size:e,adSlot:t,className:n=""})=>{const a=x.useRef(null),r=x.useRef(!1),i=yg[e];return x.useEffect(()=>{if(!r.current)try{a.current&&window.adsbygoogle&&(window.adsbygoogle.push({}),r.current=!0)}catch(o){console.error("AdSense error:",o)}},[]),s.jsx("div",{className:`flex items-center justify-center ${n}`,style:{maxWidth:i.width,minHeight:i.height,width:"100%"},"aria-label":"Advertisement",role:"complementary",children:s.jsx("ins",{ref:a,className:"adsbygoogle",style:{display:"block",width:i.width,height:i.height},"data-ad-client":pg,"data-ad-slot":t})})};function gg(e,t){return t==="monthly"?e*12:t==="weekly"?e*52:e}function xg(e,t){const n=Math.min(e*Qn.STANDARD_DEDUCTION_RATE,Qn.MAX_STANDARD_DEDUCTION),a=Qn.PERSONAL_ALLOWANCE,r=t?Qn.MAX_SOCIAL_SECURITY:0,i=Math.max(0,e-n-a-r),o=lh(i);return{annualTax:o,monthlyTax:o/12,taxableIncome:i}}function Vn(e){return Math.round(e).toLocaleString("en-US")}const wu={yearly:"Yearly",monthly:"Monthly",weekly:"Weekly"},vg=()=>{const[e,t]=x.useState("monthly"),[n,a]=x.useState(""),[r,i]=x.useState(!0),o=parseFloat(n.replace(/,/g,""))||0,l=gg(o,e),c=o>0?xg(l,r):null,m=x.useCallback(d=>{const y=d.target.value.replace(/[^0-9.]/g,"");a(y)},[]);return s.jsx("div",{className:"max-w-2xl mx-auto px-4 mb-8",children:s.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-6 border border-gray-100",children:[s.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-1",children:"Quick Tax Estimate"}),s.jsx("p",{className:"text-sm text-gray-500 mb-5",children:"Salaried income — standard deductions and personal allowance applied automatically."}),s.jsx("div",{className:"flex gap-1 bg-gray-100 rounded-lg p-1 mb-4 w-fit",children:["yearly","monthly","weekly"].map(d=>s.jsx("button",{onClick:()=>t(d),className:`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${e===d?"bg-white text-blue-600 shadow-sm":"text-gray-500 hover:text-gray-700"}`,children:wu[d]},d))}),s.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[s.jsxs("div",{className:"relative flex-1",children:[s.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium select-none",children:"฿"}),s.jsx("input",{type:"text",inputMode:"numeric",value:n,onChange:m,placeholder:e==="yearly"?"600,000":e==="monthly"?"50,000":"12,500",className:"w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"})]}),s.jsxs("span",{className:"text-gray-400 text-sm whitespace-nowrap",children:[wu[e].toLowerCase()," income"]})]}),s.jsxs("label",{className:"flex items-center gap-2.5 mb-5 cursor-pointer select-none group w-fit",children:[s.jsx("input",{type:"checkbox",checked:r,onChange:d=>i(d.target.checked),className:"w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"}),s.jsxs("span",{className:"text-sm text-gray-600 group-hover:text-gray-800 transition-colors",children:["Include social security deduction",s.jsxs("span",{className:"text-gray-400 ml-1",children:["(฿",Vn(Qn.MAX_SOCIAL_SECURITY),"/yr)"]})]})]}),c?s.jsxs("div",{className:"bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-4",children:[s.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[s.jsxs("div",{children:[s.jsx("p",{className:"text-xs font-medium text-blue-500 uppercase tracking-wide mb-1",children:"Annual Tax"}),s.jsxs("p",{className:"text-2xl font-bold text-gray-900",children:["฿",Vn(c.annualTax)]})]}),s.jsxs("div",{children:[s.jsx("p",{className:"text-xs font-medium text-blue-500 uppercase tracking-wide mb-1",children:"Per Month"}),s.jsxs("p",{className:"text-2xl font-bold text-gray-900",children:["฿",Vn(c.monthlyTax)]})]})]}),s.jsx("div",{className:"mt-3 pt-3 border-t border-blue-100",children:s.jsxs("p",{className:"text-xs text-gray-500",children:["Based on ฿",Vn(l)," annual income · ฿",Vn(c.taxableIncome)," taxable"]})})]}):s.jsx("div",{className:"bg-gray-50 rounded-xl p-5 mb-4 text-center text-gray-400 text-sm",children:"Enter your income above to see your estimate"}),s.jsx("p",{className:"text-xs text-gray-400",children:"Need deductions for insurance, provident fund, dependents, or detailed withholding? Use the full calculators below."})]})})},kn=[{slug:"how-to-use-the-thai-tax-calculator",title:"How to Use the Thai Tax Calculator",excerpt:"A complete guide to calculating your annual tax or monthly withholding, downloading a personal filing packet, and keeping records for future reference.",content:`
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
    `,publishedAt:"2026-03-05",readTime:10,category:"International",sources:[{label:"IRS — Foreign Earned Income Exclusion",url:"https://www.irs.gov/individuals/international-taxpayers/foreign-earned-income-exclusion"},{label:"FinCEN — FBAR Filing",url:"https://bsaefiling.fincen.gov/file/fbar"},{label:"IRS — Form 8938 (FATCA)",url:"https://www.irs.gov/forms-pubs/about-form-8938"},{label:"US-Thailand Tax Treaty",url:"https://www.irs.gov/businesses/international-businesses/thailand-tax-treaty-documents"},{label:"Thai Revenue Department — Personal Income Tax",url:"https://www.rd.go.th/english/6045.html"}]}];function Tg(e){return kn.find(t=>t.slug===e)}const wg=["how-to-use-the-thai-tax-calculator","thai-tax-brackets-explained"],bg={"how-to-use-the-thai-tax-calculator":["thai-tax-brackets-explained","understanding-thai-tax-residency"],"understanding-thai-tax-residency":["expat-guide-filing-thai-taxes","foreign-income-thailand-tax"],"maximizing-tax-deductions-thailand":["flat-rate-vs-actual-expenses","thai-tax-brackets-explained"],"thai-tax-brackets-explained":["maximizing-tax-deductions-thailand","how-to-use-the-thai-tax-calculator"],"expat-guide-filing-thai-taxes":["understanding-thai-tax-residency","how-to-get-thai-tax-id-number"],"foreign-income-thailand-tax":["transferring-money-to-thailand-tax-rules","double-tax-agreements-thailand"],"social-security-contributions-thailand":["freelancer-tax-guide-thailand","maximizing-tax-deductions-thailand"],"freelancer-tax-guide-thailand":["withholding-tax-freelancers-thailand","flat-rate-vs-actual-expenses"],"flat-rate-vs-actual-expenses":["freelancer-tax-guide-thailand","maximizing-tax-deductions-thailand"],"pnd94-mid-year-tax-filing":["freelancer-tax-guide-thailand","withholding-tax-freelancers-thailand"],"withholding-tax-freelancers-thailand":["pnd94-mid-year-tax-filing","freelancer-tax-guide-thailand"],"vat-registration-freelancers":["freelancer-tax-guide-thailand","freelancer-record-keeping-thailand"],"digital-nomad-taxes-thailand":["dtv-visa-thailand-tax-guide","foreign-income-thailand-tax"],"freelancer-record-keeping-thailand":["vat-registration-freelancers","freelancer-tax-guide-thailand"],"double-tax-agreements-thailand":["foreign-income-thailand-tax","transferring-money-to-thailand-tax-rules"],"pensioner-retiree-tax-guide-thailand":["foreign-pension-income-thailand-tax","thailand-retirement-visa-tax-obligations"],"foreign-pension-income-thailand-tax":["pensioner-retiree-tax-guide-thailand","double-tax-agreements-thailand"],"investment-income-retirees-thailand":["pensioner-retiree-tax-guide-thailand","foreign-pension-income-thailand-tax"],"thailand-retirement-visa-tax-obligations":["pensioner-retiree-tax-guide-thailand","ltr-visa-tax-benefits"],"ltr-visa-tax-benefits":["dtv-visa-thailand-tax-guide","foreign-income-thailand-tax"],"dtv-visa-thailand-tax-guide":["ltr-visa-tax-benefits","foreign-income-thailand-tax"],"thailand-tax-guide-for-expats":["understanding-thai-tax-residency","expat-guide-filing-thai-taxes"],"how-to-get-thai-tax-id-number":["expat-guide-filing-thai-taxes","understanding-thai-tax-residency"],"transferring-money-to-thailand-tax-rules":["foreign-income-thailand-tax","double-tax-agreements-thailand"],"thailand-tax-for-uk-expats":["double-tax-agreements-thailand","foreign-pension-income-thailand-tax"],"rental-income-tax-thailand":["thai-tax-brackets-explained","maximizing-tax-deductions-thailand"],"thailand-tax-for-us-expats":["double-tax-agreements-thailand","foreign-income-thailand-tax"]};function Sg(e,t=2){const n=bg[e]??[],a=wg.filter(i=>i!==e);return[...n,...a].filter((i,o,l)=>i!==e&&l.indexOf(i)===o).slice(0,t).map(i=>kn.find(o=>o.slug===i)).filter(i=>i!==void 0)}function Ng(e){const t=e.toLowerCase();return kn.filter(n=>n.title.toLowerCase().includes(t)||n.excerpt.toLowerCase().includes(t)||n.category.toLowerCase().includes(t))}const zr=[{name:"Expats Moving to Thailand",items:[{question:"Do I pay tax on money I bring to Thailand when I move here?",answer:"Whether money you bring into Thailand is taxable depends on whether it is income or capital. Capital — savings you accumulated before becoming a Thai tax resident — is generally not assessable income and is not taxed when brought in. Income — money you earned — that is remitted (transferred, withdrawn, or spent) in Thailand is taxable if you are a Thai tax resident (present in Thailand for 180 or more days in a year). Since January 2024, this applies regardless of when the income was earned. If you are moving to Thailand for the first time, document the source of any large transfers (bank statements, pay slips, investment records) to demonstrate that the funds are pre-residency savings rather than current income."},{question:"Do I need to notify my home country's tax authority when I move to Thailand?",answer:"Usually yes. In the UK, you notify HMRC of your departure using form P85 and must meet the conditions of the Statutory Residence Test to establish UK non-residency. In Australia, you notify the ATO and your residency status is assessed based on your intentions and connections. In the US, you remain a US taxpayer regardless of where you live — there is no process to leave US taxation, though the Foreign Earned Income Exclusion and Foreign Tax Credit reduce your US liability. For most other countries, there is a formal process to de-register or establish non-residency, and failure to notify can result in continued home-country tax obligations running alongside your Thai obligations."},{question:"Can I keep my money in a foreign bank account to avoid Thai tax?",answer:"Yes — if you are a Thai tax resident, income that remains in a foreign account and is never brought into Thailand is not assessable for Thai tax. Thailand's system is based on the remittance principle for foreign income: only income that is remitted (transferred, withdrawn, or used) in Thailand is taxable. A remittance includes wire transfers to a Thai bank account, ATM withdrawals in Thailand from a foreign account, and credit or debit card purchases in Thailand charged to a foreign account. Money sitting in a foreign account that you never access in Thailand is not remitted and is not taxed here."},{question:"What is the difference between Thai tax residency and having a Thai tax ID?",answer:"Tax residency and a Tax Identification Number (TIN) are two different things. Thai tax residency is a legal status — you become a Thai tax resident automatically once you have spent 180 or more days in Thailand in a given calendar year. A TIN is a practical tool: a 13-digit number issued by the Revenue Department that you use when filing tax returns, claiming refunds, or issuing invoices as a freelancer. You need to apply for a TIN in person at a Revenue Department district office (with your passport, visa, and proof of address). You can be a tax resident without yet having a TIN, and you can have a TIN without currently being a tax resident."}]},{name:"Pensioners & Retirees",items:[{question:"Do retirees get a special tax exemption in Thailand?",answer:"Yes. If you are aged 65 or over at the end of the tax year, the first 190,000 THB of your assessable income is completely exempt from personal income tax under Section 42(17) of the Revenue Code. Combined with the standard personal allowance (60,000 THB) and the 0% first tax bracket (150,000 THB), a retiree aged 65+ can receive up to approximately 400,000 THB before paying any Thai income tax."},{question:"Is my foreign pension taxable in Thailand?",answer:"If you are a Thai tax resident (180+ days in Thailand) and you transfer your foreign pension to Thailand, it is assessable income since the 2024 rule change. Tax treaties between Thailand and your home country may allow you to claim a credit for tax already paid abroad, reducing or eliminating double taxation. If you leave pension money in an overseas account without remitting it to Thailand, it is not taxable here."},{question:"Is UK State Pension taxable in Thailand?",answer:"For Thai tax residents, the UK State Pension is generally taxable in Thailand as your country of residence under the UK-Thailand Double Tax Agreement. UK private pensions are also taxable in Thailand. However, UK government service pensions (for civil servants, military, some teachers) are taxable only in the UK, not Thailand. You can claim a foreign tax credit for any UK tax withheld. Many retirees consider applying to HMRC for gross payment of their pension if they are Thai tax residents, to avoid UK withholding tax that then requires claiming back."},{question:"Is US Social Security taxable in Thailand?",answer:"This is complex. Under the US-Thailand DTA, Social Security may be taxable in Thailand as your country of residence. However, the US also taxes its own citizens on worldwide income regardless of where they live, creating a risk of double taxation. US citizens should use the Foreign Tax Credit on their US return to offset US tax with Thai tax paid, and vice versa. Given the complexity, US citizen retirees in Thailand should consult a specialist in US expat taxation."},{question:"Do retirees need to file a Thai tax return?",answer:"Yes, if you are a Thai tax resident (180+ days) and your assessable income exceeds the filing threshold. For pension or salary income, the threshold is 120,000 THB for single individuals or 220,000 THB for married couples. For investment or rental income, it is 60,000 THB (single) or 120,000 THB (married). Note that the 65+ exemption reduces your assessable income by 190,000 THB before the thresholds apply, meaning many retirees with modest income will owe no tax but may still need to file."},{question:"What is the LTR Wealthy Pensioner visa and how does it affect tax?",answer:"The Long-Term Resident (LTR) Wealthy Pensioner visa is a 10-year visa for retirees aged 50+ with USD 80,000 or more in annual pension/passive income (or USD 40,000+ with USD 250,000 in Thai assets). Unlike the standard Non-OA retirement visa, LTR Wealthy Pensioner holders receive a complete exemption from Thai tax on all foreign-sourced income — pensions, investments, rental income from abroad. There is no need to track remittances or claim foreign tax credits. The application fee is 50,000 THB."},{question:"Does holding a Thai retirement visa (Non-OA) reduce my tax?",answer:"No. The Non-Immigrant OA retirement visa provides no tax benefits whatsoever. Your tax obligations are based entirely on how many days you spend in Thailand (the 180-day rule), not on your visa type. If you spend 180+ days in Thailand on a Non-OA visa, you have the same tax obligations as any other Thai tax resident. Only the LTR visa categories provide genuine tax benefits."},{question:"How is Thai bank interest taxed for retirees?",answer:"Interest on Thai bank accounts is subject to 15% withholding tax deducted automatically by the bank. You can treat this withholding as your final tax on the interest (simpler), or include the interest on your annual return and claim the 15% as a credit — which may result in a partial refund if your effective tax rate is lower. For retirees aged 65+ with modest income, your effective rate on the first taxable income after allowances is 5%, making a refund possible if you include bank interest in your return."},{question:"Can I claim my parents as dependants on my Thai tax return?",answer:"Yes. You can claim a 30,000 THB allowance per parent who is aged 60 or over, is a Thai resident, and has their own income of no more than 30,000 THB per year. You can also claim up to 15,000 THB per parent for health insurance premiums you pay on their behalf. These deductions are in addition to your personal allowance and any other deductions you claim."},{question:"Are capital gains from selling shares in Thailand taxable for retirees?",answer:"Capital gains from selling shares listed on the Stock Exchange of Thailand (SET) are exempt from personal income tax for individuals — there is no capital gains tax on Thai listed shares. Capital gains on foreign shares, however, are assessable income if the proceeds are remitted to Thailand."}]},{name:"Tax Residency",items:[{question:"How is tax residency determined in Thailand?",answer:"You are considered a Thai tax resident if you spend 180 days or more in Thailand during a calendar year. The days do not need to be consecutive. Partial days are generally counted as full days."},{question:"What happens if I stay less than 180 days?",answer:"If you stay less than 180 days in a calendar year, you are a non-resident for tax purposes. Non-residents are only taxed on income earned within Thailand, typically at flat rates or through withholding tax."},{question:"Can I be a tax resident of both Thailand and another country?",answer:"Yes, dual tax residency is possible. In such cases, tax treaties between countries determine which country has primary taxing rights. You may need to claim foreign tax credits to avoid double taxation."},{question:"Does my visa type affect my tax residency status?",answer:"No. Tax residency is determined solely by the number of days you spend in Thailand, not by your visa type. Whether you hold a retirement visa (Non-OA), Thailand Privilege (Elite) visa, tourist visa, or work permit, you become a tax resident after 180 days in a calendar year. Only the LTR visa provides any tax benefit, and that is through a specific income exemption — not a change to residency rules."},{question:"Do I become a Thai tax resident automatically after 180 days, or do I need to register?",answer:"Tax residency is automatic — it is a factual status determined entirely by the number of days you are physically present in Thailand, with no registration required. Once you have spent 180 days or more in Thailand during a calendar year, you are a Thai tax resident for that year, whether or not any authority has been notified. However, you do need to obtain a Thai Tax Identification Number (TIN) before you can file a return or claim a refund of excess withholding tax. The TIN must be applied for in person at a Revenue Department district office."},{question:'What counts as a "day" in Thailand for the 180-day rule?',answer:'A partial day — any day on which you were physically present in Thailand, even briefly — generally counts as a full day. Both your arrival day and your departure day typically count. For example, arriving on January 15 and departing on July 15 would count 181 days. There is no precise statutory definition of a "day" in the Revenue Code, but Revenue Department practice is to count any calendar day on which you were present. To be conservative, count every day on which you were physically in Thailand at any point.'}]},{name:"Deductions & Allowances",items:[{question:"What is the personal allowance in Thailand?",answer:"Every taxpayer receives a personal allowance of 60,000 THB. This amount is deducted from your assessable income before calculating tax. If your spouse has no income, you can also claim an additional 60,000 THB spouse allowance."},{question:"Can I deduct insurance premiums?",answer:"Yes. Life insurance premiums are deductible up to 100,000 THB annually. Health insurance premiums are deductible up to 25,000 THB. Parent health insurance premiums have a separate limit of 15,000 THB."},{question:"What are SSF and RMF funds?",answer:"SSF (Super Savings Fund) and RMF (Retirement Mutual Fund) are tax-advantaged investment funds. SSF contributions are deductible up to 30% of income (max 200,000 THB). RMF contributions are deductible up to 30% of income (max 500,000 THB). Combined limits apply."},{question:"How much can I deduct for children?",answer:"You can deduct 30,000 THB per legitimate child. An additional 2,000 THB per child is available if the child is studying in Thailand. There is no limit on the number of children you can claim."}]},{name:"Filing & Deadlines",items:[{question:"When is the tax filing deadline in Thailand?",answer:"The annual tax return (PND 90/91) must be filed by March 31 of the following year. For example, income earned in 2024 must be filed by March 31, 2025. Online filing may extend this deadline by 8 days."},{question:"Do I need to file if my employer withholds tax?",answer:"Yes, you should still file an annual return even if your employer withholds tax. Filing allows you to claim additional deductions and potentially receive a refund. It also ensures compliance with Thai tax law."},{question:"How do I file my tax return?",answer:"You can file online through the RD Smart Tax app or the Revenue Department website (rd.go.th), or in person at your local Revenue Department office. Online filing is recommended for faster processing."},{question:"What documents do I need to file?",answer:"You need your withholding tax certificates (Form 50 Tawi) from employers and banks, personal identification (Thai ID or passport), Tax ID number, and supporting documents for any deductions you claim (receipts, certificates)."},{question:"What is the difference between PND 90 and PND 91?",answer:"PND 91 is for individuals whose only income is employment income — salary, wages, or pension from a single employer. PND 90 is for everyone else: if you have freelance income, business income, rental income, investment income, foreign income, or income from multiple sources, you use PND 90. In practice, most expats who have any income beyond a single Thai salary should use PND 90. If you are unsure which applies to you, PND 90 is the safe choice as it covers all income types."},{question:"Can I file my Thai tax return in English?",answer:"The official PND 90 and PND 91 forms are in Thai only. The Revenue Department's website (rd.go.th) has some English-language guidance, and the RD Smart Tax mobile app provides a guided filing experience with limited English support. In practice, most expats either use a Thai accountant or tax agent to prepare and file in Thai, or use the RD Smart Tax app which walks through fields step by step."},{question:"Do I need to file a Thai tax return even if I have no tax to pay?",answer:"If you are a Thai tax resident and your assessable income exceeds the filing threshold — 120,000 THB per year for single individuals with employment or pension income, or 60,000 THB for rental or investment income — you are technically required to file even if deductions and allowances reduce your final tax to zero. In practice, enforcement of filing-without-paying is limited, but it is legally required and best practice to file. If you have excess withholding tax deducted by your employer, you must file to claim a refund."}]},{name:"Income & Withholding",items:[{question:"How is monthly withholding tax calculated?",answer:"Employers estimate your annual income and calculate the annual tax liability. This amount is divided by 12 and withheld monthly. The calculation considers your allowances and deductions you have declared to your employer."},{question:"Is foreign income taxable in Thailand?",answer:"For Thai tax residents, foreign income brought into Thailand is taxable. Recent changes require foreign income remitted to Thailand to be declared regardless of when it was earned. Tax treaties may provide exemptions or credits."},{question:"What income is exempt from tax?",answer:"The first 150,000 THB of taxable income is exempt. Other exemptions include certain government payments, inheritance (subject to separate rules), and specific investment returns like those from certain government bonds."},{question:"How are dividends from Thai companies taxed?",answer:"Dividends from Thai companies are subject to 10% withholding tax deducted at source by the paying company. You can either treat this withholding as your final tax obligation (simpler), or include dividends in your annual return and claim the 10% withholding as a tax credit — which may result in a refund if your overall effective tax rate is lower."},{question:"Is rental income from property in Thailand taxable?",answer:"Yes. Rental income from Thai property is assessable income and must be declared on your annual return. You can deduct 30% of gross rental income as a flat-rate expense (no documentation needed), or claim actual rental-related expenses if they are higher and you can document them. Net rental income is then subject to progressive income tax rates."},{question:"How is rental income taxed in Thailand?",answer:"Rental income from Thai property is assessable income under Section 40(5) of the Revenue Code. You can deduct 30% of gross rental income as a standard flat-rate expense (no receipts needed), making 70% of your rent your net assessable income. This net income is added to your total income for the year and taxed at progressive rates after your personal allowances. If a company pays you rent, they are required to withhold 5% at source — collect a withholding tax certificate and claim this as a credit on your annual PND 90 return. Individual tenants have no withholding obligation."},{question:"Does Thailand have a capital gains tax?",answer:"Thailand does not have a separate capital gains tax in the traditional sense. Capital gains from selling shares listed on the Stock Exchange of Thailand (SET) are exempt from personal income tax for individual investors. For other assets — such as overseas shares, foreign property, or Thai real estate — the treatment is more complex. Proceeds from selling foreign assets that are remitted to Thailand are treated as assessable income subject to progressive rates. When you sell Thai property, Specific Business Tax (3.3% of sale price) applies if the property was held for fewer than 5 years, plus transfer fees — but there is no separate capital gains income tax on top of this."}]},{name:"Refunds & Payments",items:[{question:"How do I get a tax refund?",answer:"If you have overpaid tax (common if you have additional deductions not considered in withholding), you will receive a refund after filing your annual return. Refunds are typically processed within 3 months and deposited to your bank account."},{question:"What if I owe additional tax?",answer:"If your total tax liability exceeds the amount withheld, you must pay the difference when filing. Payment can be made at the Revenue Department office, through designated banks, or online through the RD Smart Tax app."},{question:"Are there penalties for late filing or payment?",answer:"Yes. Late filing incurs a penalty of up to 2,000 THB. Late payment incurs a surcharge of 1.5% per month on the outstanding amount. Interest also accrues on unpaid tax."}]},{name:"Working in Thailand as a Foreigner",items:[{question:"Do I need a work permit to have a Thai tax obligation?",answer:"No — tax obligations and work permit requirements are entirely separate. Your tax obligation is determined by your income and your residency status (days in Thailand), not whether you hold a work permit. If a Thai employer withholds income tax from your salary, you already have a tax obligation regardless of your work permit status. Legally working in Thailand as a foreign national requires a work permit issued by the Department of Employment, and working without one is a legal violation — but it does not remove your tax obligation or create one where none existed."},{question:"My employer is a foreign company with no presence in Thailand. Do I owe Thai tax?",answer:"If you work remotely in Thailand for a foreign employer that has no Thai entity and does not withhold Thai tax, and you spend 180 or more days in Thailand in a year, you are a Thai tax resident. Income that you remit (transfer or spend) in Thailand is taxable since the 2024 rule change. Even though your employer never interacts with the Thai Revenue Department, you personally are responsible for declaring and paying Thai tax on your remitted income by filing a PND 90 return by 31 March."}]}];function uh(e){const t=e.toLowerCase(),n=[];return zr.forEach(a=>{a.items.forEach(r=>{(r.question.toLowerCase().includes(t)||r.answer.toLowerCase().includes(t))&&n.push(r)})}),n}const Vi="https://mythaitaxes.com",kg=()=>{const e=kn.slice(0,3),t=["Pensioners & Retirees","Tax Residency","Filing & Deadlines"],n=zr.filter(i=>t.includes(i.name)).sort((i,o)=>t.indexOf(i.name)-t.indexOf(o.name)).map(i=>({name:i.name,items:i.items.slice(0,3)})),a="Thai Tax Calculator | Free Thai Income Tax Calculator",r="Calculate your Thai income tax quickly and accurately. Free tool for salaried employees, freelancers, sole proprietors, and company owners in Thailand.";return s.jsxs("div",{className:"py-8",children:[s.jsxs(Kt,{children:[s.jsx("title",{children:a}),s.jsx("meta",{name:"description",content:r}),s.jsx("link",{rel:"canonical",href:Vi}),s.jsx("meta",{property:"og:title",content:a}),s.jsx("meta",{property:"og:description",content:r}),s.jsx("meta",{property:"og:url",content:Vi}),s.jsx("meta",{property:"og:type",content:"website"}),s.jsx("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"WebApplication",name:"Thai Tax Calculator",url:Vi,description:r,applicationCategory:"FinanceApplication",operatingSystem:"All",offers:{"@type":"Offer",price:"0",priceCurrency:"THB"}})})]}),s.jsxs("div",{className:"max-w-4xl mx-auto px-4 text-center mb-8",children:[s.jsx("h1",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-3",children:"Thai Tax Calculator"}),s.jsx("p",{className:"text-lg text-gray-600",children:"Calculate your Thai tax obligation quickly and accurately"})]}),s.jsx(vg,{}),s.jsx("div",{className:"max-w-3xl mx-auto px-4 mb-8",children:s.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[s.jsx($,{to:"/annual-tax/",className:"block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-transparent hover:border-blue-500",children:s.jsxs("div",{className:"flex items-start gap-4",children:[s.jsx("div",{className:"w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0",children:s.jsx("svg",{className:"w-6 h-6 text-blue-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"})})}),s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-1",children:"Annual Tax Calculator"}),s.jsx("p",{className:"text-gray-600 text-sm",children:"Get a detailed breakdown of your annual tax liability and potential refund."})]})]})}),s.jsx($,{to:"/monthly-withholding/",className:"block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-transparent hover:border-blue-500",children:s.jsxs("div",{className:"flex items-start gap-4",children:[s.jsx("div",{className:"w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0",children:s.jsx("svg",{className:"w-6 h-6 text-green-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})})}),s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-1",children:"Monthly Withholding"}),s.jsx("p",{className:"text-gray-600 text-sm",children:"Estimate how much tax should be deducted from your monthly salary."})]})]})})]})}),s.jsxs("div",{className:"flex justify-center mb-8 px-4",children:[s.jsx("div",{className:"hidden md:block",children:s.jsx(Nn,{size:"leaderboard",adSlot:"5959313072"})}),s.jsx("div",{className:"md:hidden",children:s.jsx(Nn,{size:"mobile-banner",adSlot:"6916229573"})})]}),s.jsx("div",{className:"max-w-6xl mx-auto px-4",children:s.jsxs("div",{className:"grid md:grid-cols-2 gap-8",children:[s.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[s.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Popular Questions"}),s.jsx("div",{className:"space-y-5",children:n.map(i=>s.jsxs("div",{children:[s.jsx("p",{className:"text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2",children:i.name}),s.jsx("ul",{className:"space-y-2",children:i.items.map((o,l)=>s.jsx("li",{children:s.jsxs($,{to:"/faq/",className:"flex items-start gap-2 text-sm text-gray-600 hover:text-blue-500 transition-colors",children:[s.jsx("span",{className:"text-blue-500 flex-shrink-0 mt-0.5",children:"Q:"}),s.jsx("span",{children:o.question})]})},l))})]},i.name))}),s.jsxs($,{to:"/faq/",className:"inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 mt-4 text-sm font-medium",children:["View all FAQ",s.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]}),s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Latest Articles"}),s.jsx("div",{className:"space-y-4",children:e.map(i=>s.jsx(Na,{article:i},i.slug))}),s.jsxs($,{to:"/articles/",className:"inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 mt-4 text-sm font-medium",children:["View all articles",s.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]})]})})]})},bu="https://mythaitaxes.com",Cg=()=>{const e=kn.slice(0,3),t=kn.slice(3),n="Thai Tax Articles & Guides | Thai Tax Calculator",a="Expert guides on Thai taxation covering freelancer tax, expat filing, deductions, tax residency, double tax agreements, and more.";return s.jsxs("div",{className:"py-8",children:[s.jsxs(Kt,{children:[s.jsx("title",{children:n}),s.jsx("meta",{name:"description",content:a}),s.jsx("link",{rel:"canonical",href:`${bu}/articles/`}),s.jsx("meta",{property:"og:title",content:n}),s.jsx("meta",{property:"og:description",content:a}),s.jsx("meta",{property:"og:url",content:`${bu}/articles/`}),s.jsx("meta",{property:"og:type",content:"website"})]}),s.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[s.jsxs("div",{className:"mb-8",children:[s.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Thai Tax Guides for Expats"}),s.jsx("p",{className:"text-gray-600",children:"Comprehensive guides to help you understand and navigate Thai taxation."})]}),s.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",children:e.map(r=>s.jsx(Na,{article:r},r.slug))}),t.length>0&&s.jsxs("div",{className:"flex justify-center mb-8",children:[s.jsx("div",{className:"hidden md:block",children:s.jsx(Nn,{size:"leaderboard",adSlot:"5959313072"})}),s.jsx("div",{className:"md:hidden",children:s.jsx(Nn,{size:"rectangle",adSlot:"3447757856"})})]}),t.length>0&&s.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",children:t.map(r=>s.jsx(Na,{article:r},r.slug))}),s.jsxs("div",{className:"bg-blue-50 rounded-xl p-6 md:p-8 text-center",children:[s.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-2",children:"Ready to calculate your tax?"}),s.jsx("p",{className:"text-gray-600 mb-4",children:"Use our free calculator to estimate your Thai tax liability."}),s.jsxs($,{to:"/",className:"inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors",children:["Start Calculator",s.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]})]})]})},er="https://mythaitaxes.com",Rg=()=>{const{slug:e}=bp(),t=e?Tg(e):void 0,n=e?Sg(e):[];if(!t)return s.jsx(Mp,{to:"/articles/",replace:!0});const a=`${er}/articles/${t.slug}/`,r={"@context":"https://schema.org","@type":"Article",headline:t.title,description:t.excerpt,url:a,datePublished:t.publishedAt,publisher:{"@type":"Organization",name:"Thai Tax Calculator",url:er}},i={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${er}/`},{"@type":"ListItem",position:2,name:"Articles",item:`${er}/articles/`},{"@type":"ListItem",position:3,name:t.title,item:a}]},o=t.content.split(`

`),l=Math.floor(o.length/2),u=o.slice(0,l).join(`

`),c=o.slice(l).join(`

`);return s.jsxs("div",{className:"py-8",children:[s.jsxs(Kt,{children:[s.jsxs("title",{children:[t.title," | Thai Tax Calculator"]}),s.jsx("meta",{name:"description",content:t.excerpt}),s.jsx("link",{rel:"canonical",href:a}),s.jsx("meta",{property:"og:title",content:t.title}),s.jsx("meta",{property:"og:description",content:t.excerpt}),s.jsx("meta",{property:"og:url",content:a}),s.jsx("meta",{property:"og:type",content:"article"}),s.jsx("meta",{property:"article:published_time",content:t.publishedAt}),s.jsx("script",{type:"application/ld+json",children:JSON.stringify(r)}),s.jsx("script",{type:"application/ld+json",children:JSON.stringify(i)})]}),s.jsxs("div",{className:"max-w-3xl mx-auto px-4",children:[s.jsx("nav",{className:"mb-6",children:s.jsx($,{to:"/articles/",className:"text-blue-500 hover:text-blue-600 text-sm",children:"← Back to Articles"})}),s.jsxs("header",{className:"mb-8",children:[s.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[s.jsx("span",{className:"text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full",children:t.category}),s.jsxs("span",{className:"text-sm text-gray-500",children:[t.readTime," min read"]})]}),s.jsx("h1",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-3",children:t.title}),s.jsxs("p",{className:"text-gray-500 text-sm",children:["Published: ",new Date(t.publishedAt).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})]})]}),s.jsxs("div",{className:"flex gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-8 text-sm text-amber-800",children:[s.jsx("svg",{className:"w-4 h-4 mt-0.5 shrink-0",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),s.jsxs("span",{children:["This article is for informational purposes only and is based on publicly available Thai Revenue Department guidance and the Revenue Code. Tax rules change — verify current regulations at"," ",s.jsx("a",{href:"https://www.rd.go.th/english/",target:"_blank",rel:"noopener noreferrer",className:"underline hover:text-amber-900 font-medium",children:"rd.go.th"})," ","or consult a licensed Thai tax advisor before making financial decisions."]})]}),s.jsx("article",{className:"prose prose-gray max-w-none mb-8",children:s.jsx("div",{className:"article-content",dangerouslySetInnerHTML:{__html:Su(u)}})}),s.jsx("div",{className:"flex justify-center my-8",children:s.jsx(Nn,{size:"rectangle",adSlot:"3447757856"})}),s.jsx("article",{className:"prose prose-gray max-w-none mb-8",children:s.jsx("div",{className:"article-content",dangerouslySetInnerHTML:{__html:Su(c)}})}),t.sources&&t.sources.length>0&&s.jsxs("div",{className:"border-t border-gray-200 pt-6 mb-8",children:[s.jsx("h2",{className:"text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3",children:"Sources & Official References"}),s.jsx("ul",{className:"space-y-1",children:t.sources.map((m,d)=>s.jsx("li",{className:"text-sm text-gray-600",children:s.jsx("a",{href:m.url,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:text-blue-700 hover:underline",children:m.label})},d))})]}),s.jsxs("div",{className:"bg-blue-50 rounded-xl p-6 text-center mb-8",children:[s.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-2",children:"Ready to calculate your tax?"}),s.jsx("p",{className:"text-gray-600 mb-4",children:"Put this knowledge to use with our free calculator."}),s.jsxs($,{to:"/",className:"inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors",children:["Start Calculator",s.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]}),n.length>0&&s.jsxs("section",{children:[s.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Related Articles"}),s.jsx("div",{className:"grid md:grid-cols-2 gap-4",children:n.map(m=>s.jsx(Na,{article:m},m.slug))})]})]})]})};function Su(e){let t=e.replace(/(^\|.+\|$\n?)+/gm,n=>{const a=n.trim().split(`
`);let r='<table class="w-full border-collapse mb-4">';return a.forEach((i,o)=>{const l=i.split("|").filter(y=>y.trim());if(l.every(y=>y.trim().match(/^[-:]+$/)))return;const u=o===0,c=u?"th":"td",m=u?"border border-gray-200 px-4 py-2 bg-gray-50 font-semibold text-left":"border border-gray-200 px-4 py-2",d=l.map(y=>`<${c} class="${m}">${y.trim()}</${c}>`).join("");r+=`<tr>${d}</tr>`}),r+="</table>",r});return t=t.replace(/^## (.+)$/gm,'<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>').replace(/^### (.+)$/gm,'<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>').replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),t=t.replace(/(^\d+\. .+$(\n(   - .+$|\d+\. .+$))*)+/gm,n=>{let a='<ol class="list-decimal list-outside ml-5 mb-4 text-gray-600 space-y-3">',r=[];return n.split(`
`).forEach((o,l)=>{const u=/^\d+\. /.test(o),c=/^   - /.test(o);if(u){r.length>0?(a+='<ul class="list-disc list-outside ml-5 mt-2 text-gray-500 space-y-1">',a+=r.join(""),a+="</ul>",r=[],a+="</li>"):l>0&&(a+="</li>");const m=o.replace(/^\d+\. /,"");a+=`<li>${m}`}else if(c){const m=o.replace(/^   - /,"");r.push(`<li>${m}</li>`)}}),r.length>0&&(a+='<ul class="list-disc list-outside ml-5 mt-2 text-gray-500 space-y-1">',a+=r.join(""),a+="</ul>"),a+="</li></ol>",a}),t=t.replace(/(^- .+$(\n- .+$)*)/gm,n=>`<ul class="list-disc list-outside ml-5 mb-4 text-gray-600 space-y-1">${n.split(`
`).map(r=>`<li>${r.replace(/^- /,"")}</li>`).join("")}</ul>`),t=t.replace(/\n\n/g,'</p><p class="mb-4 text-gray-600 leading-relaxed">').replace(/^/,'<p class="mb-4 text-gray-600 leading-relaxed">').replace(/$/,"</p>").replace(/<p class="mb-4 text-gray-600 leading-relaxed"><\/p>/g,""),t}const qo=({question:e,answer:t,defaultOpen:n=!1})=>{const[a,r]=x.useState(n);return s.jsxs("div",{className:"border-b border-gray-200 last:border-b-0",children:[s.jsxs("button",{className:"w-full py-4 flex items-center justify-between text-left hover:text-blue-500 transition-colors",onClick:()=>r(!a),"aria-expanded":a,children:[s.jsx("span",{className:"font-medium text-gray-900 pr-4",children:e}),s.jsx("svg",{className:`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${a?"rotate-180":""}`,fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]}),a&&s.jsx("div",{className:"pb-4 text-gray-600 leading-relaxed",children:t})]})},Nu="https://mythaitaxes.com",Eg=()=>{const[e,t]=x.useState(""),n=e.length>=2?uh(e):[],a=e.length>=2,r="Thai Tax FAQ | Frequently Asked Questions | Thai Tax Calculator",i="Answers to common questions about Thai income tax: tax residency, deductions, filing deadlines, withholding tax, refunds, and more.",o={"@context":"https://schema.org","@type":"FAQPage",mainEntity:zr.flatMap(l=>l.items.map(u=>({"@type":"Question",name:u.question,acceptedAnswer:{"@type":"Answer",text:u.answer}})))};return s.jsxs("div",{className:"py-8",children:[s.jsxs(Kt,{children:[s.jsx("title",{children:r}),s.jsx("meta",{name:"description",content:i}),s.jsx("link",{rel:"canonical",href:`${Nu}/faq/`}),s.jsx("meta",{property:"og:title",content:r}),s.jsx("meta",{property:"og:description",content:i}),s.jsx("meta",{property:"og:url",content:`${Nu}/faq/`}),s.jsx("meta",{property:"og:type",content:"website"}),s.jsx("script",{type:"application/ld+json",children:JSON.stringify(o)})]}),s.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[s.jsxs("div",{className:"mb-8 text-center",children:[s.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Frequently Asked Questions"}),s.jsx("p",{className:"text-gray-600 mb-6",children:"Find answers to common questions about Thai taxation."}),s.jsx("div",{className:"max-w-md mx-auto",children:s.jsxs("div",{className:"relative",children:[s.jsx("input",{type:"text",placeholder:"Search FAQs...",value:e,onChange:l=>t(l.target.value),className:"w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"}),s.jsx("svg",{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})]})})]}),s.jsxs("div",{className:"grid lg:grid-cols-3 gap-8",children:[s.jsx("div",{className:"lg:col-span-2",children:a?s.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[s.jsxs("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:["Search Results (",n.length,")"]}),n.length>0?s.jsx("div",{className:"divide-y divide-gray-200",children:n.map((l,u)=>s.jsx(qo,{question:l.question,answer:l.answer,defaultOpen:u===0},u))}):s.jsxs("p",{className:"text-gray-500",children:['No results found for "',e,'". Try a different search term.']})]}):s.jsx("div",{className:"space-y-6",children:zr.map((l,u)=>s.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[s.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:l.name}),s.jsx("div",{className:"divide-y divide-gray-200",children:l.items.map((c,m)=>s.jsx(qo,{question:c.question,answer:c.answer},m))})]},u))})}),s.jsx("div",{className:"lg:col-span-1",children:s.jsxs("div",{className:"sticky top-24 space-y-6",children:[s.jsx("div",{className:"flex justify-center",children:s.jsx(Nn,{size:"rectangle",adSlot:"3447757856"})}),s.jsxs("div",{className:"bg-blue-50 rounded-xl p-6",children:[s.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Calculate Your Tax"}),s.jsx("p",{className:"text-gray-600 text-sm mb-4",children:"Ready to estimate your Thai tax liability?"}),s.jsx($,{to:"/",className:"block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors",children:"Start Calculator"})]}),s.jsxs("div",{className:"bg-gray-50 rounded-xl p-6",children:[s.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Need More Help?"}),s.jsx("p",{className:"text-gray-600 text-sm",children:"For complex tax situations, we recommend consulting with a qualified Thai tax professional."})]})]})})]})]})]})},Ag="https://mythaitaxes.com",Ig=()=>{const[e,t]=my(),[n,a]=x.useState(e.get("q")??""),r=e.get("q")??"",i=r.length>=2?Ng(r):[],o=r.length>=2?uh(r):[],l=i.length+o.length;x.useEffect(()=>{const c=setTimeout(()=>{const m=n.trim();m?t({q:m},{replace:!0}):t({},{replace:!0})},300);return()=>clearTimeout(c)},[n,t]);const u=r?`Results for "${r}" | Thai Tax Calculator`:"Search | Thai Tax Calculator";return s.jsxs("div",{className:"py-8",children:[s.jsxs(Kt,{children:[s.jsx("title",{children:u}),s.jsx("meta",{name:"description",content:"Search Thai tax articles and frequently asked questions."}),s.jsx("link",{rel:"canonical",href:`${Ag}/search/`}),s.jsx("meta",{name:"robots",content:"noindex"})]}),s.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[s.jsxs("div",{className:"mb-8",children:[s.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-6",children:"Search"}),s.jsxs("div",{className:"relative max-w-xl",children:[s.jsx("input",{type:"text",placeholder:"Search articles and FAQs...",value:n,onChange:c=>a(c.target.value),autoFocus:!0,className:"w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors text-base"}),s.jsx("svg",{className:"absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})]})]}),r.length>=2?s.jsxs("div",{className:"space-y-8",children:[s.jsx("p",{className:"text-gray-500 text-sm",children:l===0?`No results found for "${r}"`:`${l} result${l!==1?"s":""} for "${r}"`}),i.length>0&&s.jsxs("section",{children:[s.jsxs("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:["Articles (",i.length,")"]}),s.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-3 gap-4",children:i.map(c=>s.jsx(Na,{article:c},c.slug))})]}),o.length>0&&s.jsxs("section",{children:[s.jsxs("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:["FAQs (",o.length,")"]}),s.jsx("div",{className:"bg-white rounded-xl shadow-md p-6 divide-y divide-gray-200",children:o.map((c,m)=>s.jsx(qo,{question:c.question,answer:c.answer,defaultOpen:m===0},m))}),s.jsx("div",{className:"mt-3",children:s.jsx($,{to:"/faq/",className:"text-blue-500 hover:underline text-sm",children:"Browse all FAQs →"})})]}),l===0&&s.jsxs("div",{className:"text-center py-12",children:[s.jsx("p",{className:"text-gray-500 mb-4",children:"Try a different keyword, or browse:"}),s.jsxs("div",{className:"flex justify-center gap-6",children:[s.jsx($,{to:"/articles/",className:"text-blue-500 hover:underline",children:"All Articles"}),s.jsx($,{to:"/faq/",className:"text-blue-500 hover:underline",children:"All FAQs"})]})]})]}):s.jsx("p",{className:"text-gray-400 text-center py-12",children:"Enter at least 2 characters to search articles and FAQs."})]})]})},jg=Ke.lazy(()=>Qy(()=>import("./AnnualTaxWizard-Dej9e5rj.js"),[])),Pg=()=>s.jsx(Zy,{children:s.jsxs(_p,{children:[s.jsx(ct,{path:"/",element:s.jsx(kg,{})}),s.jsx(ct,{path:"/monthly-withholding",element:s.jsx(mg,{})}),s.jsx(ct,{path:"/annual-tax",element:s.jsx(x.Suspense,{fallback:s.jsxs("div",{className:"bg-gray-100 min-h-screen flex items-center justify-center py-8 px-4",children:[s.jsxs(Kt,{children:[s.jsx("title",{children:"Annual Tax Calculator | Thai Tax Calculator"}),s.jsx("meta",{name:"description",content:"Calculate your annual Thai income tax liability. Free calculator for salaried employees, freelancers, sole proprietors, and company owners in Thailand."}),s.jsx("link",{rel:"canonical",href:"https://mythaitaxes.com/annual-tax/"})]}),s.jsxs("div",{className:"bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-2xl w-full",children:[s.jsx("h1",{className:"sr-only",children:"Annual Tax Calculator"}),s.jsx("div",{className:"flex justify-between items-center mb-6",children:s.jsx($,{to:"/",className:"text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm",children:"Home"})}),s.jsx("p",{className:"text-center text-gray-500",children:"Loading calculator…"})]})]}),children:s.jsx(jg,{})})}),s.jsx(ct,{path:"/articles",element:s.jsx(Cg,{})}),s.jsx(ct,{path:"/articles/:slug",element:s.jsx(Rg,{})}),s.jsx(ct,{path:"/faq",element:s.jsx(Eg,{})}),s.jsx(ct,{path:"/search",element:s.jsx(Ig,{})})]})}),Yi=document.getElementById("root"),ku=s.jsx(Ke.StrictMode,{children:s.jsx(sh,{children:s.jsx(uy,{children:s.jsx(Pg,{})})})});Yi.hasChildNodes()?gr.hydrateRoot(Yi,ku):gr.createRoot(Yi).render(ku);export{Ke as R,rg as T,Qn as a,Dg as b,lh as c,Lg as d,$r as g,s as j,x as r,li as u};
