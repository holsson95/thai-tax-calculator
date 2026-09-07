var Wh=Object.defineProperty;var zh=(e,t,n)=>t in e?Wh(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var et=(e,t,n)=>zh(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();var n0=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Jr(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function a0(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function a(){return this instanceof a?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(a){var i=Object.getOwnPropertyDescriptor(e,a);Object.defineProperty(n,a,i.get?i:{enumerable:!0,get:function(){return e[a]}})}),n}var qc={exports:{}},Zr={},Gc={exports:{}},L={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ia=Symbol.for("react.element"),$h=Symbol.for("react.portal"),Yh=Symbol.for("react.fragment"),Vh=Symbol.for("react.strict_mode"),Kh=Symbol.for("react.profiler"),qh=Symbol.for("react.provider"),Gh=Symbol.for("react.context"),Xh=Symbol.for("react.forward_ref"),Qh=Symbol.for("react.suspense"),Jh=Symbol.for("react.memo"),Zh=Symbol.for("react.lazy"),ml=Symbol.iterator;function em(e){return e===null||typeof e!="object"?null:(e=ml&&e[ml]||e["@@iterator"],typeof e=="function"?e:null)}var Xc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Qc=Object.assign,Jc={};function Pn(e,t,n){this.props=e,this.context=t,this.refs=Jc,this.updater=n||Xc}Pn.prototype.isReactComponent={};Pn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Pn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Zc(){}Zc.prototype=Pn.prototype;function ss(e,t,n){this.props=e,this.context=t,this.refs=Jc,this.updater=n||Xc}var ls=ss.prototype=new Zc;ls.constructor=ss;Qc(ls,Pn.prototype);ls.isPureReactComponent=!0;var fl=Array.isArray,eu=Object.prototype.hasOwnProperty,cs={current:null},tu={key:!0,ref:!0,__self:!0,__source:!0};function nu(e,t,n){var a,i={},o=null,s=null;if(t!=null)for(a in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(o=""+t.key),t)eu.call(t,a)&&!tu.hasOwnProperty(a)&&(i[a]=t[a]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(a in l=e.defaultProps,l)i[a]===void 0&&(i[a]=l[a]);return{$$typeof:Ia,type:e,key:o,ref:s,props:i,_owner:cs.current}}function tm(e,t){return{$$typeof:Ia,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function us(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ia}function nm(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var pl=/\/+/g;function wi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?nm(""+e.key):t.toString(36)}function cr(e,t,n,a,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Ia:case $h:s=!0}}if(s)return s=e,i=i(s),e=a===""?"."+wi(s,0):a,fl(i)?(n="",e!=null&&(n=e.replace(pl,"$&/")+"/"),cr(i,t,n,"",function(u){return u})):i!=null&&(us(i)&&(i=tm(i,n+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(pl,"$&/")+"/")+e)),t.push(i)),1;if(s=0,a=a===""?".":a+":",fl(e))for(var l=0;l<e.length;l++){o=e[l];var c=a+wi(o,l);s+=cr(o,t,n,c,i)}else if(c=em(e),typeof c=="function")for(e=c.call(e),l=0;!(o=e.next()).done;)o=o.value,c=a+wi(o,l++),s+=cr(o,t,n,c,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function Ha(e,t,n){if(e==null)return e;var a=[],i=0;return cr(e,a,"","",function(o){return t.call(n,o,i++)}),a}function am(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var me={current:null},ur={transition:null},rm={ReactCurrentDispatcher:me,ReactCurrentBatchConfig:ur,ReactCurrentOwner:cs};function au(){throw Error("act(...) is not supported in production builds of React.")}L.Children={map:Ha,forEach:function(e,t,n){Ha(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ha(e,function(){t++}),t},toArray:function(e){return Ha(e,function(t){return t})||[]},only:function(e){if(!us(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};L.Component=Pn;L.Fragment=Yh;L.Profiler=Kh;L.PureComponent=ss;L.StrictMode=Vh;L.Suspense=Qh;L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=rm;L.act=au;L.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=Qc({},e.props),i=e.key,o=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,s=cs.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)eu.call(t,c)&&!tu.hasOwnProperty(c)&&(a[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)a.children=n;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];a.children=l}return{$$typeof:Ia,type:e.type,key:i,ref:o,props:a,_owner:s}};L.createContext=function(e){return e={$$typeof:Gh,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:qh,_context:e},e.Consumer=e};L.createElement=nu;L.createFactory=function(e){var t=nu.bind(null,e);return t.type=e,t};L.createRef=function(){return{current:null}};L.forwardRef=function(e){return{$$typeof:Xh,render:e}};L.isValidElement=us;L.lazy=function(e){return{$$typeof:Zh,_payload:{_status:-1,_result:e},_init:am}};L.memo=function(e,t){return{$$typeof:Jh,type:e,compare:t===void 0?null:t}};L.startTransition=function(e){var t=ur.transition;ur.transition={};try{e()}finally{ur.transition=t}};L.unstable_act=au;L.useCallback=function(e,t){return me.current.useCallback(e,t)};L.useContext=function(e){return me.current.useContext(e)};L.useDebugValue=function(){};L.useDeferredValue=function(e){return me.current.useDeferredValue(e)};L.useEffect=function(e,t){return me.current.useEffect(e,t)};L.useId=function(){return me.current.useId()};L.useImperativeHandle=function(e,t,n){return me.current.useImperativeHandle(e,t,n)};L.useInsertionEffect=function(e,t){return me.current.useInsertionEffect(e,t)};L.useLayoutEffect=function(e,t){return me.current.useLayoutEffect(e,t)};L.useMemo=function(e,t){return me.current.useMemo(e,t)};L.useReducer=function(e,t,n){return me.current.useReducer(e,t,n)};L.useRef=function(e){return me.current.useRef(e)};L.useState=function(e){return me.current.useState(e)};L.useSyncExternalStore=function(e,t,n){return me.current.useSyncExternalStore(e,t,n)};L.useTransition=function(){return me.current.useTransition()};L.version="18.3.1";Gc.exports=L;var v=Gc.exports;const Qe=Jr(v);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var im=v,om=Symbol.for("react.element"),sm=Symbol.for("react.fragment"),lm=Object.prototype.hasOwnProperty,cm=im.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,um={key:!0,ref:!0,__self:!0,__source:!0};function ru(e,t,n){var a,i={},o=null,s=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(a in t)lm.call(t,a)&&!um.hasOwnProperty(a)&&(i[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)i[a]===void 0&&(i[a]=t[a]);return{$$typeof:om,type:e,key:o,ref:s,props:i,_owner:cm.current}}Zr.Fragment=sm;Zr.jsx=ru;Zr.jsxs=ru;qc.exports=Zr;var r=qc.exports,jr={},iu={exports:{}},je={},ou={exports:{}},su={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(R,P){var _=R.length;R.push(P);e:for(;0<_;){var G=_-1>>>1,te=R[G];if(0<i(te,P))R[G]=P,R[_]=te,_=G;else break e}}function n(R){return R.length===0?null:R[0]}function a(R){if(R.length===0)return null;var P=R[0],_=R.pop();if(_!==P){R[0]=_;e:for(var G=0,te=R.length,Oa=te>>>1;G<Oa;){var _t=2*(G+1)-1,Ti=R[_t],Lt=_t+1,Ua=R[Lt];if(0>i(Ti,_))Lt<te&&0>i(Ua,Ti)?(R[G]=Ua,R[Lt]=_,G=Lt):(R[G]=Ti,R[_t]=_,G=_t);else if(Lt<te&&0>i(Ua,_))R[G]=Ua,R[Lt]=_,G=Lt;else break e}}return P}function i(R,P){var _=R.sortIndex-P.sortIndex;return _!==0?_:R.id-P.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,l=s.now();e.unstable_now=function(){return s.now()-l}}var c=[],u=[],m=1,f=null,y=3,x=!1,g=!1,T=!1,b=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function p(R){for(var P=n(u);P!==null;){if(P.callback===null)a(u);else if(P.startTime<=R)a(u),P.sortIndex=P.expirationTime,t(c,P);else break;P=n(u)}}function w(R){if(T=!1,p(R),!g)if(n(c)!==null)g=!0,xi(S);else{var P=n(u);P!==null&&vi(w,P.startTime-R)}}function S(R,P){g=!1,T&&(T=!1,h(C),C=-1),x=!0;var _=y;try{for(p(P),f=n(c);f!==null&&(!(f.expirationTime>P)||R&&!ee());){var G=f.callback;if(typeof G=="function"){f.callback=null,y=f.priorityLevel;var te=G(f.expirationTime<=P);P=e.unstable_now(),typeof te=="function"?f.callback=te:f===n(c)&&a(c),p(P)}else a(c);f=n(c)}if(f!==null)var Oa=!0;else{var _t=n(u);_t!==null&&vi(w,_t.startTime-P),Oa=!1}return Oa}finally{f=null,y=_,x=!1}}var A=!1,j=null,C=-1,M=5,I=-1;function ee(){return!(e.unstable_now()-I<M)}function Dt(){if(j!==null){var R=e.unstable_now();I=R;var P=!0;try{P=j(!0,R)}finally{P?Ft():(A=!1,j=null)}}else A=!1}var Ft;if(typeof d=="function")Ft=function(){d(Dt)};else if(typeof MessageChannel<"u"){var hl=new MessageChannel,Bh=hl.port2;hl.port1.onmessage=Dt,Ft=function(){Bh.postMessage(null)}}else Ft=function(){b(Dt,0)};function xi(R){j=R,A||(A=!0,Ft())}function vi(R,P){C=b(function(){R(e.unstable_now())},P)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(R){R.callback=null},e.unstable_continueExecution=function(){g||x||(g=!0,xi(S))},e.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<R?Math.floor(1e3/R):5},e.unstable_getCurrentPriorityLevel=function(){return y},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(R){switch(y){case 1:case 2:case 3:var P=3;break;default:P=y}var _=y;y=P;try{return R()}finally{y=_}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(R,P){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var _=y;y=R;try{return P()}finally{y=_}},e.unstable_scheduleCallback=function(R,P,_){var G=e.unstable_now();switch(typeof _=="object"&&_!==null?(_=_.delay,_=typeof _=="number"&&0<_?G+_:G):_=G,R){case 1:var te=-1;break;case 2:te=250;break;case 5:te=1073741823;break;case 4:te=1e4;break;default:te=5e3}return te=_+te,R={id:m++,callback:P,priorityLevel:R,startTime:_,expirationTime:te,sortIndex:-1},_>G?(R.sortIndex=_,t(u,R),n(c)===null&&R===n(u)&&(T?(h(C),C=-1):T=!0,vi(w,_-G))):(R.sortIndex=te,t(c,R),g||x||(g=!0,xi(S))),R},e.unstable_shouldYield=ee,e.unstable_wrapCallback=function(R){var P=y;return function(){var _=y;y=P;try{return R.apply(this,arguments)}finally{y=_}}}})(su);ou.exports=su;var dm=ou.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hm=v,Ne=dm;function N(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var lu=new Set,da={};function Xt(e,t){bn(e,t),bn(e+"Capture",t)}function bn(e,t){for(da[e]=t,e=0;e<t.length;e++)lu.add(t[e])}var st=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ao=Object.prototype.hasOwnProperty,mm=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,yl={},gl={};function fm(e){return ao.call(gl,e)?!0:ao.call(yl,e)?!1:mm.test(e)?gl[e]=!0:(yl[e]=!0,!1)}function pm(e,t,n,a){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return a?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function ym(e,t,n,a){if(t===null||typeof t>"u"||pm(e,t,n,a))return!0;if(a)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function fe(e,t,n,a,i,o,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=a,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var oe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){oe[e]=new fe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];oe[t]=new fe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){oe[e]=new fe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){oe[e]=new fe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){oe[e]=new fe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){oe[e]=new fe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){oe[e]=new fe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){oe[e]=new fe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){oe[e]=new fe(e,5,!1,e.toLowerCase(),null,!1,!1)});var ds=/[\-:]([a-z])/g;function hs(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ds,hs);oe[t]=new fe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ds,hs);oe[t]=new fe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ds,hs);oe[t]=new fe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){oe[e]=new fe(e,1,!1,e.toLowerCase(),null,!1,!1)});oe.xlinkHref=new fe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){oe[e]=new fe(e,1,!1,e.toLowerCase(),null,!0,!0)});function ms(e,t,n,a){var i=oe.hasOwnProperty(t)?oe[t]:null;(i!==null?i.type!==0:a||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(ym(t,n,i,a)&&(n=null),a||i===null?fm(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,a=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,a?e.setAttributeNS(a,t,n):e.setAttribute(t,n))))}var ht=hm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ba=Symbol.for("react.element"),tn=Symbol.for("react.portal"),nn=Symbol.for("react.fragment"),fs=Symbol.for("react.strict_mode"),ro=Symbol.for("react.profiler"),cu=Symbol.for("react.provider"),uu=Symbol.for("react.context"),ps=Symbol.for("react.forward_ref"),io=Symbol.for("react.suspense"),oo=Symbol.for("react.suspense_list"),ys=Symbol.for("react.memo"),ft=Symbol.for("react.lazy"),du=Symbol.for("react.offscreen"),xl=Symbol.iterator;function On(e){return e===null||typeof e!="object"?null:(e=xl&&e[xl]||e["@@iterator"],typeof e=="function"?e:null)}var K=Object.assign,bi;function Xn(e){if(bi===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);bi=t&&t[1]||""}return`
`+bi+e}var Si=!1;function Ni(e,t){if(!e||Si)return"";Si=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var a=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){a=u}e.call(t.prototype)}else{try{throw Error()}catch(u){a=u}e()}}catch(u){if(u&&a&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),o=a.stack.split(`
`),s=i.length-1,l=o.length-1;1<=s&&0<=l&&i[s]!==o[l];)l--;for(;1<=s&&0<=l;s--,l--)if(i[s]!==o[l]){if(s!==1||l!==1)do if(s--,l--,0>l||i[s]!==o[l]){var c=`
`+i[s].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=s&&0<=l);break}}}finally{Si=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Xn(e):""}function gm(e){switch(e.tag){case 5:return Xn(e.type);case 16:return Xn("Lazy");case 13:return Xn("Suspense");case 19:return Xn("SuspenseList");case 0:case 2:case 15:return e=Ni(e.type,!1),e;case 11:return e=Ni(e.type.render,!1),e;case 1:return e=Ni(e.type,!0),e;default:return""}}function so(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case nn:return"Fragment";case tn:return"Portal";case ro:return"Profiler";case fs:return"StrictMode";case io:return"Suspense";case oo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case uu:return(e.displayName||"Context")+".Consumer";case cu:return(e._context.displayName||"Context")+".Provider";case ps:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ys:return t=e.displayName||null,t!==null?t:so(e.type)||"Memo";case ft:t=e._payload,e=e._init;try{return so(e(t))}catch{}}return null}function xm(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return so(t);case 8:return t===fs?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Ct(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function hu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function vm(e){var t=hu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),a=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(s){a=""+s,o.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(s){a=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Wa(e){e._valueTracker||(e._valueTracker=vm(e))}function mu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=hu(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function Ar(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function lo(e,t){var n=t.checked;return K({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function vl(e,t){var n=t.defaultValue==null?"":t.defaultValue,a=t.checked!=null?t.checked:t.defaultChecked;n=Ct(t.value!=null?t.value:n),e._wrapperState={initialChecked:a,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function fu(e,t){t=t.checked,t!=null&&ms(e,"checked",t,!1)}function co(e,t){fu(e,t);var n=Ct(t.value),a=t.type;if(n!=null)a==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?uo(e,t.type,n):t.hasOwnProperty("defaultValue")&&uo(e,t.type,Ct(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Tl(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type;if(!(a!=="submit"&&a!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function uo(e,t,n){(t!=="number"||Ar(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Qn=Array.isArray;function fn(e,t,n,a){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&a&&(e[n].defaultSelected=!0)}else{for(n=""+Ct(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,a&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function ho(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(N(91));return K({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function wl(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(N(92));if(Qn(n)){if(1<n.length)throw Error(N(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Ct(n)}}function pu(e,t){var n=Ct(t.value),a=Ct(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),a!=null&&(e.defaultValue=""+a)}function bl(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function yu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function mo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?yu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var za,gu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,a,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,a,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(za=za||document.createElement("div"),za.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=za.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ha(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ea={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Tm=["Webkit","ms","Moz","O"];Object.keys(ea).forEach(function(e){Tm.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ea[t]=ea[e]})});function xu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||ea.hasOwnProperty(e)&&ea[e]?(""+t).trim():t+"px"}function vu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var a=n.indexOf("--")===0,i=xu(n,t[n],a);n==="float"&&(n="cssFloat"),a?e.setProperty(n,i):e[n]=i}}var wm=K({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function fo(e,t){if(t){if(wm[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(N(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(N(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(N(61))}if(t.style!=null&&typeof t.style!="object")throw Error(N(62))}}function po(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var yo=null;function gs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var go=null,pn=null,yn=null;function Sl(e){if(e=Fa(e)){if(typeof go!="function")throw Error(N(280));var t=e.stateNode;t&&(t=ri(t),go(e.stateNode,e.type,t))}}function Tu(e){pn?yn?yn.push(e):yn=[e]:pn=e}function wu(){if(pn){var e=pn,t=yn;if(yn=pn=null,Sl(e),t)for(e=0;e<t.length;e++)Sl(t[e])}}function bu(e,t){return e(t)}function Su(){}var ji=!1;function Nu(e,t,n){if(ji)return e(t,n);ji=!0;try{return bu(e,t,n)}finally{ji=!1,(pn!==null||yn!==null)&&(Su(),wu())}}function ma(e,t){var n=e.stateNode;if(n===null)return null;var a=ri(n);if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(N(231,t,typeof n));return n}var xo=!1;if(st)try{var Un={};Object.defineProperty(Un,"passive",{get:function(){xo=!0}}),window.addEventListener("test",Un,Un),window.removeEventListener("test",Un,Un)}catch{xo=!1}function bm(e,t,n,a,i,o,s,l,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(m){this.onError(m)}}var ta=!1,kr=null,Cr=!1,vo=null,Sm={onError:function(e){ta=!0,kr=e}};function Nm(e,t,n,a,i,o,s,l,c){ta=!1,kr=null,bm.apply(Sm,arguments)}function jm(e,t,n,a,i,o,s,l,c){if(Nm.apply(this,arguments),ta){if(ta){var u=kr;ta=!1,kr=null}else throw Error(N(198));Cr||(Cr=!0,vo=u)}}function Qt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ju(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Nl(e){if(Qt(e)!==e)throw Error(N(188))}function Am(e){var t=e.alternate;if(!t){if(t=Qt(e),t===null)throw Error(N(188));return t!==e?null:e}for(var n=e,a=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(a=i.return,a!==null){n=a;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return Nl(i),e;if(o===a)return Nl(i),t;o=o.sibling}throw Error(N(188))}if(n.return!==a.return)n=i,a=o;else{for(var s=!1,l=i.child;l;){if(l===n){s=!0,n=i,a=o;break}if(l===a){s=!0,a=i,n=o;break}l=l.sibling}if(!s){for(l=o.child;l;){if(l===n){s=!0,n=o,a=i;break}if(l===a){s=!0,a=o,n=i;break}l=l.sibling}if(!s)throw Error(N(189))}}if(n.alternate!==a)throw Error(N(190))}if(n.tag!==3)throw Error(N(188));return n.stateNode.current===n?e:t}function Au(e){return e=Am(e),e!==null?ku(e):null}function ku(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=ku(e);if(t!==null)return t;e=e.sibling}return null}var Cu=Ne.unstable_scheduleCallback,jl=Ne.unstable_cancelCallback,km=Ne.unstable_shouldYield,Cm=Ne.unstable_requestPaint,X=Ne.unstable_now,Rm=Ne.unstable_getCurrentPriorityLevel,xs=Ne.unstable_ImmediatePriority,Ru=Ne.unstable_UserBlockingPriority,Rr=Ne.unstable_NormalPriority,Em=Ne.unstable_LowPriority,Eu=Ne.unstable_IdlePriority,ei=null,Je=null;function Im(e){if(Je&&typeof Je.onCommitFiberRoot=="function")try{Je.onCommitFiberRoot(ei,e,void 0,(e.current.flags&128)===128)}catch{}}var We=Math.clz32?Math.clz32:Fm,Pm=Math.log,Dm=Math.LN2;function Fm(e){return e>>>=0,e===0?32:31-(Pm(e)/Dm|0)|0}var $a=64,Ya=4194304;function Jn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Er(e,t){var n=e.pendingLanes;if(n===0)return 0;var a=0,i=e.suspendedLanes,o=e.pingedLanes,s=n&268435455;if(s!==0){var l=s&~i;l!==0?a=Jn(l):(o&=s,o!==0&&(a=Jn(o)))}else s=n&~i,s!==0?a=Jn(s):o!==0&&(a=Jn(o));if(a===0)return 0;if(t!==0&&t!==a&&!(t&i)&&(i=a&-a,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(a&4&&(a|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=a;0<t;)n=31-We(t),i=1<<n,a|=e[n],t&=~i;return a}function _m(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Lm(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-We(o),l=1<<s,c=i[s];c===-1?(!(l&n)||l&a)&&(i[s]=_m(l,t)):c<=t&&(e.expiredLanes|=l),o&=~l}}function To(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Iu(){var e=$a;return $a<<=1,!($a&4194240)&&($a=64),e}function Ai(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Pa(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-We(t),e[t]=n}function Mm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-We(n),o=1<<i;t[i]=0,a[i]=-1,e[i]=-1,n&=~o}}function vs(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-We(n),i=1<<a;i&t|e[a]&t&&(e[a]|=t),n&=~i}}var U=0;function Pu(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Du,Ts,Fu,_u,Lu,wo=!1,Va=[],Tt=null,wt=null,bt=null,fa=new Map,pa=new Map,yt=[],Om="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Al(e,t){switch(e){case"focusin":case"focusout":Tt=null;break;case"dragenter":case"dragleave":wt=null;break;case"mouseover":case"mouseout":bt=null;break;case"pointerover":case"pointerout":fa.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":pa.delete(t.pointerId)}}function Hn(e,t,n,a,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:o,targetContainers:[i]},t!==null&&(t=Fa(t),t!==null&&Ts(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Um(e,t,n,a,i){switch(t){case"focusin":return Tt=Hn(Tt,e,t,n,a,i),!0;case"dragenter":return wt=Hn(wt,e,t,n,a,i),!0;case"mouseover":return bt=Hn(bt,e,t,n,a,i),!0;case"pointerover":var o=i.pointerId;return fa.set(o,Hn(fa.get(o)||null,e,t,n,a,i)),!0;case"gotpointercapture":return o=i.pointerId,pa.set(o,Hn(pa.get(o)||null,e,t,n,a,i)),!0}return!1}function Mu(e){var t=Ut(e.target);if(t!==null){var n=Qt(t);if(n!==null){if(t=n.tag,t===13){if(t=ju(n),t!==null){e.blockedOn=t,Lu(e.priority,function(){Fu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function dr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);yo=a,n.target.dispatchEvent(a),yo=null}else return t=Fa(n),t!==null&&Ts(t),e.blockedOn=n,!1;t.shift()}return!0}function kl(e,t,n){dr(e)&&n.delete(t)}function Hm(){wo=!1,Tt!==null&&dr(Tt)&&(Tt=null),wt!==null&&dr(wt)&&(wt=null),bt!==null&&dr(bt)&&(bt=null),fa.forEach(kl),pa.forEach(kl)}function Bn(e,t){e.blockedOn===t&&(e.blockedOn=null,wo||(wo=!0,Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority,Hm)))}function ya(e){function t(i){return Bn(i,e)}if(0<Va.length){Bn(Va[0],e);for(var n=1;n<Va.length;n++){var a=Va[n];a.blockedOn===e&&(a.blockedOn=null)}}for(Tt!==null&&Bn(Tt,e),wt!==null&&Bn(wt,e),bt!==null&&Bn(bt,e),fa.forEach(t),pa.forEach(t),n=0;n<yt.length;n++)a=yt[n],a.blockedOn===e&&(a.blockedOn=null);for(;0<yt.length&&(n=yt[0],n.blockedOn===null);)Mu(n),n.blockedOn===null&&yt.shift()}var gn=ht.ReactCurrentBatchConfig,Ir=!0;function Bm(e,t,n,a){var i=U,o=gn.transition;gn.transition=null;try{U=1,ws(e,t,n,a)}finally{U=i,gn.transition=o}}function Wm(e,t,n,a){var i=U,o=gn.transition;gn.transition=null;try{U=4,ws(e,t,n,a)}finally{U=i,gn.transition=o}}function ws(e,t,n,a){if(Ir){var i=bo(e,t,n,a);if(i===null)Li(e,t,a,Pr,n),Al(e,a);else if(Um(i,e,t,n,a))a.stopPropagation();else if(Al(e,a),t&4&&-1<Om.indexOf(e)){for(;i!==null;){var o=Fa(i);if(o!==null&&Du(o),o=bo(e,t,n,a),o===null&&Li(e,t,a,Pr,n),o===i)break;i=o}i!==null&&a.stopPropagation()}else Li(e,t,a,null,n)}}var Pr=null;function bo(e,t,n,a){if(Pr=null,e=gs(a),e=Ut(e),e!==null)if(t=Qt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ju(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Pr=e,null}function Ou(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Rm()){case xs:return 1;case Ru:return 4;case Rr:case Em:return 16;case Eu:return 536870912;default:return 16}default:return 16}}var xt=null,bs=null,hr=null;function Uu(){if(hr)return hr;var e,t=bs,n=t.length,a,i="value"in xt?xt.value:xt.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var s=n-e;for(a=1;a<=s&&t[n-a]===i[o-a];a++);return hr=i.slice(e,1<a?1-a:void 0)}function mr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ka(){return!0}function Cl(){return!1}function Ae(e){function t(n,a,i,o,s){this._reactName=n,this._targetInst=i,this.type=a,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Ka:Cl,this.isPropagationStopped=Cl,this}return K(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ka)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ka)},persist:function(){},isPersistent:Ka}),t}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ss=Ae(Dn),Da=K({},Dn,{view:0,detail:0}),zm=Ae(Da),ki,Ci,Wn,ti=K({},Da,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ns,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Wn&&(Wn&&e.type==="mousemove"?(ki=e.screenX-Wn.screenX,Ci=e.screenY-Wn.screenY):Ci=ki=0,Wn=e),ki)},movementY:function(e){return"movementY"in e?e.movementY:Ci}}),Rl=Ae(ti),$m=K({},ti,{dataTransfer:0}),Ym=Ae($m),Vm=K({},Da,{relatedTarget:0}),Ri=Ae(Vm),Km=K({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0}),qm=Ae(Km),Gm=K({},Dn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Xm=Ae(Gm),Qm=K({},Dn,{data:0}),El=Ae(Qm),Jm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Zm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ef={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function tf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=ef[e])?!!t[e]:!1}function Ns(){return tf}var nf=K({},Da,{key:function(e){if(e.key){var t=Jm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=mr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Zm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ns,charCode:function(e){return e.type==="keypress"?mr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?mr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),af=Ae(nf),rf=K({},ti,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Il=Ae(rf),of=K({},Da,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ns}),sf=Ae(of),lf=K({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0}),cf=Ae(lf),uf=K({},ti,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),df=Ae(uf),hf=[9,13,27,32],js=st&&"CompositionEvent"in window,na=null;st&&"documentMode"in document&&(na=document.documentMode);var mf=st&&"TextEvent"in window&&!na,Hu=st&&(!js||na&&8<na&&11>=na),Pl=" ",Dl=!1;function Bu(e,t){switch(e){case"keyup":return hf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Wu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var an=!1;function ff(e,t){switch(e){case"compositionend":return Wu(t);case"keypress":return t.which!==32?null:(Dl=!0,Pl);case"textInput":return e=t.data,e===Pl&&Dl?null:e;default:return null}}function pf(e,t){if(an)return e==="compositionend"||!js&&Bu(e,t)?(e=Uu(),hr=bs=xt=null,an=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Hu&&t.locale!=="ko"?null:t.data;default:return null}}var yf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Fl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!yf[e.type]:t==="textarea"}function zu(e,t,n,a){Tu(a),t=Dr(t,"onChange"),0<t.length&&(n=new Ss("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var aa=null,ga=null;function gf(e){ed(e,0)}function ni(e){var t=sn(e);if(mu(t))return e}function xf(e,t){if(e==="change")return t}var $u=!1;if(st){var Ei;if(st){var Ii="oninput"in document;if(!Ii){var _l=document.createElement("div");_l.setAttribute("oninput","return;"),Ii=typeof _l.oninput=="function"}Ei=Ii}else Ei=!1;$u=Ei&&(!document.documentMode||9<document.documentMode)}function Ll(){aa&&(aa.detachEvent("onpropertychange",Yu),ga=aa=null)}function Yu(e){if(e.propertyName==="value"&&ni(ga)){var t=[];zu(t,ga,e,gs(e)),Nu(gf,t)}}function vf(e,t,n){e==="focusin"?(Ll(),aa=t,ga=n,aa.attachEvent("onpropertychange",Yu)):e==="focusout"&&Ll()}function Tf(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ni(ga)}function wf(e,t){if(e==="click")return ni(t)}function bf(e,t){if(e==="input"||e==="change")return ni(t)}function Sf(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var $e=typeof Object.is=="function"?Object.is:Sf;function xa(e,t){if($e(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var i=n[a];if(!ao.call(t,i)||!$e(e[i],t[i]))return!1}return!0}function Ml(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ol(e,t){var n=Ml(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ml(n)}}function Vu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Vu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ku(){for(var e=window,t=Ar();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ar(e.document)}return t}function As(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Nf(e){var t=Ku(),n=e.focusedElem,a=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Vu(n.ownerDocument.documentElement,n)){if(a!==null&&As(n)){if(t=a.start,e=a.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(a.start,i);a=a.end===void 0?o:Math.min(a.end,i),!e.extend&&o>a&&(i=a,a=o,o=i),i=Ol(n,o);var s=Ol(n,a);i&&s&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>a?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var jf=st&&"documentMode"in document&&11>=document.documentMode,rn=null,So=null,ra=null,No=!1;function Ul(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;No||rn==null||rn!==Ar(a)||(a=rn,"selectionStart"in a&&As(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),ra&&xa(ra,a)||(ra=a,a=Dr(So,"onSelect"),0<a.length&&(t=new Ss("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=rn)))}function qa(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var on={animationend:qa("Animation","AnimationEnd"),animationiteration:qa("Animation","AnimationIteration"),animationstart:qa("Animation","AnimationStart"),transitionend:qa("Transition","TransitionEnd")},Pi={},qu={};st&&(qu=document.createElement("div").style,"AnimationEvent"in window||(delete on.animationend.animation,delete on.animationiteration.animation,delete on.animationstart.animation),"TransitionEvent"in window||delete on.transitionend.transition);function ai(e){if(Pi[e])return Pi[e];if(!on[e])return e;var t=on[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in qu)return Pi[e]=t[n];return e}var Gu=ai("animationend"),Xu=ai("animationiteration"),Qu=ai("animationstart"),Ju=ai("transitionend"),Zu=new Map,Hl="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Et(e,t){Zu.set(e,t),Xt(t,[e])}for(var Di=0;Di<Hl.length;Di++){var Fi=Hl[Di],Af=Fi.toLowerCase(),kf=Fi[0].toUpperCase()+Fi.slice(1);Et(Af,"on"+kf)}Et(Gu,"onAnimationEnd");Et(Xu,"onAnimationIteration");Et(Qu,"onAnimationStart");Et("dblclick","onDoubleClick");Et("focusin","onFocus");Et("focusout","onBlur");Et(Ju,"onTransitionEnd");bn("onMouseEnter",["mouseout","mouseover"]);bn("onMouseLeave",["mouseout","mouseover"]);bn("onPointerEnter",["pointerout","pointerover"]);bn("onPointerLeave",["pointerout","pointerover"]);Xt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Xt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Xt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Xt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Xt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Xt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Zn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Cf=new Set("cancel close invalid load scroll toggle".split(" ").concat(Zn));function Bl(e,t,n){var a=e.type||"unknown-event";e.currentTarget=n,jm(a,t,void 0,e),e.currentTarget=null}function ed(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],i=a.event;a=a.listeners;e:{var o=void 0;if(t)for(var s=a.length-1;0<=s;s--){var l=a[s],c=l.instance,u=l.currentTarget;if(l=l.listener,c!==o&&i.isPropagationStopped())break e;Bl(i,l,u),o=c}else for(s=0;s<a.length;s++){if(l=a[s],c=l.instance,u=l.currentTarget,l=l.listener,c!==o&&i.isPropagationStopped())break e;Bl(i,l,u),o=c}}}if(Cr)throw e=vo,Cr=!1,vo=null,e}function B(e,t){var n=t[Ro];n===void 0&&(n=t[Ro]=new Set);var a=e+"__bubble";n.has(a)||(td(t,e,2,!1),n.add(a))}function _i(e,t,n){var a=0;t&&(a|=4),td(n,e,a,t)}var Ga="_reactListening"+Math.random().toString(36).slice(2);function va(e){if(!e[Ga]){e[Ga]=!0,lu.forEach(function(n){n!=="selectionchange"&&(Cf.has(n)||_i(n,!1,e),_i(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ga]||(t[Ga]=!0,_i("selectionchange",!1,t))}}function td(e,t,n,a){switch(Ou(t)){case 1:var i=Bm;break;case 4:i=Wm;break;default:i=ws}n=i.bind(null,t,n,e),i=void 0,!xo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),a?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Li(e,t,n,a,i){var o=a;if(!(t&1)&&!(t&2)&&a!==null)e:for(;;){if(a===null)return;var s=a.tag;if(s===3||s===4){var l=a.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(s===4)for(s=a.return;s!==null;){var c=s.tag;if((c===3||c===4)&&(c=s.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;s=s.return}for(;l!==null;){if(s=Ut(l),s===null)return;if(c=s.tag,c===5||c===6){a=o=s;continue e}l=l.parentNode}}a=a.return}Nu(function(){var u=o,m=gs(n),f=[];e:{var y=Zu.get(e);if(y!==void 0){var x=Ss,g=e;switch(e){case"keypress":if(mr(n)===0)break e;case"keydown":case"keyup":x=af;break;case"focusin":g="focus",x=Ri;break;case"focusout":g="blur",x=Ri;break;case"beforeblur":case"afterblur":x=Ri;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=Rl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Ym;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=sf;break;case Gu:case Xu:case Qu:x=qm;break;case Ju:x=cf;break;case"scroll":x=zm;break;case"wheel":x=df;break;case"copy":case"cut":case"paste":x=Xm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=Il}var T=(t&4)!==0,b=!T&&e==="scroll",h=T?y!==null?y+"Capture":null:y;T=[];for(var d=u,p;d!==null;){p=d;var w=p.stateNode;if(p.tag===5&&w!==null&&(p=w,h!==null&&(w=ma(d,h),w!=null&&T.push(Ta(d,w,p)))),b)break;d=d.return}0<T.length&&(y=new x(y,g,null,n,m),f.push({event:y,listeners:T}))}}if(!(t&7)){e:{if(y=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",y&&n!==yo&&(g=n.relatedTarget||n.fromElement)&&(Ut(g)||g[lt]))break e;if((x||y)&&(y=m.window===m?m:(y=m.ownerDocument)?y.defaultView||y.parentWindow:window,x?(g=n.relatedTarget||n.toElement,x=u,g=g?Ut(g):null,g!==null&&(b=Qt(g),g!==b||g.tag!==5&&g.tag!==6)&&(g=null)):(x=null,g=u),x!==g)){if(T=Rl,w="onMouseLeave",h="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(T=Il,w="onPointerLeave",h="onPointerEnter",d="pointer"),b=x==null?y:sn(x),p=g==null?y:sn(g),y=new T(w,d+"leave",x,n,m),y.target=b,y.relatedTarget=p,w=null,Ut(m)===u&&(T=new T(h,d+"enter",g,n,m),T.target=p,T.relatedTarget=b,w=T),b=w,x&&g)t:{for(T=x,h=g,d=0,p=T;p;p=Jt(p))d++;for(p=0,w=h;w;w=Jt(w))p++;for(;0<d-p;)T=Jt(T),d--;for(;0<p-d;)h=Jt(h),p--;for(;d--;){if(T===h||h!==null&&T===h.alternate)break t;T=Jt(T),h=Jt(h)}T=null}else T=null;x!==null&&Wl(f,y,x,T,!1),g!==null&&b!==null&&Wl(f,b,g,T,!0)}}e:{if(y=u?sn(u):window,x=y.nodeName&&y.nodeName.toLowerCase(),x==="select"||x==="input"&&y.type==="file")var S=xf;else if(Fl(y))if($u)S=bf;else{S=Tf;var A=vf}else(x=y.nodeName)&&x.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(S=wf);if(S&&(S=S(e,u))){zu(f,S,n,m);break e}A&&A(e,y,u),e==="focusout"&&(A=y._wrapperState)&&A.controlled&&y.type==="number"&&uo(y,"number",y.value)}switch(A=u?sn(u):window,e){case"focusin":(Fl(A)||A.contentEditable==="true")&&(rn=A,So=u,ra=null);break;case"focusout":ra=So=rn=null;break;case"mousedown":No=!0;break;case"contextmenu":case"mouseup":case"dragend":No=!1,Ul(f,n,m);break;case"selectionchange":if(jf)break;case"keydown":case"keyup":Ul(f,n,m)}var j;if(js)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else an?Bu(e,n)&&(C="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(Hu&&n.locale!=="ko"&&(an||C!=="onCompositionStart"?C==="onCompositionEnd"&&an&&(j=Uu()):(xt=m,bs="value"in xt?xt.value:xt.textContent,an=!0)),A=Dr(u,C),0<A.length&&(C=new El(C,e,null,n,m),f.push({event:C,listeners:A}),j?C.data=j:(j=Wu(n),j!==null&&(C.data=j)))),(j=mf?ff(e,n):pf(e,n))&&(u=Dr(u,"onBeforeInput"),0<u.length&&(m=new El("onBeforeInput","beforeinput",null,n,m),f.push({event:m,listeners:u}),m.data=j))}ed(f,t)})}function Ta(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Dr(e,t){for(var n=t+"Capture",a=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=ma(e,n),o!=null&&a.unshift(Ta(e,o,i)),o=ma(e,t),o!=null&&a.push(Ta(e,o,i))),e=e.return}return a}function Jt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Wl(e,t,n,a,i){for(var o=t._reactName,s=[];n!==null&&n!==a;){var l=n,c=l.alternate,u=l.stateNode;if(c!==null&&c===a)break;l.tag===5&&u!==null&&(l=u,i?(c=ma(n,o),c!=null&&s.unshift(Ta(n,c,l))):i||(c=ma(n,o),c!=null&&s.push(Ta(n,c,l)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var Rf=/\r\n?/g,Ef=/\u0000|\uFFFD/g;function zl(e){return(typeof e=="string"?e:""+e).replace(Rf,`
`).replace(Ef,"")}function Xa(e,t,n){if(t=zl(t),zl(e)!==t&&n)throw Error(N(425))}function Fr(){}var jo=null,Ao=null;function ko(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Co=typeof setTimeout=="function"?setTimeout:void 0,If=typeof clearTimeout=="function"?clearTimeout:void 0,$l=typeof Promise=="function"?Promise:void 0,Pf=typeof queueMicrotask=="function"?queueMicrotask:typeof $l<"u"?function(e){return $l.resolve(null).then(e).catch(Df)}:Co;function Df(e){setTimeout(function(){throw e})}function Mi(e,t){var n=t,a=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(a===0){e.removeChild(i),ya(t);return}a--}else n!=="$"&&n!=="$?"&&n!=="$!"||a++;n=i}while(n);ya(t)}function St(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Yl(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Fn=Math.random().toString(36).slice(2),Xe="__reactFiber$"+Fn,wa="__reactProps$"+Fn,lt="__reactContainer$"+Fn,Ro="__reactEvents$"+Fn,Ff="__reactListeners$"+Fn,_f="__reactHandles$"+Fn;function Ut(e){var t=e[Xe];if(t)return t;for(var n=e.parentNode;n;){if(t=n[lt]||n[Xe]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Yl(e);e!==null;){if(n=e[Xe])return n;e=Yl(e)}return t}e=n,n=e.parentNode}return null}function Fa(e){return e=e[Xe]||e[lt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function sn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(N(33))}function ri(e){return e[wa]||null}var Eo=[],ln=-1;function It(e){return{current:e}}function W(e){0>ln||(e.current=Eo[ln],Eo[ln]=null,ln--)}function H(e,t){ln++,Eo[ln]=e.current,e.current=t}var Rt={},ue=It(Rt),ge=It(!1),Yt=Rt;function Sn(e,t){var n=e.type.contextTypes;if(!n)return Rt;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function xe(e){return e=e.childContextTypes,e!=null}function _r(){W(ge),W(ue)}function Vl(e,t,n){if(ue.current!==Rt)throw Error(N(168));H(ue,t),H(ge,n)}function nd(e,t,n){var a=e.stateNode;if(t=t.childContextTypes,typeof a.getChildContext!="function")return n;a=a.getChildContext();for(var i in a)if(!(i in t))throw Error(N(108,xm(e)||"Unknown",i));return K({},n,a)}function Lr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Rt,Yt=ue.current,H(ue,e),H(ge,ge.current),!0}function Kl(e,t,n){var a=e.stateNode;if(!a)throw Error(N(169));n?(e=nd(e,t,Yt),a.__reactInternalMemoizedMergedChildContext=e,W(ge),W(ue),H(ue,e)):W(ge),H(ge,n)}var nt=null,ii=!1,Oi=!1;function ad(e){nt===null?nt=[e]:nt.push(e)}function Lf(e){ii=!0,ad(e)}function Pt(){if(!Oi&&nt!==null){Oi=!0;var e=0,t=U;try{var n=nt;for(U=1;e<n.length;e++){var a=n[e];do a=a(!0);while(a!==null)}nt=null,ii=!1}catch(i){throw nt!==null&&(nt=nt.slice(e+1)),Cu(xs,Pt),i}finally{U=t,Oi=!1}}return null}var cn=[],un=0,Mr=null,Or=0,Re=[],Ee=0,Vt=null,at=1,rt="";function Mt(e,t){cn[un++]=Or,cn[un++]=Mr,Mr=e,Or=t}function rd(e,t,n){Re[Ee++]=at,Re[Ee++]=rt,Re[Ee++]=Vt,Vt=e;var a=at;e=rt;var i=32-We(a)-1;a&=~(1<<i),n+=1;var o=32-We(t)+i;if(30<o){var s=i-i%5;o=(a&(1<<s)-1).toString(32),a>>=s,i-=s,at=1<<32-We(t)+i|n<<i|a,rt=o+e}else at=1<<o|n<<i|a,rt=e}function ks(e){e.return!==null&&(Mt(e,1),rd(e,1,0))}function Cs(e){for(;e===Mr;)Mr=cn[--un],cn[un]=null,Or=cn[--un],cn[un]=null;for(;e===Vt;)Vt=Re[--Ee],Re[Ee]=null,rt=Re[--Ee],Re[Ee]=null,at=Re[--Ee],Re[Ee]=null}var Se=null,be=null,z=!1,He=null;function id(e,t){var n=Ie(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function ql(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Se=e,be=St(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Se=e,be=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Vt!==null?{id:at,overflow:rt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ie(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Se=e,be=null,!0):!1;default:return!1}}function Io(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Po(e){if(z){var t=be;if(t){var n=t;if(!ql(e,t)){if(Io(e))throw Error(N(418));t=St(n.nextSibling);var a=Se;t&&ql(e,t)?id(a,n):(e.flags=e.flags&-4097|2,z=!1,Se=e)}}else{if(Io(e))throw Error(N(418));e.flags=e.flags&-4097|2,z=!1,Se=e}}}function Gl(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Se=e}function Qa(e){if(e!==Se)return!1;if(!z)return Gl(e),z=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ko(e.type,e.memoizedProps)),t&&(t=be)){if(Io(e))throw od(),Error(N(418));for(;t;)id(e,t),t=St(t.nextSibling)}if(Gl(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(N(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){be=St(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}be=null}}else be=Se?St(e.stateNode.nextSibling):null;return!0}function od(){for(var e=be;e;)e=St(e.nextSibling)}function Nn(){be=Se=null,z=!1}function Rs(e){He===null?He=[e]:He.push(e)}var Mf=ht.ReactCurrentBatchConfig;function zn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(N(309));var a=n.stateNode}if(!a)throw Error(N(147,e));var i=a,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(s){var l=i.refs;s===null?delete l[o]:l[o]=s},t._stringRef=o,t)}if(typeof e!="string")throw Error(N(284));if(!n._owner)throw Error(N(290,e))}return e}function Ja(e,t){throw e=Object.prototype.toString.call(t),Error(N(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Xl(e){var t=e._init;return t(e._payload)}function sd(e){function t(h,d){if(e){var p=h.deletions;p===null?(h.deletions=[d],h.flags|=16):p.push(d)}}function n(h,d){if(!e)return null;for(;d!==null;)t(h,d),d=d.sibling;return null}function a(h,d){for(h=new Map;d!==null;)d.key!==null?h.set(d.key,d):h.set(d.index,d),d=d.sibling;return h}function i(h,d){return h=kt(h,d),h.index=0,h.sibling=null,h}function o(h,d,p){return h.index=p,e?(p=h.alternate,p!==null?(p=p.index,p<d?(h.flags|=2,d):p):(h.flags|=2,d)):(h.flags|=1048576,d)}function s(h){return e&&h.alternate===null&&(h.flags|=2),h}function l(h,d,p,w){return d===null||d.tag!==6?(d=Yi(p,h.mode,w),d.return=h,d):(d=i(d,p),d.return=h,d)}function c(h,d,p,w){var S=p.type;return S===nn?m(h,d,p.props.children,w,p.key):d!==null&&(d.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===ft&&Xl(S)===d.type)?(w=i(d,p.props),w.ref=zn(h,d,p),w.return=h,w):(w=Tr(p.type,p.key,p.props,null,h.mode,w),w.ref=zn(h,d,p),w.return=h,w)}function u(h,d,p,w){return d===null||d.tag!==4||d.stateNode.containerInfo!==p.containerInfo||d.stateNode.implementation!==p.implementation?(d=Vi(p,h.mode,w),d.return=h,d):(d=i(d,p.children||[]),d.return=h,d)}function m(h,d,p,w,S){return d===null||d.tag!==7?(d=$t(p,h.mode,w,S),d.return=h,d):(d=i(d,p),d.return=h,d)}function f(h,d,p){if(typeof d=="string"&&d!==""||typeof d=="number")return d=Yi(""+d,h.mode,p),d.return=h,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Ba:return p=Tr(d.type,d.key,d.props,null,h.mode,p),p.ref=zn(h,null,d),p.return=h,p;case tn:return d=Vi(d,h.mode,p),d.return=h,d;case ft:var w=d._init;return f(h,w(d._payload),p)}if(Qn(d)||On(d))return d=$t(d,h.mode,p,null),d.return=h,d;Ja(h,d)}return null}function y(h,d,p,w){var S=d!==null?d.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return S!==null?null:l(h,d,""+p,w);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Ba:return p.key===S?c(h,d,p,w):null;case tn:return p.key===S?u(h,d,p,w):null;case ft:return S=p._init,y(h,d,S(p._payload),w)}if(Qn(p)||On(p))return S!==null?null:m(h,d,p,w,null);Ja(h,p)}return null}function x(h,d,p,w,S){if(typeof w=="string"&&w!==""||typeof w=="number")return h=h.get(p)||null,l(d,h,""+w,S);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Ba:return h=h.get(w.key===null?p:w.key)||null,c(d,h,w,S);case tn:return h=h.get(w.key===null?p:w.key)||null,u(d,h,w,S);case ft:var A=w._init;return x(h,d,p,A(w._payload),S)}if(Qn(w)||On(w))return h=h.get(p)||null,m(d,h,w,S,null);Ja(d,w)}return null}function g(h,d,p,w){for(var S=null,A=null,j=d,C=d=0,M=null;j!==null&&C<p.length;C++){j.index>C?(M=j,j=null):M=j.sibling;var I=y(h,j,p[C],w);if(I===null){j===null&&(j=M);break}e&&j&&I.alternate===null&&t(h,j),d=o(I,d,C),A===null?S=I:A.sibling=I,A=I,j=M}if(C===p.length)return n(h,j),z&&Mt(h,C),S;if(j===null){for(;C<p.length;C++)j=f(h,p[C],w),j!==null&&(d=o(j,d,C),A===null?S=j:A.sibling=j,A=j);return z&&Mt(h,C),S}for(j=a(h,j);C<p.length;C++)M=x(j,h,C,p[C],w),M!==null&&(e&&M.alternate!==null&&j.delete(M.key===null?C:M.key),d=o(M,d,C),A===null?S=M:A.sibling=M,A=M);return e&&j.forEach(function(ee){return t(h,ee)}),z&&Mt(h,C),S}function T(h,d,p,w){var S=On(p);if(typeof S!="function")throw Error(N(150));if(p=S.call(p),p==null)throw Error(N(151));for(var A=S=null,j=d,C=d=0,M=null,I=p.next();j!==null&&!I.done;C++,I=p.next()){j.index>C?(M=j,j=null):M=j.sibling;var ee=y(h,j,I.value,w);if(ee===null){j===null&&(j=M);break}e&&j&&ee.alternate===null&&t(h,j),d=o(ee,d,C),A===null?S=ee:A.sibling=ee,A=ee,j=M}if(I.done)return n(h,j),z&&Mt(h,C),S;if(j===null){for(;!I.done;C++,I=p.next())I=f(h,I.value,w),I!==null&&(d=o(I,d,C),A===null?S=I:A.sibling=I,A=I);return z&&Mt(h,C),S}for(j=a(h,j);!I.done;C++,I=p.next())I=x(j,h,C,I.value,w),I!==null&&(e&&I.alternate!==null&&j.delete(I.key===null?C:I.key),d=o(I,d,C),A===null?S=I:A.sibling=I,A=I);return e&&j.forEach(function(Dt){return t(h,Dt)}),z&&Mt(h,C),S}function b(h,d,p,w){if(typeof p=="object"&&p!==null&&p.type===nn&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case Ba:e:{for(var S=p.key,A=d;A!==null;){if(A.key===S){if(S=p.type,S===nn){if(A.tag===7){n(h,A.sibling),d=i(A,p.props.children),d.return=h,h=d;break e}}else if(A.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===ft&&Xl(S)===A.type){n(h,A.sibling),d=i(A,p.props),d.ref=zn(h,A,p),d.return=h,h=d;break e}n(h,A);break}else t(h,A);A=A.sibling}p.type===nn?(d=$t(p.props.children,h.mode,w,p.key),d.return=h,h=d):(w=Tr(p.type,p.key,p.props,null,h.mode,w),w.ref=zn(h,d,p),w.return=h,h=w)}return s(h);case tn:e:{for(A=p.key;d!==null;){if(d.key===A)if(d.tag===4&&d.stateNode.containerInfo===p.containerInfo&&d.stateNode.implementation===p.implementation){n(h,d.sibling),d=i(d,p.children||[]),d.return=h,h=d;break e}else{n(h,d);break}else t(h,d);d=d.sibling}d=Vi(p,h.mode,w),d.return=h,h=d}return s(h);case ft:return A=p._init,b(h,d,A(p._payload),w)}if(Qn(p))return g(h,d,p,w);if(On(p))return T(h,d,p,w);Ja(h,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,d!==null&&d.tag===6?(n(h,d.sibling),d=i(d,p),d.return=h,h=d):(n(h,d),d=Yi(p,h.mode,w),d.return=h,h=d),s(h)):n(h,d)}return b}var jn=sd(!0),ld=sd(!1),Ur=It(null),Hr=null,dn=null,Es=null;function Is(){Es=dn=Hr=null}function Ps(e){var t=Ur.current;W(Ur),e._currentValue=t}function Do(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function xn(e,t){Hr=e,Es=dn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ye=!0),e.firstContext=null)}function De(e){var t=e._currentValue;if(Es!==e)if(e={context:e,memoizedValue:t,next:null},dn===null){if(Hr===null)throw Error(N(308));dn=e,Hr.dependencies={lanes:0,firstContext:e}}else dn=dn.next=e;return t}var Ht=null;function Ds(e){Ht===null?Ht=[e]:Ht.push(e)}function cd(e,t,n,a){var i=t.interleaved;return i===null?(n.next=n,Ds(t)):(n.next=i.next,i.next=n),t.interleaved=n,ct(e,a)}function ct(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var pt=!1;function Fs(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ud(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function it(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Nt(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,O&2){var i=a.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),a.pending=t,ct(e,n)}return i=a.interleaved,i===null?(t.next=t,Ds(a)):(t.next=i.next,i.next=t),a.interleaved=t,ct(e,n)}function fr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,vs(e,n)}}function Ql(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=s:o=o.next=s,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:a.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:a.shared,effects:a.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Br(e,t,n,a){var i=e.updateQueue;pt=!1;var o=i.firstBaseUpdate,s=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var c=l,u=c.next;c.next=null,s===null?o=u:s.next=u,s=c;var m=e.alternate;m!==null&&(m=m.updateQueue,l=m.lastBaseUpdate,l!==s&&(l===null?m.firstBaseUpdate=u:l.next=u,m.lastBaseUpdate=c))}if(o!==null){var f=i.baseState;s=0,m=u=c=null,l=o;do{var y=l.lane,x=l.eventTime;if((a&y)===y){m!==null&&(m=m.next={eventTime:x,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var g=e,T=l;switch(y=t,x=n,T.tag){case 1:if(g=T.payload,typeof g=="function"){f=g.call(x,f,y);break e}f=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=T.payload,y=typeof g=="function"?g.call(x,f,y):g,y==null)break e;f=K({},f,y);break e;case 2:pt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,y=i.effects,y===null?i.effects=[l]:y.push(l))}else x={eventTime:x,lane:y,tag:l.tag,payload:l.payload,callback:l.callback,next:null},m===null?(u=m=x,c=f):m=m.next=x,s|=y;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;y=l,l=y.next,y.next=null,i.lastBaseUpdate=y,i.shared.pending=null}}while(!0);if(m===null&&(c=f),i.baseState=c,i.firstBaseUpdate=u,i.lastBaseUpdate=m,t=i.shared.interleaved,t!==null){i=t;do s|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);qt|=s,e.lanes=s,e.memoizedState=f}}function Jl(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var a=e[t],i=a.callback;if(i!==null){if(a.callback=null,a=n,typeof i!="function")throw Error(N(191,i));i.call(a)}}}var _a={},Ze=It(_a),ba=It(_a),Sa=It(_a);function Bt(e){if(e===_a)throw Error(N(174));return e}function _s(e,t){switch(H(Sa,t),H(ba,e),H(Ze,_a),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:mo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=mo(t,e)}W(Ze),H(Ze,t)}function An(){W(Ze),W(ba),W(Sa)}function dd(e){Bt(Sa.current);var t=Bt(Ze.current),n=mo(t,e.type);t!==n&&(H(ba,e),H(Ze,n))}function Ls(e){ba.current===e&&(W(Ze),W(ba))}var Y=It(0);function Wr(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ui=[];function Ms(){for(var e=0;e<Ui.length;e++)Ui[e]._workInProgressVersionPrimary=null;Ui.length=0}var pr=ht.ReactCurrentDispatcher,Hi=ht.ReactCurrentBatchConfig,Kt=0,V=null,J=null,ne=null,zr=!1,ia=!1,Na=0,Of=0;function se(){throw Error(N(321))}function Os(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!$e(e[n],t[n]))return!1;return!0}function Us(e,t,n,a,i,o){if(Kt=o,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,pr.current=e===null||e.memoizedState===null?Wf:zf,e=n(a,i),ia){o=0;do{if(ia=!1,Na=0,25<=o)throw Error(N(301));o+=1,ne=J=null,t.updateQueue=null,pr.current=$f,e=n(a,i)}while(ia)}if(pr.current=$r,t=J!==null&&J.next!==null,Kt=0,ne=J=V=null,zr=!1,t)throw Error(N(300));return e}function Hs(){var e=Na!==0;return Na=0,e}function qe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ne===null?V.memoizedState=ne=e:ne=ne.next=e,ne}function Fe(){if(J===null){var e=V.alternate;e=e!==null?e.memoizedState:null}else e=J.next;var t=ne===null?V.memoizedState:ne.next;if(t!==null)ne=t,J=e;else{if(e===null)throw Error(N(310));J=e,e={memoizedState:J.memoizedState,baseState:J.baseState,baseQueue:J.baseQueue,queue:J.queue,next:null},ne===null?V.memoizedState=ne=e:ne=ne.next=e}return ne}function ja(e,t){return typeof t=="function"?t(e):t}function Bi(e){var t=Fe(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var a=J,i=a.baseQueue,o=n.pending;if(o!==null){if(i!==null){var s=i.next;i.next=o.next,o.next=s}a.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,a=a.baseState;var l=s=null,c=null,u=o;do{var m=u.lane;if((Kt&m)===m)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),a=u.hasEagerState?u.eagerState:e(a,u.action);else{var f={lane:m,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(l=c=f,s=a):c=c.next=f,V.lanes|=m,qt|=m}u=u.next}while(u!==null&&u!==o);c===null?s=a:c.next=l,$e(a,t.memoizedState)||(ye=!0),t.memoizedState=a,t.baseState=s,t.baseQueue=c,n.lastRenderedState=a}if(e=n.interleaved,e!==null){i=e;do o=i.lane,V.lanes|=o,qt|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Wi(e){var t=Fe(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var a=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var s=i=i.next;do o=e(o,s.action),s=s.next;while(s!==i);$e(o,t.memoizedState)||(ye=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,a]}function hd(){}function md(e,t){var n=V,a=Fe(),i=t(),o=!$e(a.memoizedState,i);if(o&&(a.memoizedState=i,ye=!0),a=a.queue,Bs(yd.bind(null,n,a,e),[e]),a.getSnapshot!==t||o||ne!==null&&ne.memoizedState.tag&1){if(n.flags|=2048,Aa(9,pd.bind(null,n,a,i,t),void 0,null),ae===null)throw Error(N(349));Kt&30||fd(n,t,i)}return i}function fd(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=V.updateQueue,t===null?(t={lastEffect:null,stores:null},V.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function pd(e,t,n,a){t.value=n,t.getSnapshot=a,gd(t)&&xd(e)}function yd(e,t,n){return n(function(){gd(t)&&xd(e)})}function gd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!$e(e,n)}catch{return!0}}function xd(e){var t=ct(e,1);t!==null&&ze(t,e,1,-1)}function Zl(e){var t=qe();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ja,lastRenderedState:e},t.queue=e,e=e.dispatch=Bf.bind(null,V,e),[t.memoizedState,e]}function Aa(e,t,n,a){return e={tag:e,create:t,destroy:n,deps:a,next:null},t=V.updateQueue,t===null?(t={lastEffect:null,stores:null},V.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e)),e}function vd(){return Fe().memoizedState}function yr(e,t,n,a){var i=qe();V.flags|=e,i.memoizedState=Aa(1|t,n,void 0,a===void 0?null:a)}function oi(e,t,n,a){var i=Fe();a=a===void 0?null:a;var o=void 0;if(J!==null){var s=J.memoizedState;if(o=s.destroy,a!==null&&Os(a,s.deps)){i.memoizedState=Aa(t,n,o,a);return}}V.flags|=e,i.memoizedState=Aa(1|t,n,o,a)}function ec(e,t){return yr(8390656,8,e,t)}function Bs(e,t){return oi(2048,8,e,t)}function Td(e,t){return oi(4,2,e,t)}function wd(e,t){return oi(4,4,e,t)}function bd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Sd(e,t,n){return n=n!=null?n.concat([e]):null,oi(4,4,bd.bind(null,t,e),n)}function Ws(){}function Nd(e,t){var n=Fe();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&Os(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function jd(e,t){var n=Fe();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&Os(t,a[1])?a[0]:(e=e(),n.memoizedState=[e,t],e)}function Ad(e,t,n){return Kt&21?($e(n,t)||(n=Iu(),V.lanes|=n,qt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ye=!0),e.memoizedState=n)}function Uf(e,t){var n=U;U=n!==0&&4>n?n:4,e(!0);var a=Hi.transition;Hi.transition={};try{e(!1),t()}finally{U=n,Hi.transition=a}}function kd(){return Fe().memoizedState}function Hf(e,t,n){var a=At(e);if(n={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null},Cd(e))Rd(t,n);else if(n=cd(e,t,n,a),n!==null){var i=he();ze(n,e,a,i),Ed(n,t,a)}}function Bf(e,t,n){var a=At(e),i={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(Cd(e))Rd(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var s=t.lastRenderedState,l=o(s,n);if(i.hasEagerState=!0,i.eagerState=l,$e(l,s)){var c=t.interleaved;c===null?(i.next=i,Ds(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}finally{}n=cd(e,t,i,a),n!==null&&(i=he(),ze(n,e,a,i),Ed(n,t,a))}}function Cd(e){var t=e.alternate;return e===V||t!==null&&t===V}function Rd(e,t){ia=zr=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ed(e,t,n){if(n&4194240){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,vs(e,n)}}var $r={readContext:De,useCallback:se,useContext:se,useEffect:se,useImperativeHandle:se,useInsertionEffect:se,useLayoutEffect:se,useMemo:se,useReducer:se,useRef:se,useState:se,useDebugValue:se,useDeferredValue:se,useTransition:se,useMutableSource:se,useSyncExternalStore:se,useId:se,unstable_isNewReconciler:!1},Wf={readContext:De,useCallback:function(e,t){return qe().memoizedState=[e,t===void 0?null:t],e},useContext:De,useEffect:ec,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,yr(4194308,4,bd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return yr(4194308,4,e,t)},useInsertionEffect:function(e,t){return yr(4,2,e,t)},useMemo:function(e,t){var n=qe();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var a=qe();return t=n!==void 0?n(t):t,a.memoizedState=a.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},a.queue=e,e=e.dispatch=Hf.bind(null,V,e),[a.memoizedState,e]},useRef:function(e){var t=qe();return e={current:e},t.memoizedState=e},useState:Zl,useDebugValue:Ws,useDeferredValue:function(e){return qe().memoizedState=e},useTransition:function(){var e=Zl(!1),t=e[0];return e=Uf.bind(null,e[1]),qe().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var a=V,i=qe();if(z){if(n===void 0)throw Error(N(407));n=n()}else{if(n=t(),ae===null)throw Error(N(349));Kt&30||fd(a,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,ec(yd.bind(null,a,o,e),[e]),a.flags|=2048,Aa(9,pd.bind(null,a,o,n,t),void 0,null),n},useId:function(){var e=qe(),t=ae.identifierPrefix;if(z){var n=rt,a=at;n=(a&~(1<<32-We(a)-1)).toString(32)+n,t=":"+t+"R"+n,n=Na++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Of++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},zf={readContext:De,useCallback:Nd,useContext:De,useEffect:Bs,useImperativeHandle:Sd,useInsertionEffect:Td,useLayoutEffect:wd,useMemo:jd,useReducer:Bi,useRef:vd,useState:function(){return Bi(ja)},useDebugValue:Ws,useDeferredValue:function(e){var t=Fe();return Ad(t,J.memoizedState,e)},useTransition:function(){var e=Bi(ja)[0],t=Fe().memoizedState;return[e,t]},useMutableSource:hd,useSyncExternalStore:md,useId:kd,unstable_isNewReconciler:!1},$f={readContext:De,useCallback:Nd,useContext:De,useEffect:Bs,useImperativeHandle:Sd,useInsertionEffect:Td,useLayoutEffect:wd,useMemo:jd,useReducer:Wi,useRef:vd,useState:function(){return Wi(ja)},useDebugValue:Ws,useDeferredValue:function(e){var t=Fe();return J===null?t.memoizedState=e:Ad(t,J.memoizedState,e)},useTransition:function(){var e=Wi(ja)[0],t=Fe().memoizedState;return[e,t]},useMutableSource:hd,useSyncExternalStore:md,useId:kd,unstable_isNewReconciler:!1};function Oe(e,t){if(e&&e.defaultProps){t=K({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Fo(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:K({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var si={isMounted:function(e){return(e=e._reactInternals)?Qt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var a=he(),i=At(e),o=it(a,i);o.payload=t,n!=null&&(o.callback=n),t=Nt(e,o,i),t!==null&&(ze(t,e,i,a),fr(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=he(),i=At(e),o=it(a,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Nt(e,o,i),t!==null&&(ze(t,e,i,a),fr(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=he(),a=At(e),i=it(n,a);i.tag=2,t!=null&&(i.callback=t),t=Nt(e,i,a),t!==null&&(ze(t,e,a,n),fr(t,e,a))}};function tc(e,t,n,a,i,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,o,s):t.prototype&&t.prototype.isPureReactComponent?!xa(n,a)||!xa(i,o):!0}function Id(e,t,n){var a=!1,i=Rt,o=t.contextType;return typeof o=="object"&&o!==null?o=De(o):(i=xe(t)?Yt:ue.current,a=t.contextTypes,o=(a=a!=null)?Sn(e,i):Rt),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=si,e.stateNode=t,t._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function nc(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&si.enqueueReplaceState(t,t.state,null)}function _o(e,t,n,a){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Fs(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=De(o):(o=xe(t)?Yt:ue.current,i.context=Sn(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Fo(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&si.enqueueReplaceState(i,i.state,null),Br(e,n,i,a),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function kn(e,t){try{var n="",a=t;do n+=gm(a),a=a.return;while(a);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function zi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Lo(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Yf=typeof WeakMap=="function"?WeakMap:Map;function Pd(e,t,n){n=it(-1,n),n.tag=3,n.payload={element:null};var a=t.value;return n.callback=function(){Vr||(Vr=!0,Vo=a),Lo(e,t)},n}function Dd(e,t,n){n=it(-1,n),n.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var i=t.value;n.payload=function(){return a(i)},n.callback=function(){Lo(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Lo(e,t),typeof a!="function"&&(jt===null?jt=new Set([this]):jt.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function ac(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new Yf;var i=new Set;a.set(t,i)}else i=a.get(t),i===void 0&&(i=new Set,a.set(t,i));i.has(n)||(i.add(n),e=ip.bind(null,e,t,n),t.then(e,e))}function rc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ic(e,t,n,a,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=it(-1,1),t.tag=2,Nt(n,t,1))),n.lanes|=1),e)}var Vf=ht.ReactCurrentOwner,ye=!1;function de(e,t,n,a){t.child=e===null?ld(t,null,n,a):jn(t,e.child,n,a)}function oc(e,t,n,a,i){n=n.render;var o=t.ref;return xn(t,i),a=Us(e,t,n,a,o,i),n=Hs(),e!==null&&!ye?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,ut(e,t,i)):(z&&n&&ks(t),t.flags|=1,de(e,t,a,i),t.child)}function sc(e,t,n,a,i){if(e===null){var o=n.type;return typeof o=="function"&&!Xs(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Fd(e,t,o,a,i)):(e=Tr(n.type,null,a,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var s=o.memoizedProps;if(n=n.compare,n=n!==null?n:xa,n(s,a)&&e.ref===t.ref)return ut(e,t,i)}return t.flags|=1,e=kt(o,a),e.ref=t.ref,e.return=t,t.child=e}function Fd(e,t,n,a,i){if(e!==null){var o=e.memoizedProps;if(xa(o,a)&&e.ref===t.ref)if(ye=!1,t.pendingProps=a=o,(e.lanes&i)!==0)e.flags&131072&&(ye=!0);else return t.lanes=e.lanes,ut(e,t,i)}return Mo(e,t,n,a,i)}function _d(e,t,n){var a=t.pendingProps,i=a.children,o=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},H(mn,we),we|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,H(mn,we),we|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=o!==null?o.baseLanes:n,H(mn,we),we|=a}else o!==null?(a=o.baseLanes|n,t.memoizedState=null):a=n,H(mn,we),we|=a;return de(e,t,i,n),t.child}function Ld(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Mo(e,t,n,a,i){var o=xe(n)?Yt:ue.current;return o=Sn(t,o),xn(t,i),n=Us(e,t,n,a,o,i),a=Hs(),e!==null&&!ye?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,ut(e,t,i)):(z&&a&&ks(t),t.flags|=1,de(e,t,n,i),t.child)}function lc(e,t,n,a,i){if(xe(n)){var o=!0;Lr(t)}else o=!1;if(xn(t,i),t.stateNode===null)gr(e,t),Id(t,n,a),_o(t,n,a,i),a=!0;else if(e===null){var s=t.stateNode,l=t.memoizedProps;s.props=l;var c=s.context,u=n.contextType;typeof u=="object"&&u!==null?u=De(u):(u=xe(n)?Yt:ue.current,u=Sn(t,u));var m=n.getDerivedStateFromProps,f=typeof m=="function"||typeof s.getSnapshotBeforeUpdate=="function";f||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==a||c!==u)&&nc(t,s,a,u),pt=!1;var y=t.memoizedState;s.state=y,Br(t,a,s,i),c=t.memoizedState,l!==a||y!==c||ge.current||pt?(typeof m=="function"&&(Fo(t,n,m,a),c=t.memoizedState),(l=pt||tc(t,n,l,a,y,c,u))?(f||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=c),s.props=a,s.state=c,s.context=u,a=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{s=t.stateNode,ud(e,t),l=t.memoizedProps,u=t.type===t.elementType?l:Oe(t.type,l),s.props=u,f=t.pendingProps,y=s.context,c=n.contextType,typeof c=="object"&&c!==null?c=De(c):(c=xe(n)?Yt:ue.current,c=Sn(t,c));var x=n.getDerivedStateFromProps;(m=typeof x=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==f||y!==c)&&nc(t,s,a,c),pt=!1,y=t.memoizedState,s.state=y,Br(t,a,s,i);var g=t.memoizedState;l!==f||y!==g||ge.current||pt?(typeof x=="function"&&(Fo(t,n,x,a),g=t.memoizedState),(u=pt||tc(t,n,u,a,y,g,c)||!1)?(m||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(a,g,c),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(a,g,c)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=g),s.props=a,s.state=g,s.context=c,a=u):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),a=!1)}return Oo(e,t,n,a,o,i)}function Oo(e,t,n,a,i,o){Ld(e,t);var s=(t.flags&128)!==0;if(!a&&!s)return i&&Kl(t,n,!1),ut(e,t,o);a=t.stateNode,Vf.current=t;var l=s&&typeof n.getDerivedStateFromError!="function"?null:a.render();return t.flags|=1,e!==null&&s?(t.child=jn(t,e.child,null,o),t.child=jn(t,null,l,o)):de(e,t,l,o),t.memoizedState=a.state,i&&Kl(t,n,!0),t.child}function Md(e){var t=e.stateNode;t.pendingContext?Vl(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Vl(e,t.context,!1),_s(e,t.containerInfo)}function cc(e,t,n,a,i){return Nn(),Rs(i),t.flags|=256,de(e,t,n,a),t.child}var Uo={dehydrated:null,treeContext:null,retryLane:0};function Ho(e){return{baseLanes:e,cachePool:null,transitions:null}}function Od(e,t,n){var a=t.pendingProps,i=Y.current,o=!1,s=(t.flags&128)!==0,l;if((l=s)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),H(Y,i&1),e===null)return Po(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=a.children,e=a.fallback,o?(a=t.mode,o=t.child,s={mode:"hidden",children:s},!(a&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=ui(s,a,0,null),e=$t(e,a,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Ho(n),t.memoizedState=Uo,e):zs(t,s));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return Kf(e,t,s,a,l,i,n);if(o){o=a.fallback,s=t.mode,i=e.child,l=i.sibling;var c={mode:"hidden",children:a.children};return!(s&1)&&t.child!==i?(a=t.child,a.childLanes=0,a.pendingProps=c,t.deletions=null):(a=kt(i,c),a.subtreeFlags=i.subtreeFlags&14680064),l!==null?o=kt(l,o):(o=$t(o,s,n,null),o.flags|=2),o.return=t,a.return=t,a.sibling=o,t.child=a,a=o,o=t.child,s=e.child.memoizedState,s=s===null?Ho(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~n,t.memoizedState=Uo,a}return o=e.child,e=o.sibling,a=kt(o,{mode:"visible",children:a.children}),!(t.mode&1)&&(a.lanes=n),a.return=t,a.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a}function zs(e,t){return t=ui({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Za(e,t,n,a){return a!==null&&Rs(a),jn(t,e.child,null,n),e=zs(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Kf(e,t,n,a,i,o,s){if(n)return t.flags&256?(t.flags&=-257,a=zi(Error(N(422))),Za(e,t,s,a)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=a.fallback,i=t.mode,a=ui({mode:"visible",children:a.children},i,0,null),o=$t(o,i,s,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,t.mode&1&&jn(t,e.child,null,s),t.child.memoizedState=Ho(s),t.memoizedState=Uo,o);if(!(t.mode&1))return Za(e,t,s,null);if(i.data==="$!"){if(a=i.nextSibling&&i.nextSibling.dataset,a)var l=a.dgst;return a=l,o=Error(N(419)),a=zi(o,a,void 0),Za(e,t,s,a)}if(l=(s&e.childLanes)!==0,ye||l){if(a=ae,a!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(a.suspendedLanes|s)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,ct(e,i),ze(a,e,i,-1))}return Gs(),a=zi(Error(N(421))),Za(e,t,s,a)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=op.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,be=St(i.nextSibling),Se=t,z=!0,He=null,e!==null&&(Re[Ee++]=at,Re[Ee++]=rt,Re[Ee++]=Vt,at=e.id,rt=e.overflow,Vt=t),t=zs(t,a.children),t.flags|=4096,t)}function uc(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Do(e.return,t,n)}function $i(e,t,n,a,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=n,o.tailMode=i)}function Ud(e,t,n){var a=t.pendingProps,i=a.revealOrder,o=a.tail;if(de(e,t,a.children,n),a=Y.current,a&2)a=a&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&uc(e,n,t);else if(e.tag===19)uc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(H(Y,a),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Wr(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),$i(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Wr(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}$i(t,!0,n,null,o);break;case"together":$i(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function gr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ut(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),qt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(N(153));if(t.child!==null){for(e=t.child,n=kt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=kt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function qf(e,t,n){switch(t.tag){case 3:Md(t),Nn();break;case 5:dd(t);break;case 1:xe(t.type)&&Lr(t);break;case 4:_s(t,t.stateNode.containerInfo);break;case 10:var a=t.type._context,i=t.memoizedProps.value;H(Ur,a._currentValue),a._currentValue=i;break;case 13:if(a=t.memoizedState,a!==null)return a.dehydrated!==null?(H(Y,Y.current&1),t.flags|=128,null):n&t.child.childLanes?Od(e,t,n):(H(Y,Y.current&1),e=ut(e,t,n),e!==null?e.sibling:null);H(Y,Y.current&1);break;case 19:if(a=(n&t.childLanes)!==0,e.flags&128){if(a)return Ud(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),H(Y,Y.current),a)break;return null;case 22:case 23:return t.lanes=0,_d(e,t,n)}return ut(e,t,n)}var Hd,Bo,Bd,Wd;Hd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Bo=function(){};Bd=function(e,t,n,a){var i=e.memoizedProps;if(i!==a){e=t.stateNode,Bt(Ze.current);var o=null;switch(n){case"input":i=lo(e,i),a=lo(e,a),o=[];break;case"select":i=K({},i,{value:void 0}),a=K({},a,{value:void 0}),o=[];break;case"textarea":i=ho(e,i),a=ho(e,a),o=[];break;default:typeof i.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=Fr)}fo(n,a);var s;n=null;for(u in i)if(!a.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var l=i[u];for(s in l)l.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(da.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in a){var c=a[u];if(l=i!=null?i[u]:void 0,a.hasOwnProperty(u)&&c!==l&&(c!=null||l!=null))if(u==="style")if(l){for(s in l)!l.hasOwnProperty(s)||c&&c.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in c)c.hasOwnProperty(s)&&l[s]!==c[s]&&(n||(n={}),n[s]=c[s])}else n||(o||(o=[]),o.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(o=o||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(da.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&B("scroll",e),o||l===c||(o=[])):(o=o||[]).push(u,c))}n&&(o=o||[]).push("style",n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};Wd=function(e,t,n,a){n!==a&&(t.flags|=4)};function $n(e,t){if(!z)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function le(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,a|=i.subtreeFlags&14680064,a|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,a|=i.subtreeFlags,a|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function Gf(e,t,n){var a=t.pendingProps;switch(Cs(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return le(t),null;case 1:return xe(t.type)&&_r(),le(t),null;case 3:return a=t.stateNode,An(),W(ge),W(ue),Ms(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Qa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,He!==null&&(Go(He),He=null))),Bo(e,t),le(t),null;case 5:Ls(t);var i=Bt(Sa.current);if(n=t.type,e!==null&&t.stateNode!=null)Bd(e,t,n,a,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!a){if(t.stateNode===null)throw Error(N(166));return le(t),null}if(e=Bt(Ze.current),Qa(t)){a=t.stateNode,n=t.type;var o=t.memoizedProps;switch(a[Xe]=t,a[wa]=o,e=(t.mode&1)!==0,n){case"dialog":B("cancel",a),B("close",a);break;case"iframe":case"object":case"embed":B("load",a);break;case"video":case"audio":for(i=0;i<Zn.length;i++)B(Zn[i],a);break;case"source":B("error",a);break;case"img":case"image":case"link":B("error",a),B("load",a);break;case"details":B("toggle",a);break;case"input":vl(a,o),B("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!o.multiple},B("invalid",a);break;case"textarea":wl(a,o),B("invalid",a)}fo(n,o),i=null;for(var s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="children"?typeof l=="string"?a.textContent!==l&&(o.suppressHydrationWarning!==!0&&Xa(a.textContent,l,e),i=["children",l]):typeof l=="number"&&a.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&Xa(a.textContent,l,e),i=["children",""+l]):da.hasOwnProperty(s)&&l!=null&&s==="onScroll"&&B("scroll",a)}switch(n){case"input":Wa(a),Tl(a,o,!0);break;case"textarea":Wa(a),bl(a);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(a.onclick=Fr)}a=i,t.updateQueue=a,a!==null&&(t.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=yu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=s.createElement(n,{is:a.is}):(e=s.createElement(n),n==="select"&&(s=e,a.multiple?s.multiple=!0:a.size&&(s.size=a.size))):e=s.createElementNS(e,n),e[Xe]=t,e[wa]=a,Hd(e,t,!1,!1),t.stateNode=e;e:{switch(s=po(n,a),n){case"dialog":B("cancel",e),B("close",e),i=a;break;case"iframe":case"object":case"embed":B("load",e),i=a;break;case"video":case"audio":for(i=0;i<Zn.length;i++)B(Zn[i],e);i=a;break;case"source":B("error",e),i=a;break;case"img":case"image":case"link":B("error",e),B("load",e),i=a;break;case"details":B("toggle",e),i=a;break;case"input":vl(e,a),i=lo(e,a),B("invalid",e);break;case"option":i=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},i=K({},a,{value:void 0}),B("invalid",e);break;case"textarea":wl(e,a),i=ho(e,a),B("invalid",e);break;default:i=a}fo(n,i),l=i;for(o in l)if(l.hasOwnProperty(o)){var c=l[o];o==="style"?vu(e,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&gu(e,c)):o==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&ha(e,c):typeof c=="number"&&ha(e,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(da.hasOwnProperty(o)?c!=null&&o==="onScroll"&&B("scroll",e):c!=null&&ms(e,o,c,s))}switch(n){case"input":Wa(e),Tl(e,a,!1);break;case"textarea":Wa(e),bl(e);break;case"option":a.value!=null&&e.setAttribute("value",""+Ct(a.value));break;case"select":e.multiple=!!a.multiple,o=a.value,o!=null?fn(e,!!a.multiple,o,!1):a.defaultValue!=null&&fn(e,!!a.multiple,a.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Fr)}switch(n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return le(t),null;case 6:if(e&&t.stateNode!=null)Wd(e,t,e.memoizedProps,a);else{if(typeof a!="string"&&t.stateNode===null)throw Error(N(166));if(n=Bt(Sa.current),Bt(Ze.current),Qa(t)){if(a=t.stateNode,n=t.memoizedProps,a[Xe]=t,(o=a.nodeValue!==n)&&(e=Se,e!==null))switch(e.tag){case 3:Xa(a.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Xa(a.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else a=(n.nodeType===9?n:n.ownerDocument).createTextNode(a),a[Xe]=t,t.stateNode=a}return le(t),null;case 13:if(W(Y),a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(z&&be!==null&&t.mode&1&&!(t.flags&128))od(),Nn(),t.flags|=98560,o=!1;else if(o=Qa(t),a!==null&&a.dehydrated!==null){if(e===null){if(!o)throw Error(N(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(N(317));o[Xe]=t}else Nn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;le(t),o=!1}else He!==null&&(Go(He),He=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(t.child.flags|=8192,t.mode&1&&(e===null||Y.current&1?Z===0&&(Z=3):Gs())),t.updateQueue!==null&&(t.flags|=4),le(t),null);case 4:return An(),Bo(e,t),e===null&&va(t.stateNode.containerInfo),le(t),null;case 10:return Ps(t.type._context),le(t),null;case 17:return xe(t.type)&&_r(),le(t),null;case 19:if(W(Y),o=t.memoizedState,o===null)return le(t),null;if(a=(t.flags&128)!==0,s=o.rendering,s===null)if(a)$n(o,!1);else{if(Z!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=Wr(e),s!==null){for(t.flags|=128,$n(o,!1),a=s.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),t.subtreeFlags=0,a=n,n=t.child;n!==null;)o=n,e=a,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return H(Y,Y.current&1|2),t.child}e=e.sibling}o.tail!==null&&X()>Cn&&(t.flags|=128,a=!0,$n(o,!1),t.lanes=4194304)}else{if(!a)if(e=Wr(s),e!==null){if(t.flags|=128,a=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),$n(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!z)return le(t),null}else 2*X()-o.renderingStartTime>Cn&&n!==1073741824&&(t.flags|=128,a=!0,$n(o,!1),t.lanes=4194304);o.isBackwards?(s.sibling=t.child,t.child=s):(n=o.last,n!==null?n.sibling=s:t.child=s,o.last=s)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=X(),t.sibling=null,n=Y.current,H(Y,a?n&1|2:n&1),t):(le(t),null);case 22:case 23:return qs(),a=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(t.flags|=8192),a&&t.mode&1?we&1073741824&&(le(t),t.subtreeFlags&6&&(t.flags|=8192)):le(t),null;case 24:return null;case 25:return null}throw Error(N(156,t.tag))}function Xf(e,t){switch(Cs(t),t.tag){case 1:return xe(t.type)&&_r(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return An(),W(ge),W(ue),Ms(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ls(t),null;case 13:if(W(Y),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(N(340));Nn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return W(Y),null;case 4:return An(),null;case 10:return Ps(t.type._context),null;case 22:case 23:return qs(),null;case 24:return null;default:return null}}var er=!1,ce=!1,Qf=typeof WeakSet=="function"?WeakSet:Set,k=null;function hn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(a){q(e,t,a)}else n.current=null}function Wo(e,t,n){try{n()}catch(a){q(e,t,a)}}var dc=!1;function Jf(e,t){if(jo=Ir,e=Ku(),As(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var i=a.anchorOffset,o=a.focusNode;a=a.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var s=0,l=-1,c=-1,u=0,m=0,f=e,y=null;t:for(;;){for(var x;f!==n||i!==0&&f.nodeType!==3||(l=s+i),f!==o||a!==0&&f.nodeType!==3||(c=s+a),f.nodeType===3&&(s+=f.nodeValue.length),(x=f.firstChild)!==null;)y=f,f=x;for(;;){if(f===e)break t;if(y===n&&++u===i&&(l=s),y===o&&++m===a&&(c=s),(x=f.nextSibling)!==null)break;f=y,y=f.parentNode}f=x}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ao={focusedElem:e,selectionRange:n},Ir=!1,k=t;k!==null;)if(t=k,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,k=e;else for(;k!==null;){t=k;try{var g=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var T=g.memoizedProps,b=g.memoizedState,h=t.stateNode,d=h.getSnapshotBeforeUpdate(t.elementType===t.type?T:Oe(t.type,T),b);h.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(N(163))}}catch(w){q(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,k=e;break}k=t.return}return g=dc,dc=!1,g}function oa(e,t,n){var a=t.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var i=a=a.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&Wo(t,n,o)}i=i.next}while(i!==a)}}function li(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var a=n.create;n.destroy=a()}n=n.next}while(n!==t)}}function zo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function zd(e){var t=e.alternate;t!==null&&(e.alternate=null,zd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Xe],delete t[wa],delete t[Ro],delete t[Ff],delete t[_f])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function $d(e){return e.tag===5||e.tag===3||e.tag===4}function hc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||$d(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function $o(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Fr));else if(a!==4&&(e=e.child,e!==null))for($o(e,t,n),e=e.sibling;e!==null;)$o(e,t,n),e=e.sibling}function Yo(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(Yo(e,t,n),e=e.sibling;e!==null;)Yo(e,t,n),e=e.sibling}var re=null,Ue=!1;function mt(e,t,n){for(n=n.child;n!==null;)Yd(e,t,n),n=n.sibling}function Yd(e,t,n){if(Je&&typeof Je.onCommitFiberUnmount=="function")try{Je.onCommitFiberUnmount(ei,n)}catch{}switch(n.tag){case 5:ce||hn(n,t);case 6:var a=re,i=Ue;re=null,mt(e,t,n),re=a,Ue=i,re!==null&&(Ue?(e=re,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):re.removeChild(n.stateNode));break;case 18:re!==null&&(Ue?(e=re,n=n.stateNode,e.nodeType===8?Mi(e.parentNode,n):e.nodeType===1&&Mi(e,n),ya(e)):Mi(re,n.stateNode));break;case 4:a=re,i=Ue,re=n.stateNode.containerInfo,Ue=!0,mt(e,t,n),re=a,Ue=i;break;case 0:case 11:case 14:case 15:if(!ce&&(a=n.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){i=a=a.next;do{var o=i,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&Wo(n,t,s),i=i.next}while(i!==a)}mt(e,t,n);break;case 1:if(!ce&&(hn(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=n.memoizedProps,a.state=n.memoizedState,a.componentWillUnmount()}catch(l){q(n,t,l)}mt(e,t,n);break;case 21:mt(e,t,n);break;case 22:n.mode&1?(ce=(a=ce)||n.memoizedState!==null,mt(e,t,n),ce=a):mt(e,t,n);break;default:mt(e,t,n)}}function mc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Qf),t.forEach(function(a){var i=sp.bind(null,e,a);n.has(a)||(n.add(a),a.then(i,i))})}}function Me(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var i=n[a];try{var o=e,s=t,l=s;e:for(;l!==null;){switch(l.tag){case 5:re=l.stateNode,Ue=!1;break e;case 3:re=l.stateNode.containerInfo,Ue=!0;break e;case 4:re=l.stateNode.containerInfo,Ue=!0;break e}l=l.return}if(re===null)throw Error(N(160));Yd(o,s,i),re=null,Ue=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(u){q(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Vd(t,e),t=t.sibling}function Vd(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Me(t,e),Ke(e),a&4){try{oa(3,e,e.return),li(3,e)}catch(T){q(e,e.return,T)}try{oa(5,e,e.return)}catch(T){q(e,e.return,T)}}break;case 1:Me(t,e),Ke(e),a&512&&n!==null&&hn(n,n.return);break;case 5:if(Me(t,e),Ke(e),a&512&&n!==null&&hn(n,n.return),e.flags&32){var i=e.stateNode;try{ha(i,"")}catch(T){q(e,e.return,T)}}if(a&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,s=n!==null?n.memoizedProps:o,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&fu(i,o),po(l,s);var u=po(l,o);for(s=0;s<c.length;s+=2){var m=c[s],f=c[s+1];m==="style"?vu(i,f):m==="dangerouslySetInnerHTML"?gu(i,f):m==="children"?ha(i,f):ms(i,m,f,u)}switch(l){case"input":co(i,o);break;case"textarea":pu(i,o);break;case"select":var y=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var x=o.value;x!=null?fn(i,!!o.multiple,x,!1):y!==!!o.multiple&&(o.defaultValue!=null?fn(i,!!o.multiple,o.defaultValue,!0):fn(i,!!o.multiple,o.multiple?[]:"",!1))}i[wa]=o}catch(T){q(e,e.return,T)}}break;case 6:if(Me(t,e),Ke(e),a&4){if(e.stateNode===null)throw Error(N(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(T){q(e,e.return,T)}}break;case 3:if(Me(t,e),Ke(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{ya(t.containerInfo)}catch(T){q(e,e.return,T)}break;case 4:Me(t,e),Ke(e);break;case 13:Me(t,e),Ke(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(Vs=X())),a&4&&mc(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(ce=(u=ce)||m,Me(t,e),ce=u):Me(t,e),Ke(e),a&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!m&&e.mode&1)for(k=e,m=e.child;m!==null;){for(f=k=m;k!==null;){switch(y=k,x=y.child,y.tag){case 0:case 11:case 14:case 15:oa(4,y,y.return);break;case 1:hn(y,y.return);var g=y.stateNode;if(typeof g.componentWillUnmount=="function"){a=y,n=y.return;try{t=a,g.props=t.memoizedProps,g.state=t.memoizedState,g.componentWillUnmount()}catch(T){q(a,n,T)}}break;case 5:hn(y,y.return);break;case 22:if(y.memoizedState!==null){pc(f);continue}}x!==null?(x.return=y,k=x):pc(f)}m=m.sibling}e:for(m=null,f=e;;){if(f.tag===5){if(m===null){m=f;try{i=f.stateNode,u?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=f.stateNode,c=f.memoizedProps.style,s=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=xu("display",s))}catch(T){q(e,e.return,T)}}}else if(f.tag===6){if(m===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(T){q(e,e.return,T)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;m===f&&(m=null),f=f.return}m===f&&(m=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Me(t,e),Ke(e),a&4&&mc(e);break;case 21:break;default:Me(t,e),Ke(e)}}function Ke(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if($d(n)){var a=n;break e}n=n.return}throw Error(N(160))}switch(a.tag){case 5:var i=a.stateNode;a.flags&32&&(ha(i,""),a.flags&=-33);var o=hc(e);Yo(e,o,i);break;case 3:case 4:var s=a.stateNode.containerInfo,l=hc(e);$o(e,l,s);break;default:throw Error(N(161))}}catch(c){q(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Zf(e,t,n){k=e,Kd(e)}function Kd(e,t,n){for(var a=(e.mode&1)!==0;k!==null;){var i=k,o=i.child;if(i.tag===22&&a){var s=i.memoizedState!==null||er;if(!s){var l=i.alternate,c=l!==null&&l.memoizedState!==null||ce;l=er;var u=ce;if(er=s,(ce=c)&&!u)for(k=i;k!==null;)s=k,c=s.child,s.tag===22&&s.memoizedState!==null?yc(i):c!==null?(c.return=s,k=c):yc(i);for(;o!==null;)k=o,Kd(o),o=o.sibling;k=i,er=l,ce=u}fc(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,k=o):fc(e)}}function fc(e){for(;k!==null;){var t=k;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ce||li(5,t);break;case 1:var a=t.stateNode;if(t.flags&4&&!ce)if(n===null)a.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Oe(t.type,n.memoizedProps);a.componentDidUpdate(i,n.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Jl(t,o,a);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Jl(t,s,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var m=u.memoizedState;if(m!==null){var f=m.dehydrated;f!==null&&ya(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(N(163))}ce||t.flags&512&&zo(t)}catch(y){q(t,t.return,y)}}if(t===e){k=null;break}if(n=t.sibling,n!==null){n.return=t.return,k=n;break}k=t.return}}function pc(e){for(;k!==null;){var t=k;if(t===e){k=null;break}var n=t.sibling;if(n!==null){n.return=t.return,k=n;break}k=t.return}}function yc(e){for(;k!==null;){var t=k;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{li(4,t)}catch(c){q(t,n,c)}break;case 1:var a=t.stateNode;if(typeof a.componentDidMount=="function"){var i=t.return;try{a.componentDidMount()}catch(c){q(t,i,c)}}var o=t.return;try{zo(t)}catch(c){q(t,o,c)}break;case 5:var s=t.return;try{zo(t)}catch(c){q(t,s,c)}}}catch(c){q(t,t.return,c)}if(t===e){k=null;break}var l=t.sibling;if(l!==null){l.return=t.return,k=l;break}k=t.return}}var ep=Math.ceil,Yr=ht.ReactCurrentDispatcher,$s=ht.ReactCurrentOwner,Pe=ht.ReactCurrentBatchConfig,O=0,ae=null,Q=null,ie=0,we=0,mn=It(0),Z=0,ka=null,qt=0,ci=0,Ys=0,sa=null,pe=null,Vs=0,Cn=1/0,tt=null,Vr=!1,Vo=null,jt=null,tr=!1,vt=null,Kr=0,la=0,Ko=null,xr=-1,vr=0;function he(){return O&6?X():xr!==-1?xr:xr=X()}function At(e){return e.mode&1?O&2&&ie!==0?ie&-ie:Mf.transition!==null?(vr===0&&(vr=Iu()),vr):(e=U,e!==0||(e=window.event,e=e===void 0?16:Ou(e.type)),e):1}function ze(e,t,n,a){if(50<la)throw la=0,Ko=null,Error(N(185));Pa(e,n,a),(!(O&2)||e!==ae)&&(e===ae&&(!(O&2)&&(ci|=n),Z===4&&gt(e,ie)),ve(e,a),n===1&&O===0&&!(t.mode&1)&&(Cn=X()+500,ii&&Pt()))}function ve(e,t){var n=e.callbackNode;Lm(e,t);var a=Er(e,e===ae?ie:0);if(a===0)n!==null&&jl(n),e.callbackNode=null,e.callbackPriority=0;else if(t=a&-a,e.callbackPriority!==t){if(n!=null&&jl(n),t===1)e.tag===0?Lf(gc.bind(null,e)):ad(gc.bind(null,e)),Pf(function(){!(O&6)&&Pt()}),n=null;else{switch(Pu(a)){case 1:n=xs;break;case 4:n=Ru;break;case 16:n=Rr;break;case 536870912:n=Eu;break;default:n=Rr}n=th(n,qd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function qd(e,t){if(xr=-1,vr=0,O&6)throw Error(N(327));var n=e.callbackNode;if(vn()&&e.callbackNode!==n)return null;var a=Er(e,e===ae?ie:0);if(a===0)return null;if(a&30||a&e.expiredLanes||t)t=qr(e,a);else{t=a;var i=O;O|=2;var o=Xd();(ae!==e||ie!==t)&&(tt=null,Cn=X()+500,zt(e,t));do try{ap();break}catch(l){Gd(e,l)}while(!0);Is(),Yr.current=o,O=i,Q!==null?t=0:(ae=null,ie=0,t=Z)}if(t!==0){if(t===2&&(i=To(e),i!==0&&(a=i,t=qo(e,i))),t===1)throw n=ka,zt(e,0),gt(e,a),ve(e,X()),n;if(t===6)gt(e,a);else{if(i=e.current.alternate,!(a&30)&&!tp(i)&&(t=qr(e,a),t===2&&(o=To(e),o!==0&&(a=o,t=qo(e,o))),t===1))throw n=ka,zt(e,0),gt(e,a),ve(e,X()),n;switch(e.finishedWork=i,e.finishedLanes=a,t){case 0:case 1:throw Error(N(345));case 2:Ot(e,pe,tt);break;case 3:if(gt(e,a),(a&130023424)===a&&(t=Vs+500-X(),10<t)){if(Er(e,0)!==0)break;if(i=e.suspendedLanes,(i&a)!==a){he(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Co(Ot.bind(null,e,pe,tt),t);break}Ot(e,pe,tt);break;case 4:if(gt(e,a),(a&4194240)===a)break;for(t=e.eventTimes,i=-1;0<a;){var s=31-We(a);o=1<<s,s=t[s],s>i&&(i=s),a&=~o}if(a=i,a=X()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*ep(a/1960))-a,10<a){e.timeoutHandle=Co(Ot.bind(null,e,pe,tt),a);break}Ot(e,pe,tt);break;case 5:Ot(e,pe,tt);break;default:throw Error(N(329))}}}return ve(e,X()),e.callbackNode===n?qd.bind(null,e):null}function qo(e,t){var n=sa;return e.current.memoizedState.isDehydrated&&(zt(e,t).flags|=256),e=qr(e,t),e!==2&&(t=pe,pe=n,t!==null&&Go(t)),e}function Go(e){pe===null?pe=e:pe.push.apply(pe,e)}function tp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var a=0;a<n.length;a++){var i=n[a],o=i.getSnapshot;i=i.value;try{if(!$e(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function gt(e,t){for(t&=~Ys,t&=~ci,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-We(t),a=1<<n;e[n]=-1,t&=~a}}function gc(e){if(O&6)throw Error(N(327));vn();var t=Er(e,0);if(!(t&1))return ve(e,X()),null;var n=qr(e,t);if(e.tag!==0&&n===2){var a=To(e);a!==0&&(t=a,n=qo(e,a))}if(n===1)throw n=ka,zt(e,0),gt(e,t),ve(e,X()),n;if(n===6)throw Error(N(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ot(e,pe,tt),ve(e,X()),null}function Ks(e,t){var n=O;O|=1;try{return e(t)}finally{O=n,O===0&&(Cn=X()+500,ii&&Pt())}}function Gt(e){vt!==null&&vt.tag===0&&!(O&6)&&vn();var t=O;O|=1;var n=Pe.transition,a=U;try{if(Pe.transition=null,U=1,e)return e()}finally{U=a,Pe.transition=n,O=t,!(O&6)&&Pt()}}function qs(){we=mn.current,W(mn)}function zt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,If(n)),Q!==null)for(n=Q.return;n!==null;){var a=n;switch(Cs(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&_r();break;case 3:An(),W(ge),W(ue),Ms();break;case 5:Ls(a);break;case 4:An();break;case 13:W(Y);break;case 19:W(Y);break;case 10:Ps(a.type._context);break;case 22:case 23:qs()}n=n.return}if(ae=e,Q=e=kt(e.current,null),ie=we=t,Z=0,ka=null,Ys=ci=qt=0,pe=sa=null,Ht!==null){for(t=0;t<Ht.length;t++)if(n=Ht[t],a=n.interleaved,a!==null){n.interleaved=null;var i=a.next,o=n.pending;if(o!==null){var s=o.next;o.next=i,a.next=s}n.pending=a}Ht=null}return e}function Gd(e,t){do{var n=Q;try{if(Is(),pr.current=$r,zr){for(var a=V.memoizedState;a!==null;){var i=a.queue;i!==null&&(i.pending=null),a=a.next}zr=!1}if(Kt=0,ne=J=V=null,ia=!1,Na=0,$s.current=null,n===null||n.return===null){Z=1,ka=t,Q=null;break}e:{var o=e,s=n.return,l=n,c=t;if(t=ie,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,m=l,f=m.tag;if(!(m.mode&1)&&(f===0||f===11||f===15)){var y=m.alternate;y?(m.updateQueue=y.updateQueue,m.memoizedState=y.memoizedState,m.lanes=y.lanes):(m.updateQueue=null,m.memoizedState=null)}var x=rc(s);if(x!==null){x.flags&=-257,ic(x,s,l,o,t),x.mode&1&&ac(o,u,t),t=x,c=u;var g=t.updateQueue;if(g===null){var T=new Set;T.add(c),t.updateQueue=T}else g.add(c);break e}else{if(!(t&1)){ac(o,u,t),Gs();break e}c=Error(N(426))}}else if(z&&l.mode&1){var b=rc(s);if(b!==null){!(b.flags&65536)&&(b.flags|=256),ic(b,s,l,o,t),Rs(kn(c,l));break e}}o=c=kn(c,l),Z!==4&&(Z=2),sa===null?sa=[o]:sa.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var h=Pd(o,c,t);Ql(o,h);break e;case 1:l=c;var d=o.type,p=o.stateNode;if(!(o.flags&128)&&(typeof d.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(jt===null||!jt.has(p)))){o.flags|=65536,t&=-t,o.lanes|=t;var w=Dd(o,l,t);Ql(o,w);break e}}o=o.return}while(o!==null)}Jd(n)}catch(S){t=S,Q===n&&n!==null&&(Q=n=n.return);continue}break}while(!0)}function Xd(){var e=Yr.current;return Yr.current=$r,e===null?$r:e}function Gs(){(Z===0||Z===3||Z===2)&&(Z=4),ae===null||!(qt&268435455)&&!(ci&268435455)||gt(ae,ie)}function qr(e,t){var n=O;O|=2;var a=Xd();(ae!==e||ie!==t)&&(tt=null,zt(e,t));do try{np();break}catch(i){Gd(e,i)}while(!0);if(Is(),O=n,Yr.current=a,Q!==null)throw Error(N(261));return ae=null,ie=0,Z}function np(){for(;Q!==null;)Qd(Q)}function ap(){for(;Q!==null&&!km();)Qd(Q)}function Qd(e){var t=eh(e.alternate,e,we);e.memoizedProps=e.pendingProps,t===null?Jd(e):Q=t,$s.current=null}function Jd(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Xf(n,t),n!==null){n.flags&=32767,Q=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Z=6,Q=null;return}}else if(n=Gf(n,t,we),n!==null){Q=n;return}if(t=t.sibling,t!==null){Q=t;return}Q=t=e}while(t!==null);Z===0&&(Z=5)}function Ot(e,t,n){var a=U,i=Pe.transition;try{Pe.transition=null,U=1,rp(e,t,n,a)}finally{Pe.transition=i,U=a}return null}function rp(e,t,n,a){do vn();while(vt!==null);if(O&6)throw Error(N(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(N(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(Mm(e,o),e===ae&&(Q=ae=null,ie=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||tr||(tr=!0,th(Rr,function(){return vn(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Pe.transition,Pe.transition=null;var s=U;U=1;var l=O;O|=4,$s.current=null,Jf(e,n),Vd(n,e),Nf(Ao),Ir=!!jo,Ao=jo=null,e.current=n,Zf(n),Cm(),O=l,U=s,Pe.transition=o}else e.current=n;if(tr&&(tr=!1,vt=e,Kr=i),o=e.pendingLanes,o===0&&(jt=null),Im(n.stateNode),ve(e,X()),t!==null)for(a=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],a(i.value,{componentStack:i.stack,digest:i.digest});if(Vr)throw Vr=!1,e=Vo,Vo=null,e;return Kr&1&&e.tag!==0&&vn(),o=e.pendingLanes,o&1?e===Ko?la++:(la=0,Ko=e):la=0,Pt(),null}function vn(){if(vt!==null){var e=Pu(Kr),t=Pe.transition,n=U;try{if(Pe.transition=null,U=16>e?16:e,vt===null)var a=!1;else{if(e=vt,vt=null,Kr=0,O&6)throw Error(N(331));var i=O;for(O|=4,k=e.current;k!==null;){var o=k,s=o.child;if(k.flags&16){var l=o.deletions;if(l!==null){for(var c=0;c<l.length;c++){var u=l[c];for(k=u;k!==null;){var m=k;switch(m.tag){case 0:case 11:case 15:oa(8,m,o)}var f=m.child;if(f!==null)f.return=m,k=f;else for(;k!==null;){m=k;var y=m.sibling,x=m.return;if(zd(m),m===u){k=null;break}if(y!==null){y.return=x,k=y;break}k=x}}}var g=o.alternate;if(g!==null){var T=g.child;if(T!==null){g.child=null;do{var b=T.sibling;T.sibling=null,T=b}while(T!==null)}}k=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,k=s;else e:for(;k!==null;){if(o=k,o.flags&2048)switch(o.tag){case 0:case 11:case 15:oa(9,o,o.return)}var h=o.sibling;if(h!==null){h.return=o.return,k=h;break e}k=o.return}}var d=e.current;for(k=d;k!==null;){s=k;var p=s.child;if(s.subtreeFlags&2064&&p!==null)p.return=s,k=p;else e:for(s=d;k!==null;){if(l=k,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:li(9,l)}}catch(S){q(l,l.return,S)}if(l===s){k=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,k=w;break e}k=l.return}}if(O=i,Pt(),Je&&typeof Je.onPostCommitFiberRoot=="function")try{Je.onPostCommitFiberRoot(ei,e)}catch{}a=!0}return a}finally{U=n,Pe.transition=t}}return!1}function xc(e,t,n){t=kn(n,t),t=Pd(e,t,1),e=Nt(e,t,1),t=he(),e!==null&&(Pa(e,1,t),ve(e,t))}function q(e,t,n){if(e.tag===3)xc(e,e,n);else for(;t!==null;){if(t.tag===3){xc(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(jt===null||!jt.has(a))){e=kn(n,e),e=Dd(t,e,1),t=Nt(t,e,1),e=he(),t!==null&&(Pa(t,1,e),ve(t,e));break}}t=t.return}}function ip(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),t=he(),e.pingedLanes|=e.suspendedLanes&n,ae===e&&(ie&n)===n&&(Z===4||Z===3&&(ie&130023424)===ie&&500>X()-Vs?zt(e,0):Ys|=n),ve(e,t)}function Zd(e,t){t===0&&(e.mode&1?(t=Ya,Ya<<=1,!(Ya&130023424)&&(Ya=4194304)):t=1);var n=he();e=ct(e,t),e!==null&&(Pa(e,t,n),ve(e,n))}function op(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Zd(e,n)}function sp(e,t){var n=0;switch(e.tag){case 13:var a=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(N(314))}a!==null&&a.delete(t),Zd(e,n)}var eh;eh=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ge.current)ye=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ye=!1,qf(e,t,n);ye=!!(e.flags&131072)}else ye=!1,z&&t.flags&1048576&&rd(t,Or,t.index);switch(t.lanes=0,t.tag){case 2:var a=t.type;gr(e,t),e=t.pendingProps;var i=Sn(t,ue.current);xn(t,n),i=Us(null,t,a,e,i,n);var o=Hs();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,xe(a)?(o=!0,Lr(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Fs(t),i.updater=si,t.stateNode=i,i._reactInternals=t,_o(t,a,e,n),t=Oo(null,t,a,!0,o,n)):(t.tag=0,z&&o&&ks(t),de(null,t,i,n),t=t.child),t;case 16:a=t.elementType;e:{switch(gr(e,t),e=t.pendingProps,i=a._init,a=i(a._payload),t.type=a,i=t.tag=cp(a),e=Oe(a,e),i){case 0:t=Mo(null,t,a,e,n);break e;case 1:t=lc(null,t,a,e,n);break e;case 11:t=oc(null,t,a,e,n);break e;case 14:t=sc(null,t,a,Oe(a.type,e),n);break e}throw Error(N(306,a,""))}return t;case 0:return a=t.type,i=t.pendingProps,i=t.elementType===a?i:Oe(a,i),Mo(e,t,a,i,n);case 1:return a=t.type,i=t.pendingProps,i=t.elementType===a?i:Oe(a,i),lc(e,t,a,i,n);case 3:e:{if(Md(t),e===null)throw Error(N(387));a=t.pendingProps,o=t.memoizedState,i=o.element,ud(e,t),Br(t,a,null,n);var s=t.memoizedState;if(a=s.element,o.isDehydrated)if(o={element:a,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=kn(Error(N(423)),t),t=cc(e,t,a,n,i);break e}else if(a!==i){i=kn(Error(N(424)),t),t=cc(e,t,a,n,i);break e}else for(be=St(t.stateNode.containerInfo.firstChild),Se=t,z=!0,He=null,n=ld(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Nn(),a===i){t=ut(e,t,n);break e}de(e,t,a,n)}t=t.child}return t;case 5:return dd(t),e===null&&Po(t),a=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,s=i.children,ko(a,i)?s=null:o!==null&&ko(a,o)&&(t.flags|=32),Ld(e,t),de(e,t,s,n),t.child;case 6:return e===null&&Po(t),null;case 13:return Od(e,t,n);case 4:return _s(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=jn(t,null,a,n):de(e,t,a,n),t.child;case 11:return a=t.type,i=t.pendingProps,i=t.elementType===a?i:Oe(a,i),oc(e,t,a,i,n);case 7:return de(e,t,t.pendingProps,n),t.child;case 8:return de(e,t,t.pendingProps.children,n),t.child;case 12:return de(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(a=t.type._context,i=t.pendingProps,o=t.memoizedProps,s=i.value,H(Ur,a._currentValue),a._currentValue=s,o!==null)if($e(o.value,s)){if(o.children===i.children&&!ge.current){t=ut(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){s=o.child;for(var c=l.firstContext;c!==null;){if(c.context===a){if(o.tag===1){c=it(-1,n&-n),c.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var m=u.pending;m===null?c.next=c:(c.next=m.next,m.next=c),u.pending=c}}o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Do(o.return,n,t),l.lanes|=n;break}c=c.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(N(341));s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Do(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}de(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,a=t.pendingProps.children,xn(t,n),i=De(i),a=a(i),t.flags|=1,de(e,t,a,n),t.child;case 14:return a=t.type,i=Oe(a,t.pendingProps),i=Oe(a.type,i),sc(e,t,a,i,n);case 15:return Fd(e,t,t.type,t.pendingProps,n);case 17:return a=t.type,i=t.pendingProps,i=t.elementType===a?i:Oe(a,i),gr(e,t),t.tag=1,xe(a)?(e=!0,Lr(t)):e=!1,xn(t,n),Id(t,a,i),_o(t,a,i,n),Oo(null,t,a,!0,e,n);case 19:return Ud(e,t,n);case 22:return _d(e,t,n)}throw Error(N(156,t.tag))};function th(e,t){return Cu(e,t)}function lp(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ie(e,t,n,a){return new lp(e,t,n,a)}function Xs(e){return e=e.prototype,!(!e||!e.isReactComponent)}function cp(e){if(typeof e=="function")return Xs(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ps)return 11;if(e===ys)return 14}return 2}function kt(e,t){var n=e.alternate;return n===null?(n=Ie(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Tr(e,t,n,a,i,o){var s=2;if(a=e,typeof e=="function")Xs(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case nn:return $t(n.children,i,o,t);case fs:s=8,i|=8;break;case ro:return e=Ie(12,n,t,i|2),e.elementType=ro,e.lanes=o,e;case io:return e=Ie(13,n,t,i),e.elementType=io,e.lanes=o,e;case oo:return e=Ie(19,n,t,i),e.elementType=oo,e.lanes=o,e;case du:return ui(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case cu:s=10;break e;case uu:s=9;break e;case ps:s=11;break e;case ys:s=14;break e;case ft:s=16,a=null;break e}throw Error(N(130,e==null?e:typeof e,""))}return t=Ie(s,n,t,i),t.elementType=e,t.type=a,t.lanes=o,t}function $t(e,t,n,a){return e=Ie(7,e,a,t),e.lanes=n,e}function ui(e,t,n,a){return e=Ie(22,e,a,t),e.elementType=du,e.lanes=n,e.stateNode={isHidden:!1},e}function Yi(e,t,n){return e=Ie(6,e,null,t),e.lanes=n,e}function Vi(e,t,n){return t=Ie(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function up(e,t,n,a,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ai(0),this.expirationTimes=Ai(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ai(0),this.identifierPrefix=a,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Qs(e,t,n,a,i,o,s,l,c){return e=new up(e,t,n,l,c),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Ie(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Fs(o),e}function dp(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:tn,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}function nh(e){if(!e)return Rt;e=e._reactInternals;e:{if(Qt(e)!==e||e.tag!==1)throw Error(N(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(xe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(N(171))}if(e.tag===1){var n=e.type;if(xe(n))return nd(e,n,t)}return t}function ah(e,t,n,a,i,o,s,l,c){return e=Qs(n,a,!0,e,i,o,s,l,c),e.context=nh(null),n=e.current,a=he(),i=At(n),o=it(a,i),o.callback=t??null,Nt(n,o,i),e.current.lanes=i,Pa(e,i,a),ve(e,a),e}function di(e,t,n,a){var i=t.current,o=he(),s=At(i);return n=nh(n),t.context===null?t.context=n:t.pendingContext=n,t=it(o,s),t.payload={element:e},a=a===void 0?null:a,a!==null&&(t.callback=a),e=Nt(i,t,s),e!==null&&(ze(e,i,s,o),fr(e,i,s)),s}function Gr(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function vc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Js(e,t){vc(e,t),(e=e.alternate)&&vc(e,t)}function hp(){return null}var rh=typeof reportError=="function"?reportError:function(e){console.error(e)};function Zs(e){this._internalRoot=e}hi.prototype.render=Zs.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(N(409));di(e,t,null,null)};hi.prototype.unmount=Zs.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Gt(function(){di(null,e,null,null)}),t[lt]=null}};function hi(e){this._internalRoot=e}hi.prototype.unstable_scheduleHydration=function(e){if(e){var t=_u();e={blockedOn:null,target:e,priority:t};for(var n=0;n<yt.length&&t!==0&&t<yt[n].priority;n++);yt.splice(n,0,e),n===0&&Mu(e)}};function el(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function mi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Tc(){}function mp(e,t,n,a,i){if(i){if(typeof a=="function"){var o=a;a=function(){var u=Gr(s);o.call(u)}}var s=ah(t,a,e,0,null,!1,!1,"",Tc);return e._reactRootContainer=s,e[lt]=s.current,va(e.nodeType===8?e.parentNode:e),Gt(),s}for(;i=e.lastChild;)e.removeChild(i);if(typeof a=="function"){var l=a;a=function(){var u=Gr(c);l.call(u)}}var c=Qs(e,0,!1,null,null,!1,!1,"",Tc);return e._reactRootContainer=c,e[lt]=c.current,va(e.nodeType===8?e.parentNode:e),Gt(function(){di(t,c,n,a)}),c}function fi(e,t,n,a,i){var o=n._reactRootContainer;if(o){var s=o;if(typeof i=="function"){var l=i;i=function(){var c=Gr(s);l.call(c)}}di(t,s,e,i)}else s=mp(n,t,e,i,a);return Gr(s)}Du=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Jn(t.pendingLanes);n!==0&&(vs(t,n|1),ve(t,X()),!(O&6)&&(Cn=X()+500,Pt()))}break;case 13:Gt(function(){var a=ct(e,1);if(a!==null){var i=he();ze(a,e,1,i)}}),Js(e,1)}};Ts=function(e){if(e.tag===13){var t=ct(e,134217728);if(t!==null){var n=he();ze(t,e,134217728,n)}Js(e,134217728)}};Fu=function(e){if(e.tag===13){var t=At(e),n=ct(e,t);if(n!==null){var a=he();ze(n,e,t,a)}Js(e,t)}};_u=function(){return U};Lu=function(e,t){var n=U;try{return U=e,t()}finally{U=n}};go=function(e,t,n){switch(t){case"input":if(co(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var i=ri(a);if(!i)throw Error(N(90));mu(a),co(a,i)}}}break;case"textarea":pu(e,n);break;case"select":t=n.value,t!=null&&fn(e,!!n.multiple,t,!1)}};bu=Ks;Su=Gt;var fp={usingClientEntryPoint:!1,Events:[Fa,sn,ri,Tu,wu,Ks]},Yn={findFiberByHostInstance:Ut,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},pp={bundleType:Yn.bundleType,version:Yn.version,rendererPackageName:Yn.rendererPackageName,rendererConfig:Yn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ht.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Au(e),e===null?null:e.stateNode},findFiberByHostInstance:Yn.findFiberByHostInstance||hp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var nr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!nr.isDisabled&&nr.supportsFiber)try{ei=nr.inject(pp),Je=nr}catch{}}je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fp;je.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!el(t))throw Error(N(200));return dp(e,t,null,n)};je.createRoot=function(e,t){if(!el(e))throw Error(N(299));var n=!1,a="",i=rh;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Qs(e,1,!1,null,null,n,!1,a,i),e[lt]=t.current,va(e.nodeType===8?e.parentNode:e),new Zs(t)};je.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(N(188)):(e=Object.keys(e).join(","),Error(N(268,e)));return e=Au(t),e=e===null?null:e.stateNode,e};je.flushSync=function(e){return Gt(e)};je.hydrate=function(e,t,n){if(!mi(t))throw Error(N(200));return fi(null,e,t,!0,n)};je.hydrateRoot=function(e,t,n){if(!el(e))throw Error(N(405));var a=n!=null&&n.hydratedSources||null,i=!1,o="",s=rh;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=ah(t,null,e,1,n??null,i,!1,o,s),e[lt]=t.current,va(e),a)for(e=0;e<a.length;e++)n=a[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new hi(t)};je.render=function(e,t,n){if(!mi(t))throw Error(N(200));return fi(null,e,t,!1,n)};je.unmountComponentAtNode=function(e){if(!mi(e))throw Error(N(40));return e._reactRootContainer?(Gt(function(){fi(null,null,e,!1,function(){e._reactRootContainer=null,e[lt]=null})}),!0):!1};je.unstable_batchedUpdates=Ks;je.unstable_renderSubtreeIntoContainer=function(e,t,n,a){if(!mi(n))throw Error(N(200));if(e==null||e._reactInternals===void 0)throw Error(N(38));return fi(e,t,n,!1,a)};je.version="18.3.1-next-f1338f8080-20240426";function ih(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ih)}catch(e){console.error(e)}}ih(),iu.exports=je;var yp=iu.exports,wc=yp;jr.createRoot=wc.createRoot,jr.hydrateRoot=wc.hydrateRoot;/**
 * react-router v7.13.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var bc="popstate";function gp(e={}){function t(a,i){let{pathname:o,search:s,hash:l}=a.location;return Xo("",{pathname:o,search:s,hash:l},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(a,i){return typeof i=="string"?i:Ca(i)}return vp(t,n,null,e)}function $(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function _e(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function xp(){return Math.random().toString(36).substring(2,10)}function Sc(e,t){return{usr:e.state,key:e.key,idx:t}}function Xo(e,t,n=null,a){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?_n(t):t,state:n,key:t&&t.key||a||xp()}}function Ca({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function _n(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substring(a),e=e.substring(0,a)),e&&(t.pathname=e)}return t}function vp(e,t,n,a={}){let{window:i=document.defaultView,v5Compat:o=!1}=a,s=i.history,l="POP",c=null,u=m();u==null&&(u=0,s.replaceState({...s.state,idx:u},""));function m(){return(s.state||{idx:null}).idx}function f(){l="POP";let b=m(),h=b==null?null:b-u;u=b,c&&c({action:l,location:T.location,delta:h})}function y(b,h){l="PUSH";let d=Xo(T.location,b,h);u=m()+1;let p=Sc(d,u),w=T.createHref(d);try{s.pushState(p,"",w)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;i.location.assign(w)}o&&c&&c({action:l,location:T.location,delta:1})}function x(b,h){l="REPLACE";let d=Xo(T.location,b,h);u=m();let p=Sc(d,u),w=T.createHref(d);s.replaceState(p,"",w),o&&c&&c({action:l,location:T.location,delta:0})}function g(b){return Tp(b)}let T={get action(){return l},get location(){return e(i,s)},listen(b){if(c)throw new Error("A history only accepts one active listener");return i.addEventListener(bc,f),c=b,()=>{i.removeEventListener(bc,f),c=null}},createHref(b){return t(i,b)},createURL:g,encodeLocation(b){let h=g(b);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:y,replace:x,go(b){return s.go(b)}};return T}function Tp(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),$(n,"No window.location.(origin|href) available to create URL");let a=typeof e=="string"?e:Ca(e);return a=a.replace(/ $/,"%20"),!t&&a.startsWith("//")&&(a=n+a),new URL(a,n)}function oh(e,t,n="/"){return wp(e,t,n,!1)}function wp(e,t,n,a){let i=typeof t=="string"?_n(t):t,o=dt(i.pathname||"/",n);if(o==null)return null;let s=sh(e);bp(s);let l=null;for(let c=0;l==null&&c<s.length;++c){let u=Dp(o);l=Ip(s[c],u,a)}return l}function sh(e,t=[],n=[],a="",i=!1){let o=(s,l,c=i,u)=>{let m={relativePath:u===void 0?s.path||"":u,caseSensitive:s.caseSensitive===!0,childrenIndex:l,route:s};if(m.relativePath.startsWith("/")){if(!m.relativePath.startsWith(a)&&c)return;$(m.relativePath.startsWith(a),`Absolute route path "${m.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),m.relativePath=m.relativePath.slice(a.length)}let f=ot([a,m.relativePath]),y=n.concat(m);s.children&&s.children.length>0&&($(s.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${f}".`),sh(s.children,t,y,f,c)),!(s.path==null&&!s.index)&&t.push({path:f,score:Rp(f,s.index),routesMeta:y})};return e.forEach((s,l)=>{var c;if(s.path===""||!((c=s.path)!=null&&c.includes("?")))o(s,l);else for(let u of lh(s.path))o(s,l,!0,u)}),t}function lh(e){let t=e.split("/");if(t.length===0)return[];let[n,...a]=t,i=n.endsWith("?"),o=n.replace(/\?$/,"");if(a.length===0)return i?[o,""]:[o];let s=lh(a.join("/")),l=[];return l.push(...s.map(c=>c===""?o:[o,c].join("/"))),i&&l.push(...s),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function bp(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Ep(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}var Sp=/^:[\w-]+$/,Np=3,jp=2,Ap=1,kp=10,Cp=-2,Nc=e=>e==="*";function Rp(e,t){let n=e.split("/"),a=n.length;return n.some(Nc)&&(a+=Cp),t&&(a+=jp),n.filter(i=>!Nc(i)).reduce((i,o)=>i+(Sp.test(o)?Np:o===""?Ap:kp),a)}function Ep(e,t){return e.length===t.length&&e.slice(0,-1).every((a,i)=>a===t[i])?e[e.length-1]-t[t.length-1]:0}function Ip(e,t,n=!1){let{routesMeta:a}=e,i={},o="/",s=[];for(let l=0;l<a.length;++l){let c=a[l],u=l===a.length-1,m=o==="/"?t:t.slice(o.length)||"/",f=Xr({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},m),y=c.route;if(!f&&u&&n&&!a[a.length-1].route.index&&(f=Xr({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},m)),!f)return null;Object.assign(i,f.params),s.push({params:i,pathname:ot([o,f.pathname]),pathnameBase:Mp(ot([o,f.pathnameBase])),route:y}),f.pathnameBase!=="/"&&(o=ot([o,f.pathnameBase]))}return s}function Xr(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=Pp(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let o=i[0],s=o.replace(/(.)\/+$/,"$1"),l=i.slice(1);return{params:a.reduce((u,{paramName:m,isOptional:f},y)=>{if(m==="*"){let g=l[y]||"";s=o.slice(0,o.length-g.length).replace(/(.)\/+$/,"$1")}const x=l[y];return f&&!x?u[m]=void 0:u[m]=(x||"").replace(/%2F/g,"/"),u},{}),pathname:o,pathnameBase:s,pattern:e}}function Pp(e,t=!1,n=!0){_e(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let a=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,l,c)=>(a.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(a.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),a]}function Dp(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return _e(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function dt(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&a!=="/"?null:e.slice(n)||"/"}var Fp=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function _p(e,t="/"){let{pathname:n,search:a="",hash:i=""}=typeof e=="string"?_n(e):e,o;return n?(n=n.replace(/\/\/+/g,"/"),n.startsWith("/")?o=jc(n.substring(1),"/"):o=jc(n,t)):o=t,{pathname:o,search:Op(a),hash:Up(i)}}function jc(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function Ki(e,t,n,a){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Lp(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function tl(e){let t=Lp(e);return t.map((n,a)=>a===t.length-1?n.pathname:n.pathnameBase)}function nl(e,t,n,a=!1){let i;typeof e=="string"?i=_n(e):(i={...e},$(!i.pathname||!i.pathname.includes("?"),Ki("?","pathname","search",i)),$(!i.pathname||!i.pathname.includes("#"),Ki("#","pathname","hash",i)),$(!i.search||!i.search.includes("#"),Ki("#","search","hash",i)));let o=e===""||i.pathname==="",s=o?"/":i.pathname,l;if(s==null)l=n;else{let f=t.length-1;if(!a&&s.startsWith("..")){let y=s.split("/");for(;y[0]==="..";)y.shift(),f-=1;i.pathname=y.join("/")}l=f>=0?t[f]:"/"}let c=_p(i,l),u=s&&s!=="/"&&s.endsWith("/"),m=(o||s===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||m)&&(c.pathname+="/"),c}var ot=e=>e.join("/").replace(/\/\/+/g,"/"),Mp=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Op=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Up=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,Hp=class{constructor(e,t,n,a=!1){this.status=e,this.statusText=t||"",this.internal=a,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Bp(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function Wp(e){return e.map(t=>t.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var ch=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function uh(e,t){let n=e;if(typeof n!="string"||!Fp.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let a=n,i=!1;if(ch)try{let o=new URL(window.location.href),s=n.startsWith("//")?new URL(o.protocol+n):new URL(n),l=dt(s.pathname,t);s.origin===o.origin&&l!=null?n=l+s.search+s.hash:i=!0}catch{_e(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:a,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var dh=["POST","PUT","PATCH","DELETE"];new Set(dh);var zp=["GET",...dh];new Set(zp);var Ln=v.createContext(null);Ln.displayName="DataRouter";var pi=v.createContext(null);pi.displayName="DataRouterState";var $p=v.createContext(!1),hh=v.createContext({isTransitioning:!1});hh.displayName="ViewTransition";var Yp=v.createContext(new Map);Yp.displayName="Fetchers";var Vp=v.createContext(null);Vp.displayName="Await";var ke=v.createContext(null);ke.displayName="Navigation";var La=v.createContext(null);La.displayName="Location";var Ye=v.createContext({outlet:null,matches:[],isDataRoute:!1});Ye.displayName="Route";var al=v.createContext(null);al.displayName="RouteError";var mh="REACT_ROUTER_ERROR",Kp="REDIRECT",qp="ROUTE_ERROR_RESPONSE";function Gp(e){if(e.startsWith(`${mh}:${Kp}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function Xp(e){if(e.startsWith(`${mh}:${qp}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new Hp(t.status,t.statusText,t.data)}catch{}}function Qp(e,{relative:t}={}){$(Mn(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:a}=v.useContext(ke),{hash:i,pathname:o,search:s}=Ma(e,{relative:t}),l=o;return n!=="/"&&(l=o==="/"?n:ot([n,o])),a.createHref({pathname:l,search:s,hash:i})}function Mn(){return v.useContext(La)!=null}function Ve(){return $(Mn(),"useLocation() may be used only in the context of a <Router> component."),v.useContext(La).location}var fh="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function ph(e){v.useContext(ke).static||v.useLayoutEffect(e)}function yi(){let{isDataRoute:e}=v.useContext(Ye);return e?dy():Jp()}function Jp(){$(Mn(),"useNavigate() may be used only in the context of a <Router> component.");let e=v.useContext(Ln),{basename:t,navigator:n}=v.useContext(ke),{matches:a}=v.useContext(Ye),{pathname:i}=Ve(),o=JSON.stringify(tl(a)),s=v.useRef(!1);return ph(()=>{s.current=!0}),v.useCallback((c,u={})=>{if(_e(s.current,fh),!s.current)return;if(typeof c=="number"){n.go(c);return}let m=nl(c,JSON.parse(o),i,u.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:ot([t,m.pathname])),(u.replace?n.replace:n.push)(m,u.state,u)},[t,n,o,i,e])}v.createContext(null);function Zp(){let{matches:e}=v.useContext(Ye),t=e[e.length-1];return t?t.params:{}}function Ma(e,{relative:t}={}){let{matches:n}=v.useContext(Ye),{pathname:a}=Ve(),i=JSON.stringify(tl(n));return v.useMemo(()=>nl(e,JSON.parse(i),a,t==="path"),[e,i,a,t])}function ey(e,t){return yh(e,t)}function yh(e,t,n,a,i){var d;$(Mn(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=v.useContext(ke),{matches:s}=v.useContext(Ye),l=s[s.length-1],c=l?l.params:{},u=l?l.pathname:"/",m=l?l.pathnameBase:"/",f=l&&l.route;{let p=f&&f.path||"";xh(u,!f||p.endsWith("*")||p.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${u}" (under <Route path="${p}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${p}"> to <Route path="${p==="/"?"*":`${p}/*`}">.`)}let y=Ve(),x;if(t){let p=typeof t=="string"?_n(t):t;$(m==="/"||((d=p.pathname)==null?void 0:d.startsWith(m)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${p.pathname}" was given in the \`location\` prop.`),x=p}else x=y;let g=x.pathname||"/",T=g;if(m!=="/"){let p=m.replace(/^\//,"").split("/");T="/"+g.replace(/^\//,"").split("/").slice(p.length).join("/")}let b=oh(e,{pathname:T});_e(f||b!=null,`No routes matched location "${x.pathname}${x.search}${x.hash}" `),_e(b==null||b[b.length-1].route.element!==void 0||b[b.length-1].route.Component!==void 0||b[b.length-1].route.lazy!==void 0,`Matched leaf route at location "${x.pathname}${x.search}${x.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=iy(b&&b.map(p=>Object.assign({},p,{params:Object.assign({},c,p.params),pathname:ot([m,o.encodeLocation?o.encodeLocation(p.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:p.pathname]),pathnameBase:p.pathnameBase==="/"?m:ot([m,o.encodeLocation?o.encodeLocation(p.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:p.pathnameBase])})),s,n,a,i);return t&&h?v.createElement(La.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...x},navigationType:"POP"}},h):h}function ty(){let e=uy(),t=Bp(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:a},o={padding:"2px 4px",backgroundColor:a},s=null;return console.error("Error handled by React Router default ErrorBoundary:",e),s=v.createElement(v.Fragment,null,v.createElement("p",null,"💿 Hey developer 👋"),v.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",v.createElement("code",{style:o},"ErrorBoundary")," or"," ",v.createElement("code",{style:o},"errorElement")," prop on your route.")),v.createElement(v.Fragment,null,v.createElement("h2",null,"Unexpected Application Error!"),v.createElement("h3",{style:{fontStyle:"italic"}},t),n?v.createElement("pre",{style:i},n):null,s)}var ny=v.createElement(ty,null),gh=class extends v.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=Xp(e.digest);n&&(e=n)}let t=e!==void 0?v.createElement(Ye.Provider,{value:this.props.routeContext},v.createElement(al.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?v.createElement(ay,{error:e},t):t}};gh.contextType=$p;var qi=new WeakMap;function ay({children:e,error:t}){let{basename:n}=v.useContext(ke);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let a=Gp(t.digest);if(a){let i=qi.get(t);if(i)throw i;let o=uh(a.location,n);if(ch&&!qi.get(t))if(o.isExternal||a.reloadDocument)window.location.href=o.absoluteURL||o.to;else{const s=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(o.to,{replace:a.replace}));throw qi.set(t,s),s}return v.createElement("meta",{httpEquiv:"refresh",content:`0;url=${o.absoluteURL||o.to}`})}}return e}function ry({routeContext:e,match:t,children:n}){let a=v.useContext(Ln);return a&&a.static&&a.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=t.route.id),v.createElement(Ye.Provider,{value:e},n)}function iy(e,t=[],n=null,a=null,i=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,s=n==null?void 0:n.errors;if(s!=null){let m=o.findIndex(f=>f.route.id&&(s==null?void 0:s[f.route.id])!==void 0);$(m>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),o=o.slice(0,Math.min(o.length,m+1))}let l=!1,c=-1;if(n)for(let m=0;m<o.length;m++){let f=o[m];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(c=m),f.route.id){let{loaderData:y,errors:x}=n,g=f.route.loader&&!y.hasOwnProperty(f.route.id)&&(!x||x[f.route.id]===void 0);if(f.route.lazy||g){l=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}let u=n&&a?(m,f)=>{var y,x;a(m,{location:n.location,params:((x=(y=n.matches)==null?void 0:y[0])==null?void 0:x.params)??{},unstable_pattern:Wp(n.matches),errorInfo:f})}:void 0;return o.reduceRight((m,f,y)=>{let x,g=!1,T=null,b=null;n&&(x=s&&f.route.id?s[f.route.id]:void 0,T=f.route.errorElement||ny,l&&(c<0&&y===0?(xh("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,b=null):c===y&&(g=!0,b=f.route.hydrateFallbackElement||null)));let h=t.concat(o.slice(0,y+1)),d=()=>{let p;return x?p=T:g?p=b:f.route.Component?p=v.createElement(f.route.Component,null):f.route.element?p=f.route.element:p=m,v.createElement(ry,{match:f,routeContext:{outlet:m,matches:h,isDataRoute:n!=null},children:p})};return n&&(f.route.ErrorBoundary||f.route.errorElement||y===0)?v.createElement(gh,{location:n.location,revalidation:n.revalidation,component:T,error:x,children:d(),routeContext:{outlet:null,matches:h,isDataRoute:!0},onError:u}):d()},null)}function rl(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function oy(e){let t=v.useContext(Ln);return $(t,rl(e)),t}function sy(e){let t=v.useContext(pi);return $(t,rl(e)),t}function ly(e){let t=v.useContext(Ye);return $(t,rl(e)),t}function il(e){let t=ly(e),n=t.matches[t.matches.length-1];return $(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function cy(){return il("useRouteId")}function uy(){var a;let e=v.useContext(al),t=sy("useRouteError"),n=il("useRouteError");return e!==void 0?e:(a=t.errors)==null?void 0:a[n]}function dy(){let{router:e}=oy("useNavigate"),t=il("useNavigate"),n=v.useRef(!1);return ph(()=>{n.current=!0}),v.useCallback(async(i,o={})=>{_e(n.current,fh),n.current&&(typeof i=="number"?await e.navigate(i):await e.navigate(i,{fromRouteId:t,...o}))},[e,t])}var Ac={};function xh(e,t,n){!t&&!Ac[e]&&(Ac[e]=!0,_e(!1,n))}v.memo(hy);function hy({routes:e,future:t,state:n,onError:a}){return yh(e,void 0,n,a,t)}function my({to:e,replace:t,state:n,relative:a}){$(Mn(),"<Navigate> may be used only in the context of a <Router> component.");let{static:i}=v.useContext(ke);_e(!i,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:o}=v.useContext(Ye),{pathname:s}=Ve(),l=yi(),c=nl(e,tl(o),s,a==="path"),u=JSON.stringify(c);return v.useEffect(()=>{l(JSON.parse(u),{replace:t,state:n,relative:a})},[l,u,a,t,n]),null}function Te(e){$(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function fy({basename:e="/",children:t=null,location:n,navigationType:a="POP",navigator:i,static:o=!1,unstable_useTransitions:s}){$(!Mn(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let l=e.replace(/^\/*/,"/"),c=v.useMemo(()=>({basename:l,navigator:i,static:o,unstable_useTransitions:s,future:{}}),[l,i,o,s]);typeof n=="string"&&(n=_n(n));let{pathname:u="/",search:m="",hash:f="",state:y=null,key:x="default"}=n,g=v.useMemo(()=>{let T=dt(u,l);return T==null?null:{location:{pathname:T,search:m,hash:f,state:y,key:x},navigationType:a}},[l,u,m,f,y,x,a]);return _e(g!=null,`<Router basename="${l}"> is not able to match the URL "${u}${m}${f}" because it does not start with the basename, so the <Router> won't render anything.`),g==null?null:v.createElement(ke.Provider,{value:c},v.createElement(La.Provider,{children:t,value:g}))}function py({children:e,location:t}){return ey(Qo(e),t)}function Qo(e,t=[]){let n=[];return v.Children.forEach(e,(a,i)=>{if(!v.isValidElement(a))return;let o=[...t,i];if(a.type===v.Fragment){n.push.apply(n,Qo(a.props.children,o));return}$(a.type===Te,`[${typeof a.type=="string"?a.type:a.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),$(!a.props.index||!a.props.children,"An index route cannot have child routes.");let s={id:a.props.id||o.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,middleware:a.props.middleware,loader:a.props.loader,action:a.props.action,hydrateFallbackElement:a.props.hydrateFallbackElement,HydrateFallback:a.props.HydrateFallback,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.hasErrorBoundary===!0||a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(s.children=Qo(a.props.children,o)),n.push(s)}),n}var wr="get",br="application/x-www-form-urlencoded";function gi(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function yy(e){return gi(e)&&e.tagName.toLowerCase()==="button"}function gy(e){return gi(e)&&e.tagName.toLowerCase()==="form"}function xy(e){return gi(e)&&e.tagName.toLowerCase()==="input"}function vy(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ty(e,t){return e.button===0&&(!t||t==="_self")&&!vy(e)}function Jo(e=""){return new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let a=e[n];return t.concat(Array.isArray(a)?a.map(i=>[n,i]):[[n,a]])},[]))}function wy(e,t){let n=Jo(e);return t&&t.forEach((a,i)=>{n.has(i)||t.getAll(i).forEach(o=>{n.append(i,o)})}),n}var ar=null;function by(){if(ar===null)try{new FormData(document.createElement("form"),0),ar=!1}catch{ar=!0}return ar}var Sy=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Gi(e){return e!=null&&!Sy.has(e)?(_e(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${br}"`),null):e}function Ny(e,t){let n,a,i,o,s;if(gy(e)){let l=e.getAttribute("action");a=l?dt(l,t):null,n=e.getAttribute("method")||wr,i=Gi(e.getAttribute("enctype"))||br,o=new FormData(e)}else if(yy(e)||xy(e)&&(e.type==="submit"||e.type==="image")){let l=e.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||l.getAttribute("action");if(a=c?dt(c,t):null,n=e.getAttribute("formmethod")||l.getAttribute("method")||wr,i=Gi(e.getAttribute("formenctype"))||Gi(l.getAttribute("enctype"))||br,o=new FormData(l,e),!by()){let{name:u,type:m,value:f}=e;if(m==="image"){let y=u?`${u}.`:"";o.append(`${y}x`,"0"),o.append(`${y}y`,"0")}else u&&o.append(u,f)}}else{if(gi(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=wr,a=null,i=br,s=e}return o&&i==="text/plain"&&(s=o,o=void 0),{action:a,method:n.toLowerCase(),encType:i,formData:o,body:s}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function ol(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function jy(e,t,n,a){let i=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?i.pathname.endsWith("/")?i.pathname=`${i.pathname}_.${a}`:i.pathname=`${i.pathname}.${a}`:i.pathname==="/"?i.pathname=`_root.${a}`:t&&dt(i.pathname,t)==="/"?i.pathname=`${t.replace(/\/$/,"")}/_root.${a}`:i.pathname=`${i.pathname.replace(/\/$/,"")}.${a}`,i}async function Ay(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function ky(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function Cy(e,t,n){let a=await Promise.all(e.map(async i=>{let o=t.routes[i.route.id];if(o){let s=await Ay(o,n);return s.links?s.links():[]}return[]}));return Py(a.flat(1).filter(ky).filter(i=>i.rel==="stylesheet"||i.rel==="preload").map(i=>i.rel==="stylesheet"?{...i,rel:"prefetch",as:"style"}:{...i,rel:"prefetch"}))}function kc(e,t,n,a,i,o){let s=(c,u)=>n[u]?c.route.id!==n[u].route.id:!0,l=(c,u)=>{var m;return n[u].pathname!==c.pathname||((m=n[u].route.path)==null?void 0:m.endsWith("*"))&&n[u].params["*"]!==c.params["*"]};return o==="assets"?t.filter((c,u)=>s(c,u)||l(c,u)):o==="data"?t.filter((c,u)=>{var f;let m=a.routes[c.route.id];if(!m||!m.hasLoader)return!1;if(s(c,u)||l(c,u))return!0;if(c.route.shouldRevalidate){let y=c.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:((f=n[0])==null?void 0:f.params)||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof y=="boolean")return y}return!0}):[]}function Ry(e,t,{includeHydrateFallback:n}={}){return Ey(e.map(a=>{let i=t.routes[a.route.id];if(!i)return[];let o=[i.module];return i.clientActionModule&&(o=o.concat(i.clientActionModule)),i.clientLoaderModule&&(o=o.concat(i.clientLoaderModule)),n&&i.hydrateFallbackModule&&(o=o.concat(i.hydrateFallbackModule)),i.imports&&(o=o.concat(i.imports)),o}).flat(1))}function Ey(e){return[...new Set(e)]}function Iy(e){let t={},n=Object.keys(e).sort();for(let a of n)t[a]=e[a];return t}function Py(e,t){let n=new Set;return new Set(t),e.reduce((a,i)=>{let o=JSON.stringify(Iy(i));return n.has(o)||(n.add(o),a.push({key:o,link:i})),a},[])}function vh(){let e=v.useContext(Ln);return ol(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Dy(){let e=v.useContext(pi);return ol(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var sl=v.createContext(void 0);sl.displayName="FrameworkContext";function Th(){let e=v.useContext(sl);return ol(e,"You must render this element inside a <HydratedRouter> element"),e}function Fy(e,t){let n=v.useContext(sl),[a,i]=v.useState(!1),[o,s]=v.useState(!1),{onFocus:l,onBlur:c,onMouseEnter:u,onMouseLeave:m,onTouchStart:f}=t,y=v.useRef(null);v.useEffect(()=>{if(e==="render"&&s(!0),e==="viewport"){let T=h=>{h.forEach(d=>{s(d.isIntersecting)})},b=new IntersectionObserver(T,{threshold:.5});return y.current&&b.observe(y.current),()=>{b.disconnect()}}},[e]),v.useEffect(()=>{if(a){let T=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(T)}}},[a]);let x=()=>{i(!0)},g=()=>{i(!1),s(!1)};return n?e!=="intent"?[o,y,{}]:[o,y,{onFocus:Vn(l,x),onBlur:Vn(c,g),onMouseEnter:Vn(u,x),onMouseLeave:Vn(m,g),onTouchStart:Vn(f,x)}]:[!1,y,{}]}function Vn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function _y({page:e,...t}){let{router:n}=vh(),a=v.useMemo(()=>oh(n.routes,e,n.basename),[n.routes,e,n.basename]);return a?v.createElement(My,{page:e,matches:a,...t}):null}function Ly(e){let{manifest:t,routeModules:n}=Th(),[a,i]=v.useState([]);return v.useEffect(()=>{let o=!1;return Cy(e,t,n).then(s=>{o||i(s)}),()=>{o=!0}},[e,t,n]),a}function My({page:e,matches:t,...n}){let a=Ve(),{future:i,manifest:o,routeModules:s}=Th(),{basename:l}=vh(),{loaderData:c,matches:u}=Dy(),m=v.useMemo(()=>kc(e,t,u,o,a,"data"),[e,t,u,o,a]),f=v.useMemo(()=>kc(e,t,u,o,a,"assets"),[e,t,u,o,a]),y=v.useMemo(()=>{if(e===a.pathname+a.search+a.hash)return[];let T=new Set,b=!1;if(t.forEach(d=>{var w;let p=o.routes[d.route.id];!p||!p.hasLoader||(!m.some(S=>S.route.id===d.route.id)&&d.route.id in c&&((w=s[d.route.id])!=null&&w.shouldRevalidate)||p.hasClientLoader?b=!0:T.add(d.route.id))}),T.size===0)return[];let h=jy(e,l,i.unstable_trailingSlashAwareDataRequests,"data");return b&&T.size>0&&h.searchParams.set("_routes",t.filter(d=>T.has(d.route.id)).map(d=>d.route.id).join(",")),[h.pathname+h.search]},[l,i.unstable_trailingSlashAwareDataRequests,c,a,o,m,t,e,s]),x=v.useMemo(()=>Ry(f,o),[f,o]),g=Ly(f);return v.createElement(v.Fragment,null,y.map(T=>v.createElement("link",{key:T,rel:"prefetch",as:"fetch",href:T,...n})),x.map(T=>v.createElement("link",{key:T,rel:"modulepreload",href:T,...n})),g.map(({key:T,link:b})=>v.createElement("link",{key:T,nonce:n.nonce,...b,crossOrigin:b.crossOrigin??n.crossOrigin})))}function Oy(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var Uy=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Uy&&(window.__reactRouterVersion="7.13.0")}catch{}function Hy({basename:e,children:t,unstable_useTransitions:n,window:a}){let i=v.useRef();i.current==null&&(i.current=gp({window:a,v5Compat:!0}));let o=i.current,[s,l]=v.useState({action:o.action,location:o.location}),c=v.useCallback(u=>{n===!1?l(u):v.startTransition(()=>l(u))},[n]);return v.useLayoutEffect(()=>o.listen(c),[o,c]),v.createElement(fy,{basename:e,children:t,location:s.location,navigationType:s.action,navigator:o,unstable_useTransitions:n})}var wh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,F=v.forwardRef(function({onClick:t,discover:n="render",prefetch:a="none",relative:i,reloadDocument:o,replace:s,state:l,target:c,to:u,preventScrollReset:m,viewTransition:f,unstable_defaultShouldRevalidate:y,...x},g){let{basename:T,unstable_useTransitions:b}=v.useContext(ke),h=typeof u=="string"&&wh.test(u),d=uh(u,T);u=d.to;let p=Qp(u,{relative:i}),[w,S,A]=Fy(a,x),j=$y(u,{replace:s,state:l,target:c,preventScrollReset:m,relative:i,viewTransition:f,unstable_defaultShouldRevalidate:y,unstable_useTransitions:b});function C(I){t&&t(I),I.defaultPrevented||j(I)}let M=v.createElement("a",{...x,...A,href:d.absoluteURL||p,onClick:d.isExternal||o?t:C,ref:Oy(g,S),target:c,"data-discover":!h&&n==="render"?"true":void 0});return w&&!h?v.createElement(v.Fragment,null,M,v.createElement(_y,{page:p})):M});F.displayName="Link";var By=v.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:a="",end:i=!1,style:o,to:s,viewTransition:l,children:c,...u},m){let f=Ma(s,{relative:u.relative}),y=Ve(),x=v.useContext(pi),{navigator:g,basename:T}=v.useContext(ke),b=x!=null&&Xy(f)&&l===!0,h=g.encodeLocation?g.encodeLocation(f).pathname:f.pathname,d=y.pathname,p=x&&x.navigation&&x.navigation.location?x.navigation.location.pathname:null;n||(d=d.toLowerCase(),p=p?p.toLowerCase():null,h=h.toLowerCase()),p&&T&&(p=dt(p,T)||p);const w=h!=="/"&&h.endsWith("/")?h.length-1:h.length;let S=d===h||!i&&d.startsWith(h)&&d.charAt(w)==="/",A=p!=null&&(p===h||!i&&p.startsWith(h)&&p.charAt(h.length)==="/"),j={isActive:S,isPending:A,isTransitioning:b},C=S?t:void 0,M;typeof a=="function"?M=a(j):M=[a,S?"active":null,A?"pending":null,b?"transitioning":null].filter(Boolean).join(" ");let I=typeof o=="function"?o(j):o;return v.createElement(F,{...u,"aria-current":C,className:M,ref:m,style:I,to:s,viewTransition:l},typeof c=="function"?c(j):c)});By.displayName="NavLink";var Wy=v.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:a,replace:i,state:o,method:s=wr,action:l,onSubmit:c,relative:u,preventScrollReset:m,viewTransition:f,unstable_defaultShouldRevalidate:y,...x},g)=>{let{unstable_useTransitions:T}=v.useContext(ke),b=qy(),h=Gy(l,{relative:u}),d=s.toLowerCase()==="get"?"get":"post",p=typeof l=="string"&&wh.test(l),w=S=>{if(c&&c(S),S.defaultPrevented)return;S.preventDefault();let A=S.nativeEvent.submitter,j=(A==null?void 0:A.getAttribute("formmethod"))||s,C=()=>b(A||S.currentTarget,{fetcherKey:t,method:j,navigate:n,replace:i,state:o,relative:u,preventScrollReset:m,viewTransition:f,unstable_defaultShouldRevalidate:y});T&&n!==!1?v.startTransition(()=>C()):C()};return v.createElement("form",{ref:g,method:d,action:h,onSubmit:a?c:w,...x,"data-discover":!p&&e==="render"?"true":void 0})});Wy.displayName="Form";function zy(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function bh(e){let t=v.useContext(Ln);return $(t,zy(e)),t}function $y(e,{target:t,replace:n,state:a,preventScrollReset:i,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:l,unstable_useTransitions:c}={}){let u=yi(),m=Ve(),f=Ma(e,{relative:o});return v.useCallback(y=>{if(Ty(y,t)){y.preventDefault();let x=n!==void 0?n:Ca(m)===Ca(f),g=()=>u(e,{replace:x,state:a,preventScrollReset:i,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:l});c?v.startTransition(()=>g()):g()}},[m,u,f,n,a,t,e,i,o,s,l,c])}function Yy(e){_e(typeof URLSearchParams<"u","You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=v.useRef(Jo(e)),n=v.useRef(!1),a=Ve(),i=v.useMemo(()=>wy(a.search,n.current?null:t.current),[a.search]),o=yi(),s=v.useCallback((l,c)=>{const u=Jo(typeof l=="function"?l(new URLSearchParams(i)):l);n.current=!0,o("?"+u,c)},[o,i]);return[i,s]}var Vy=0,Ky=()=>`__${String(++Vy)}__`;function qy(){let{router:e}=bh("useSubmit"),{basename:t}=v.useContext(ke),n=cy(),a=e.fetch,i=e.navigate;return v.useCallback(async(o,s={})=>{let{action:l,method:c,encType:u,formData:m,body:f}=Ny(o,t);if(s.navigate===!1){let y=s.fetcherKey||Ky();await a(y,n,s.action||l,{unstable_defaultShouldRevalidate:s.unstable_defaultShouldRevalidate,preventScrollReset:s.preventScrollReset,formData:m,body:f,formMethod:s.method||c,formEncType:s.encType||u,flushSync:s.flushSync})}else await i(s.action||l,{unstable_defaultShouldRevalidate:s.unstable_defaultShouldRevalidate,preventScrollReset:s.preventScrollReset,formData:m,body:f,formMethod:s.method||c,formEncType:s.encType||u,replace:s.replace,state:s.state,fromRouteId:n,flushSync:s.flushSync,viewTransition:s.viewTransition})},[a,i,t,n])}function Gy(e,{relative:t}={}){let{basename:n}=v.useContext(ke),a=v.useContext(Ye);$(a,"useFormAction must be used inside a RouteContext");let[i]=a.matches.slice(-1),o={...Ma(e||".",{relative:t})},s=Ve();if(e==null){o.search=s.search;let l=new URLSearchParams(o.search),c=l.getAll("index");if(c.some(m=>m==="")){l.delete("index"),c.filter(f=>f).forEach(f=>l.append("index",f));let m=l.toString();o.search=m?`?${m}`:""}}return(!e||e===".")&&i.route.index&&(o.search=o.search?o.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(o.pathname=o.pathname==="/"?n:ot([n,o.pathname])),Ca(o)}function Xy(e,{relative:t}={}){let n=v.useContext(hh);$(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=bh("useViewTransitionState"),i=Ma(e,{relative:t});if(!n.isTransitioning)return!1;let o=dt(n.currentLocation.pathname,a)||n.currentLocation.pathname,s=dt(n.nextLocation.pathname,a)||n.nextLocation.pathname;return Xr(i.pathname,s)!=null||Xr(i.pathname,o)!=null}var Qy=typeof Element<"u",Jy=typeof Map=="function",Zy=typeof Set=="function",eg=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function Sr(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,a,i;if(Array.isArray(e)){if(n=e.length,n!=t.length)return!1;for(a=n;a--!==0;)if(!Sr(e[a],t[a]))return!1;return!0}var o;if(Jy&&e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(o=e.entries();!(a=o.next()).done;)if(!t.has(a.value[0]))return!1;for(o=e.entries();!(a=o.next()).done;)if(!Sr(a.value[1],t.get(a.value[0])))return!1;return!0}if(Zy&&e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(o=e.entries();!(a=o.next()).done;)if(!t.has(a.value[0]))return!1;return!0}if(eg&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if(n=e.length,n!=t.length)return!1;for(a=n;a--!==0;)if(e[a]!==t[a])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf&&typeof e.valueOf=="function"&&typeof t.valueOf=="function")return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString&&typeof e.toString=="function"&&typeof t.toString=="function")return e.toString()===t.toString();if(i=Object.keys(e),n=i.length,n!==Object.keys(t).length)return!1;for(a=n;a--!==0;)if(!Object.prototype.hasOwnProperty.call(t,i[a]))return!1;if(Qy&&e instanceof Element)return!1;for(a=n;a--!==0;)if(!((i[a]==="_owner"||i[a]==="__v"||i[a]==="__o")&&e.$$typeof)&&!Sr(e[i[a]],t[i[a]]))return!1;return!0}return e!==e&&t!==t}var tg=function(t,n){try{return Sr(t,n)}catch(a){if((a.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw a}};const ng=Jr(tg);var ag=function(e,t,n,a,i,o,s,l){if(!e){var c;if(t===void 0)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,a,i,o,s,l],m=0;c=new Error(t.replace(/%s/g,function(){return u[m++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}},rg=ag;const Cc=Jr(rg);var ig=function(t,n,a,i){var o=a?a.call(i,t,n):void 0;if(o!==void 0)return!!o;if(t===n)return!0;if(typeof t!="object"||!t||typeof n!="object"||!n)return!1;var s=Object.keys(t),l=Object.keys(n);if(s.length!==l.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(n),u=0;u<s.length;u++){var m=s[u];if(!c(m))return!1;var f=t[m],y=n[m];if(o=a?a.call(i,f,y,m):void 0,o===!1||o===void 0&&f!==y)return!1}return!0};const og=Jr(ig);var Sh=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(Sh||{}),Xi={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},Rc=Object.values(Sh),ll={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},sg=Object.entries(ll).reduce((e,[t,n])=>(e[n]=t,e),{}),Be="data-rh",Tn={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},wn=(e,t)=>{for(let n=e.length-1;n>=0;n-=1){const a=e[n];if(Object.prototype.hasOwnProperty.call(a,t))return a[t]}return null},lg=e=>{let t=wn(e,"title");const n=wn(e,Tn.TITLE_TEMPLATE);if(Array.isArray(t)&&(t=t.join("")),n&&t)return n.replace(/%s/g,()=>t);const a=wn(e,Tn.DEFAULT_TITLE);return t||a||void 0},cg=e=>wn(e,Tn.ON_CHANGE_CLIENT_STATE)||(()=>{}),Qi=(e,t)=>t.filter(n=>typeof n[e]<"u").map(n=>n[e]).reduce((n,a)=>({...n,...a}),{}),ug=(e,t)=>t.filter(n=>typeof n.base<"u").map(n=>n.base).reverse().reduce((n,a)=>{if(!n.length){const i=Object.keys(a);for(let o=0;o<i.length;o+=1){const l=i[o].toLowerCase();if(e.indexOf(l)!==-1&&a[l])return n.concat(a)}}return n},[]),dg=e=>console&&typeof console.warn=="function"&&console.warn(e),Kn=(e,t,n)=>{const a={};return n.filter(i=>Array.isArray(i[e])?!0:(typeof i[e]<"u"&&dg(`Helmet: ${e} should be of type "Array". Instead found type "${typeof i[e]}"`),!1)).map(i=>i[e]).reverse().reduce((i,o)=>{const s={};o.filter(c=>{let u;const m=Object.keys(c);for(let y=0;y<m.length;y+=1){const x=m[y],g=x.toLowerCase();t.indexOf(g)!==-1&&!(u==="rel"&&c[u].toLowerCase()==="canonical")&&!(g==="rel"&&c[g].toLowerCase()==="stylesheet")&&(u=g),t.indexOf(x)!==-1&&(x==="innerHTML"||x==="cssText"||x==="itemprop")&&(u=x)}if(!u||!c[u])return!1;const f=c[u].toLowerCase();return a[u]||(a[u]={}),s[u]||(s[u]={}),a[u][f]?!1:(s[u][f]=!0,!0)}).reverse().forEach(c=>i.push(c));const l=Object.keys(s);for(let c=0;c<l.length;c+=1){const u=l[c],m={...a[u],...s[u]};a[u]=m}return i},[]).reverse()},hg=(e,t)=>{if(Array.isArray(e)&&e.length){for(let n=0;n<e.length;n+=1)if(e[n][t])return!0}return!1},mg=e=>({baseTag:ug(["href"],e),bodyAttributes:Qi("bodyAttributes",e),defer:wn(e,Tn.DEFER),encode:wn(e,Tn.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:Qi("htmlAttributes",e),linkTags:Kn("link",["rel","href"],e),metaTags:Kn("meta",["name","charset","http-equiv","property","itemprop"],e),noscriptTags:Kn("noscript",["innerHTML"],e),onChangeClientState:cg(e),scriptTags:Kn("script",["src","innerHTML"],e),styleTags:Kn("style",["cssText"],e),title:lg(e),titleAttributes:Qi("titleAttributes",e),prioritizeSeoTags:hg(e,Tn.PRIORITIZE_SEO_TAGS)}),Nh=e=>Array.isArray(e)?e.join(""):e,fg=(e,t)=>{const n=Object.keys(e);for(let a=0;a<n.length;a+=1)if(t[n[a]]&&t[n[a]].includes(e[n[a]]))return!0;return!1},Ji=(e,t)=>Array.isArray(e)?e.reduce((n,a)=>(fg(a,t)?n.priority.push(a):n.default.push(a),n),{priority:[],default:[]}):{default:e,priority:[]},Ec=(e,t)=>({...e,[t]:void 0}),pg=["noscript","script","style"],Zo=(e,t=!0)=>t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),jh=e=>Object.keys(e).reduce((t,n)=>{const a=typeof e[n]<"u"?`${n}="${e[n]}"`:`${n}`;return t?`${t} ${a}`:a},""),yg=(e,t,n,a)=>{const i=jh(n),o=Nh(t);return i?`<${e} ${Be}="true" ${i}>${Zo(o,a)}</${e}>`:`<${e} ${Be}="true">${Zo(o,a)}</${e}>`},gg=(e,t,n=!0)=>t.reduce((a,i)=>{const o=i,s=Object.keys(o).filter(u=>!(u==="innerHTML"||u==="cssText")).reduce((u,m)=>{const f=typeof o[m]>"u"?m:`${m}="${Zo(o[m],n)}"`;return u?`${u} ${f}`:f},""),l=o.innerHTML||o.cssText||"",c=pg.indexOf(e)===-1;return`${a}<${e} ${Be}="true" ${s}${c?"/>":`>${l}</${e}>`}`},""),Ah=(e,t={})=>Object.keys(e).reduce((n,a)=>{const i=ll[a];return n[i||a]=e[a],n},t),xg=(e,t,n)=>{const a={key:t,[Be]:!0},i=Ah(n,a);return[Qe.createElement("title",i,t)]},Nr=(e,t)=>t.map((n,a)=>{const i={key:a,[Be]:!0};return Object.keys(n).forEach(o=>{const l=ll[o]||o;if(l==="innerHTML"||l==="cssText"){const c=n.innerHTML||n.cssText;i.dangerouslySetInnerHTML={__html:c}}else i[l]=n[o]}),Qe.createElement(e,i)}),Ce=(e,t,n=!0)=>{switch(e){case"title":return{toComponent:()=>xg(e,t.title,t.titleAttributes),toString:()=>yg(e,t.title,t.titleAttributes,n)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>Ah(t),toString:()=>jh(t)};default:return{toComponent:()=>Nr(e,t),toString:()=>gg(e,t,n)}}},vg=({metaTags:e,linkTags:t,scriptTags:n,encode:a})=>{const i=Ji(e,Xi.meta),o=Ji(t,Xi.link),s=Ji(n,Xi.script);return{priorityMethods:{toComponent:()=>[...Nr("meta",i.priority),...Nr("link",o.priority),...Nr("script",s.priority)],toString:()=>`${Ce("meta",i.priority,a)} ${Ce("link",o.priority,a)} ${Ce("script",s.priority,a)}`},metaTags:i.default,linkTags:o.default,scriptTags:s.default}},Tg=e=>{const{baseTag:t,bodyAttributes:n,encode:a=!0,htmlAttributes:i,noscriptTags:o,styleTags:s,title:l="",titleAttributes:c,prioritizeSeoTags:u}=e;let{linkTags:m,metaTags:f,scriptTags:y}=e,x={toComponent:()=>{},toString:()=>""};return u&&({priorityMethods:x,linkTags:m,metaTags:f,scriptTags:y}=vg(e)),{priority:x,base:Ce("base",t,a),bodyAttributes:Ce("bodyAttributes",n,a),htmlAttributes:Ce("htmlAttributes",i,a),link:Ce("link",m,a),meta:Ce("meta",f,a),noscript:Ce("noscript",o,a),script:Ce("script",y,a),style:Ce("style",s,a),title:Ce("title",{title:l,titleAttributes:c},a)}},es=Tg,rr=[],kh=!!(typeof window<"u"&&window.document&&window.document.createElement),ts=class{constructor(e,t){et(this,"instances",[]);et(this,"canUseDOM",kh);et(this,"context");et(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?rr:this.instances,add:e=>{(this.canUseDOM?rr:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?rr:this.instances).indexOf(e);(this.canUseDOM?rr:this.instances).splice(t,1)}}});this.context=e,this.canUseDOM=t||!1,t||(e.helmet=es({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},wg={},Ch=Qe.createContext(wg),Wt,Rh=(Wt=class extends v.Component{constructor(n){super(n);et(this,"helmetData");this.helmetData=new ts(this.props.context||{},Wt.canUseDOM)}render(){return Qe.createElement(Ch.Provider,{value:this.helmetData.value},this.props.children)}},et(Wt,"canUseDOM",kh),Wt),Zt=(e,t)=>{const n=document.head||document.querySelector("head"),a=n.querySelectorAll(`${e}[${Be}]`),i=[].slice.call(a),o=[];let s;return t&&t.length&&t.forEach(l=>{const c=document.createElement(e);for(const u in l)if(Object.prototype.hasOwnProperty.call(l,u))if(u==="innerHTML")c.innerHTML=l.innerHTML;else if(u==="cssText")c.styleSheet?c.styleSheet.cssText=l.cssText:c.appendChild(document.createTextNode(l.cssText));else{const m=u,f=typeof l[m]>"u"?"":l[m];c.setAttribute(u,f)}c.setAttribute(Be,"true"),i.some((u,m)=>(s=m,c.isEqualNode(u)))?i.splice(s,1):o.push(c)}),i.forEach(l=>{var c;return(c=l.parentNode)==null?void 0:c.removeChild(l)}),o.forEach(l=>n.appendChild(l)),{oldTags:i,newTags:o}},ns=(e,t)=>{const n=document.getElementsByTagName(e)[0];if(!n)return;const a=n.getAttribute(Be),i=a?a.split(","):[],o=[...i],s=Object.keys(t);for(const l of s){const c=t[l]||"";n.getAttribute(l)!==c&&n.setAttribute(l,c),i.indexOf(l)===-1&&i.push(l);const u=o.indexOf(l);u!==-1&&o.splice(u,1)}for(let l=o.length-1;l>=0;l-=1)n.removeAttribute(o[l]);i.length===o.length?n.removeAttribute(Be):n.getAttribute(Be)!==s.join(",")&&n.setAttribute(Be,s.join(","))},bg=(e,t)=>{typeof e<"u"&&document.title!==e&&(document.title=Nh(e)),ns("title",t)},Ic=(e,t)=>{const{baseTag:n,bodyAttributes:a,htmlAttributes:i,linkTags:o,metaTags:s,noscriptTags:l,onChangeClientState:c,scriptTags:u,styleTags:m,title:f,titleAttributes:y}=e;ns("body",a),ns("html",i),bg(f,y);const x={baseTag:Zt("base",n),linkTags:Zt("link",o),metaTags:Zt("meta",s),noscriptTags:Zt("noscript",l),scriptTags:Zt("script",u),styleTags:Zt("style",m)},g={},T={};Object.keys(x).forEach(b=>{const{newTags:h,oldTags:d}=x[b];h.length&&(g[b]=h),d.length&&(T[b]=x[b].oldTags)}),t&&t(),c(e,g,T)},qn=null,Sg=e=>{qn&&cancelAnimationFrame(qn),e.defer?qn=requestAnimationFrame(()=>{Ic(e,()=>{qn=null})}):(Ic(e),qn=null)},Ng=Sg,Pc=class extends v.Component{constructor(){super(...arguments);et(this,"rendered",!1)}shouldComponentUpdate(t){return!og(t,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:t}=this.props.context;t.remove(this),this.emitChange()}emitChange(){const{helmetInstances:t,setHelmet:n}=this.props.context;let a=null;const i=mg(t.get().map(o=>{const s={...o.props};return delete s.context,s}));Rh.canUseDOM?Ng(i):es&&(a=es(i)),n(a)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:t}=this.props.context;t.add(this),this.emitChange()}render(){return this.init(),null}},no,Le=(no=class extends v.Component{shouldComponentUpdate(e){return!ng(Ec(this.props,"helmetData"),Ec(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null;switch(e.type){case"script":case"noscript":return{innerHTML:t};case"style":return{cssText:t};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,t,n,a){return{...t,[e.type]:[...t[e.type]||[],{...n,...this.mapNestedChildrenToProps(e,a)}]}}mapObjectTypeChildren(e,t,n,a){switch(e.type){case"title":return{...t,[e.type]:a,titleAttributes:{...n}};case"body":return{...t,bodyAttributes:{...n}};case"html":return{...t,htmlAttributes:{...n}};default:return{...t,[e.type]:{...n}}}}mapArrayTypeChildrenToProps(e,t){let n={...t};return Object.keys(e).forEach(a=>{n={...n,[a]:e[a]}}),n}warnOnInvalidChildren(e,t){return Cc(Rc.some(n=>e.type===n),typeof e.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${Rc.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),Cc(!t||typeof t=="string"||Array.isArray(t)&&!t.some(n=>typeof n!="string"),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,t){let n={};return Qe.Children.forEach(e,a=>{if(!a||!a.props)return;const{children:i,...o}=a.props,s=Object.keys(o).reduce((c,u)=>(c[sg[u]||u]=o[u],c),{});let{type:l}=a;switch(typeof l=="symbol"?l=l.toString():this.warnOnInvalidChildren(a,i),l){case"Symbol(react.fragment)":t=this.mapChildrenToProps(i,t);break;case"link":case"meta":case"noscript":case"script":case"style":n=this.flattenArrayTypeChildren(a,n,s,i);break;default:t=this.mapObjectTypeChildren(a,t,s,i);break}}),this.mapArrayTypeChildrenToProps(n,t)}render(){const{children:e,...t}=this.props;let n={...t},{helmetData:a}=t;if(e&&(n=this.mapChildrenToProps(e,n)),a&&!(a instanceof ts)){const i=a;a=new ts(i.context,!0),delete n.helmetData}return a?Qe.createElement(Pc,{...n,context:a.value}):Qe.createElement(Ch.Consumer,null,i=>Qe.createElement(Pc,{...n,context:i}))}},et(no,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),no);const jg="modulepreload",Ag=function(e){return"/"+e},Dc={},kg=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=Promise.allSettled(n.map(c=>{if(c=Ag(c),c in Dc)return;Dc[c]=!0;const u=c.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":jg,u||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((y,x)=>{f.addEventListener("load",y),f.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return i.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})},Cg=()=>{const[e,t]=v.useState(!1),[n,a]=v.useState(!1),[i,o]=v.useState(""),s=Ve(),l=yi(),c=v.useRef(null);v.useEffect(()=>{var g;n&&((g=c.current)==null||g.focus())},[n]),v.useEffect(()=>{if(!n)return;const g=T=>{T.key==="Escape"&&(a(!1),o(""))};return document.addEventListener("keydown",g),()=>document.removeEventListener("keydown",g)},[n]);const u=s.pathname.replace(/\/$/,"");if(u==="/annual-tax"||u==="/monthly-withholding")return null;const f=[{path:"/",label:"Calculator"},{path:"/articles/",label:"Articles"},{path:"/faq/",label:"FAQ"},{path:"/methodology/",label:"Methodology"}],y=g=>g==="/"?s.pathname==="/":s.pathname.startsWith(g.replace(/\/$/,"")),x=g=>{g.preventDefault();const T=i.trim();T&&(l(`/search?q=${encodeURIComponent(T)}`),a(!1),o(""),t(!1))};return r.jsx("header",{className:"bg-white shadow-sm sticky top-0 z-50",children:r.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[r.jsxs("div",{className:"flex items-center justify-between h-16",children:[r.jsx(F,{to:"/",className:"flex items-center gap-2 shrink-0",children:r.jsx("span",{className:"text-xl font-bold text-blue-500",children:"Thai Tax Calculator"})}),r.jsx("div",{className:"hidden md:flex items-center gap-6",children:n?r.jsxs("form",{onSubmit:x,className:"flex items-center gap-2",children:[r.jsx("input",{ref:c,type:"text",value:i,onChange:g=>o(g.target.value),placeholder:"Search articles and FAQs...",className:"w-72 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors text-sm"}),r.jsx("button",{type:"submit",className:"text-blue-500 hover:text-blue-700 font-medium text-sm whitespace-nowrap",children:"Search"}),r.jsx("button",{type:"button",onClick:()=>{a(!1),o("")},"aria-label":"Close search",className:"text-gray-400 hover:text-gray-600",children:r.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}):r.jsxs(r.Fragment,{children:[r.jsx("nav",{className:"flex items-center gap-6",children:f.map(g=>r.jsx(F,{to:g.path,className:`font-medium transition-colors ${y(g.path)?"text-blue-500":"text-gray-600 hover:text-blue-500"}`,children:g.label},g.path))}),r.jsx("button",{onClick:()=>a(!0),"aria-label":"Search",className:"text-gray-500 hover:text-blue-500 transition-colors",children:r.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})})]})}),r.jsx("button",{className:"md:hidden p-2 text-gray-600 hover:text-gray-900",onClick:()=>t(!e),"aria-label":e?"Close menu":"Open menu","aria-expanded":e,children:e?r.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}):r.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})})]}),e&&r.jsx("nav",{className:"md:hidden py-4 border-t border-gray-100",children:r.jsxs("div",{className:"flex flex-col gap-2",children:[r.jsx("form",{onSubmit:x,className:"px-4 mb-2",children:r.jsxs("div",{className:"relative",children:[r.jsx("input",{type:"text",value:i,onChange:g=>o(g.target.value),placeholder:"Search articles and FAQs...",className:"w-full px-4 py-2 pl-9 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"}),r.jsx("svg",{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})]})}),f.map(g=>r.jsx(F,{to:g.path,onClick:()=>t(!1),className:`py-2 px-4 rounded-lg font-medium transition-colors ${y(g.path)?"bg-blue-50 text-blue-500":"text-gray-600 hover:bg-gray-50"}`,children:g.label},g.path))]})})]})})},Rg=()=>{const t=Ve().pathname.replace(/\/$/,"");return t==="/annual-tax"||t==="/monthly-withholding"?null:r.jsx("footer",{className:"bg-gray-50 border-t border-gray-200",children:r.jsxs("div",{className:"max-w-6xl mx-auto px-4 py-8",children:[r.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center gap-4",children:[r.jsxs("div",{className:"text-gray-600 text-sm",children:[new Date().getFullYear()," Thai Tax Calculator. For informational purposes only."]}),r.jsxs("nav",{className:"flex gap-6 text-sm",children:[r.jsx(F,{to:"/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Calculator"}),r.jsx(F,{to:"/articles/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Articles"}),r.jsx(F,{to:"/faq/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"FAQ"}),r.jsx(F,{to:"/about/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"About"}),r.jsx(F,{to:"/methodology/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Methodology"}),r.jsx(F,{to:"/sources/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Sources"}),r.jsx(F,{to:"/about/#for-developers",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"API"}),r.jsx(F,{to:"/privacy/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Privacy"}),r.jsx(F,{to:"/contact/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Contact"})]})]}),r.jsx("div",{className:"mt-4 text-center text-xs text-gray-500",children:"This calculator provides estimates only. Consult a qualified tax professional for official advice."})]})})},Eg=({children:e})=>r.jsxs("div",{className:"min-h-screen flex flex-col bg-gray-100",children:[r.jsx(Cg,{}),r.jsx("main",{className:"flex-grow",children:e}),r.jsx(Rg,{})]}),Ig=[{value:"basic",label:"Basic Estimate",description:"Quick calculation without deductions",icon:"⚡"},{value:"detailed",label:"Detailed Estimate",description:"Include deductions for a more accurate result",icon:"📋"}],Pg=({formData:e,setFormData:t,nextStep:n})=>{const a=i=>{t({...e,estimateType:i}),n()};return r.jsxs("div",{children:[r.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Choose your estimate type"}),r.jsx("p",{className:"text-gray-600 mb-6",children:"You can choose a quick estimate without deductions, or a more detailed estimate where deductions are included."}),r.jsx("div",{className:"space-y-4",children:Ig.map(i=>r.jsx("button",{onClick:()=>a(i.value),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.estimateType===i.value?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.estimateType===i.value,children:r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx("span",{className:"text-3xl",children:i.icon}),r.jsxs("div",{children:[r.jsx("h3",{className:"font-semibold text-gray-800",children:i.label}),r.jsx("p",{className:"text-sm text-gray-500",children:i.description})]})]})},i.value))})]})},Dg=[{value:"fixed",label:"Fixed Monthly Income",description:"Same salary every month",icon:"📅"},{value:"variable",label:"Variable Monthly Income",description:"Different income each month (bonuses, allowances, etc.)",icon:"📊"}],Fg=({formData:e,setFormData:t,nextStep:n})=>{const a=i=>{t({...e,incomeType:i}),n()};return r.jsxs("div",{children:[r.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"How do you receive your income?"}),r.jsx("p",{className:"text-gray-600 mb-6",children:"Choose based on whether your monthly income is consistent or varies throughout the year."}),r.jsx("div",{className:"space-y-4",children:Dg.map(i=>r.jsx("button",{onClick:()=>a(i.value),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.incomeType===i.value?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.incomeType===i.value,children:r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx("span",{className:"text-3xl",children:i.icon}),r.jsxs("div",{children:[r.jsx("h3",{className:"font-semibold text-gray-800",children:i.label}),r.jsx("p",{className:"text-sm text-gray-500",children:i.description})]})]})},i.value))})]})};function _g(){return{companyName:"",companyType:"limited_company",ownershipPercentage:100,isDirector:!0,hasOtherShareholders:!1}}function r0(){return{employmentType:"company_owner",companyInfo:_g(),salaryFromCompany:0,directorFees:0,otherCompanyBenefits:0,hasDividends:!1,dividendEntries:[],companyProfitAfterTax:0,salaryWithholdingTax:0,taxWithheld:0,includeSocialSecurity:!1,socialSecurityContribution:0,companySocialSecurityContribution:0,maritalStatus:"",spouseHasNoIncome:!1,isAge65OrOlder:!1,children:[],childrenEligibilityConfirmed:!1,numberOfParents:0,parentsEligibilityConfirmed:!1,hasLifeInsurance:!1,lifeInsurance:0,hasHealthInsurance:!1,healthInsurance:0,hasPensionFund:!1,pensionFund:0,hasProvidentFund:!1,providentFund:0,hasRMF:!1,rmf:0,hasSSF:!1,ssf:0,hasDonations:!1,donations:0}}function i0(){return`div-${Date.now()}-${Math.random().toString(36).substring(2,9)}`}function Lg(e){return e.salaryFromCompany+e.directorFees+e.otherCompanyBenefits}function Mg(e){return e.dividendEntries.filter(t=>t.includeInPIT).reduce((t,n)=>t+n.amount,0)}function Og(e){return e.dividendEntries.filter(t=>t.includeInPIT).reduce((t,n)=>t+n.withholdingTax,0)}const E={STANDARD_DEDUCTION_RATE:.5,MAX_STANDARD_DEDUCTION:1e5,MAX_SOCIAL_SECURITY:10500,PERSONAL_ALLOWANCE:6e4,SPOUSE_ALLOWANCE:6e4,SENIOR_ALLOWANCE:19e4,CHILD_ALLOWANCE_BASE:3e4,CHILD_ALLOWANCE_BONUS:3e4,CHILD_BONUS_BIRTH_YEAR:2018,PARENT_ALLOWANCE:3e4,MAX_PARENTS:4,MAX_LIFE_INSURANCE:1e5,MAX_HEALTH_INSURANCE:25e3,MAX_PENSION_FUND:5e5,MAX_PROVIDENT_FUND:5e5,MAX_RMF:5e5,MAX_SSF:2e5,MAX_DONATION_PERCENT:.1},D={STANDARD_DEDUCTION_RATE:.5,MAX_STANDARD_DEDUCTION:1e5,MAX_SOCIAL_SECURITY:10500,PERSONAL_ALLOWANCE:6e4,SPOUSE_ALLOWANCE:6e4,SENIOR_ALLOWANCE:19e4,CHILD_ALLOWANCE_BASE:3e4,CHILD_ALLOWANCE_BONUS:3e4,PARENT_ALLOWANCE:3e4,MAX_PARENTS:4,MAX_LIFE_INSURANCE:1e5,MAX_HEALTH_INSURANCE:25e3,MAX_PENSION_FUND:5e5,MAX_PROVIDENT_FUND:5e5,MAX_RMF:5e5,MAX_SSF:2e5,MAX_DONATION_PERCENT:.1,CHILD_BONUS_BIRTH_YEAR:2018},ca=[{upTo:15e4,rate:0,label:"0-150k"},{upTo:3e5,rate:.05,label:"150k-300k"},{upTo:5e5,rate:.1,label:"300k-500k"},{upTo:75e4,rate:.15,label:"500k-750k"},{upTo:1e6,rate:.2,label:"750k-1M"},{upTo:2e6,rate:.25,label:"1M-2M"},{upTo:5e6,rate:.3,label:"2M-5M"},{upTo:1/0,rate:.35,label:"5M+"}],Ug=({formData:e,setFormData:t})=>{const[n,a]=v.useState(e.monthlySalary?e.monthlySalary.toString():""),[i,o]=v.useState(e.annualBonus?e.annualBonus.toString():""),[s,l]=v.useState(e.annualOtherIncome?e.annualOtherIncome.toString():""),[c,u]=v.useState(e.includeSocialSecurity||!1),[m,f]=v.useState(e.socialSecurityContribution?e.socialSecurityContribution.toString():"");v.useEffect(()=>{const h=parseFloat(n.replace(/,/g,""))||0,d=parseFloat(i.replace(/,/g,""))||0,p=parseFloat(s.replace(/,/g,""))||0,w=c?Math.min(parseFloat(m.replace(/,/g,""))||0,E.MAX_SOCIAL_SECURITY):0;t({...e,monthlySalary:h,annualBonus:d,annualOtherIncome:p,includeSocialSecurity:c,socialSecurityContribution:w})},[n,i,s,c,m]);const y=h=>{const d=h.target.value.replace(/[^0-9]/g,"");a(d)},x=h=>{const d=h.target.value.replace(/[^0-9]/g,"");o(d)},g=h=>{const d=h.target.value.replace(/[^0-9]/g,"");l(d)},T=h=>{const d=h.target.value.replace(/[^0-9]/g,"");(parseInt(d)||0)<=E.MAX_SOCIAL_SECURITY&&f(d)},b=h=>{const d=parseInt(h.replace(/,/g,""))||0;return d>0?d.toLocaleString():""};return r.jsxs("div",{children:[r.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4",children:"Assessable Income"}),r.jsx("p",{className:"text-gray-600 mb-6",children:"Enter your income details below. Include your regular monthly salary, plus any bonus or other income you expect to receive this year."}),r.jsxs("div",{className:"mb-4",children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Salary per month (THB)"}),r.jsxs("div",{className:"relative",children:[r.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),r.jsx("input",{type:"text",value:b(n),onChange:y,className:"w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]})]}),r.jsxs("div",{className:"mb-4",children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Bonus per year (THB)"}),r.jsxs("div",{className:"relative",children:[r.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),r.jsx("input",{type:"text",value:b(i),onChange:x,className:"w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Expected annual bonus amount"})]}),r.jsxs("div",{className:"mb-6",children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Other income per year (THB)"}),r.jsxs("div",{className:"relative",children:[r.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),r.jsx("input",{type:"text",value:b(s),onChange:g,className:"w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Housing allowance, overtime, commissions, etc."})]}),r.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[r.jsxs("label",{className:"flex items-start gap-3 cursor-pointer",children:[r.jsx("input",{type:"checkbox",checked:c,onChange:h=>u(h.target.checked),className:"mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),r.jsxs("div",{children:[r.jsx("span",{className:"font-medium text-gray-800",children:"Include Social Security Contributions"}),r.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Social security contributions are tax-deductible up to ฿10,500 per year (2026 limit)."})]})]}),c&&r.jsxs("div",{className:"mt-4 ml-8",children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Estimated annual contribution (THB)"}),r.jsxs("div",{className:"relative",children:[r.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),r.jsx("input",{type:"text",value:b(m),onChange:T,className:"w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]}),r.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Maximum: ฿",E.MAX_SOCIAL_SECURITY.toLocaleString()," per year"]})]})]})]})},Hg=["January","February","March","April","May","June","July","August","September","October","November","December"],Bg=()=>({salary:0,bonus:0,housingAllowance:0,otherIncome:0}),Wg=({formData:e,setFormData:t})=>{var T;const[n,a]=v.useState(((T=e.variableIncome)==null?void 0:T.length)===12?e.variableIncome:Array(12).fill(null).map(()=>Bg())),[i,o]=v.useState(e.includeSocialSecurity||!1),[s,l]=v.useState(e.socialSecurityContribution?e.socialSecurityContribution.toString():""),[c,u]=v.useState(null);v.useEffect(()=>{const b=i?Math.min(parseFloat(s.replace(/,/g,""))||0,E.MAX_SOCIAL_SECURITY):0;t({...e,variableIncome:n,includeSocialSecurity:i,socialSecurityContribution:b})},[n,i,s]);const m=(b,h,d)=>{const p=parseFloat(d.replace(/[^0-9]/g,""))||0,w=[...n];w[b]={...w[b],[h]:p},a(w)},f=b=>{const h=b.target.value.replace(/[^0-9]/g,"");(parseInt(h)||0)<=E.MAX_SOCIAL_SECURITY&&l(h)},y=b=>b.salary+b.bonus+b.housingAllowance+b.otherIncome,x=()=>n.reduce((b,h)=>b+y(h),0),g=b=>b>0?b.toLocaleString():"";return r.jsxs("div",{children:[r.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Enter your monthly income"}),r.jsx("p",{className:"text-gray-600 mb-4",children:"Enter your income for each month. All taxable income including bonuses and housing allowances by the company should be included."}),r.jsx("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6",children:r.jsxs("div",{className:"flex justify-between items-center",children:[r.jsx("span",{className:"text-sm text-blue-700",children:"Total Annual Income"}),r.jsxs("span",{className:"text-xl font-bold text-blue-700",children:["฿",x().toLocaleString()]})]})}),r.jsx("div",{className:"space-y-2 mb-6 max-h-80 overflow-y-auto",children:Hg.map((b,h)=>r.jsxs("div",{className:"border border-gray-200 rounded-lg overflow-hidden",children:[r.jsxs("button",{onClick:()=>u(c===h?null:h),className:"w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100",children:[r.jsx("span",{className:"font-medium text-gray-800",children:b}),r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsxs("span",{className:"text-gray-600",children:["฿",y(n[h]).toLocaleString()]}),r.jsx("span",{className:"text-gray-400",children:c===h?"▲":"▼"})]})]}),c===h&&r.jsxs("div",{className:"p-4 space-y-3 bg-white",children:[r.jsxs("div",{children:[r.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Salary"}),r.jsxs("div",{className:"relative",children:[r.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),r.jsx("input",{type:"text",value:g(n[h].salary),onChange:d=>m(h,"salary",d.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Bonus"}),r.jsxs("div",{className:"relative",children:[r.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),r.jsx("input",{type:"text",value:g(n[h].bonus),onChange:d=>m(h,"bonus",d.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Housing Allowance"}),r.jsxs("div",{className:"relative",children:[r.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),r.jsx("input",{type:"text",value:g(n[h].housingAllowance),onChange:d=>m(h,"housingAllowance",d.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Other Taxable Income"}),r.jsxs("div",{className:"relative",children:[r.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),r.jsx("input",{type:"text",value:g(n[h].otherIncome),onChange:d=>m(h,"otherIncome",d.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]})]})]},b))}),r.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[r.jsxs("label",{className:"flex items-start gap-3 cursor-pointer",children:[r.jsx("input",{type:"checkbox",checked:i,onChange:b=>o(b.target.checked),className:"mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),r.jsxs("div",{children:[r.jsx("span",{className:"font-medium text-gray-800",children:"Include Social Security Contributions"}),r.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Social security contributions are tax-deductible up to ฿10,500 per year (2026 limit)."})]})]}),i&&r.jsxs("div",{className:"mt-4 ml-8",children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Estimated annual contribution (THB)"}),r.jsxs("div",{className:"relative",children:[r.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),r.jsx("input",{type:"text",value:s?parseInt(s).toLocaleString():"",onChange:f,className:"w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500",placeholder:"0"})]}),r.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Maximum: ฿",E.MAX_SOCIAL_SECURITY.toLocaleString()," per year"]})]})]})]})},zg=({formData:e,setFormData:t,nextStep:n})=>{const[a,i]=v.useState(e.maritalStatus==="married"),o=l=>{l==="single"?(t({...e,maritalStatus:l,spouseHasNoIncome:!1}),i(!1),n()):(t({...e,maritalStatus:l}),i(!0))},s=l=>{t({...e,spouseHasNoIncome:l})};return r.jsxs("div",{children:[r.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"What is your marital status?"}),r.jsx("p",{className:"text-gray-600 mb-6",children:"Your marital status affects your tax allowances."}),r.jsxs("div",{className:"space-y-4 mb-6",children:[r.jsx("button",{onClick:()=>o("single"),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.maritalStatus==="single"?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.maritalStatus==="single",children:r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx("span",{className:"text-3xl",children:"👤"}),r.jsxs("div",{children:[r.jsx("h3",{className:"font-semibold text-gray-800",children:"Single"}),r.jsx("p",{className:"text-sm text-gray-500",children:"Not married or legally separated"})]})]})}),r.jsx("button",{onClick:()=>o("married"),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.maritalStatus==="married"?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.maritalStatus==="married",children:r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx("span",{className:"text-3xl",children:"👫"}),r.jsxs("div",{children:[r.jsx("h3",{className:"font-semibold text-gray-800",children:"Married"}),r.jsx("p",{className:"text-sm text-gray-500",children:"Legally married"})]})]})})]}),a&&r.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4",children:[r.jsxs("div",{className:"flex items-start gap-3 mb-4",children:[r.jsx("div",{className:"flex-shrink-0 mt-0.5",children:r.jsx("svg",{className:"h-5 w-5 text-blue-500",viewBox:"0 0 20 20",fill:"currentColor",children:r.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})})}),r.jsxs("p",{className:"text-sm text-blue-700",children:["You can claim a ฿",E.SPOUSE_ALLOWANCE.toLocaleString()," spouse allowance only if your spouse has no income during the tax year."]})]}),r.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[r.jsx("input",{type:"checkbox",checked:e.spouseHasNoIncome,onChange:l=>s(l.target.checked),className:"w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),r.jsx("span",{className:"text-gray-800",children:"My spouse has no income"})]})]})]})},ir=new Date().getFullYear(),$g=({formData:e,setFormData:t,showValidationErrors:n=!1})=>{const[a,i]=v.useState(e.childrenEligibilityConfirmed||e.children.length>0),[o,s]=v.useState(e.parentsEligibilityConfirmed||e.numberOfParents>0),l=h=>ir-h,c=h=>{const d=l(h);return d>=20&&d<=25},u=(h,d)=>{let p=E.CHILD_ALLOWANCE_BASE;return d>=1&&h.birthYear>=E.CHILD_BONUS_BIRTH_YEAR&&(p+=E.CHILD_ALLOWANCE_BONUS),p},m=()=>e.children.reduce((h,d,p)=>h+u(d,p),0),f=()=>{const h=[...e.children,{birthYear:ir-10,isStudent:!1}];t({...e,children:h})},y=()=>{if(e.children.length>0){const h=e.children.slice(0,-1);t({...e,children:h})}},x=(h,d)=>{const p=[...e.children];p[h]={...p[h],birthYear:d},c(d)||(p[h].isStudent=!1),t({...e,children:p})},g=(h,d)=>{const p=[...e.children];p[h]={...p[h],isStudent:d},t({...e,children:p})},T=h=>{const d=Math.max(0,Math.min(E.MAX_PARENTS,e.numberOfParents+h));t({...e,numberOfParents:d})},b=E.PERSONAL_ALLOWANCE+(e.maritalStatus==="married"&&e.spouseHasNoIncome?E.SPOUSE_ALLOWANCE:0)+(e.isAge65OrOlder?E.SENIOR_ALLOWANCE:0)+m()+e.numberOfParents*E.PARENT_ALLOWANCE;return r.jsxs("div",{children:[r.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Dependents & Allowances"}),r.jsx("p",{className:"text-gray-600 mb-6",children:"Tell us about your dependents to calculate your allowances."}),r.jsxs("div",{className:"mb-6",children:[r.jsx("h3",{className:"text-lg font-semibold text-gray-800 mb-3",children:"Children"}),r.jsxs("div",{className:"bg-gray-50 rounded-lg p-4",children:[r.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm",children:[r.jsx("p",{className:"font-medium text-blue-800 mb-1",children:"Eligibility Criteria:"}),r.jsxs("ul",{className:"text-blue-700 space-y-1",children:[r.jsx("li",{children:"• Under 20 years old, OR under 25 and studying, OR legally incompetent"}),r.jsx("li",{children:"• Earning less than ฿30,000 per year"})]})]}),r.jsxs("label",{className:`flex items-center gap-3 cursor-pointer p-3 border rounded-lg bg-white ${n&&a&&e.children.length===0?"border-red-500":"border-gray-200"}`,children:[r.jsx("input",{type:"checkbox",checked:a,onChange:h=>{i(h.target.checked),h.target.checked?t({...e,childrenEligibilityConfirmed:!0}):t({...e,children:[],childrenEligibilityConfirmed:!1})},className:"w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),r.jsx("span",{className:"text-gray-800",children:"I have children who meet these criteria"})]}),n&&a&&e.children.length===0&&r.jsx("p",{className:"mt-2 text-sm text-red-600",children:"Please add at least one child or uncheck the box above."}),a&&r.jsxs("div",{className:"mt-4",children:[r.jsxs("div",{className:"flex items-center gap-4 mb-4",children:[r.jsx("span",{className:"text-gray-700",children:"Number of children:"}),r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx("button",{onClick:y,disabled:e.children.length===0,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed","aria-label":"Remove child",children:"-"}),r.jsx("span",{className:"w-8 text-center font-medium",children:e.children.length}),r.jsx("button",{onClick:f,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100","aria-label":"Add child",children:"+"})]})]}),e.children.map((h,d)=>{const p=l(h.birthYear),w=c(h.birthYear),S=u(h,d),A=d>=1&&h.birthYear>=E.CHILD_BONUS_BIRTH_YEAR;return r.jsxs("div",{className:"bg-white border border-gray-200 rounded-lg p-3 mb-3",children:[r.jsxs("div",{className:"flex items-center justify-between mb-2",children:[r.jsxs("span",{className:"font-medium text-gray-700",children:["Child ",d+1]}),r.jsxs("span",{className:"text-sm text-green-600 font-medium",children:["฿",S.toLocaleString(),A&&r.jsx("span",{className:"text-xs text-green-500 ml-1",children:"(+฿30k bonus)"})]})]}),r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx("label",{className:"text-sm text-gray-600",children:"Birth year:"}),r.jsx("input",{type:"number",value:h.birthYear,onChange:j=>x(d,parseInt(j.target.value)||ir),min:1900,max:ir,className:"w-24 px-2 py-1 border border-gray-300 rounded text-center"}),r.jsxs("span",{className:"text-sm text-gray-500",children:["Age: ",p]})]}),w&&r.jsxs("label",{className:"flex items-center gap-2 mt-2 cursor-pointer",children:[r.jsx("input",{type:"checkbox",checked:h.isStudent||!1,onChange:j=>g(d,j.target.checked),className:"w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),r.jsx("span",{className:"text-sm text-gray-600",children:"Currently studying (required for ages 20-25)"})]})]},d)}),e.children.length>0&&r.jsxs("div",{className:"text-right text-sm text-gray-600",children:["Total children allowance: ",r.jsxs("span",{className:"font-medium text-green-600",children:["฿",m().toLocaleString()]})]})]})]})]}),r.jsxs("div",{className:"mb-6",children:[r.jsx("h3",{className:"text-lg font-semibold text-gray-800 mb-3",children:"Parents"}),r.jsxs("div",{className:"bg-gray-50 rounded-lg p-4",children:[r.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm",children:[r.jsx("p",{className:"font-medium text-blue-800 mb-1",children:"Eligibility Criteria:"}),r.jsxs("ul",{className:"text-blue-700 space-y-1",children:[r.jsx("li",{children:"• Parent is 60 years or older"}),r.jsx("li",{children:"• Parent's annual income is less than ฿30,000"}),r.jsxs("li",{children:["• You can claim up to ",E.MAX_PARENTS," parents (yours and spouse's)"]})]}),r.jsxs("p",{className:"text-blue-600 mt-2",children:["Allowance: ฿",E.PARENT_ALLOWANCE.toLocaleString()," per eligible parent"]})]}),r.jsxs("label",{className:`flex items-center gap-3 cursor-pointer p-3 border rounded-lg bg-white ${n&&o&&e.numberOfParents===0?"border-red-500":"border-gray-200"}`,children:[r.jsx("input",{type:"checkbox",checked:o,onChange:h=>{s(h.target.checked),h.target.checked?t({...e,parentsEligibilityConfirmed:!0}):t({...e,numberOfParents:0,parentsEligibilityConfirmed:!1})},className:"w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),r.jsx("span",{className:"text-gray-800",children:"I have parents who meet these criteria"})]}),n&&o&&e.numberOfParents===0&&r.jsx("p",{className:"mt-2 text-sm text-red-600",children:"Please add at least one parent or uncheck the box above."}),o&&r.jsx("div",{className:"mt-4",children:r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx("span",{className:"text-gray-700",children:"Number of parents:"}),r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx("button",{onClick:()=>T(-1),disabled:e.numberOfParents===0,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed","aria-label":"Remove parent",children:"-"}),r.jsx("span",{className:"w-8 text-center font-medium",children:e.numberOfParents}),r.jsx("button",{onClick:()=>T(1),disabled:e.numberOfParents>=E.MAX_PARENTS,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed","aria-label":"Add parent",children:"+"})]}),r.jsxs("span",{className:"text-sm text-green-600 font-medium",children:["฿",(e.numberOfParents*E.PARENT_ALLOWANCE).toLocaleString()]})]})})]})]}),r.jsxs("div",{className:"bg-green-50 border border-green-200 rounded-lg p-4",children:[r.jsx("h3",{className:"font-semibold text-green-800 mb-2",children:"Total Allowances"}),r.jsxs("div",{className:"text-sm text-green-700 space-y-1",children:[r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{children:"Personal:"}),r.jsxs("span",{children:["฿",E.PERSONAL_ALLOWANCE.toLocaleString()]})]}),e.maritalStatus==="married"&&e.spouseHasNoIncome&&r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{children:"Spouse:"}),r.jsxs("span",{children:["฿",E.SPOUSE_ALLOWANCE.toLocaleString()]})]}),e.isAge65OrOlder&&r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{children:"Senior (65+):"}),r.jsxs("span",{children:["฿",E.SENIOR_ALLOWANCE.toLocaleString()]})]}),e.children.length>0&&r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{children:"Children:"}),r.jsxs("span",{children:["฿",m().toLocaleString()]})]}),e.numberOfParents>0&&r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{children:"Parents:"}),r.jsxs("span",{children:["฿",(e.numberOfParents*E.PARENT_ALLOWANCE).toLocaleString()]})]}),r.jsxs("div",{className:"flex justify-between font-semibold border-t border-green-300 pt-1 mt-2",children:[r.jsx("span",{children:"Total:"}),r.jsxs("span",{children:["฿",b.toLocaleString()]})]})]})]})]})},Yg=({formData:e,setFormData:t,showValidationErrors:n=!1})=>{const i=(()=>{var f;return e.incomeType==="variable"&&((f=e.variableIncome)==null?void 0:f.length)===12?e.variableIncome.reduce((y,x)=>y+x.salary+x.bonus+x.housingAllowance+x.otherIncome,0):e.monthlySalary*12})(),o=v.useMemo(()=>[{key:"lifeInsurance",hasKey:"hasLifeInsurance",label:"Life Insurance",description:"Life insurance premiums paid during the year",maxValue:E.MAX_LIFE_INSURANCE},{key:"healthInsurance",hasKey:"hasHealthInsurance",label:"Health Insurance",description:"Health insurance premiums paid during the year",maxValue:E.MAX_HEALTH_INSURANCE},{key:"pensionFund",hasKey:"hasPensionFund",label:"Pension Fund",description:"Government pension fund contributions",maxValue:E.MAX_PENSION_FUND},{key:"providentFund",hasKey:"hasProvidentFund",label:"Provident Fund",description:"Private provident fund contributions",maxValue:E.MAX_PROVIDENT_FUND},{key:"rmf",hasKey:"hasRMF",label:"RMF (Retirement Mutual Fund)",description:"RMF investments for retirement",maxValue:E.MAX_RMF},{key:"ssf",hasKey:"hasSSF",label:"SSF (Super Savings Fund)",description:"SSF long-term investments",maxValue:E.MAX_SSF},{key:"donations",hasKey:"hasDonations",label:"Charitable Donations",description:"Donations to approved charities (limited to 10% of income)",maxValue:Math.floor(i*E.MAX_DONATION_PERCENT)}],[i]),[s,l]=v.useState({hasLifeInsurance:e.hasLifeInsurance||!1,lifeInsurance:e.lifeInsurance||0,hasHealthInsurance:e.hasHealthInsurance||!1,healthInsurance:e.healthInsurance||0,hasPensionFund:e.hasPensionFund||!1,pensionFund:e.pensionFund||0,hasProvidentFund:e.hasProvidentFund||!1,providentFund:e.providentFund||0,hasRMF:e.hasRMF||!1,rmf:e.rmf||0,hasSSF:e.hasSSF||!1,ssf:e.ssf||0,hasDonations:e.hasDonations||!1,donations:e.donations||0});v.useEffect(()=>{t({...e,...s})},[s]);const c=(f,y)=>{l({...s,[f]:y})},u=(f,y,x)=>{const g=Math.min(parseFloat(y.replace(/[^0-9]/g,""))||0,x);l({...s,[f]:g})},m=f=>f>0?f.toLocaleString():"";return r.jsxs("div",{children:[r.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Tax Deductions"}),r.jsx("p",{className:"text-gray-600 mb-6",children:"Select any deductions you qualify for. These will reduce your taxable income."}),r.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4",children:[r.jsxs("div",{className:"flex items-start gap-3 mb-3",children:[r.jsx("div",{className:"flex-shrink-0 mt-0.5",children:r.jsx("svg",{className:"h-5 w-5 text-amber-500",viewBox:"0 0 20 20",fill:"currentColor",children:r.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})})}),r.jsxs("p",{className:"text-sm text-amber-700",children:["Taxpayers aged 65 or older are entitled to an additional ฿",E.SENIOR_ALLOWANCE.toLocaleString()," allowance."]})]}),r.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[r.jsx("input",{type:"checkbox",checked:e.isAge65OrOlder,onChange:f=>t({...e,isAge65OrOlder:f.target.checked}),className:"w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"}),r.jsx("span",{className:"text-gray-800",children:"I am 65 years or older"})]})]}),r.jsx("div",{className:"space-y-4 mb-6",children:o.map(f=>{const y=s[f.hasKey],x=s[f.key],g=n&&y&&x===0;return r.jsxs("div",{className:`border rounded-lg p-4 ${g?"border-red-500":"border-gray-200"}`,children:[r.jsxs("label",{className:"flex items-start gap-3 cursor-pointer",children:[r.jsx("input",{type:"checkbox",checked:y,onChange:T=>c(f.hasKey,T.target.checked),className:"mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),r.jsxs("div",{className:"flex-1",children:[r.jsx("span",{className:"font-medium text-gray-800",children:f.label}),r.jsx("p",{className:"text-sm text-gray-500",children:f.description})]})]}),y&&r.jsxs("div",{className:"mt-3 ml-8",children:[r.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Amount (THB)"}),r.jsxs("div",{className:"relative",children:[r.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",children:"฿"}),r.jsx("input",{type:"text",value:m(x),onChange:T=>u(f.key,T.target.value,f.maxValue),className:`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 ${g?"border-red-500 focus:ring-red-200":"border-gray-300 focus:ring-blue-500"}`,placeholder:"0"})]}),g?r.jsx("p",{className:"text-sm text-red-600 mt-1",children:"Please enter an amount or uncheck this deduction."}):r.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Maximum: ฿",f.maxValue.toLocaleString()," per year"]})]})]},f.key)})})]})};function Rn(e){if(e<=0)return 0;let t=0,n=e,a=0;for(const i of ca){if(n<=0)break;const o=i.upTo-a,s=Math.min(n,o);t+=s*i.rate,n-=s,a=i.upTo}return t}const Ge={salary_40_1:.5,liberal_profession_40_6:.3,contractor_40_7:.6,business_sales_40_8:.6,rental_40_5:.3,dividend:0,other:0},Ra={VAT_REGISTRATION:18e5,PND94_SINGLE:6e4,PND94_MARRIED_SPOUSE_NO_INCOME:12e4,THAI_RESIDENCY_DAYS:180,FOREIGN_INCOME_TAX_YEAR_START:"2024-01-01"},Eh=["rental_40_5","liberal_profession_40_6","contractor_40_7","business_sales_40_8"],o0={office_supplies:"Office Supplies",equipment:"Equipment & Tools",software:"Software & Subscriptions",travel:"Travel & Transportation",communication:"Phone & Internet",professional_services:"Professional Services",rent:"Office Rent",utilities:"Utilities",marketing:"Marketing & Advertising",insurance:"Business Insurance",other:"Other Expenses"},s0=[{code:"USD",name:"US Dollar",symbol:"$"},{code:"EUR",name:"Euro",symbol:"€"},{code:"GBP",name:"British Pound",symbol:"£"},{code:"JPY",name:"Japanese Yen",symbol:"¥"},{code:"SGD",name:"Singapore Dollar",symbol:"S$"},{code:"HKD",name:"Hong Kong Dollar",symbol:"HK$"},{code:"AUD",name:"Australian Dollar",symbol:"A$"},{code:"CNY",name:"Chinese Yuan",symbol:"¥"},{code:"KRW",name:"Korean Won",symbol:"₩"},{code:"THB",name:"Thai Baht",symbol:"฿"}],l0=[{code:"AED",name:"UAE Dirham",symbol:"د.إ"},{code:"BDT",name:"Bangladeshi Taka",symbol:"৳"},{code:"BHD",name:"Bahraini Dinar",symbol:".د.ب"},{code:"BND",name:"Brunei Dollar",symbol:"B$"},{code:"BRL",name:"Brazilian Real",symbol:"R$"},{code:"CAD",name:"Canadian Dollar",symbol:"C$"},{code:"CHF",name:"Swiss Franc",symbol:"Fr"},{code:"CZK",name:"Czech Koruna",symbol:"Kč"},{code:"DKK",name:"Danish Krone",symbol:"kr"},{code:"HUF",name:"Hungarian Forint",symbol:"Ft"},{code:"IDR",name:"Indonesian Rupiah",symbol:"Rp"},{code:"INR",name:"Indian Rupee",symbol:"₹"},{code:"KHR",name:"Cambodian Riel",symbol:"៛"},{code:"KWD",name:"Kuwaiti Dinar",symbol:"د.ك"},{code:"LAK",name:"Lao Kip",symbol:"₭"},{code:"LKR",name:"Sri Lankan Rupee",symbol:"₨"},{code:"MXN",name:"Mexican Peso",symbol:"$"},{code:"MYR",name:"Malaysian Ringgit",symbol:"RM"},{code:"MMK",name:"Myanmar Kyat",symbol:"K"},{code:"NOK",name:"Norwegian Krone",symbol:"kr"},{code:"NPR",name:"Nepalese Rupee",symbol:"₨"},{code:"NZD",name:"New Zealand Dollar",symbol:"NZ$"},{code:"OMR",name:"Omani Rial",symbol:"ر.ع."},{code:"PHP",name:"Philippine Peso",symbol:"₱"},{code:"PKR",name:"Pakistani Rupee",symbol:"₨"},{code:"PLN",name:"Polish Zloty",symbol:"zł"},{code:"QAR",name:"Qatari Riyal",symbol:"ر.ق"},{code:"SAR",name:"Saudi Riyal",symbol:"ر.س"},{code:"SEK",name:"Swedish Krona",symbol:"kr"},{code:"TWD",name:"Taiwan Dollar",symbol:"NT$"},{code:"VND",name:"Vietnamese Dong",symbol:"₫"},{code:"ZAR",name:"South African Rand",symbol:"R"}],Vg={PND94_DUE_DATE:"2026-09-30"},Kg={SALARY_EXPENSE_CAP:1e5};function c0(e){return Eh.includes(e)}const u0={retail_trade:"Retail / Wholesale Trade",manufacturing:"Manufacturing",service_business:"Service Business",restaurant_food:"Restaurant / Food Service",transportation:"Transportation",construction:"Construction",professional_service:"Professional Services",rental_property:"Property Rental",agriculture:"Agriculture",other_business:"Other Business"},d0={retail_trade:"Selling goods - 60% flat-rate deduction",manufacturing:"Producing goods for sale - 60% flat-rate deduction",service_business:"General services - 60% flat-rate deduction",restaurant_food:"Food and beverage business - 60% flat-rate deduction",transportation:"Delivery and logistics - 60% flat-rate deduction",construction:"Building and contracting - 60% flat-rate deduction",professional_service:"Legal, accounting, consulting - 30% flat-rate deduction",rental_property:"Renting property - 30% flat-rate deduction",agriculture:"Farming and agricultural - 60% flat-rate deduction",other_business:"Other business activities - varies"},Ih={salary_40_1:{type:"salary_40_1",label:"Salary & Employment Income",shortLabel:"Salary",section:"40(1)",description:"Regular employment income from an employer including wages, bonuses, and benefits",flatRate:Ge.salary_40_1,flatRateCap:1e5,examples:["Monthly salary","Annual bonus","Commission from employer","Housing allowance","Transportation allowance"],withholdingRate:void 0,notes:"Expense deduction is 50% of income, capped at ฿100,000"},liberal_profession_40_6:{type:"liberal_profession_40_6",label:"Liberal Profession Income",shortLabel:"Professional",section:"40(6)",description:"Income from professional services requiring specialized knowledge or skills",flatRate:Ge.liberal_profession_40_6,examples:["Medical/dental practice fees","Legal consultation fees","Engineering services","Accounting services","Architecture fees"],withholdingRate:.03,notes:"Deduction rate varies: 30% for most professions, 60% for medical practice"},contractor_40_7:{type:"contractor_40_7",label:"Contractor Income",shortLabel:"Contractor",section:"40(7)",description:"Income from contract work where you provide both labor and materials",flatRate:Ge.contractor_40_7,examples:["Construction contracts","Renovation work","Manufacturing contracts","Installation services","Custom product creation"],withholdingRate:.03,notes:"40% flat deduction rate applies"},business_sales_40_8:{type:"business_sales_40_8",label:"Business & Sales Income",shortLabel:"Business",section:"40(8)",description:"Income from business operations, trading, or sales activities",flatRate:Ge.business_sales_40_8,examples:["Retail/wholesale sales","E-commerce revenue","Consulting business","Freelance services","Agency fees","Online platform income"],withholdingRate:.03,notes:"60% flat deduction rate - highest among business income types"},rental_40_5:{type:"rental_40_5",label:"Rental Income",shortLabel:"Rental",section:"40(5)",description:"Income from renting out property or assets",flatRate:Ge.rental_40_5,examples:["Residential property rental","Commercial property rental","Vehicle rental","Equipment rental","Land lease income"],withholdingRate:.05,notes:"30% flat deduction rate, or actual expenses with documentation"},dividend:{type:"dividend",label:"Dividend Income",shortLabel:"Dividend",section:"40(4)(b)",description:"Dividends received from Thai companies",flatRate:Ge.dividend,examples:["Stock dividends from SET-listed companies","Dividends from private companies","Investment fund distributions"],withholdingRate:.1,notes:"No expense deduction. May elect final 10% withholding or include in PIT calculation."},other:{type:"other",label:"Other Income",shortLabel:"Other",section:"Various",description:"Income from other sources not covered above",flatRate:Ge.other,examples:["Prizes and lottery winnings","Gifts above threshold","Other taxable receipts"],withholdingRate:void 0,notes:"Deduction rules vary based on specific income source"}};function h0(){return Object.entries(Ih).map(([e,t])=>({value:e,label:`${t.label} (${t.section})`}))}function qg(e){const t=Ih[e.incomeType],n=Ge[e.incomeType];if(n===0)return 0;const a=e.grossAmount*n;return e.incomeType==="salary_40_1"&&t.flatRateCap?Math.min(a,t.flatRateCap):a}function Gg(e){const t=new Map;e.forEach(o=>{const s=t.get(o.incomeType)||{gross:0,deduction:0},l=qg(o);t.set(o.incomeType,{gross:s.gross+o.grossAmount,deduction:s.deduction+l})});const n=t.get("salary_40_1");if(n){const o=Ge.salary_40_1,s=n.gross*o;n.deduction=Math.min(s,Kg.SALARY_EXPENSE_CAP),t.set("salary_40_1",n)}const a=[];let i=0;return t.forEach((o,s)=>{a.push({incomeType:s,grossAmount:o.gross,rate:Ge[s],deduction:o.deduction}),i+=o.deduction}),{total:i,breakdown:a}}function Xg(e){const t=new Map;e.forEach(i=>{const o=t.get(i.category);o?t.set(i.category,{amount:o.amount+i.amount,hasReceipts:o.hasReceipts&&i.hasReceipt}):t.set(i.category,{amount:i.amount,hasReceipts:i.hasReceipt})});const n=[];let a=0;return t.forEach((i,o)=>{n.push({category:o,amount:i.amount,hasReceipts:i.hasReceipts}),a+=i.amount}),{total:a,breakdown:n}}function Ph(e,t,n=.2){const a=Gg(e),i=Xg(t),s=Math.abs(a.total-i.total)*n,l=a.total>=i.total?"flat":"actual";return{flatRateDeduction:a.total,actualDeduction:i.total,recommended:l,taxSavings:s,flatBreakdown:a.breakdown,actualBreakdown:i.breakdown}}function Qg(e,t,n){const a=Ph(e,t);switch(n){case"force_flat":return a.flatRateDeduction;case"force_actual":return a.actualDeduction;case"auto_compare":default:return Math.max(a.flatRateDeduction,a.actualDeduction)}}function Jg(e){const t=new Map;return e.forEach(n=>{const a=t.get(n.incomeType)||0;t.set(n.incomeType,a+n.grossAmount)}),t}function Zg(e){return e.reduce((t,n)=>t+n.withholdingAmount,0)}function ex(e){return e.reduce((t,n)=>t+n.grossAmount,0)}function tx(e){return e<=15e4?0:e<=3e5?.05:e<=5e5?.1:e<=75e4?.15:e<=1e6?.2:e<=2e6?.25:e<=5e6?.3:.35}const nx=[{code:"AM",name:"Armenia",hasDTA:!0},{code:"AU",name:"Australia",hasDTA:!0},{code:"AT",name:"Austria",hasDTA:!0},{code:"BH",name:"Bahrain",hasDTA:!0},{code:"BD",name:"Bangladesh",hasDTA:!0},{code:"BY",name:"Belarus",hasDTA:!0},{code:"BE",name:"Belgium",hasDTA:!0},{code:"BG",name:"Bulgaria",hasDTA:!0},{code:"KH",name:"Cambodia",hasDTA:!0},{code:"CA",name:"Canada",hasDTA:!0},{code:"CL",name:"Chile",hasDTA:!0},{code:"CN",name:"China",hasDTA:!0},{code:"CY",name:"Cyprus",hasDTA:!0},{code:"CZ",name:"Czech Republic",hasDTA:!0},{code:"DK",name:"Denmark",hasDTA:!0},{code:"EE",name:"Estonia",hasDTA:!0},{code:"FI",name:"Finland",hasDTA:!0},{code:"FR",name:"France",hasDTA:!0},{code:"DE",name:"Germany",hasDTA:!0},{code:"HK",name:"Hong Kong",hasDTA:!0},{code:"HU",name:"Hungary",hasDTA:!0},{code:"IN",name:"India",hasDTA:!0},{code:"ID",name:"Indonesia",hasDTA:!0},{code:"IE",name:"Ireland",hasDTA:!0},{code:"IL",name:"Israel",hasDTA:!0},{code:"IT",name:"Italy",hasDTA:!0},{code:"JP",name:"Japan",hasDTA:!0},{code:"KR",name:"South Korea",hasDTA:!0},{code:"KW",name:"Kuwait",hasDTA:!0},{code:"LA",name:"Laos",hasDTA:!0},{code:"LU",name:"Luxembourg",hasDTA:!0},{code:"MY",name:"Malaysia",hasDTA:!0},{code:"MU",name:"Mauritius",hasDTA:!0},{code:"MM",name:"Myanmar",hasDTA:!0},{code:"NP",name:"Nepal",hasDTA:!0},{code:"NL",name:"Netherlands",hasDTA:!0},{code:"NZ",name:"New Zealand",hasDTA:!0},{code:"NO",name:"Norway",hasDTA:!0},{code:"OM",name:"Oman",hasDTA:!0},{code:"PK",name:"Pakistan",hasDTA:!0},{code:"PH",name:"Philippines",hasDTA:!0},{code:"PL",name:"Poland",hasDTA:!0},{code:"RO",name:"Romania",hasDTA:!0},{code:"RU",name:"Russia",hasDTA:!0},{code:"SC",name:"Seychelles",hasDTA:!0},{code:"SG",name:"Singapore",hasDTA:!0},{code:"SI",name:"Slovenia",hasDTA:!0},{code:"ZA",name:"South Africa",hasDTA:!0},{code:"ES",name:"Spain",hasDTA:!0},{code:"LK",name:"Sri Lanka",hasDTA:!0},{code:"SE",name:"Sweden",hasDTA:!0},{code:"CH",name:"Switzerland",hasDTA:!0},{code:"TW",name:"Taiwan",hasDTA:!0},{code:"TJ",name:"Tajikistan",hasDTA:!0},{code:"TR",name:"Turkey",hasDTA:!0},{code:"UA",name:"Ukraine",hasDTA:!0},{code:"AE",name:"United Arab Emirates",hasDTA:!0},{code:"GB",name:"United Kingdom",hasDTA:!0},{code:"US",name:"United States",hasDTA:!0,notes:"US citizens are subject to citizenship-based taxation; consult a tax professional regarding FTC vs. FEIE."},{code:"UZ",name:"Uzbekistan",hasDTA:!0},{code:"VN",name:"Vietnam",hasDTA:!0}],ax=[{code:"BR",name:"Brazil",hasDTA:!1},{code:"SA",name:"Saudi Arabia",hasDTA:!1},{code:"MX",name:"Mexico",hasDTA:!1},{code:"AR",name:"Argentina",hasDTA:!1},{code:"NG",name:"Nigeria",hasDTA:!1},{code:"KE",name:"Kenya",hasDTA:!1},{code:"EG",name:"Egypt",hasDTA:!1},{code:"QA",name:"Qatar",hasDTA:!1},{code:"PT",name:"Portugal",hasDTA:!1},{code:"GR",name:"Greece",hasDTA:!1}],as=[...nx,...ax].sort((e,t)=>e.name.localeCompare(t.name));function rx(e){const t=e.trim().toLowerCase();return as.find(n=>n.name.toLowerCase()===t)||null}function Fc(e){const t=rx(e);return t?t.hasDTA:null}function m0(e){const t=e.trim().toLowerCase();return t?as.filter(n=>n.name.toLowerCase().includes(t)):as}const ix=[{country:"Australia",pensionType:"government_service",dtaArticle:"Article 19(2)",note:"Australian government and military service pensions are taxable only in Australia under the Australia-Thailand DTA. Thai tax does not apply."},{country:"United States",pensionType:"social_security",dtaArticle:"Article 20(2)",note:"US Social Security benefits are taxable only in the United States under the US-Thailand DTA. Thai tax does not apply."},{country:"United Kingdom",pensionType:"government_service",dtaArticle:"Article 19",note:"UK government and military service pensions are taxable only in the United Kingdom under the UK-Thailand DTA. Thai tax does not apply."}];function ox(e,t){const n=e.trim().toLowerCase();return ix.find(a=>a.country.toLowerCase()===n&&a.pensionType===t)||null}const sx=["ltr_wealthy_global","ltr_wealthy_pensioner","ltr_work_from_thailand"];function cl(e){return sx.includes(e)}function lx(e){return e==="ltr_highly_skilled"}function cx(e,t,n="regular"){const a=ux(e);if(!t)return{entry:e,isTaxable:!1,reason:"Not a Thai tax resident (less than 180 days in Thailand)",taxableAmount:0,foreignTaxCredit:0,hasDTA:a.hasDTA,dtaCreditAllowed:a.creditAllowed,dtaCreditDisallowed:0};if(cl(n))return{entry:e,isTaxable:!1,reason:"LTR visa holder - foreign income is tax exempt",taxableAmount:0,foreignTaxCredit:0,hasDTA:a.hasDTA,dtaCreditAllowed:a.creditAllowed,dtaCreditDisallowed:0};if(e.isPension&&e.pensionType&&e.country){const s=ox(e.country,e.pensionType);if(s)return{entry:e,isTaxable:!1,reason:`DTA ${s.dtaArticle} exemption: ${s.note}`,taxableAmount:0,foreignTaxCredit:0,hasDTA:!0,dtaCreditAllowed:!0,dtaCreditDisallowed:0,dtaPensionExempt:!0,dtaExemptionArticle:s.dtaArticle}}if(!e.dateEarned)return{entry:e,isTaxable:!1,reason:"Date earned not specified",taxableAmount:0,foreignTaxCredit:0,hasDTA:a.hasDTA,dtaCreditAllowed:a.creditAllowed,dtaCreditDisallowed:0};const i=new Date(e.dateEarned),o=new Date(Ra.FOREIGN_INCOME_TAX_YEAR_START);return i<o?{entry:e,isTaxable:!1,reason:"Income earned before January 1, 2024 - exempt under pre-2024 rules",taxableAmount:0,foreignTaxCredit:0,hasDTA:a.hasDTA,dtaCreditAllowed:a.creditAllowed,dtaCreditDisallowed:0}:e.dateRemitted?{entry:e,isTaxable:!0,reason:"Income earned in 2024+ and remitted to Thailand - fully taxable",taxableAmount:e.amountThb,foreignTaxCredit:a.credit,hasDTA:a.hasDTA,dtaCreditAllowed:a.creditAllowed,dtaCreditDisallowed:a.creditDisallowed}:{entry:e,isTaxable:!1,reason:"Income not remitted to Thailand - not taxable until remitted",taxableAmount:0,foreignTaxCredit:0,hasDTA:a.hasDTA,dtaCreditAllowed:a.creditAllowed,dtaCreditDisallowed:0}}function ux(e){if(e.foreignTaxPaid<=0)return{credit:0,hasDTA:Fc(e.country),creditAllowed:!0,creditDisallowed:0};const t=Fc(e.country);return t===!1?{credit:0,hasDTA:!1,creditAllowed:!1,creditDisallowed:e.foreignTaxPaid}:{credit:e.foreignTaxPaid,hasDTA:t,creditAllowed:!0,creditDisallowed:0}}function dx(e){const t=cl(e.visaType),n=e.foreignIncomeEntries.map(u=>cx(u,e.isThaiResident,e.visaType)),a=n.reduce((u,m)=>u+m.entry.amountThb,0),i=n.reduce((u,m)=>u+m.taxableAmount,0),o=n.reduce((u,m)=>u+m.entry.foreignTaxPaid,0),s=n.reduce((u,m)=>u+m.foreignTaxCredit,0),l=n.reduce((u,m)=>u+m.dtaCreditDisallowed,0),c=n.some(u=>u.isTaxable&&u.hasDTA===!1);return{entries:n,totalForeignIncome:a,taxableForeignIncome:i,totalForeignTaxPaid:o,totalForeignTaxCredit:s,totalDTACreditDisallowed:l,ltrExemptionApplied:t,hasMissingDTA:c}}function hx(e){return e>=Ra.THAI_RESIDENCY_DAYS}function f0(e){return hx(e)?{isResident:!0,status:"Thai Tax Resident",description:`With ${e} days in Thailand (180+ required), you are considered a Thai tax resident. Both Thai-sourced income and foreign income remitted to Thailand may be taxable.`}:{isResident:!1,status:"Non-Resident",description:`With ${e} days in Thailand (less than 180), you are not a Thai tax resident. Only income earned in Thailand is subject to Thai tax.`}}function mx(e){return e.filter(t=>{const n=Eh.includes(t.incomeType),a=t.monthReceived>=1&&t.monthReceived<=6;return n&&a}).reduce((t,n)=>t+n.grossAmount,0)}function fx(e,t=6e4,n=0){const a=e*2,i=Math.min(a*.5,1e5),o=t+n,s=Math.max(0,a-i-o);let l=0,c=s;for(let u=0;u<ca.length;u++){const m=ca[u],f=u===0?0:ca[u-1].upTo,y=m.upTo-f,x=Math.min(c,y);if(l+=x*m.rate,c-=x,c<=0)break}return Math.round(l/2)}function Dh(e){const t=mx(e.thaiIncomeEntries),n=e.maritalStatus==="married"&&e.spouseHasNoIncome?Ra.PND94_MARRIED_SPOUSE_NO_INCOME:Ra.PND94_SINGLE,a=t>n,i=e.maritalStatus==="married"&&e.spouseHasNoIncome?6e4:0,o=a?fx(t,6e4,i):0,s=Vg.PND94_DUE_DATE;return{required:a,halfYearIncome:t,threshold:n,provisionalTax:o,dueDate:s}}function px(e){return e.reduce((t,n)=>t+n.grossAmount,0)}function Fh(e){const t=px(e.thaiIncomeEntries),n=Ra.VAT_REGISTRATION,a=t>=n;return{required:a,turnover:t,threshold:n,mustRegisterWithinDays:a?30:0}}function p0(e){const t=Dh(e),n=Fh(e),a=[];return t.required&&a.push(`PND94 filing due by ${t.dueDate}`),n.required&&a.push(`VAT registration required within ${n.mustRegisterWithinDays} days`),{pnd94:t,vat:n,hasAnyObligation:t.required||n.required,urgentItems:a}}const yx=.17;function ul(e){let t=0;return e.forEach((n,a)=>{t+=D.CHILD_ALLOWANCE_BASE,a>=1&&n.birthYear>=D.CHILD_BONUS_BIRTH_YEAR&&(t+=D.CHILD_ALLOWANCE_BONUS)}),t}function _h(e){let t=D.PERSONAL_ALLOWANCE;e.maritalStatus==="married"&&e.spouseHasNoIncome&&(t+=D.SPOUSE_ALLOWANCE),e.isAge65OrOlder&&(t+=D.SENIOR_ALLOWANCE),t+=ul(e.children);const n=Math.min(e.numberOfParents,D.MAX_PARENTS);return t+=n*D.PARENT_ALLOWANCE,t}function dl(e){return Math.min(e*D.STANDARD_DEDUCTION_RATE,D.MAX_STANDARD_DEDUCTION)}function Lh(e,t){return{standardDeduction:dl(e.annualIncome),personalAllowance:D.PERSONAL_ALLOWANCE,spouseAllowance:e.maritalStatus==="married"&&e.spouseHasNoIncome?D.SPOUSE_ALLOWANCE:0,seniorAllowance:e.isAge65OrOlder?D.SENIOR_ALLOWANCE:0,childAllowance:ul(e.children),parentAllowance:Math.min(e.numberOfParents,D.MAX_PARENTS)*D.PARENT_ALLOWANCE,socialSecurity:e.includeSocialSecurity?Math.min(e.socialSecurityContribution,D.MAX_SOCIAL_SECURITY):0,lifeInsurance:e.hasLifeInsurance?Math.min(e.lifeInsurance,D.MAX_LIFE_INSURANCE):0,healthInsurance:e.hasHealthInsurance?Math.min(e.healthInsurance,D.MAX_HEALTH_INSURANCE):0,pensionFund:e.hasPensionFund?Math.min(e.pensionFund,D.MAX_PENSION_FUND):0,providentFund:e.hasProvidentFund?Math.min(e.providentFund,D.MAX_PROVIDENT_FUND):0,rmf:e.hasRMF?Math.min(e.rmf,D.MAX_RMF):0,ssf:e.hasSSF?Math.min(e.ssf,D.MAX_SSF):0,donations:e.hasDonations?Math.min(e.donations,t*D.MAX_DONATION_PERCENT):0}}function y0(e){const t=dl(e.annualIncome),n=_h(e),a=Math.max(0,e.annualIncome-t-n),i=Lh(e,a),o=i.standardDeduction+i.socialSecurity+i.lifeInsurance+i.healthInsurance+i.pensionFund+i.providentFund+i.rmf+i.ssf+i.donations,s=Math.max(0,a-(o-i.standardDeduction)),l=Rn(s),c=e.taxWithheld-l,u=e.annualIncome>0?l/e.annualIncome*100:0;return{grossIncome:e.annualIncome,totalAllowances:n,totalDeductions:o,taxableIncome:s,taxOwed:l,taxWithheld:e.taxWithheld,refundOrOwed:c,effectiveRate:u,breakdown:i}}function g0(e){const t=Lg(e),n=Mg(e),a=Og(e),i=dl(t),o=t+n,s=_h(e),l=Math.max(0,o-i-s),c={...e,annualIncome:t},u=Lh(c,l),m=u.socialSecurity+u.lifeInsurance+u.healthInsurance+u.pensionFund+u.providentFund+u.rmf+u.ssf+u.donations,f=i+m,y=Math.max(0,l-m),x=Rn(y),g=(e.salaryWithholdingTax||0)+(e.taxWithheld||0)+a,T=g-x,b=o>0?x/o*100:0;return{grossIncome:o,totalAllowances:s,totalDeductions:f,taxableIncome:y,taxOwed:x,taxWithheld:g,refundOrOwed:T,effectiveRate:b,breakdown:u}}function ua(e){return new Intl.NumberFormat("th-TH",{style:"currency",currency:"THB",minimumFractionDigits:0,maximumFractionDigits:0}).format(e)}function x0(e){return`${e.toFixed(2)}%`}function gx(e){let t=D.PERSONAL_ALLOWANCE;e.maritalStatus==="married"&&e.spouseHasNoIncome&&(t+=D.SPOUSE_ALLOWANCE),e.isAge65OrOlder&&(t+=D.SENIOR_ALLOWANCE),t+=ul(e.children);const n=Math.min(e.numberOfParents,D.MAX_PARENTS);return t+=n*D.PARENT_ALLOWANCE,t}function xx(e,t){let n=0;return e.includeSocialSecurity&&(n+=Math.min(e.socialSecurityContribution,D.MAX_SOCIAL_SECURITY)),e.hasLifeInsurance&&(n+=Math.min(e.lifeInsurance,D.MAX_LIFE_INSURANCE)),e.hasHealthInsurance&&(n+=Math.min(e.healthInsurance,D.MAX_HEALTH_INSURANCE)),e.hasPensionFund&&(n+=Math.min(e.pensionFund,D.MAX_PENSION_FUND)),e.hasProvidentFund&&(n+=Math.min(e.providentFund,D.MAX_PROVIDENT_FUND)),e.hasRMF&&(n+=Math.min(e.rmf,D.MAX_RMF)),e.hasSSF&&(n+=Math.min(e.ssf,D.MAX_SSF)),e.hasDonations&&(n+=Math.min(e.donations,t*D.MAX_DONATION_PERCENT)),n}function v0(e){const t=lx(e.visaType),n=cl(e.visaType),a=ex(e.thaiIncomeEntries),i=Zg(e.thaiIncomeEntries),o=Jg(e.thaiIncomeEntries),s=o.get("salary_40_1")||0,l=a-s,c=dx(e),u=c.totalForeignIncome,m=c.taxableForeignIncome,f=c.totalForeignTaxCredit,y=t?l+m:a+m,x=a+m,g=Qg(e.thaiIncomeEntries,e.actualExpenses,e.expenseMethod),T=e.expenseMethod==="auto_compare"||e.expenseMethod==="force_actual"?Ph(e.thaiIncomeEntries,e.actualExpenses,tx(y-g)):void 0,b=gx(e),h=Math.max(0,y-g-b),d=xx(e,h),p=Math.max(0,h-d);let w,S=0;if(t&&s>0){S=s*yx;const Ft=Rn(p);w=S+Ft}else w=Rn(p);const A=m>0&&x>0?m/x*w:0,j=Math.min(f,A),C=i+j,M=Math.max(0,w-C),I=x>0?w/x*100:0,ee=Dh(e),Dt=Fh(e);return{grossIncome:x,thaiIncomeTotal:a,foreignIncomeTotal:u,taxableForeignIncome:m,expenseDeduction:g,expenseMethod:e.expenseMethod,totalAllowances:b,totalDeductions:g+d,taxableIncome:p,grossTaxBeforeCredits:w,withholdingCredits:i,foreignTaxCredits:j,netTaxPayable:M,effectiveRate:I,pnd94:ee,vat:Dt,expenseComparison:T,foreignIncomeTaxability:c.entries,incomeByType:o,ltrBenefitApplied:t||n,ltrFlatRateTax:t?S:void 0,ltrForeignIncomeExempt:n}}function vx(){return r.jsx("div",{className:"flex justify-center py-1","aria-hidden":"true",children:r.jsx("svg",{className:"w-5 h-5 text-gray-300",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4v15m0 0l-6-6m6 6l6-6"})})})}function Tx({steps:e}){return r.jsx("div",{children:e.map((t,n)=>r.jsxs("div",{children:[n>0&&r.jsx(vx,{}),t.kind==="brackets"?r.jsxs("div",{className:"bg-gray-50 border border-gray-200 rounded-lg p-4",children:[r.jsx("p",{className:"text-sm font-medium text-gray-700 mb-2",children:t.label}),r.jsx("div",{className:"text-sm space-y-1",children:t.brackets.length===0?r.jsx("p",{className:"text-gray-500",children:"No tax due at this income level"}):t.brackets.map(a=>r.jsxs("div",{className:"flex justify-between",children:[r.jsxs("span",{className:"text-gray-600",children:[a.label," (",a.rate,"%)"]}),r.jsx("span",{children:ua(a.tax)})]},a.label))})]}):r.jsxs("div",{className:t.kind==="subtract"?"bg-green-50 border border-green-100 rounded-lg px-4 py-3 flex justify-between items-center gap-4":t.kind==="result"?"bg-blue-50 border-2 border-blue-200 rounded-lg px-4 py-3 flex justify-between items-center gap-4":"bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center gap-4",children:[r.jsxs("div",{children:[r.jsx("p",{className:t.kind==="result"?"font-medium text-blue-900":"text-gray-700",children:t.label}),t.sublabel&&r.jsx("p",{className:"text-xs text-gray-500 mt-0.5",children:t.sublabel})]}),r.jsx("p",{className:t.kind==="subtract"?"font-semibold text-green-700 whitespace-nowrap":t.kind==="result"?"font-bold text-blue-700 text-lg whitespace-nowrap":"font-semibold text-gray-800 whitespace-nowrap",children:t.kind==="subtract"?`-${ua(t.amount)}`:ua(t.amount)})]})]},n))})}function wx({annualTakeHome:e}){const t=e/12;return r.jsxs("div",{className:"bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6 text-center",children:[r.jsx("p",{className:"text-sm text-gray-600 mb-1",children:"Estimated Take-Home Income"}),r.jsx("p",{className:"text-3xl font-bold text-emerald-700",children:ua(e)}),r.jsxs("p",{className:"text-sm text-gray-500 mt-1",children:["≈ ",ua(t),"/month"]})]})}const _c=e=>e.reduce((t,n,a)=>{let i=E.CHILD_ALLOWANCE_BASE;return a>=1&&n.birthYear>=E.CHILD_BONUS_BIRTH_YEAR&&(i+=E.CHILD_ALLOWANCE_BONUS),t+i},0),bx=({formData:e,setFormData:t,onStartOver:n})=>{const[a,i]=v.useState(!1),[o,s]=v.useState(null),l=()=>{var g;return e.incomeType==="variable"&&((g=e.variableIncome)==null?void 0:g.length)===12?e.variableIncome.reduce((T,b)=>T+b.salary+b.bonus+b.housingAllowance+b.otherIncome,0):e.monthlySalary*12+(e.annualBonus||0)+(e.annualOtherIncome||0)},c=v.useMemo(()=>{const g=l(),T=Math.min(g*E.STANDARD_DEDUCTION_RATE,E.MAX_STANDARD_DEDUCTION),b=E.PERSONAL_ALLOWANCE;let h=b,d=0;if(e.includeSocialSecurity&&e.socialSecurityContribution>0&&(d+=Math.min(e.socialSecurityContribution,E.MAX_SOCIAL_SECURITY)),e.estimateType==="detailed"){e.maritalStatus==="married"&&e.spouseHasNoIncome&&(h+=E.SPOUSE_ALLOWANCE);const j=_c(e.children||[]);h+=j;const C=(e.numberOfParents||0)*E.PARENT_ALLOWANCE;if(h+=C,e.hasLifeInsurance&&(d+=Math.min(e.lifeInsurance||0,E.MAX_LIFE_INSURANCE)),e.hasHealthInsurance&&(d+=Math.min(e.healthInsurance||0,E.MAX_HEALTH_INSURANCE)),e.hasPensionFund&&(d+=Math.min(e.pensionFund||0,E.MAX_PENSION_FUND)),e.hasProvidentFund&&(d+=Math.min(e.providentFund||0,E.MAX_PROVIDENT_FUND)),e.hasRMF&&(d+=Math.min(e.rmf||0,E.MAX_RMF)),e.hasSSF&&(d+=Math.min(e.ssf||0,E.MAX_SSF)),e.hasDonations){const M=Math.floor(g*E.MAX_DONATION_PERCENT);d+=Math.min(e.donations||0,M)}}const p=T+h+d,w=Math.max(0,g-p),S=Rn(w),A=S/12;return{annualIncome:g,standardDeduction:T,personalAllowance:b,totalAllowances:h,otherDeductions:d,socialSecurity:e.includeSocialSecurity?Math.min(e.socialSecurityContribution||0,E.MAX_SOCIAL_SECURITY):0,totalDeductions:p,taxableIncome:w,annualTax:S,monthlyWithholding:A,effectiveRate:g>0?S/g*100:0}},[e]),u=v.useMemo(()=>{const g=[];let T=c.taxableIncome,b=0;for(const h of ca){if(T<=0)break;const d=h.upTo-b,p=Math.min(T,d),w=p*h.rate;p>0&&g.push({label:h.label,rate:h.rate*100,tax:w}),T-=p,b=h.upTo}return g},[c.taxableIncome]),m=c.annualIncome-c.annualTax,f=[{kind:"start",label:"Annual Income",amount:c.annualIncome},{kind:"subtract",label:"Employment Deduction",amount:c.standardDeduction,sublabel:"50% of income, capped at ฿100,000"},{kind:"subtract",label:"Personal Allowance",amount:c.totalAllowances,sublabel:"Personal, spouse, child & parent allowances"},{kind:"subtract",label:"Other Deductions",amount:c.otherDeductions,sublabel:"Insurance, retirement funds, donations & social security"},{kind:"result",label:"Taxable Income",amount:c.taxableIncome},{kind:"brackets",label:"Progressive Tax Calculation",brackets:u},{kind:"result",label:"Estimated Tax",amount:c.annualTax,sublabel:`≈ ${"฿"+c.monthlyWithholding.toLocaleString("en-US",{maximumFractionDigits:0})}/month withholding`}],y=v.useMemo(()=>{const g=[];if(e.incomeType==="fixed"&&(g.push({key:"monthlySalary",label:"Monthly Salary",value:e.monthlySalary,editable:!0}),g.push({key:"annualBonus",label:"Annual Bonus",value:e.annualBonus||0,editable:!0}),g.push({key:"annualOtherIncome",label:"Other Annual Income",value:e.annualOtherIncome||0,editable:!0})),g.push({key:"standardDeduction",label:"Expense Deduction (50%)",value:c.standardDeduction,editable:!1}),g.push({key:"personalAllowance",label:"Personal Allowance",value:E.PERSONAL_ALLOWANCE,editable:!1}),e.includeSocialSecurity&&g.push({key:"socialSecurityContribution",label:"Social Security",value:e.socialSecurityContribution,editable:!0,maxValue:E.MAX_SOCIAL_SECURITY}),e.estimateType==="detailed"){if(e.maritalStatus==="married"&&e.spouseHasNoIncome&&g.push({key:"spouseAllowance",label:"Spouse Allowance",value:E.SPOUSE_ALLOWANCE,editable:!1}),e.children&&e.children.length>0){const T=_c(e.children);g.push({key:"childAllowance",label:`Child Allowance (${e.children.length})`,value:T,editable:!1})}if(e.numberOfParents>0&&g.push({key:"parentAllowance",label:`Parent Allowance (${e.numberOfParents})`,value:e.numberOfParents*E.PARENT_ALLOWANCE,editable:!1}),e.hasLifeInsurance&&g.push({key:"lifeInsurance",label:"Life Insurance",value:e.lifeInsurance,editable:!0,maxValue:E.MAX_LIFE_INSURANCE}),e.hasHealthInsurance&&g.push({key:"healthInsurance",label:"Health Insurance",value:e.healthInsurance,editable:!0,maxValue:E.MAX_HEALTH_INSURANCE}),e.hasPensionFund&&g.push({key:"pensionFund",label:"Pension Fund",value:e.pensionFund,editable:!0,maxValue:E.MAX_PENSION_FUND}),e.hasProvidentFund&&g.push({key:"providentFund",label:"Provident Fund",value:e.providentFund,editable:!0,maxValue:E.MAX_PROVIDENT_FUND}),e.hasRMF&&g.push({key:"rmf",label:"RMF",value:e.rmf,editable:!0,maxValue:E.MAX_RMF}),e.hasSSF&&g.push({key:"ssf",label:"SSF",value:e.ssf,editable:!0,maxValue:E.MAX_SSF}),e.hasDonations){const T=l(),b=Math.floor(T*E.MAX_DONATION_PERCENT);g.push({key:"donations",label:"Donations",value:e.donations,editable:!0,maxValue:b})}}return g},[e,c.standardDeduction]),x=(g,T,b)=>{const h=parseFloat(T.replace(/[^0-9]/g,""))||0,d=b?Math.min(h,b):h;t({...e,[g]:d})};return r.jsxs("div",{children:[r.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4 text-center",children:"Estimated Monthly Withholding"}),r.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-center",children:[r.jsx("p",{className:"text-sm text-gray-500 mb-1",children:"Monthly Tax Withholding"}),r.jsxs("p",{className:"text-4xl font-bold text-blue-600",children:["฿",c.monthlyWithholding.toLocaleString("en-US",{maximumFractionDigits:0})]}),r.jsxs("p",{className:"text-sm text-gray-500 mt-2",children:["Effective Rate: ",c.effectiveRate.toFixed(2),"%"]})]}),r.jsx(wx,{annualTakeHome:m}),r.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 mb-6 space-y-2",children:[r.jsxs("div",{className:"flex justify-between text-sm",children:[r.jsx("span",{className:"text-gray-600",children:"Annual Income"}),r.jsxs("span",{className:"font-medium",children:["฿",c.annualIncome.toLocaleString()]})]}),r.jsxs("div",{className:"flex justify-between text-sm",children:[r.jsx("span",{className:"text-gray-600",children:"Total Deductions"}),r.jsxs("span",{className:"font-medium",children:["-฿",c.totalDeductions.toLocaleString()]})]}),r.jsxs("div",{className:"flex justify-between text-sm",children:[r.jsx("span",{className:"text-gray-600",children:"Taxable Income"}),r.jsxs("span",{className:"font-medium",children:["฿",c.taxableIncome.toLocaleString()]})]}),r.jsxs("div",{className:"flex justify-between text-sm border-t border-gray-200 pt-2",children:[r.jsx("span",{className:"text-gray-600",children:"Annual Tax"}),r.jsxs("span",{className:"font-medium",children:["฿",c.annualTax.toLocaleString("en-US",{maximumFractionDigits:0})]})]})]}),r.jsxs("div",{className:"mb-6",children:[r.jsx("h3",{className:"font-medium text-gray-800 mb-3",children:"How Your Tax Was Calculated"}),r.jsx(Tx,{steps:f})]}),r.jsxs("button",{onClick:()=>i(!a),className:"w-full py-2 text-blue-600 font-medium flex items-center justify-center gap-2 hover:bg-blue-50 rounded-lg mb-4",children:[a?"Hide Details":"Show All Values & Edit",r.jsx("span",{children:a?"▲":"▼"})]}),a&&r.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 mb-6",children:[r.jsx("p",{className:"text-sm text-gray-500 mb-4",children:"Edit values below to see how changes affect your tax estimate. Changes update instantly."}),r.jsx("div",{className:"space-y-3",children:y.map(g=>r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx("span",{className:"text-sm text-gray-700",children:g.label}),g.editable?r.jsxs("div",{className:"relative",children:[o===g.key?r.jsx("input",{type:"text",value:g.value.toLocaleString(),onChange:T=>x(g.key,T.target.value,g.maxValue),onBlur:()=>s(null),autoFocus:!0,className:"w-32 px-2 py-1 text-right border border-blue-500 rounded text-sm focus:ring-2 focus:ring-blue-500"}):r.jsxs("button",{onClick:()=>s(g.key),className:"w-32 px-2 py-1 text-right text-blue-600 hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 text-sm",children:["฿",g.value.toLocaleString(),r.jsx("span",{className:"ml-1 text-xs",children:"✎"})]}),g.maxValue&&r.jsxs("p",{className:"text-xs text-gray-400 text-right",children:["Max: ฿",g.maxValue.toLocaleString()]})]}):r.jsxs("span",{className:"text-sm text-gray-500 w-32 text-right",children:["฿",g.value.toLocaleString(),r.jsx("span",{className:"ml-1 text-xs text-gray-400",children:"(fixed)"})]})]},g.key))})]}),r.jsx("button",{onClick:n,className:"w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300",children:"Start Over"})]})},Sx=()=>({salary:0,bonus:0,housingAllowance:0,otherIncome:0});function Lc(){return{estimateType:"",incomeType:"",monthlySalary:0,annualBonus:0,annualOtherIncome:0,variableIncome:Array(12).fill(null).map(()=>Sx()),includeSocialSecurity:!1,socialSecurityContribution:0,maritalStatus:"",spouseHasNoIncome:!1,isAge65OrOlder:!1,children:[],childrenEligibilityConfirmed:!1,numberOfParents:0,parentsEligibilityConfirmed:!1,hasLifeInsurance:!1,lifeInsurance:0,hasHealthInsurance:!1,healthInsurance:0,hasPensionFund:!1,pensionFund:0,hasProvidentFund:!1,providentFund:0,hasRMF:!1,rmf:0,hasSSF:!1,ssf:0,hasDonations:!1,donations:0}}const Nx=()=>{var h,d;const[e,t]=v.useState(0),[n,a]=v.useState(Lc),[i,o]=v.useState(!1),s=()=>{t(e+1)},l=()=>{u()?(o(!1),t(e+1)):o(!0)},c=()=>{e>0&&(o(!1),t(e-1))},u=()=>{var w,S;switch((w=y[e])==null?void 0:w.id){case"estimate-type":return n.estimateType!=="";case"income-type":return n.incomeType!=="";case"monthly-income":return n.monthlySalary>0;case"variable-income":return((S=n.variableIncome)==null?void 0:S.length)===12?n.variableIncome.reduce((I,ee)=>I+ee.salary+ee.bonus+ee.housingAllowance+ee.otherIncome,0)>0:!1;case"marital-status":return n.maritalStatus!=="";case"dependents":const A=!n.childrenEligibilityConfirmed||n.children.length>0,j=!n.parentsEligibilityConfirmed||n.numberOfParents>0;return A&&j;case"deductions":return[{has:n.hasLifeInsurance,amount:n.lifeInsurance},{has:n.hasHealthInsurance,amount:n.healthInsurance},{has:n.hasPensionFund,amount:n.pensionFund},{has:n.hasProvidentFund,amount:n.providentFund},{has:n.hasRMF,amount:n.rmf},{has:n.hasSSF,amount:n.ssf},{has:n.hasDonations,amount:n.donations}].every(M=>!M.has||M.amount>0);default:return!0}},m=()=>{a(Lc()),t(0)},f=p=>{p>=0&&p<y.length&&t(p)},y=v.useMemo(()=>{const p=[];return p.push({id:"estimate-type",title:"Estimate Type",component:r.jsx(Pg,{formData:n,setFormData:a,nextStep:s})}),p.push({id:"income-type",title:"Income Type",component:r.jsx(Fg,{formData:n,setFormData:a,nextStep:s})}),n.incomeType==="variable"?p.push({id:"variable-income",title:"Monthly Income",component:r.jsx(Wg,{formData:n,setFormData:a,nextStep:l,showValidationErrors:i})}):p.push({id:"monthly-income",title:"Assessable Income",component:r.jsx(Ug,{formData:n,setFormData:a,nextStep:l,showValidationErrors:i})}),n.estimateType==="detailed"&&(p.push({id:"marital-status",title:"Marital Status",component:r.jsx(zg,{formData:n,setFormData:a,nextStep:s,showValidationErrors:i})}),p.push({id:"dependents",title:"Dependents",component:r.jsx($g,{formData:n,setFormData:a,nextStep:l,showValidationErrors:i})}),p.push({id:"deductions",title:"Deductions",component:r.jsx(Yg,{formData:n,setFormData:a,nextStep:l,showValidationErrors:i})})),p.push({id:"results",title:"Results",component:r.jsx(bx,{formData:n,setFormData:a,onStartOver:m})}),p},[n,e]),x=y.length,g=e===x-1,T=e===0,b=(e+1)/x*100;return r.jsxs("div",{className:"bg-gray-100 min-h-screen py-8 px-4",children:[r.jsxs(Le,{children:[r.jsx("title",{children:"Monthly Tax Withholding Estimator | My Thai Taxes"}),r.jsx("meta",{name:"description",content:"Estimate how much Thai income tax should be withheld from your monthly salary. Free calculator for salaried employees and freelancers in Thailand."}),r.jsx("link",{rel:"canonical",href:"https://mythaitaxes.com/monthly-withholding/"})]}),r.jsxs("div",{className:"max-w-2xl mx-auto",children:[r.jsxs("div",{className:"mb-5",children:[r.jsx("h1",{className:"text-xl font-bold text-gray-900 mb-1",children:"Monthly Withholding Estimator"}),r.jsx("p",{className:"text-sm text-gray-600",children:"Check whether the right amount of tax is being deducted from your monthly paycheck. Enter your salary, bonuses, and deductions to see what your employer should be withholding — useful for verifying payslips, planning for a salary change, or estimating the tax impact of a bonus."})]}),r.jsxs("div",{className:"bg-white shadow-lg rounded-lg p-6 md:p-8 w-full",children:[r.jsxs("div",{className:"flex justify-between items-center mb-6",children:[r.jsxs(F,{to:"/",className:"text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm","aria-label":"Go to home page",children:[r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:r.jsx("path",{d:"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"})}),"Home"]}),!g&&r.jsx("button",{onClick:m,className:"text-red-500 hover:text-red-700 text-sm","aria-label":"Start over",children:"Start Over"})]}),r.jsxs("div",{className:"mb-8",children:[r.jsxs("div",{className:"flex justify-between items-center mb-2",children:[r.jsxs("span",{className:"text-sm font-medium text-gray-700",children:["Step ",e+1," of ",x,": ",(h=y[e])==null?void 0:h.title]}),r.jsxs("span",{className:"text-sm text-gray-500",children:[Math.round(b),"%"]})]}),r.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2.5",children:r.jsx("div",{className:"bg-blue-500 h-2.5 rounded-full transition-all duration-300",style:{width:`${b}%`},role:"progressbar","aria-valuenow":e+1,"aria-valuemin":1,"aria-valuemax":x})}),r.jsx("div",{className:"flex justify-between mt-3",children:y.map((p,w)=>r.jsxs("button",{onClick:()=>w<e&&f(w),disabled:w>=e,className:`flex flex-col items-center group ${w<e?"cursor-pointer":"cursor-default"}`,"aria-label":`${w<e?"Go to ":""}Step ${w+1}: ${p.title}`,children:[r.jsx("div",{className:`w-3 h-3 rounded-full transition-all ${w<e?"bg-blue-500 group-hover:bg-blue-600":w===e?"bg-blue-500 ring-2 ring-blue-200":"bg-gray-300"}`}),r.jsx("span",{className:`text-xs mt-1 hidden md:block ${w===e?"text-blue-600 font-medium":"text-gray-400"}`,children:p.title})]},p.id))})]}),r.jsx("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4",children:r.jsx("p",{className:"text-sm text-blue-700",children:"This estimate is based on Thai tax rules for Fiscal Year 2026."})}),r.jsx("div",{className:"min-h-[300px]",children:(d=y[e])==null?void 0:d.component}),!g&&!T&&r.jsxs("div",{className:"flex justify-between mt-8 pt-6 border-t border-gray-200",children:[r.jsxs("button",{onClick:c,className:"px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2","aria-label":"Go to previous step",children:[r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",viewBox:"0 0 20 20",fill:"currentColor",children:r.jsx("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})}),"Previous"]}),r.jsxs("button",{onClick:l,className:"px-6 py-2 rounded-lg transition-colors flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600","aria-label":"Go to next step",children:["Next",r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",viewBox:"0 0 20 20",fill:"currentColor",children:r.jsx("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})})]})]})]}),r.jsxs("div",{className:"bg-white shadow-lg rounded-lg p-6 md:p-8 w-full mt-6",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"What is withholding tax?"}),r.jsx("p",{className:"text-sm text-gray-600 mb-6",children:"In Thailand, employers are required to withhold estimated personal income tax from each salary payment and remit it to the Revenue Department on your behalf. The amount withheld is an estimate spread evenly across the year, based on projecting your monthly salary forward — it isn't always exactly right, especially in months with a bonus, a raise, or irregular income. This estimator lets you check what should be withheld against what actually is, using the same progressive brackets and deductions your annual return uses."}),r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Why the withheld amount can be off"}),r.jsx("p",{className:"text-sm text-gray-600 mb-6",children:"Withholding is calculated month to month, so a one-off bonus or a mid-year salary change can throw off the projection your employer is working from — you may end up over-withheld (refunded when you file) or under-withheld (owing a balance). Checking your withholding partway through the year, rather than waiting for your annual filing, gives you time to budget for either outcome."}),r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Frequently asked questions"}),r.jsxs("div",{className:"space-y-4",children:[r.jsxs("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-800",children:"Is this the same as my annual tax liability?"}),r.jsxs("p",{className:"text-sm text-gray-600",children:["No — this estimates what should be withheld from a given month's pay. For your full year's tax liability across all income sources, use the"," ",r.jsx(F,{to:"/annual-tax/",className:"text-blue-600 hover:underline",children:"annual tax calculator"}),"."]})]}),r.jsxs("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-800",children:"Does a bonus get taxed differently?"}),r.jsx("p",{className:"text-sm text-gray-600",children:"A bonus is added to that month's income for withholding purposes, which can temporarily push you into a higher bracket for that pay period — even though your annual effective rate may be lower once the year is averaged out."})]}),r.jsxs("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-800",children:"Is my data saved anywhere?"}),r.jsx("p",{className:"text-sm text-gray-600",children:"No. The calculation runs entirely in your browser and nothing you enter is sent to a server."})]})]})]})]})]})},Ea=({article:e})=>r.jsx(F,{to:`/articles/${e.slug}/`,className:"block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden",children:r.jsxs("div",{className:"p-5",children:[r.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[r.jsx("span",{className:"text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded",children:e.category}),r.jsxs("span",{className:"text-xs text-gray-500",children:[e.readTime," min read"]})]}),r.jsx("h3",{className:"font-semibold text-gray-900 mb-2 line-clamp-2",children:e.title}),r.jsx("p",{className:"text-gray-600 text-sm line-clamp-2",children:e.excerpt})]})}),jx="ca-pub-4471962643516217",Ax={leaderboard:{width:728,height:90},rectangle:{width:300,height:250},"mobile-banner":{width:320,height:100}},En=({size:e,adSlot:t,className:n=""})=>{const a=v.useRef(null),i=v.useRef(!1),o=Ax[e];return v.useEffect(()=>{if(!i.current)try{a.current&&window.adsbygoogle&&(window.adsbygoogle.push({}),i.current=!0)}catch(s){console.error("AdSense error:",s)}},[]),r.jsx("div",{className:`flex items-center justify-center ${n}`,style:{maxWidth:o.width,minHeight:o.height,width:"100%"},"aria-label":"Advertisement",role:"complementary",children:r.jsx("ins",{ref:a,className:"adsbygoogle",style:{display:"block",width:o.width,height:o.height},"data-ad-client":jx,"data-ad-slot":t})})};function kx(e,t){return t==="monthly"?e*12:t==="weekly"?e*52:e}function Cx(e,t){const n=Math.min(e*D.STANDARD_DEDUCTION_RATE,D.MAX_STANDARD_DEDUCTION),a=D.PERSONAL_ALLOWANCE,i=t?D.MAX_SOCIAL_SECURITY:0,o=Math.max(0,e-n-a-i),s=Rn(o);return{annualTax:s,monthlyTax:s/12,taxableIncome:o}}function Gn(e){return Math.round(e).toLocaleString("en-US")}const Mc={yearly:"Yearly",monthly:"Monthly",weekly:"Weekly"},Rx=()=>{const[e,t]=v.useState("monthly"),[n,a]=v.useState(""),[i,o]=v.useState(!0),s=parseFloat(n.replace(/,/g,""))||0,l=kx(s,e),u=s>0?Cx(l,i):null,m=v.useCallback(f=>{const y=f.target.value.replace(/[^0-9.]/g,"");a(y)},[]);return r.jsx("div",{className:"max-w-2xl mx-auto px-4 mb-8",children:r.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-6 border border-gray-100",children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-1",children:"Quick Tax Estimate"}),r.jsx("p",{className:"text-sm text-gray-500 mb-5",children:"Salaried income — standard deductions and personal allowance applied automatically."}),r.jsx("div",{className:"flex gap-1 bg-gray-100 rounded-lg p-1 mb-4 w-fit",children:["yearly","monthly","weekly"].map(f=>r.jsx("button",{onClick:()=>t(f),className:`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${e===f?"bg-white text-blue-600 shadow-sm":"text-gray-500 hover:text-gray-700"}`,children:Mc[f]},f))}),r.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[r.jsxs("div",{className:"relative flex-1",children:[r.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium select-none",children:"฿"}),r.jsx("input",{type:"text",inputMode:"numeric",value:n,onChange:m,placeholder:e==="yearly"?"600,000":e==="monthly"?"50,000":"12,500",className:"w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"})]}),r.jsxs("span",{className:"text-gray-400 text-sm whitespace-nowrap",children:[Mc[e].toLowerCase()," income"]})]}),r.jsxs("label",{className:"flex items-center gap-2.5 mb-5 cursor-pointer select-none group w-fit",children:[r.jsx("input",{type:"checkbox",checked:i,onChange:f=>o(f.target.checked),className:"w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"}),r.jsxs("span",{className:"text-sm text-gray-600 group-hover:text-gray-800 transition-colors",children:["Include social security deduction",r.jsxs("span",{className:"text-gray-400 ml-1",children:["(฿",Gn(D.MAX_SOCIAL_SECURITY),"/yr)"]})]})]}),u?r.jsxs("div",{className:"bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-4",children:[r.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[r.jsxs("div",{children:[r.jsx("p",{className:"text-xs font-medium text-blue-500 uppercase tracking-wide mb-1",children:"Annual Tax"}),r.jsxs("p",{className:"text-2xl font-bold text-gray-900",children:["฿",Gn(u.annualTax)]})]}),r.jsxs("div",{children:[r.jsx("p",{className:"text-xs font-medium text-blue-500 uppercase tracking-wide mb-1",children:"Per Month"}),r.jsxs("p",{className:"text-2xl font-bold text-gray-900",children:["฿",Gn(u.monthlyTax)]})]})]}),r.jsx("div",{className:"mt-3 pt-3 border-t border-blue-100",children:r.jsxs("p",{className:"text-xs text-gray-500",children:["Based on ฿",Gn(l)," annual income · ฿",Gn(u.taxableIncome)," taxable"]})})]}):r.jsx("div",{className:"bg-gray-50 rounded-xl p-5 mb-4 text-center text-gray-400 text-sm",children:"Enter your income above to see your estimate"}),r.jsx("p",{className:"text-xs text-gray-400",children:"Need deductions for insurance, provident fund, dependents, or detailed withholding? Use the full calculators below."})]})})},In=[{slug:"how-to-use-the-thai-tax-calculator",title:"How to Use the Thai Tax Calculator",excerpt:"A complete guide to calculating your annual tax or monthly withholding, downloading a personal filing packet, and keeping records for future reference.",content:`
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
    `,publishedAt:"2026-02-22",readTime:7,category:"Guide",sources:[{label:"Thai Revenue Department (rd.go.th)",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"understanding-thai-tax-residency",title:"Am I a Thai Tax Resident? The 180-Day Rule Explained",excerpt:"How Thailand's 180-day rule decides your tax residency status, what counts as a day in-country, and how residency changes which income gets taxed.",content:`
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
    `,publishedAt:"2024-01-15",readTime:5,category:"Tax Basics",sources:[{label:"Thai Revenue Department — Tax Residency & Personal Income Tax",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"maximizing-tax-deductions-thailand",title:"Thailand Tax Deductions 2026: Full Guide for Expats",excerpt:"Every personal allowance, deduction, and credit that lowers your Thai income tax bill — amounts and eligibility rules for 2026, explained simply.",content:`
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
    `,publishedAt:"2026-04-15",readTime:12,category:"International",sources:[{label:"Thai Revenue Department — Personal Income Tax",url:"https://www.rd.go.th/english/6045.html"},{label:"Thai Revenue Department — Tax Residency Rules",url:"https://www.rd.go.th/english/index-eng.html"},{label:"Ministry of Foreign Affairs — Destination Thailand Visa",url:"https://www.mfa.go.th/en/page/destination-thailand-visa"},{label:"Thai Revenue Department — 2024 Foreign Income Rule (Departmental Instruction Paw 161/2566)",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"thailand-tax-for-us-expats",title:"US Expat Taxes in Thailand: FBAR, FATCA & Double Tax",excerpt:"How US citizens in Thailand avoid double taxation: FBAR and FATCA reporting, the Foreign Earned Income Exclusion, the Foreign Tax Credit, and Thai tax rules.",content:`
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
    `,publishedAt:"2026-03-05",readTime:10,category:"International",sources:[{label:"IRS — Foreign Earned Income Exclusion",url:"https://www.irs.gov/individuals/international-taxpayers/foreign-earned-income-exclusion"},{label:"FinCEN — FBAR Filing",url:"https://bsaefiling.fincen.gov/file/fbar"},{label:"IRS — Form 8938 (FATCA)",url:"https://www.irs.gov/forms-pubs/about-form-8938"},{label:"US-Thailand Tax Treaty",url:"https://www.irs.gov/businesses/international-businesses/thailand-tax-treaty-documents"},{label:"Thai Revenue Department — Personal Income Tax",url:"https://www.rd.go.th/english/6045.html"}]}];function Ex(e){return In.find(t=>t.slug===e)}const Ix=["how-to-use-the-thai-tax-calculator","thai-tax-brackets-explained"],Px={"how-to-use-the-thai-tax-calculator":["thai-tax-brackets-explained","understanding-thai-tax-residency"],"understanding-thai-tax-residency":["expat-guide-filing-thai-taxes","foreign-income-thailand-tax"],"maximizing-tax-deductions-thailand":["flat-rate-vs-actual-expenses","thai-tax-brackets-explained"],"thai-tax-brackets-explained":["maximizing-tax-deductions-thailand","how-to-use-the-thai-tax-calculator"],"expat-guide-filing-thai-taxes":["understanding-thai-tax-residency","how-to-get-thai-tax-id-number"],"foreign-income-thailand-tax":["transferring-money-to-thailand-tax-rules","double-tax-agreements-thailand"],"social-security-contributions-thailand":["freelancer-tax-guide-thailand","maximizing-tax-deductions-thailand"],"freelancer-tax-guide-thailand":["withholding-tax-freelancers-thailand","flat-rate-vs-actual-expenses"],"flat-rate-vs-actual-expenses":["freelancer-tax-guide-thailand","maximizing-tax-deductions-thailand"],"pnd94-mid-year-tax-filing":["freelancer-tax-guide-thailand","withholding-tax-freelancers-thailand"],"withholding-tax-freelancers-thailand":["pnd94-mid-year-tax-filing","freelancer-tax-guide-thailand"],"vat-registration-freelancers":["freelancer-tax-guide-thailand","freelancer-record-keeping-thailand"],"digital-nomad-taxes-thailand":["dtv-visa-thailand-tax-guide","foreign-income-thailand-tax"],"freelancer-record-keeping-thailand":["vat-registration-freelancers","freelancer-tax-guide-thailand"],"double-tax-agreements-thailand":["foreign-income-thailand-tax","transferring-money-to-thailand-tax-rules"],"pensioner-retiree-tax-guide-thailand":["foreign-pension-income-thailand-tax","thailand-retirement-visa-tax-obligations"],"foreign-pension-income-thailand-tax":["pensioner-retiree-tax-guide-thailand","double-tax-agreements-thailand"],"investment-income-retirees-thailand":["pensioner-retiree-tax-guide-thailand","foreign-pension-income-thailand-tax"],"thailand-retirement-visa-tax-obligations":["pensioner-retiree-tax-guide-thailand","ltr-visa-tax-benefits"],"ltr-visa-tax-benefits":["dtv-visa-thailand-tax-guide","foreign-income-thailand-tax"],"dtv-visa-thailand-tax-guide":["ltr-visa-tax-benefits","foreign-income-thailand-tax"],"thailand-tax-guide-for-expats":["understanding-thai-tax-residency","expat-guide-filing-thai-taxes"],"how-to-get-thai-tax-id-number":["expat-guide-filing-thai-taxes","understanding-thai-tax-residency"],"transferring-money-to-thailand-tax-rules":["foreign-income-thailand-tax","double-tax-agreements-thailand"],"thailand-tax-for-uk-expats":["double-tax-agreements-thailand","foreign-pension-income-thailand-tax"],"rental-income-tax-thailand":["thai-tax-brackets-explained","maximizing-tax-deductions-thailand"],"thailand-tax-for-us-expats":["double-tax-agreements-thailand","foreign-income-thailand-tax"]};function Dx(e,t=2){const n=Px[e]??[],a=Ix.filter(o=>o!==e);return[...n,...a].filter((o,s,l)=>o!==e&&l.indexOf(o)===s).slice(0,t).map(o=>In.find(s=>s.slug===o)).filter(o=>o!==void 0)}function Fx(e){const t=e.toLowerCase();return In.filter(n=>n.title.toLowerCase().includes(t)||n.excerpt.toLowerCase().includes(t)||n.category.toLowerCase().includes(t))}const Qr=[{name:"Expats Moving to Thailand",items:[{question:"Do I pay tax on money I bring to Thailand when I move here?",answer:"Whether money you bring into Thailand is taxable depends on whether it is income or capital. Capital — savings you accumulated before becoming a Thai tax resident — is generally not assessable income and is not taxed when brought in. Income — money you earned — that is remitted (transferred, withdrawn, or spent) in Thailand is taxable if you are a Thai tax resident (present in Thailand for 180 or more days in a year). Since January 2024, this applies regardless of when the income was earned. If you are moving to Thailand for the first time, document the source of any large transfers (bank statements, pay slips, investment records) to demonstrate that the funds are pre-residency savings rather than current income."},{question:"Do I need to notify my home country's tax authority when I move to Thailand?",answer:"Usually yes. In the UK, you notify HMRC of your departure using form P85 and must meet the conditions of the Statutory Residence Test to establish UK non-residency. In Australia, you notify the ATO and your residency status is assessed based on your intentions and connections. In the US, you remain a US taxpayer regardless of where you live — there is no process to leave US taxation, though the Foreign Earned Income Exclusion and Foreign Tax Credit reduce your US liability. For most other countries, there is a formal process to de-register or establish non-residency, and failure to notify can result in continued home-country tax obligations running alongside your Thai obligations."},{question:"Can I keep my money in a foreign bank account to avoid Thai tax?",answer:"Yes — if you are a Thai tax resident, income that remains in a foreign account and is never brought into Thailand is not assessable for Thai tax. Thailand's system is based on the remittance principle for foreign income: only income that is remitted (transferred, withdrawn, or used) in Thailand is taxable. A remittance includes wire transfers to a Thai bank account, ATM withdrawals in Thailand from a foreign account, and credit or debit card purchases in Thailand charged to a foreign account. Money sitting in a foreign account that you never access in Thailand is not remitted and is not taxed here."},{question:"What is the difference between Thai tax residency and having a Thai tax ID?",answer:"Tax residency and a Tax Identification Number (TIN) are two different things. Thai tax residency is a legal status — you become a Thai tax resident automatically once you have spent 180 or more days in Thailand in a given calendar year. A TIN is a practical tool: a 13-digit number issued by the Revenue Department that you use when filing tax returns, claiming refunds, or issuing invoices as a freelancer. You need to apply for a TIN in person at a Revenue Department district office (with your passport, visa, and proof of address). You can be a tax resident without yet having a TIN, and you can have a TIN without currently being a tax resident."}]},{name:"Pensioners & Retirees",items:[{question:"Do retirees get a special tax exemption in Thailand?",answer:"Yes. If you are aged 65 or over at the end of the tax year, the first 190,000 THB of your assessable income is completely exempt from personal income tax under Section 42(17) of the Revenue Code. Combined with the standard personal allowance (60,000 THB) and the 0% first tax bracket (150,000 THB), a retiree aged 65+ can receive up to approximately 400,000 THB before paying any Thai income tax."},{question:"Is my foreign pension taxable in Thailand?",answer:"If you are a Thai tax resident (180+ days in Thailand) and you transfer your foreign pension to Thailand, it is assessable income since the 2024 rule change. Tax treaties between Thailand and your home country may allow you to claim a credit for tax already paid abroad, reducing or eliminating double taxation. If you leave pension money in an overseas account without remitting it to Thailand, it is not taxable here."},{question:"Is UK State Pension taxable in Thailand?",answer:"For Thai tax residents, the UK State Pension is generally taxable in Thailand as your country of residence under the UK-Thailand Double Tax Agreement. UK private pensions are also taxable in Thailand. However, UK government service pensions (for civil servants, military, some teachers) are taxable only in the UK, not Thailand. You can claim a foreign tax credit for any UK tax withheld. Many retirees consider applying to HMRC for gross payment of their pension if they are Thai tax residents, to avoid UK withholding tax that then requires claiming back."},{question:"Is US Social Security taxable in Thailand?",answer:"This is complex. Under the US-Thailand DTA, Social Security may be taxable in Thailand as your country of residence. However, the US also taxes its own citizens on worldwide income regardless of where they live, creating a risk of double taxation. US citizens should use the Foreign Tax Credit on their US return to offset US tax with Thai tax paid, and vice versa. Given the complexity, US citizen retirees in Thailand should consult a specialist in US expat taxation."},{question:"Do retirees need to file a Thai tax return?",answer:"Yes, if you are a Thai tax resident (180+ days) and your assessable income exceeds the filing threshold. For pension or salary income, the threshold is 120,000 THB for single individuals or 220,000 THB for married couples. For investment or rental income, it is 60,000 THB (single) or 120,000 THB (married). Note that the 65+ exemption reduces your assessable income by 190,000 THB before the thresholds apply, meaning many retirees with modest income will owe no tax but may still need to file."},{question:"What is the LTR Wealthy Pensioner visa and how does it affect tax?",answer:"The Long-Term Resident (LTR) Wealthy Pensioner visa is a 10-year visa for retirees aged 50+ with USD 80,000 or more in annual pension/passive income (or USD 40,000+ with USD 250,000 in Thai assets). Unlike the standard Non-OA retirement visa, LTR Wealthy Pensioner holders receive a complete exemption from Thai tax on all foreign-sourced income — pensions, investments, rental income from abroad. There is no need to track remittances or claim foreign tax credits. The application fee is 50,000 THB."},{question:"Does holding a Thai retirement visa (Non-OA) reduce my tax?",answer:"No. The Non-Immigrant OA retirement visa provides no tax benefits whatsoever. Your tax obligations are based entirely on how many days you spend in Thailand (the 180-day rule), not on your visa type. If you spend 180+ days in Thailand on a Non-OA visa, you have the same tax obligations as any other Thai tax resident. Only the LTR visa categories provide genuine tax benefits."},{question:"How is Thai bank interest taxed for retirees?",answer:"Interest on Thai bank accounts is subject to 15% withholding tax deducted automatically by the bank. You can treat this withholding as your final tax on the interest (simpler), or include the interest on your annual return and claim the 15% as a credit — which may result in a partial refund if your effective tax rate is lower. For retirees aged 65+ with modest income, your effective rate on the first taxable income after allowances is 5%, making a refund possible if you include bank interest in your return."},{question:"Can I claim my parents as dependants on my Thai tax return?",answer:"Yes. You can claim a 30,000 THB allowance per parent who is aged 60 or over, is a Thai resident, and has their own income of no more than 30,000 THB per year. You can also claim up to 15,000 THB per parent for health insurance premiums you pay on their behalf. These deductions are in addition to your personal allowance and any other deductions you claim."},{question:"Are capital gains from selling shares in Thailand taxable for retirees?",answer:"Capital gains from selling shares listed on the Stock Exchange of Thailand (SET) are exempt from personal income tax for individuals — there is no capital gains tax on Thai listed shares. Capital gains on foreign shares, however, are assessable income if the proceeds are remitted to Thailand."}]},{name:"Tax Residency",items:[{question:"How is tax residency determined in Thailand?",answer:"You are considered a Thai tax resident if you spend 180 days or more in Thailand during a calendar year. The days do not need to be consecutive. Partial days are generally counted as full days."},{question:"What happens if I stay less than 180 days?",answer:"If you stay less than 180 days in a calendar year, you are a non-resident for tax purposes. Non-residents are only taxed on income earned within Thailand, typically at flat rates or through withholding tax."},{question:"Can I be a tax resident of both Thailand and another country?",answer:"Yes, dual tax residency is possible. In such cases, tax treaties between countries determine which country has primary taxing rights. You may need to claim foreign tax credits to avoid double taxation."},{question:"Does my visa type affect my tax residency status?",answer:"No. Tax residency is determined solely by the number of days you spend in Thailand, not by your visa type. Whether you hold a retirement visa (Non-OA), Thailand Privilege (Elite) visa, tourist visa, or work permit, you become a tax resident after 180 days in a calendar year. Only the LTR visa provides any tax benefit, and that is through a specific income exemption — not a change to residency rules."},{question:"Do I become a Thai tax resident automatically after 180 days, or do I need to register?",answer:"Tax residency is automatic — it is a factual status determined entirely by the number of days you are physically present in Thailand, with no registration required. Once you have spent 180 days or more in Thailand during a calendar year, you are a Thai tax resident for that year, whether or not any authority has been notified. However, you do need to obtain a Thai Tax Identification Number (TIN) before you can file a return or claim a refund of excess withholding tax. The TIN must be applied for in person at a Revenue Department district office."},{question:'What counts as a "day" in Thailand for the 180-day rule?',answer:'A partial day — any day on which you were physically present in Thailand, even briefly — generally counts as a full day. Both your arrival day and your departure day typically count. For example, arriving on January 15 and departing on July 15 would count 181 days. There is no precise statutory definition of a "day" in the Revenue Code, but Revenue Department practice is to count any calendar day on which you were present. To be conservative, count every day on which you were physically in Thailand at any point.'}]},{name:"Deductions & Allowances",items:[{question:"What is the personal allowance in Thailand?",answer:"Every taxpayer receives a personal allowance of 60,000 THB. This amount is deducted from your assessable income before calculating tax. If your spouse has no income, you can also claim an additional 60,000 THB spouse allowance."},{question:"Can I deduct insurance premiums?",answer:"Yes. Life insurance premiums are deductible up to 100,000 THB annually. Health insurance premiums are deductible up to 25,000 THB. Parent health insurance premiums have a separate limit of 15,000 THB."},{question:"What are SSF and RMF funds?",answer:"SSF (Super Savings Fund) and RMF (Retirement Mutual Fund) are tax-advantaged investment funds. SSF contributions are deductible up to 30% of income (max 200,000 THB). RMF contributions are deductible up to 30% of income (max 500,000 THB). Combined limits apply."},{question:"How much can I deduct for children?",answer:"You can deduct 30,000 THB per legitimate child. An additional 2,000 THB per child is available if the child is studying in Thailand. There is no limit on the number of children you can claim."}]},{name:"Filing & Deadlines",items:[{question:"When is the tax filing deadline in Thailand?",answer:"The annual tax return (PND 90/91) must be filed by March 31 of the following year. For example, income earned in 2024 must be filed by March 31, 2025. Online filing may extend this deadline by 8 days."},{question:"Do I need to file if my employer withholds tax?",answer:"Yes, you should still file an annual return even if your employer withholds tax. Filing allows you to claim additional deductions and potentially receive a refund. It also ensures compliance with Thai tax law."},{question:"How do I file my tax return?",answer:"You can file online through the RD Smart Tax app or the Revenue Department website (rd.go.th), or in person at your local Revenue Department office. Online filing is recommended for faster processing."},{question:"What documents do I need to file?",answer:"You need your withholding tax certificates (Form 50 Tawi) from employers and banks, personal identification (Thai ID or passport), Tax ID number, and supporting documents for any deductions you claim (receipts, certificates)."},{question:"What is the difference between PND 90 and PND 91?",answer:"PND 91 is for individuals whose only income is employment income — salary, wages, or pension from a single employer. PND 90 is for everyone else: if you have freelance income, business income, rental income, investment income, foreign income, or income from multiple sources, you use PND 90. In practice, most expats who have any income beyond a single Thai salary should use PND 90. If you are unsure which applies to you, PND 90 is the safe choice as it covers all income types."},{question:"Can I file my Thai tax return in English?",answer:"The official PND 90 and PND 91 forms are in Thai only. The Revenue Department's website (rd.go.th) has some English-language guidance, and the RD Smart Tax mobile app provides a guided filing experience with limited English support. In practice, most expats either use a Thai accountant or tax agent to prepare and file in Thai, or use the RD Smart Tax app which walks through fields step by step."},{question:"Do I need to file a Thai tax return even if I have no tax to pay?",answer:"If you are a Thai tax resident and your assessable income exceeds the filing threshold — 120,000 THB per year for single individuals with employment or pension income, or 60,000 THB for rental or investment income — you are technically required to file even if deductions and allowances reduce your final tax to zero. In practice, enforcement of filing-without-paying is limited, but it is legally required and best practice to file. If you have excess withholding tax deducted by your employer, you must file to claim a refund."}]},{name:"Income & Withholding",items:[{question:"How is monthly withholding tax calculated?",answer:"Employers estimate your annual income and calculate the annual tax liability. This amount is divided by 12 and withheld monthly. The calculation considers your allowances and deductions you have declared to your employer."},{question:"Is foreign income taxable in Thailand?",answer:"For Thai tax residents, foreign income brought into Thailand is taxable. Recent changes require foreign income remitted to Thailand to be declared regardless of when it was earned. Tax treaties may provide exemptions or credits."},{question:"What income is exempt from tax?",answer:"The first 150,000 THB of taxable income is exempt. Other exemptions include certain government payments, inheritance (subject to separate rules), and specific investment returns like those from certain government bonds."},{question:"How are dividends from Thai companies taxed?",answer:"Dividends from Thai companies are subject to 10% withholding tax deducted at source by the paying company. You can either treat this withholding as your final tax obligation (simpler), or include dividends in your annual return and claim the 10% withholding as a tax credit — which may result in a refund if your overall effective tax rate is lower."},{question:"Is rental income from property in Thailand taxable?",answer:"Yes. Rental income from Thai property is assessable income and must be declared on your annual return. You can deduct 30% of gross rental income as a flat-rate expense (no documentation needed), or claim actual rental-related expenses if they are higher and you can document them. Net rental income is then subject to progressive income tax rates."},{question:"How is rental income taxed in Thailand?",answer:"Rental income from Thai property is assessable income under Section 40(5) of the Revenue Code. You can deduct 30% of gross rental income as a standard flat-rate expense (no receipts needed), making 70% of your rent your net assessable income. This net income is added to your total income for the year and taxed at progressive rates after your personal allowances. If a company pays you rent, they are required to withhold 5% at source — collect a withholding tax certificate and claim this as a credit on your annual PND 90 return. Individual tenants have no withholding obligation."},{question:"Does Thailand have a capital gains tax?",answer:"Thailand does not have a separate capital gains tax in the traditional sense. Capital gains from selling shares listed on the Stock Exchange of Thailand (SET) are exempt from personal income tax for individual investors. For other assets — such as overseas shares, foreign property, or Thai real estate — the treatment is more complex. Proceeds from selling foreign assets that are remitted to Thailand are treated as assessable income subject to progressive rates. When you sell Thai property, Specific Business Tax (3.3% of sale price) applies if the property was held for fewer than 5 years, plus transfer fees — but there is no separate capital gains income tax on top of this."}]},{name:"Refunds & Payments",items:[{question:"How do I get a tax refund?",answer:"If you have overpaid tax (common if you have additional deductions not considered in withholding), you will receive a refund after filing your annual return. Refunds are typically processed within 3 months and deposited to your bank account."},{question:"What if I owe additional tax?",answer:"If your total tax liability exceeds the amount withheld, you must pay the difference when filing. Payment can be made at the Revenue Department office, through designated banks, or online through the RD Smart Tax app."},{question:"Are there penalties for late filing or payment?",answer:"Yes. Late filing incurs a penalty of up to 2,000 THB. Late payment incurs a surcharge of 1.5% per month on the outstanding amount. Interest also accrues on unpaid tax."}]},{name:"Working in Thailand as a Foreigner",items:[{question:"Do I need a work permit to have a Thai tax obligation?",answer:"No — tax obligations and work permit requirements are entirely separate. Your tax obligation is determined by your income and your residency status (days in Thailand), not whether you hold a work permit. If a Thai employer withholds income tax from your salary, you already have a tax obligation regardless of your work permit status. Legally working in Thailand as a foreign national requires a work permit issued by the Department of Employment, and working without one is a legal violation — but it does not remove your tax obligation or create one where none existed."},{question:"My employer is a foreign company with no presence in Thailand. Do I owe Thai tax?",answer:"If you work remotely in Thailand for a foreign employer that has no Thai entity and does not withhold Thai tax, and you spend 180 or more days in Thailand in a year, you are a Thai tax resident. Income that you remit (transfer or spend) in Thailand is taxable since the 2024 rule change. Even though your employer never interacts with the Thai Revenue Department, you personally are responsible for declaring and paying Thai tax on your remitted income by filing a PND 90 return by 31 March."}]}];function Mh(e){const t=e.toLowerCase(),n=[];return Qr.forEach(a=>{a.items.forEach(i=>{(i.question.toLowerCase().includes(t)||i.answer.toLowerCase().includes(t))&&n.push(i)})}),n}const Zi="https://mythaitaxes.com",_x=()=>{const e=In.slice(0,3),t=["Pensioners & Retirees","Tax Residency","Filing & Deadlines"],n=Qr.filter(o=>t.includes(o.name)).sort((o,s)=>t.indexOf(o.name)-t.indexOf(s.name)).map(o=>({name:o.name,items:o.items.slice(0,3)})),a="Thai Tax Calculator | Free Thai Income Tax Calculator",i="Calculate your Thai income tax quickly and accurately. Free tool for salaried employees, freelancers, sole proprietors, and company owners in Thailand.";return r.jsxs("div",{className:"py-8",children:[r.jsxs(Le,{children:[r.jsx("title",{children:a}),r.jsx("meta",{name:"description",content:i}),r.jsx("link",{rel:"canonical",href:Zi}),r.jsx("meta",{property:"og:title",content:a}),r.jsx("meta",{property:"og:description",content:i}),r.jsx("meta",{property:"og:url",content:Zi}),r.jsx("meta",{property:"og:type",content:"website"}),r.jsx("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"WebApplication",name:"Thai Tax Calculator",url:Zi,description:i,applicationCategory:"FinanceApplication",operatingSystem:"All",offers:{"@type":"Offer",price:"0",priceCurrency:"THB"}})})]}),r.jsxs("div",{className:"max-w-4xl mx-auto px-4 text-center mb-4",children:[r.jsx("h1",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-3",children:"Thai Tax Calculator"}),r.jsx("p",{className:"text-lg text-gray-600 mb-2",children:"Calculate your Thai tax obligation quickly and accurately"}),r.jsx("p",{className:"text-sm text-gray-500 max-w-2xl mx-auto",children:"Thailand's personal income tax applies to anyone spending 180 or more days in the country each year. Enter your income details below to get an instant estimate — salaried employees, freelancers, sole proprietors, and company owners are all supported."})]}),r.jsx(Rx,{}),r.jsx("div",{className:"max-w-3xl mx-auto px-4 mb-8",children:r.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[r.jsx(F,{to:"/annual-tax/",className:"block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-transparent hover:border-blue-500",children:r.jsxs("div",{className:"flex items-start gap-4",children:[r.jsx("div",{className:"w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0",children:r.jsx("svg",{className:"w-6 h-6 text-blue-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"})})}),r.jsxs("div",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-1",children:"Annual Tax Calculator"}),r.jsx("p",{className:"text-gray-600 text-sm",children:"Get a detailed breakdown of your annual tax liability and potential refund."})]})]})}),r.jsx(F,{to:"/monthly-withholding/",className:"block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-transparent hover:border-blue-500",children:r.jsxs("div",{className:"flex items-start gap-4",children:[r.jsx("div",{className:"w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0",children:r.jsx("svg",{className:"w-6 h-6 text-green-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})})}),r.jsxs("div",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-1",children:"Monthly Withholding"}),r.jsx("p",{className:"text-gray-600 text-sm",children:"Estimate how much tax should be deducted from your monthly salary."})]})]})})]})}),r.jsxs("div",{className:"flex justify-center mb-8 px-4",children:[r.jsx("div",{className:"hidden md:block",children:r.jsx(En,{size:"leaderboard",adSlot:"5959313072"})}),r.jsx("div",{className:"md:hidden",children:r.jsx(En,{size:"mobile-banner",adSlot:"6916229573"})})]}),r.jsxs("div",{className:"max-w-4xl mx-auto px-4 mb-10",children:[r.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-3",children:"Thai Personal Income Tax — The Essentials"}),r.jsxs("p",{className:"text-gray-600 mb-6 leading-relaxed",children:["Thailand uses a progressive personal income tax system with eight brackets, ranging from exempt on the first 150,000 THB to 35% on income above 5,000,000 THB. Tax residents — those who spend 180 or more days in Thailand in a calendar year — must report income earned in Thailand and any foreign income remitted into the country. Non-residents are taxed only on Thai-sourced income. The annual filing deadline is ",r.jsx("strong",{children:"31 March"})," each year (or 8 April for online filings)."]}),r.jsxs("div",{className:"grid sm:grid-cols-3 gap-4 mb-6",children:[r.jsxs("div",{className:"bg-white rounded-xl shadow-md p-5",children:[r.jsx("div",{className:"text-3xl font-bold text-blue-600 mb-1",children:"180"}),r.jsx("div",{className:"text-sm font-semibold text-gray-900 mb-1",children:"Day residency threshold"}),r.jsx("p",{className:"text-xs text-gray-600 leading-relaxed",children:"Spend 180 or more days in Thailand in a calendar year and you become a Thai tax resident, liable to declare all Thai-source income and remitted foreign income."})]}),r.jsxs("div",{className:"bg-white rounded-xl shadow-md p-5",children:[r.jsx("div",{className:"text-3xl font-bold text-blue-600 mb-1",children:"31 Mar"}),r.jsx("div",{className:"text-sm font-semibold text-gray-900 mb-1",children:"Annual filing deadline"}),r.jsx("p",{className:"text-xs text-gray-600 leading-relaxed",children:"PND 90 (freelancers & multiple income sources) and PND 91 (salaried employees) are both due by 31 March for the prior tax year. Online filings via RD Smart Tax get an 8-day extension."})]}),r.jsxs("div",{className:"bg-white rounded-xl shadow-md p-5",children:[r.jsx("div",{className:"text-3xl font-bold text-blue-600 mb-1",children:"120k"}),r.jsx("div",{className:"text-sm font-semibold text-gray-900 mb-1",children:"Filing threshold (THB)"}),r.jsx("p",{className:"text-xs text-gray-600 leading-relaxed",children:"Single filers with assessable income above 120,000 THB per year must file a return. The threshold rises to 220,000 THB for married couples filing jointly."})]})]}),r.jsxs("div",{className:"bg-white rounded-xl shadow-md overflow-hidden mb-4",children:[r.jsx("div",{className:"px-6 py-4 border-b border-gray-100",children:r.jsx("h3",{className:"font-semibold text-gray-900",children:"2025 Personal Income Tax Rates"})}),r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full text-sm",children:[r.jsx("thead",{className:"bg-gray-50",children:r.jsxs("tr",{children:[r.jsx("th",{className:"px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide",children:"Taxable Income (THB)"}),r.jsx("th",{className:"px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide",children:"Rate"}),r.jsx("th",{className:"px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide",children:"Max tax on bracket"})]})}),r.jsx("tbody",{className:"divide-y divide-gray-100",children:[{range:"0 – 150,000",rate:"Exempt",max:"–"},{range:"150,001 – 300,000",rate:"5%",max:"7,500"},{range:"300,001 – 500,000",rate:"10%",max:"20,000"},{range:"500,001 – 750,000",rate:"15%",max:"37,500"},{range:"750,001 – 1,000,000",rate:"20%",max:"50,000"},{range:"1,000,001 – 2,000,000",rate:"25%",max:"250,000"},{range:"2,000,001 – 5,000,000",rate:"30%",max:"900,000"},{range:"Over 5,000,000",rate:"35%",max:"No limit"}].map((o,s)=>r.jsxs("tr",{className:s%2===1?"bg-gray-50":"",children:[r.jsx("td",{className:"px-6 py-3 text-gray-700",children:o.range}),r.jsx("td",{className:`px-6 py-3 text-right font-medium ${o.rate==="Exempt"?"text-green-600":"text-blue-600"}`,children:o.rate}),r.jsx("td",{className:"px-6 py-3 text-right text-gray-500",children:o.max})]},s))})]})}),r.jsx("div",{className:"px-6 py-3 bg-gray-50 border-t border-gray-100",children:r.jsxs("p",{className:"text-xs text-gray-500",children:["Rates apply to ",r.jsx("em",{children:"taxable"})," income — i.e. after deducting all allowances and expenses. The calculator above applies your personal deductions before reaching these brackets."," ",r.jsx(F,{to:"/articles/thai-tax-brackets-explained/",className:"text-blue-500 hover:underline",children:"See full breakdown →"})]})})]}),r.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[r.jsx("h3",{className:"font-semibold text-gray-900 mb-3",children:"Common Deductions That Reduce Your Taxable Income"}),r.jsx("div",{className:"grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600",children:[["Personal allowance","60,000 THB"],["Spouse allowance (no income)","60,000 THB"],["Child allowance","30,000 THB per child"],["Employment income deduction","50% of salary, max 100,000 THB"],["Life insurance premiums","Up to 100,000 THB"],["Health insurance premiums","Up to 25,000 THB"],["RMF contributions","Up to 30% of income, max 500,000 THB"],["SSF contributions","Up to 30% of income, max 200,000 THB"]].map(([o,s])=>r.jsxs("div",{className:"flex justify-between gap-4 py-1.5 border-b border-gray-100 last:border-0",children:[r.jsx("span",{children:o}),r.jsx("span",{className:"text-gray-900 font-medium text-right flex-shrink-0",children:s})]},o))}),r.jsx("p",{className:"text-xs text-gray-500 mt-3",children:r.jsx(F,{to:"/articles/maximizing-tax-deductions-thailand/",className:"text-blue-500 hover:underline",children:"Full guide to Thai tax deductions →"})})]})]}),r.jsx("div",{className:"max-w-6xl mx-auto px-4",children:r.jsxs("div",{className:"grid md:grid-cols-2 gap-8",children:[r.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Popular Questions"}),r.jsx("div",{className:"space-y-5",children:n.map(o=>r.jsxs("div",{children:[r.jsx("p",{className:"text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2",children:o.name}),r.jsx("ul",{className:"space-y-2",children:o.items.map((s,l)=>r.jsx("li",{children:r.jsxs(F,{to:"/faq/",className:"flex items-start gap-2 text-sm text-gray-600 hover:text-blue-500 transition-colors",children:[r.jsx("span",{className:"text-blue-500 flex-shrink-0 mt-0.5",children:"Q:"}),r.jsx("span",{children:s.question})]})},l))})]},o.name))}),r.jsxs(F,{to:"/faq/",className:"inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 mt-4 text-sm font-medium",children:["View all FAQ",r.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]}),r.jsxs("div",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Latest Articles"}),r.jsx("div",{className:"space-y-4",children:e.map(o=>r.jsx(Ea,{article:o},o.slug))}),r.jsxs(F,{to:"/articles/",className:"inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 mt-4 text-sm font-medium",children:["View all articles",r.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]})]})})]})},Oc="https://mythaitaxes.com",Lx=()=>{const e=In.slice(0,3),t=In.slice(3),n="Thai Tax Articles & Guides | Thai Tax Calculator",a="Expert guides on Thai taxation covering freelancer tax, expat filing, deductions, tax residency, double tax agreements, and more.";return r.jsxs("div",{className:"py-8",children:[r.jsxs(Le,{children:[r.jsx("title",{children:n}),r.jsx("meta",{name:"description",content:a}),r.jsx("link",{rel:"canonical",href:`${Oc}/articles/`}),r.jsx("meta",{property:"og:title",content:n}),r.jsx("meta",{property:"og:description",content:a}),r.jsx("meta",{property:"og:url",content:`${Oc}/articles/`}),r.jsx("meta",{property:"og:type",content:"website"})]}),r.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Thai Tax Guides for Expats"}),r.jsx("p",{className:"text-gray-600",children:"Comprehensive guides to help you understand and navigate Thai taxation."})]}),r.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",children:e.map(i=>r.jsx(Ea,{article:i},i.slug))}),t.length>0&&r.jsxs("div",{className:"flex justify-center mb-8",children:[r.jsx("div",{className:"hidden md:block",children:r.jsx(En,{size:"leaderboard",adSlot:"5959313072"})}),r.jsx("div",{className:"md:hidden",children:r.jsx(En,{size:"rectangle",adSlot:"3447757856"})})]}),t.length>0&&r.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",children:t.map(i=>r.jsx(Ea,{article:i},i.slug))}),r.jsxs("div",{className:"bg-blue-50 rounded-xl p-6 md:p-8 text-center",children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-2",children:"Ready to calculate your tax?"}),r.jsx("p",{className:"text-gray-600 mb-4",children:"Use our free calculator to estimate your Thai tax liability."}),r.jsxs(F,{to:"/",className:"inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors",children:["Start Calculator",r.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]})]})]})},or="https://mythaitaxes.com",Mx=()=>{const{slug:e}=Zp(),t=e?Ex(e):void 0,n=e?Dx(e):[];if(!t)return r.jsx(my,{to:"/articles/",replace:!0});const a=`${or}/articles/${t.slug}/`,i={"@context":"https://schema.org","@type":"Article",headline:t.title,description:t.excerpt,url:a,datePublished:t.publishedAt,publisher:{"@type":"Organization",name:"Thai Tax Calculator",url:or}},o={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${or}/`},{"@type":"ListItem",position:2,name:"Articles",item:`${or}/articles/`},{"@type":"ListItem",position:3,name:t.title,item:a}]},s=t.content.split(`

`),l=Math.floor(s.length/2),c=s.slice(0,l).join(`

`),u=s.slice(l).join(`

`);return r.jsxs("div",{className:"py-8",children:[r.jsxs(Le,{children:[r.jsxs("title",{children:[t.title," | My Thai Taxes"]}),r.jsx("meta",{name:"description",content:t.excerpt}),r.jsx("link",{rel:"canonical",href:a}),r.jsx("meta",{property:"og:title",content:t.title}),r.jsx("meta",{property:"og:description",content:t.excerpt}),r.jsx("meta",{property:"og:url",content:a}),r.jsx("meta",{property:"og:type",content:"article"}),r.jsx("meta",{property:"article:published_time",content:t.publishedAt}),r.jsx("script",{type:"application/ld+json",children:JSON.stringify(i)}),r.jsx("script",{type:"application/ld+json",children:JSON.stringify(o)})]}),r.jsxs("div",{className:"max-w-3xl mx-auto px-4",children:[r.jsx("nav",{className:"mb-6",children:r.jsx(F,{to:"/articles/",className:"text-blue-500 hover:text-blue-600 text-sm",children:"← Back to Articles"})}),r.jsxs("header",{className:"mb-8",children:[r.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[r.jsx("span",{className:"text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full",children:t.category}),r.jsxs("span",{className:"text-sm text-gray-500",children:[t.readTime," min read"]})]}),r.jsx("h1",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-3",children:t.title}),r.jsxs("p",{className:"text-gray-500 text-sm",children:["Published: ",new Date(t.publishedAt).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})]})]}),r.jsxs("div",{className:"flex gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-8 text-sm text-amber-800",children:[r.jsx("svg",{className:"w-4 h-4 mt-0.5 shrink-0",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),r.jsxs("span",{children:["This article is for informational purposes only and is based on publicly available Thai Revenue Department guidance and the Revenue Code. Tax rules change — verify current regulations at"," ",r.jsx("a",{href:"https://www.rd.go.th/english/",target:"_blank",rel:"noopener noreferrer",className:"underline hover:text-amber-900 font-medium",children:"rd.go.th"})," ","or consult a licensed Thai tax advisor before making financial decisions."]})]}),r.jsx("article",{className:"prose prose-gray max-w-none mb-8",children:r.jsx("div",{className:"article-content",dangerouslySetInnerHTML:{__html:Uc(c)}})}),r.jsx("div",{className:"flex justify-center my-8",children:r.jsx(En,{size:"rectangle",adSlot:"3447757856"})}),r.jsx("article",{className:"prose prose-gray max-w-none mb-8",children:r.jsx("div",{className:"article-content",dangerouslySetInnerHTML:{__html:Uc(u)}})}),t.sources&&t.sources.length>0&&r.jsxs("div",{className:"border-t border-gray-200 pt-6 mb-8",children:[r.jsx("h2",{className:"text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3",children:"Sources & Official References"}),r.jsx("ul",{className:"space-y-1",children:t.sources.map((m,f)=>r.jsx("li",{className:"text-sm text-gray-600",children:r.jsx("a",{href:m.url,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:text-blue-700 hover:underline",children:m.label})},f))})]}),r.jsxs("div",{className:"bg-blue-50 rounded-xl p-6 text-center mb-8",children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-2",children:"Ready to calculate your tax?"}),r.jsx("p",{className:"text-gray-600 mb-4",children:"Put this knowledge to use with our free calculator."}),r.jsxs(F,{to:"/annual-tax/",className:"inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors",children:["Start Calculator",r.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]}),n.length>0&&r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Related Articles"}),r.jsx("div",{className:"grid md:grid-cols-2 gap-4",children:n.map(m=>r.jsx(Ea,{article:m},m.slug))})]})]})]})};function Uc(e){let t=e.replace(/(^\|.+\|$\n?)+/gm,n=>{const a=n.trim().split(`
`);let i='<table class="w-full border-collapse mb-4">';return a.forEach((o,s)=>{const l=o.split("|").filter(y=>y.trim());if(l.every(y=>y.trim().match(/^[-:]+$/)))return;const c=s===0,u=c?"th":"td",m=c?"border border-gray-200 px-4 py-2 bg-gray-50 font-semibold text-left":"border border-gray-200 px-4 py-2",f=l.map(y=>`<${u} class="${m}">${y.trim()}</${u}>`).join("");i+=`<tr>${f}</tr>`}),i+="</table>",i});return t=t.replace(/^## (.+)$/gm,'<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>').replace(/^### (.+)$/gm,'<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>').replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),t=t.replace(/(^\d+\. .+$(\n(   - .+$|\d+\. .+$))*)+/gm,n=>{let a='<ol class="list-decimal list-outside ml-5 mb-4 text-gray-600 space-y-3">',i=[];return n.split(`
`).forEach((s,l)=>{const c=/^\d+\. /.test(s),u=/^   - /.test(s);if(c){i.length>0?(a+='<ul class="list-disc list-outside ml-5 mt-2 text-gray-500 space-y-1">',a+=i.join(""),a+="</ul>",i=[],a+="</li>"):l>0&&(a+="</li>");const m=s.replace(/^\d+\. /,"");a+=`<li>${m}`}else if(u){const m=s.replace(/^   - /,"");i.push(`<li>${m}</li>`)}}),i.length>0&&(a+='<ul class="list-disc list-outside ml-5 mt-2 text-gray-500 space-y-1">',a+=i.join(""),a+="</ul>"),a+="</li></ol>",a}),t=t.replace(/(^- .+$(\n- .+$)*)/gm,n=>`<ul class="list-disc list-outside ml-5 mb-4 text-gray-600 space-y-1">${n.split(`
`).map(i=>`<li>${i.replace(/^- /,"")}</li>`).join("")}</ul>`),t=t.replace(/\n\n/g,'</p><p class="mb-4 text-gray-600 leading-relaxed">').replace(/^/,'<p class="mb-4 text-gray-600 leading-relaxed">').replace(/$/,"</p>").replace(/<p class="mb-4 text-gray-600 leading-relaxed"><\/p>/g,""),t}const rs=({question:e,answer:t,defaultOpen:n=!1})=>{const[a,i]=v.useState(n);return r.jsxs("div",{className:"border-b border-gray-200 last:border-b-0",children:[r.jsxs("button",{className:"w-full py-4 flex items-center justify-between text-left hover:text-blue-500 transition-colors",onClick:()=>i(!a),"aria-expanded":a,children:[r.jsx("span",{className:"font-medium text-gray-900 pr-4",children:e}),r.jsx("svg",{className:`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${a?"rotate-180":""}`,fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]}),a&&r.jsx("div",{className:"pb-4 text-gray-600 leading-relaxed",children:t})]})},Hc="https://mythaitaxes.com",Ox=()=>{const[e,t]=v.useState(""),n=e.length>=2?Mh(e):[],a=e.length>=2,i="Thai Tax FAQ | Frequently Asked Questions | Thai Tax Calculator",o="Answers to common questions about Thai income tax: tax residency, deductions, filing deadlines, withholding tax, refunds, and more.",s={"@context":"https://schema.org","@type":"FAQPage",mainEntity:Qr.flatMap(l=>l.items.map(c=>({"@type":"Question",name:c.question,acceptedAnswer:{"@type":"Answer",text:c.answer}})))};return r.jsxs("div",{className:"py-8",children:[r.jsxs(Le,{children:[r.jsx("title",{children:i}),r.jsx("meta",{name:"description",content:o}),r.jsx("link",{rel:"canonical",href:`${Hc}/faq/`}),r.jsx("meta",{property:"og:title",content:i}),r.jsx("meta",{property:"og:description",content:o}),r.jsx("meta",{property:"og:url",content:`${Hc}/faq/`}),r.jsx("meta",{property:"og:type",content:"website"}),r.jsx("script",{type:"application/ld+json",children:JSON.stringify(s)})]}),r.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[r.jsxs("div",{className:"mb-8 text-center",children:[r.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Frequently Asked Questions"}),r.jsx("p",{className:"text-gray-600 mb-6",children:"Find answers to common questions about Thai taxation."}),r.jsx("div",{className:"max-w-md mx-auto",children:r.jsxs("div",{className:"relative",children:[r.jsx("input",{type:"text",placeholder:"Search FAQs...",value:e,onChange:l=>t(l.target.value),className:"w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"}),r.jsx("svg",{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})]})})]}),r.jsxs("div",{className:"grid lg:grid-cols-3 gap-8",children:[r.jsx("div",{className:"lg:col-span-2",children:a?r.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[r.jsxs("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:["Search Results (",n.length,")"]}),n.length>0?r.jsx("div",{className:"divide-y divide-gray-200",children:n.map((l,c)=>r.jsx(rs,{question:l.question,answer:l.answer,defaultOpen:c===0},c))}):r.jsxs("p",{className:"text-gray-500",children:['No results found for "',e,'". Try a different search term.']})]}):r.jsx("div",{className:"space-y-6",children:Qr.map((l,c)=>r.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:l.name}),r.jsx("div",{className:"divide-y divide-gray-200",children:l.items.map((u,m)=>r.jsx(rs,{question:u.question,answer:u.answer},m))})]},c))})}),r.jsx("div",{className:"lg:col-span-1",children:r.jsxs("div",{className:"sticky top-24 space-y-6",children:[r.jsx("div",{className:"flex justify-center",children:r.jsx(En,{size:"rectangle",adSlot:"3447757856"})}),r.jsxs("div",{className:"bg-blue-50 rounded-xl p-6",children:[r.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Calculate Your Tax"}),r.jsx("p",{className:"text-gray-600 text-sm mb-4",children:"Ready to estimate your Thai tax liability?"}),r.jsx(F,{to:"/",className:"block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors",children:"Start Calculator"})]}),r.jsxs("div",{className:"bg-gray-50 rounded-xl p-6",children:[r.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Need More Help?"}),r.jsx("p",{className:"text-gray-600 text-sm",children:"For complex tax situations, we recommend consulting with a qualified Thai tax professional."})]})]})})]})]})]})},Ux="https://mythaitaxes.com",Hx=()=>{const[e,t]=Yy(),[n,a]=v.useState(e.get("q")??""),i=e.get("q")??"",o=i.length>=2?Fx(i):[],s=i.length>=2?Mh(i):[],l=o.length+s.length;v.useEffect(()=>{const u=setTimeout(()=>{const m=n.trim();m?t({q:m},{replace:!0}):t({},{replace:!0})},300);return()=>clearTimeout(u)},[n,t]);const c=i?`Results for "${i}" | Thai Tax Calculator`:"Search | Thai Tax Calculator";return r.jsxs("div",{className:"py-8",children:[r.jsxs(Le,{children:[r.jsx("title",{children:c}),r.jsx("meta",{name:"description",content:"Search Thai tax articles and frequently asked questions."}),r.jsx("link",{rel:"canonical",href:`${Ux}/search/`}),r.jsx("meta",{name:"robots",content:"noindex"})]}),r.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-6",children:"Search"}),r.jsxs("div",{className:"relative max-w-xl",children:[r.jsx("input",{type:"text",placeholder:"Search articles and FAQs...",value:n,onChange:u=>a(u.target.value),autoFocus:!0,className:"w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors text-base"}),r.jsx("svg",{className:"absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})]})]}),i.length>=2?r.jsxs("div",{className:"space-y-8",children:[r.jsx("p",{className:"text-gray-500 text-sm",children:l===0?`No results found for "${i}"`:`${l} result${l!==1?"s":""} for "${i}"`}),o.length>0&&r.jsxs("section",{children:[r.jsxs("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:["Articles (",o.length,")"]}),r.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-3 gap-4",children:o.map(u=>r.jsx(Ea,{article:u},u.slug))})]}),s.length>0&&r.jsxs("section",{children:[r.jsxs("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:["FAQs (",s.length,")"]}),r.jsx("div",{className:"bg-white rounded-xl shadow-md p-6 divide-y divide-gray-200",children:s.map((u,m)=>r.jsx(rs,{question:u.question,answer:u.answer,defaultOpen:m===0},m))}),r.jsx("div",{className:"mt-3",children:r.jsx(F,{to:"/faq/",className:"text-blue-500 hover:underline text-sm",children:"Browse all FAQs →"})})]}),l===0&&r.jsxs("div",{className:"text-center py-12",children:[r.jsx("p",{className:"text-gray-500 mb-4",children:"Try a different keyword, or browse:"}),r.jsxs("div",{className:"flex justify-center gap-6",children:[r.jsx(F,{to:"/articles/",className:"text-blue-500 hover:underline",children:"All Articles"}),r.jsx(F,{to:"/faq/",className:"text-blue-500 hover:underline",children:"All FAQs"})]})]})]}):r.jsx("p",{className:"text-gray-400 text-center py-12",children:"Enter at least 2 characters to search articles and FAQs."})]})]})},Bx="https://mythaitaxes.com",en="info@mythaitaxes.com",Wx=()=>r.jsxs("div",{className:"max-w-3xl mx-auto px-4 py-12",children:[r.jsxs(Le,{children:[r.jsx("title",{children:"Privacy Policy | My Thai Taxes"}),r.jsx("meta",{name:"description",content:"Privacy policy for mythaitaxes.com — how we handle your data, the third-party services we use, and your rights."}),r.jsx("link",{rel:"canonical",href:`${Bx}/privacy/`}),r.jsx("meta",{name:"robots",content:"noindex"})]}),r.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Privacy Policy"}),r.jsx("p",{className:"text-sm text-gray-500 mb-8",children:"Last updated: 28 June 2026"}),r.jsxs("div",{className:"prose prose-gray max-w-none space-y-8 text-gray-700",children:[r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"1. Who we are"}),r.jsxs("p",{children:["This website (",r.jsx("strong",{children:"mythaitaxes.com"}),") provides free tools and informational articles to help individuals estimate their Thai personal income tax. It is operated as an independent personal project. For questions about this policy, contact"," ",r.jsx("a",{href:`mailto:${en}`,className:"text-blue-600 hover:underline",children:en}),"."]})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"2. Data you enter into the calculators"}),r.jsxs("p",{children:["When you use the Annual Tax Calculator or Monthly Withholding Estimator, the income figures, deduction amounts, and other financial details you enter are stored ",r.jsx("strong",{children:"only in your browser's session storage"}),' — a temporary area that is cleared automatically when you close the browser tab or click "Start Over." This data is ',r.jsx("strong",{children:"never transmitted to our servers"}),", never stored in a database, and never shared with anyone. We do not see it."]}),r.jsx("p",{className:"mt-2",children:"Because all calculation happens locally in your browser, you can use the calculators with complete confidence that your financial information stays on your device."})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"3. Cookies and tracking technologies"}),r.jsx("p",{children:"We do not set any first-party cookies ourselves. However, the third-party services listed below place their own cookies and collect usage data when you visit this site."}),r.jsx("h3",{className:"text-base font-semibold text-gray-800 mt-4 mb-2",children:"Google Analytics (GA4)"}),r.jsx("p",{children:"We use Google Analytics to understand how visitors use the site — which pages are visited, how long visitors stay, and where traffic comes from. Google Analytics sets cookies that identify your browser across sessions. The data is aggregated and does not personally identify you to us. Google may process this data on servers outside your country."}),r.jsxs("ul",{className:"list-disc pl-5 mt-2 space-y-1 text-sm",children:[r.jsxs("li",{children:["To opt out: install the ",r.jsx("a",{href:"https://tools.google.com/dlpage/gaoptout",className:"text-blue-600 hover:underline",target:"_blank",rel:"noopener noreferrer",children:"Google Analytics Opt-out Browser Add-on"})]}),r.jsx("li",{children:r.jsx("a",{href:"https://policies.google.com/privacy",className:"text-blue-600 hover:underline",target:"_blank",rel:"noopener noreferrer",children:"Google Privacy Policy"})})]}),r.jsx("h3",{className:"text-base font-semibold text-gray-800 mt-4 mb-2",children:"Google AdSense"}),r.jsx("p",{children:"We display advertisements served by Google AdSense. Google uses cookies to serve ads based on your prior visits to this site and other sites. These cookies allow Google and its partners to show you ads that may be relevant to your interests. You can opt out of personalised advertising at any time."}),r.jsxs("ul",{className:"list-disc pl-5 mt-2 space-y-1 text-sm",children:[r.jsxs("li",{children:["Opt out of personalised ads: ",r.jsx("a",{href:"https://www.google.com/settings/ads",className:"text-blue-600 hover:underline",target:"_blank",rel:"noopener noreferrer",children:"Google Ad Settings"})]}),r.jsxs("li",{children:["Opt out via industry tool: ",r.jsx("a",{href:"https://www.aboutads.info/choices/",className:"text-blue-600 hover:underline",target:"_blank",rel:"noopener noreferrer",children:"aboutads.info"})]}),r.jsx("li",{children:r.jsx("a",{href:"https://policies.google.com/technologies/ads",className:"text-blue-600 hover:underline",target:"_blank",rel:"noopener noreferrer",children:"How Google uses advertising cookies"})})]}),r.jsx("h3",{className:"text-base font-semibold text-gray-800 mt-4 mb-2",children:"Ahrefs Analytics"}),r.jsxs("p",{children:["We use Ahrefs Analytics to measure site traffic and search performance. Ahrefs collects anonymised page view data. See the"," ",r.jsx("a",{href:"https://ahrefs.com/privacy",className:"text-blue-600 hover:underline",target:"_blank",rel:"noopener noreferrer",children:"Ahrefs Privacy Policy"})," ","for details."]})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"4. Exchange rate lookups"}),r.jsxs("p",{children:["When you enter foreign income in the Annual Tax Calculator, the site may fetch the Bank of Thailand's published daily exchange rate for the currency and date you specify. This request is made through a proxy server to comply with browser security restrictions. ",r.jsx("strong",{children:"No personal or financial data from your form is included in this request"})," — only the currency code and date."]})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"5. Information this site does not collect"}),r.jsxs("ul",{className:"list-disc pl-5 space-y-1",children:[r.jsx("li",{children:"We do not collect your name, email address, or any contact details (unless you email us directly)"}),r.jsx("li",{children:"We do not have user accounts or logins"}),r.jsx("li",{children:"We do not store your calculator inputs on any server"}),r.jsx("li",{children:"We do not sell data to third parties"})]})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"6. Your rights"}),r.jsx("p",{children:"Depending on where you are located, you may have rights regarding your personal data under laws such as the EU General Data Protection Regulation (GDPR) or Thailand's Personal Data Protection Act (PDPA). Because we do not collect personally identifiable information through this site, most of these rights apply to data held by third-party services (Google, Ahrefs) rather than by us. To exercise rights against those providers, use the opt-out links above or contact them directly."}),r.jsxs("p",{className:"mt-2",children:["For any privacy enquiries, email"," ",r.jsx("a",{href:`mailto:${en}`,className:"text-blue-600 hover:underline",children:en}),"."]})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"7. Data retention"}),r.jsx("p",{children:"Calculator data in session storage is deleted when you close the browser tab. Google Analytics retains event data for 14 months by default (configurable in the GA4 console). AdSense cookies persist for up to 13 months. We do not control the retention policies of third-party services."})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"8. Changes to this policy"}),r.jsx("p",{children:'We may update this policy if we add new features or services. The "Last updated" date at the top of the page will reflect any changes.'})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"9. Contact"}),r.jsxs("p",{children:["Questions or concerns about this privacy policy can be sent to"," ",r.jsx("a",{href:`mailto:${en}`,className:"text-blue-600 hover:underline",children:en}),"."]})]})]})]}),Bc="https://mythaitaxes.com",eo="info@mythaitaxes.com",zx="https://github.com/holsson95/thai-tax-calculator/blob/main/TAX_RULES.md",$x=()=>{const e="About | My Thai Taxes",t="What My Thai Taxes is, why it was built, how the tax calculations work, how figures are sourced and reviewed, and who maintains the site.";return r.jsxs("div",{className:"max-w-3xl mx-auto px-4 py-12",children:[r.jsxs(Le,{children:[r.jsx("title",{children:e}),r.jsx("meta",{name:"description",content:t}),r.jsx("link",{rel:"canonical",href:`${Bc}/about/`}),r.jsx("meta",{property:"og:title",content:e}),r.jsx("meta",{property:"og:description",content:t}),r.jsx("meta",{property:"og:url",content:`${Bc}/about/`}),r.jsx("meta",{property:"og:type",content:"website"})]}),r.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-6",children:"About My Thai Taxes"}),r.jsxs("div",{className:"space-y-6 text-gray-700 leading-relaxed",children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 pt-2",children:"What is My Thai Taxes?"}),r.jsx("p",{children:"My Thai Taxes is a free online calculator and information resource designed to help individuals understand and estimate their Thai personal income tax obligations. Whether you are a salaried employee, freelancer, sole proprietor, or company director, the tools here are built to walk you through Thailand's tax system in plain language — without requiring an accounting background."}),r.jsx("h2",{className:"text-xl font-semibold text-gray-900 pt-2",children:"Why we built it"}),r.jsx("p",{children:"Thailand's personal income tax rules can be confusing, especially for expats and digital nomads navigating the 180-day residency rule, foreign income remittance requirements, and the range of allowances available to reduce taxable income. Good information exists, but it's scattered across Revenue Department PDFs, accounting-firm blog posts, and forum threads that often disagree with each other — and most calculators online don't show their work. My Thai Taxes was built to bring that into one place: a calculator that shows every step of the math, and plain-language guides that explain the reasoning behind it, so you can understand your own tax position rather than just trusting a number."}),r.jsx("h2",{className:"text-xl font-semibold text-gray-900 pt-2",children:"How the calculations work"}),r.jsxs("p",{children:["The ",r.jsx(F,{to:"/annual-tax/",className:"text-blue-600 hover:underline",children:"annual tax calculator"})," ","follows the same structure the Revenue Department uses for a PND90/91 return: it takes your income by type, applies the relevant flat-rate or actual-expense deduction, subtracts your allowances (personal, spouse, children, parents, insurance, retirement funds, donations, and so on), and runs the resulting taxable income through Thailand's progressive tax brackets (0% to 35%). The"," ",r.jsx(F,{to:"/monthly-withholding/",className:"text-blue-600 hover:underline",children:"monthly withholding estimator"})," ","uses the same underlying logic to check whether the right amount of tax is being deducted from a salary each month. Every step is shown in the results, not hidden behind a single output number — you can see exactly which deduction, allowance, or bracket produced your result."]}),r.jsx("h2",{className:"text-xl font-semibold text-gray-900 pt-2",children:"How information is sourced"}),r.jsxs("p",{children:["Every tax rule, rate, and threshold used in the calculator is tracked in a public sources registry — the"," ",r.jsx("a",{href:zx,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline",children:"Thai Tax Rules Registry"})," ","in this site's open-source repository. For each figure, the registry records where it came from (ideally a primary Thai Revenue Department document, otherwise reputable secondary sources such as major accounting firms or Thai law firms), what conditions or limitations apply, and whether that figure has been independently verified. Where a value could not be confirmed against a primary source, or where sources disagree, that is flagged openly rather than presented as settled fact. This is a deliberate choice: we'd rather show you where our confidence is lower than quietly guess."]}),r.jsx("h2",{className:"text-xl font-semibold text-gray-900 pt-2",children:"Who maintains the site"}),r.jsx("p",{children:"My Thai Taxes is built and maintained independently by a single developer. It is not run by a law firm, accounting firm, or the Thai government, and nothing on this site should be taken as advice from a licensed tax professional — see the disclaimer below. The site is a personal project aimed at making Thai tax information more transparent and accessible."}),r.jsx("h2",{className:"text-xl font-semibold text-gray-900 pt-2",children:"How often information is reviewed"}),r.jsxs("p",{children:["Tax rules and figures are reviewed periodically, and whenever a change to Thai tax law is identified. Each figure in the calculator is tracked in the sources registry above along with its source and verification status, so outdated or disputed values can be caught and corrected rather than sitting unnoticed. If you spot something that looks wrong or out of date, please"," ",r.jsx("a",{href:`mailto:${eo}`,className:"text-blue-600 hover:underline",children:"let us know"})," — see Contact below."]}),r.jsx("h2",{className:"text-xl font-semibold text-gray-900 pt-2",children:"What the site offers"}),r.jsx("ul",{className:"space-y-3",children:[{title:"Annual Tax Calculator",desc:"A step-by-step calculator covering income, deductions, allowances, withholding, and a full tax breakdown — with a downloadable PDF filing reference at the end.",to:"/annual-tax/"},{title:"Monthly Withholding Estimator",desc:"A quick tool to check whether the correct amount of tax is being deducted from your monthly salary.",to:"/monthly-withholding/"},{title:"Articles",desc:"In-depth guides on Thai tax topics including residency rules, freelancer obligations, double tax agreements, retirement income, and more.",to:"/articles/"},{title:"FAQ",desc:"Answers to the most common questions from expats, digital nomads, and Thai residents about filing, deductions, and staying compliant.",to:"/faq/"}].map(({title:n,desc:a,to:i})=>r.jsxs("li",{className:"flex gap-3",children:[r.jsx("span",{className:"text-blue-500 mt-1 flex-shrink-0",children:"→"}),r.jsxs("span",{children:[r.jsx(F,{to:i,className:"font-medium text-gray-900 hover:text-blue-500 transition-colors",children:n})," — ",a]})]},i))}),r.jsx("h2",{id:"for-developers",className:"text-xl font-semibold text-gray-900 pt-2",children:"For developers & AI agents"}),r.jsx("p",{children:"The annual tax calculation is also available as a free, open API — useful for embedding a Thai tax estimate elsewhere, or for AI agents that need to compute a live number rather than guess one. No API key or account required."}),r.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg px-5 py-4 text-sm text-gray-800 space-y-3",children:[r.jsxs("div",{children:[r.jsx("span",{className:"font-medium text-gray-900",children:"MCP endpoint"})," ","(Streamable HTTP, tool name ",r.jsx("code",{className:"text-xs bg-white px-1 py-0.5 rounded border border-blue-200",children:"calculate_thai_annual_income_tax"}),"):",r.jsx("pre",{className:"mt-2 bg-white border border-blue-200 rounded p-3 text-xs overflow-x-auto",children:"https://mythaitaxes-mcp.hannwill999.workers.dev/mcp"})]}),r.jsxs("div",{children:[r.jsx("span",{className:"font-medium text-gray-900",children:"REST endpoint"})," (plain ",r.jsx("code",{className:"text-xs bg-white px-1 py-0.5 rounded border border-blue-200",children:"POST"})," JSON, same calculation):",r.jsx("pre",{className:"mt-2 bg-white border border-blue-200 rounded p-3 text-xs overflow-x-auto",children:`curl -X POST https://mythaitaxes-mcp.hannwill999.workers.dev/api/calculate-annual-tax \\
  -H "Content-Type: application/json" \\
  -d '{"annualIncome": 800000, "maritalStatus": "married"}'`})]}),r.jsx("p",{className:"text-xs text-gray-600",children:"Covers salaried-employee income tax for now. Results are estimates — see the disclaimer below."})]}),r.jsx("h2",{className:"text-xl font-semibold text-gray-900 pt-2",children:"Disclaimer"}),r.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 text-sm text-amber-800",children:["The calculators and articles on this site are for informational and estimation purposes only. They do not constitute professional tax advice and should not be relied upon as a substitute for guidance from a qualified Thai tax advisor or accountant. Tax rules can change — always verify current regulations with the"," ",r.jsx("a",{href:"https://www.rd.go.th/english/",target:"_blank",rel:"noopener noreferrer",className:"underline hover:text-amber-900 font-medium",children:"Thai Revenue Department"})," ","or a licensed professional before filing."]}),r.jsx("h2",{className:"text-xl font-semibold text-gray-900 pt-2",children:"Contact"}),r.jsxs("p",{children:["For questions, feedback, or corrections, reach out at"," ",r.jsx("a",{href:`mailto:${eo}`,className:"text-blue-600 hover:underline",children:eo}),". If you spot an error in any article or calculator, please get in touch — accuracy matters and updates are made as Thai tax rules change."]})]})]})};function sr({label:e,value:t,sourceLabel:n,sourceUrl:a,taxYear:i,lastVerified:o,verified:s,verificationNotes:l}){return r.jsxs("div",{className:"bg-gray-50 border border-gray-200 rounded-lg p-4",children:[r.jsx("p",{className:"text-sm text-gray-600",children:e}),r.jsx("p",{className:"text-lg font-semibold text-gray-900",children:t}),r.jsxs("dl",{className:"mt-2 text-xs text-gray-500 space-y-0.5",children:[r.jsxs("div",{children:[r.jsx("dt",{className:"inline",children:"Source: "}),r.jsx("dd",{className:"inline",children:a?r.jsx("a",{href:a,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline",children:n}):n})]}),r.jsxs("div",{children:[r.jsx("dt",{className:"inline",children:"Tax year: "}),r.jsx("dd",{className:"inline",children:i})]}),r.jsxs("div",{children:[r.jsx("dt",{className:"inline",children:"Last verified: "}),r.jsx("dd",{className:"inline",children:o})]})]}),s===!1&&r.jsxs("p",{className:"mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1",children:[r.jsx("span",{className:"font-medium",children:"Unverified:"})," ",l??"Not confirmed against a primary government source."]})]})}const Wc="https://mythaitaxes.com",Yx="2026-09-07",Vx=()=>{const e="Calculator Methodology | My Thai Taxes",t="How the My Thai Taxes annual calculator computes Thai personal income tax: assessable income, deductions, allowances, progressive brackets, and a fully worked example.";return r.jsxs("div",{className:"max-w-3xl mx-auto px-4 py-12",children:[r.jsxs(Le,{children:[r.jsx("title",{children:e}),r.jsx("meta",{name:"description",content:t}),r.jsx("link",{rel:"canonical",href:`${Wc}/methodology/`}),r.jsx("meta",{property:"og:title",content:e}),r.jsx("meta",{property:"og:description",content:t}),r.jsx("meta",{property:"og:url",content:`${Wc}/methodology/`}),r.jsx("meta",{property:"og:type",content:"article"})]}),r.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Calculator Methodology"}),r.jsxs("p",{className:"text-sm text-gray-500 mb-8",children:["Last reviewed: ",Yx]}),r.jsxs("div",{className:"space-y-8 text-gray-700 leading-relaxed",children:[r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"What MyThaiTaxes calculates"}),r.jsxs("p",{children:["This page documents the calculation performed by the"," ",r.jsx(F,{to:"/annual-tax/",className:"text-blue-600 hover:underline",children:"Annual Tax Calculator"})," ","for a salaried employee (Revenue Code Section 40(1) income) — the base case the worked example below reproduces step by step. Freelancers, sole proprietors, and company directors go through the same underlying steps (assessable income → deductions → allowances → progressive tax → withholding credits) with extra rules layered on for multiple income types, expense methods, and foreign income — those are summarized where relevant but not fully worked here."]})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Assessable income"}),r.jsx("p",{children:"Assessable income is gross income before any deduction or allowance. Thai law splits it into eight categories (Section 40(1)–40(8)) by source — employment, liberal professions, contracting, rental, business/sales, dividends, and so on — because each category gets a different expense deduction method. The calculator's salaried flow uses Section 40(1): salary, wages, bonuses, and taxable benefits."})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Employment income"}),r.jsx("p",{children:"Employment income (40(1)) is the sum of annual gross salary plus any taxable cash benefits entered. It is the figure the standard deduction and progressive tax are ultimately calculated against."})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Expense deductions"}),r.jsxs("p",{children:["Employment income gets a standard expense deduction of ",r.jsx("strong",{children:"50% of gross income, capped at 100,000 THB"})," — so anyone earning above 200,000 THB/year hits the cap. This is a flat, no-receipts deduction; there is no option to itemize actual employment expenses instead."]}),r.jsx(sr,{label:"Standard expense deduction cap",value:"฿100,000",sourceLabel:"PwC Tax Summaries — Thailand Individual Deductions",sourceUrl:"https://taxsummaries.pwc.com/thailand/individual/deductions",taxYear:2026,lastVerified:"September 2026",verified:!1,verificationNotes:"Corroborated by a secondary source only; no primary Revenue Department page confirming this figure was found."})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Personal allowances"}),r.jsx("p",{children:"Allowances are subtracted from income (in addition to the expense deduction), based on family situation:"}),r.jsx(sr,{label:"Personal allowance",value:"฿60,000",sourceLabel:"PwC Tax Summaries — Thailand Individual Deductions (corroborated by Sherrings)",sourceUrl:"https://taxsummaries.pwc.com/thailand/individual/deductions",taxYear:2026,lastVerified:"September 2026",verified:!1,verificationNotes:"Two independent secondary sources agree, but no working primary Revenue Department page stating this figure directly was found — the amounts below follow the same sourcing pattern; see the full registry in TAX_RULES.md for each one."}),r.jsxs("table",{className:"w-full mt-3 text-sm border border-gray-200 rounded overflow-hidden",children:[r.jsx("thead",{className:"bg-gray-50",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left px-3 py-2 font-medium text-gray-700",children:"Allowance"}),r.jsx("th",{className:"text-right px-3 py-2 font-medium text-gray-700",children:"Amount"}),r.jsx("th",{className:"text-left px-3 py-2 font-medium text-gray-700",children:"Condition"})]})}),r.jsxs("tbody",{className:"divide-y divide-gray-200",children:[r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Personal allowance"}),r.jsx("td",{className:"text-right px-3 py-2",children:"60,000 THB"}),r.jsx("td",{className:"px-3 py-2",children:"Every taxpayer"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Spouse allowance"}),r.jsx("td",{className:"text-right px-3 py-2",children:"60,000 THB"}),r.jsx("td",{className:"px-3 py-2",children:"Married, spouse has no income"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Senior exemption (65+)"}),r.jsx("td",{className:"text-right px-3 py-2",children:"190,000 THB"}),r.jsx("td",{className:"px-3 py-2",children:"Taxpayer is 65 or older"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Child allowance (base)"}),r.jsx("td",{className:"text-right px-3 py-2",children:"30,000 THB/child"}),r.jsx("td",{className:"px-3 py-2",children:"Per qualifying child"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Child allowance (bonus)"}),r.jsx("td",{className:"text-right px-3 py-2",children:"+30,000 THB"}),r.jsx("td",{className:"px-3 py-2",children:"2nd+ child born 2018 or later"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Parent allowance"}),r.jsx("td",{className:"text-right px-3 py-2",children:"30,000 THB/parent"}),r.jsx("td",{className:"px-3 py-2",children:"Up to 4 parents (self-certified, see Limitations)"})]})]})]}),r.jsx("p",{className:"mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2",children:`The 65+ figure is applied by the calculator as a flat 190,000 THB exemption. Its statutory citation ("Section 42(17)") could not be independently confirmed during our sourcing review — treat it as an unverified detail, not the underlying 190,000 THB amount itself, which is corroborated by multiple tax-advisory sources. The "up to 4 parents" cap is not a number stated directly in any source we found; it is derived from the rule that only one sibling may claim each parent and a taxpayer can have at most 2 own + 2 spouse's parents.`})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Social Security"}),r.jsxs("p",{children:["Employee Social Security Fund (SSO) contributions are deductible, capped at"," ",r.jsx("strong",{children:"10,500 THB/year"})," — the ceiling that took effect from 1 January 2026 (Phase 1, through 2028). The prior ceiling was 9,000 THB/year for 2024–2025."]}),r.jsx(sr,{label:"Social security contribution deduction cap (2026 onward)",value:"฿10,500/year",sourceLabel:"BDO Thailand — New Social Security Fund's Wage Ceiling (corroborated by DLA Piper GENIE)",sourceUrl:"https://www.bdo.th/en-gb/insights/new-social-security-fund%E2%80%99s-wage-ceiling-effective-january-2026",taxYear:2026,lastVerified:"September 2026",verified:!0})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Other deductions"}),r.jsxs("table",{className:"w-full mt-1 text-sm border border-gray-200 rounded overflow-hidden",children:[r.jsx("thead",{className:"bg-gray-50",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left px-3 py-2 font-medium text-gray-700",children:"Deduction"}),r.jsx("th",{className:"text-right px-3 py-2 font-medium text-gray-700",children:"Cap"})]})}),r.jsxs("tbody",{className:"divide-y divide-gray-200",children:[r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Life insurance"}),r.jsx("td",{className:"text-right px-3 py-2",children:"100,000 THB"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Health insurance"}),r.jsx("td",{className:"text-right px-3 py-2",children:"25,000 THB (combined with life insurance, 100,000 THB total)"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Pension fund (RMF-style/annuity)"}),r.jsx("td",{className:"text-right px-3 py-2",children:"500,000 THB"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Provident fund"}),r.jsx("td",{className:"text-right px-3 py-2",children:"500,000 THB (15% of wage)"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"RMF"}),r.jsx("td",{className:"text-right px-3 py-2",children:"500,000 THB"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"SSF"}),r.jsx("td",{className:"text-right px-3 py-2",children:"200,000 THB"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Donations"}),r.jsx("td",{className:"text-right px-3 py-2",children:"10% of income after allowances/other deductions"})]})]})]}),r.jsx("p",{className:"mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2",children:"All retirement-fund deductions (pension, provident, RMF, SSF combined) are also subject to a single combined ceiling of 500,000 THB under Thai law. The calculator applies each individual cap above but does not yet enforce this combined ceiling — a known gap, not a hidden feature. The pension fund's individual 500,000 THB cap is also flagged as possibly overstated (a 200,000 THB / 15%-of-income sub-cap may apply instead); it has not been independently re-verified."})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Progressive tax"}),r.jsx("p",{children:"After all deductions and allowances, remaining taxable income is taxed under Thailand's progressive brackets (in effect since 2017):"}),r.jsxs("table",{className:"w-full mt-3 text-sm border border-gray-200 rounded overflow-hidden",children:[r.jsx("thead",{className:"bg-gray-50",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left px-3 py-2 font-medium text-gray-700",children:"Taxable income band"}),r.jsx("th",{className:"text-right px-3 py-2 font-medium text-gray-700",children:"Rate"})]})}),r.jsxs("tbody",{className:"divide-y divide-gray-200",children:[r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"0 – 150,000 THB"}),r.jsx("td",{className:"text-right px-3 py-2",children:"0%"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"150,000 – 300,000 THB"}),r.jsx("td",{className:"text-right px-3 py-2",children:"5%"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"300,000 – 500,000 THB"}),r.jsx("td",{className:"text-right px-3 py-2",children:"10%"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"500,000 – 750,000 THB"}),r.jsx("td",{className:"text-right px-3 py-2",children:"15%"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"750,000 – 1,000,000 THB"}),r.jsx("td",{className:"text-right px-3 py-2",children:"20%"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"1,000,000 – 2,000,000 THB"}),r.jsx("td",{className:"text-right px-3 py-2",children:"25%"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"2,000,000 – 5,000,000 THB"}),r.jsx("td",{className:"text-right px-3 py-2",children:"30%"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Above 5,000,000 THB"}),r.jsx("td",{className:"text-right px-3 py-2",children:"35%"})]})]})]}),r.jsx("p",{className:"mt-3",children:"Each band is taxed only on the portion of income that falls within it (a standard marginal-rate calculation) — income is not pushed entirely into the top bracket it reaches."})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Withholding"}),r.jsx("p",{children:'Tax already withheld by an employer during the year (shown on the year-end withholding certificate, "50 Tawi") is entered separately and is not part of the taxable-income calculation. It is only netted against the final tax owed at the end: if withholding exceeds tax owed, the difference is a refund; if it falls short, the difference is owed at filing.'})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Foreign income"}),r.jsx("p",{children:"Foreign-sourced income is out of scope for the salaried worked example below, but in brief: under the remittance rule effective from 1 January 2024 (Revenue Department Order Por. 161/2566, clarified by Por. 162/2566), foreign income remitted into Thailand in the same year it is earned or later is assessable; foreign income earned before 2024 remains under the older rule. Where a Double Tax Agreement (DTA) applies, a foreign tax credit is allowed up to the lesser of the foreign tax actually paid or the Thai tax due on that same income — it cannot exceed the Thai tax on that income. This flow is handled by the freelancer calculator, not the salaried one documented here."})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Tax residency"}),r.jsxs("p",{children:["A person present in Thailand for ",r.jsx("strong",{children:"180 days or more"})," (aggregate, in a calendar year) is a Thai tax resident under Revenue Code Section 41, which affects how foreign income is taxed. The salaried worked example below assumes residency status doesn't change the domestic calculation itself — the 180-day rule mainly matters for cross-border/foreign income cases."]}),r.jsx(sr,{label:"Thai tax residency threshold",value:"180 days",sourceLabel:"Thai Revenue Department (EN) — Revenue Code Section 41",sourceUrl:"https://www.rd.go.th/english/37749.html",taxYear:2026,lastVerified:"September 2026",verified:!0})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Worked example"}),r.jsxs("p",{children:["Single taxpayer, no children, no dependents, no additional insurance or fund contributions, annual gross salary ",r.jsx("strong",{children:"800,000 THB"}),", with ",r.jsx("strong",{children:"40,000 THB"})," already withheld by the employer during the year."]}),r.jsx("table",{className:"w-full mt-3 text-sm border border-gray-200 rounded overflow-hidden",children:r.jsxs("tbody",{className:"divide-y divide-gray-200",children:[r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Gross salary"}),r.jsx("td",{className:"text-right px-3 py-2 font-mono",children:"800,000"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"− Standard deduction (50%, capped at 100,000)"}),r.jsx("td",{className:"text-right px-3 py-2 font-mono",children:"− 100,000"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"− Personal allowance"}),r.jsx("td",{className:"text-right px-3 py-2 font-mono",children:"− 60,000"})]}),r.jsxs("tr",{className:"bg-gray-50 font-medium",children:[r.jsx("td",{className:"px-3 py-2",children:"= Taxable income"}),r.jsx("td",{className:"text-right px-3 py-2 font-mono",children:"640,000"})]})]})}),r.jsx("p",{className:"mt-4 mb-2",children:"Applying the progressive brackets to 640,000 THB, band by band:"}),r.jsx("table",{className:"w-full text-sm border border-gray-200 rounded overflow-hidden",children:r.jsxs("tbody",{className:"divide-y divide-gray-200",children:[r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"0 – 150,000 @ 0%"}),r.jsx("td",{className:"text-right px-3 py-2 font-mono",children:"0"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"150,000 – 300,000 @ 5% (on 150,000)"}),r.jsx("td",{className:"text-right px-3 py-2 font-mono",children:"7,500"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"300,000 – 500,000 @ 10% (on 200,000)"}),r.jsx("td",{className:"text-right px-3 py-2 font-mono",children:"20,000"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"500,000 – 640,000 @ 15% (on 140,000)"}),r.jsx("td",{className:"text-right px-3 py-2 font-mono",children:"21,000"})]}),r.jsxs("tr",{className:"bg-gray-50 font-medium",children:[r.jsx("td",{className:"px-3 py-2",children:"= Tax owed"}),r.jsx("td",{className:"text-right px-3 py-2 font-mono",children:"48,500"})]})]})}),r.jsx("table",{className:"w-full mt-4 text-sm border border-gray-200 rounded overflow-hidden",children:r.jsxs("tbody",{className:"divide-y divide-gray-200",children:[r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"Tax owed"}),r.jsx("td",{className:"text-right px-3 py-2 font-mono",children:"48,500"})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"px-3 py-2",children:"− Tax already withheld"}),r.jsx("td",{className:"text-right px-3 py-2 font-mono",children:"− 40,000"})]}),r.jsxs("tr",{className:"bg-gray-50 font-medium",children:[r.jsx("td",{className:"px-3 py-2",children:"= Additional tax owed at filing"}),r.jsx("td",{className:"text-right px-3 py-2 font-mono",children:"8,500"})]})]})}),r.jsxs("p",{className:"mt-3 text-sm text-gray-600",children:["Effective tax rate: 48,500 ÷ 800,000 = 6.06% of gross income. This example matches what"," ",r.jsx(F,{to:"/annual-tax/",className:"text-blue-600 hover:underline",children:"the calculator"})," ","returns for the same inputs — try it to confirm."]})]}),r.jsxs("section",{id:"sources",children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Sources"}),r.jsxs("p",{className:"mb-2",children:["Every constant on this page traces to a source recorded in this repository's"," ",r.jsx("a",{href:"https://github.com/search?q=repo:mythaitaxes+TAX_RULES.md",className:"text-blue-600 hover:underline",rel:"noopener noreferrer",children:"tax rules registry"})," ","(not published as a live URL — the primary sources it cites are):"]}),r.jsxs("ul",{className:"list-disc list-inside space-y-1",children:[r.jsxs("li",{children:["Thai Revenue Department — Guide to Personal Income Tax Return 2021 (PND90),"," ",r.jsx("a",{href:"https://www.rd.go.th/fileadmin/download/english_form/030265guide90.pdf",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline",children:"rd.go.th"})," ","— standard deduction, expense deduction rates by income category."]}),r.jsxs("li",{children:["Thai Revenue Department, English site —"," ",r.jsx("a",{href:"https://www.rd.go.th/english/",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline",children:"rd.go.th/english"})," ","— Revenue Code Section 41 (residency), Section 40 (income categories), insurance/provident fund caps."]}),r.jsx("li",{children:"Revenue Code Amendment Act No. 44 B.E. 2560 (2017) — current progressive tax bracket structure, via PwC and Sherrings Thailand secondary summaries."}),r.jsx("li",{children:"Social Security Office (SSO) contribution ceiling notices, via BDO Thailand and DLA Piper — 9,000 THB (2024–2025) and 10,500 THB (2026 onward, Cabinet-approved 2 Dec 2025, Royal Gazette 12 Dec 2025)."}),r.jsx("li",{children:"Revenue Department Orders Por. 161/2566 and Por. 162/2566 — foreign income remittance rule effective 2024-01-01, via Mahanakorn Partners and KPMG."}),r.jsx("li",{children:"Forvis Mazars and Sherrings Thailand tax guides — child/parent/spouse allowance figures and retirement fund caps (independent secondary sources, converged)."})]})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Limitations & disclaimer"}),r.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 text-sm text-amber-800 space-y-2",children:[r.jsx("p",{children:"This calculator and this page are for informational and estimation purposes only. They do not constitute professional tax advice and should not be relied upon as a substitute for a qualified Thai tax advisor or accountant."}),r.jsx("p",{children:"Specific known simplifications in the current calculation, disclosed rather than hidden:"}),r.jsxs("ul",{className:"list-disc list-inside space-y-1",children:[r.jsx("li",{children:"The combined 500,000 THB retirement-fund ceiling (pension + provident + RMF + SSF) is not enforced — only each fund's individual cap is applied."}),r.jsx("li",{children:"The rental-income (40(5)) flat deduction models only the 30% houses/vehicles case, not the lower rates that apply to land."}),r.jsx("li",{children:"Business/sales withholding (40(8)) is modeled as a flat 3%, though real rates vary by activity (as low as 1%, as high as 5%)."}),r.jsx("li",{children:"The senior exemption's exact statutory citation and the pension fund's individual cap are flagged above as unverified against a primary source."})]}),r.jsxs("p",{children:["Tax rules change. Always verify current figures with the"," ",r.jsx("a",{href:"https://www.rd.go.th/english/",target:"_blank",rel:"noopener noreferrer",className:"underline hover:text-amber-900 font-medium",children:"Thai Revenue Department"})," ","or a licensed professional before filing."]})]})]})]})]})},Oh=2026,is="September 2026",Kx=["Personal Income Tax","Tax Rates & Brackets","Deductions & Allowances","Social Security","Tax Residency","Foreign Income","Tax Filing","Withholding Tax","Tax Treaties","VAT & Business Registration"],Uh=[{id:"rd-section-41",organization:"Thai Revenue Department",title:"Revenue Code Section 41 — Tax Residency",url:"https://www.rd.go.th/english/37749.html",type:"official",topics:["Tax Residency"]},{id:"rd-dta-list",organization:"Thai Revenue Department",title:"List of Double Tax Agreements (DTAs)",url:"https://www.rd.go.th/english/766.html",type:"official",topics:["Foreign Income","Tax Treaties"]},{id:"rd-pnd90-guide",organization:"Thai Revenue Department",title:"Guide to Personal Income Tax Return 2021 (PND90)",url:"https://www.rd.go.th/fileadmin/download/english_form/030265guide90.pdf",type:"official",topics:["Personal Income Tax","Deductions & Allowances"]},{id:"rd-wht-table",organization:"Thai Revenue Department",title:"Withholding Tax Rate Table (Tor.Por. 4/2528)",url:"https://www.rd.go.th/3535.html",type:"official",topics:["Withholding Tax"]},{id:"rd-vat-threshold",organization:"Thai Revenue Department",title:"VAT Registration Threshold (Revenue Code §80–82)",url:"https://www.rd.go.th/english/37732.html",type:"official",topics:["VAT & Business Registration"]},{id:"rd-vat-deadline",organization:"Thai Revenue Department",title:"VAT Registration Deadline (Revenue Code §85/1)",url:"https://www.rd.go.th/english/37741.html",type:"official",topics:["VAT & Business Registration"]},{id:"boi-decree-743",organization:"Board of Investment (BOI)",title:"Royal Decree No. 743 B.E. 2565 — LTR Visa Tax Provisions",url:"https://ltr.boi.go.th/documents/Royal%20Decree%20issued%20under%20the%20Revenue%20Code%20No.743%20(EN).pdf",type:"official",topics:["Foreign Income"]},{id:"irs-us-thailand-treaty",organization:"Internal Revenue Service (IRS, USA)",title:"US–Thailand Double Taxation Convention (treaty text)",url:"https://www.irs.gov/pub/irs-trty/thailand.pdf",type:"official",topics:["Foreign Income","Tax Treaties"]},{id:"sherrings-rates",organization:"Sherrings",title:"Thailand Personal Income Tax Rates",url:"https://sherrings.com/personal-income-tax-rates-thailand.html",type:"secondary",topics:["Tax Rates & Brackets"]},{id:"sherrings-deductions",organization:"Sherrings",title:"Personal Tax Deductions & Allowances in Thailand",url:"https://sherrings.com/personal-tax-deductions-allowances-thailand.html",type:"secondary",topics:["Deductions & Allowances"]},{id:"sherrings-dividend",organization:"Sherrings",title:"Dividend Income & Personal Income Tax in Thailand",url:"https://sherrings.com/dividend-income-personal-income-tax-thailand.html",type:"secondary",topics:["Withholding Tax"]},{id:"pwc-deductions",organization:"PwC Tax Summaries",title:"Thailand — Individual Deductions",url:"https://taxsummaries.pwc.com/thailand/individual/deductions",type:"secondary",topics:["Personal Income Tax","Deductions & Allowances"]},{id:"forvis-personal-income-tax",organization:"Forvis Mazars",title:"Personal Income Tax in Thailand",url:"https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/tax/personal-income-tax",type:"secondary",topics:["Deductions & Allowances"]},{id:"forvis-second-child",organization:"Forvis Mazars",title:"Tax Deduction for a Second Child",url:"https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/tax/tax-deduction-for-a-second-child",type:"secondary",topics:["Deductions & Allowances"]},{id:"msna-parents-allowance",organization:"MSNA Group",title:"Parents' Allowance for Computation of Thai Personal Income Tax",url:"https://msnagroup.com/parents-allowance-for-computation-of-thai-personal-income-tax/",type:"secondary",topics:["Deductions & Allowances"]},{id:"bdo-sso-ceiling",organization:"BDO Thailand",title:"New Social Security Fund's Wage Ceiling",url:"https://www.bdo.th/en-gb/insights/new-social-security-fund%E2%80%99s-wage-ceiling-effective-january-2026",type:"secondary",topics:["Social Security"]},{id:"mahanakorn-remittance-rule",organization:"Mahanakorn Partners Group",title:"Overview of Orders Por. 161/2566 and Por. 162/2566",url:"https://mahanakornpartners.com/comprehensive-overview-of-order-no-por-161-2566-and-no-por-162-2566-on-personal-income-tax-for-foreign-sourced-income/",type:"secondary",topics:["Foreign Income"]},{id:"mbmg-pnd94",organization:"MBMG Group",title:"PND94 Half-Year Personal Income Tax Filing",url:"https://mbmg-group.com/pnd-94-half-year-personal-income-tax-who-must-file-by-30-september-2026-and-who-doesnt/",type:"secondary",topics:["Tax Filing"]},{id:"nishimura-efiling-extension",organization:"Nishimura & Asahi",title:"E-Filing Extension for Tax Returns in Thailand",url:"https://www.nishimura.com/en/knowledge/publications/further-eight-day-extension-for-e-filing-tax-returns-and-online-tax-payments-in-thailand",type:"secondary",topics:["Tax Filing"]},{id:"acclime-wht-guide",organization:"Acclime Thailand",title:"Withholding Tax Guide",url:"https://thailand.acclime.com/guides/withholding-tax/",type:"secondary",topics:["Withholding Tax"]},{id:"regfollower-vat-rate",organization:"RegFollower",title:"Thailand Extends Reduced VAT Rate",url:"https://regfollower.com/thailand-extends-reduced-vat-rate-until-september-2027/",type:"secondary",topics:["VAT & Business Registration"]}];function Hh(e){return Uh.filter(t=>t.topics.includes(e))}function qx(){return Kx.filter(e=>Hh(e).length>0)}const Gx=Uh.filter(e=>e.type==="official"),zc="https://mythaitaxes.com",$c="info@mythaitaxes.com",Yc=({source:e})=>r.jsxs("div",{className:"bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1.5",children:[r.jsxs("div",{className:"flex items-start justify-between gap-2",children:[r.jsx("p",{className:"font-semibold text-gray-900 text-sm",children:e.organization}),r.jsx("span",{className:`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full ${e.type==="official"?"bg-blue-50 text-blue-700":"bg-gray-100 text-gray-600"}`,children:e.type==="official"?"Official source":"Professional tax advisory"})]}),r.jsx("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline text-sm break-words",children:e.title}),r.jsxs("dl",{className:"mt-1 text-xs text-gray-500 space-y-0.5",children:[r.jsxs("div",{children:[r.jsx("dt",{className:"inline",children:"Tax year: "}),r.jsx("dd",{className:"inline",children:Oh})]}),r.jsxs("div",{children:[r.jsx("dt",{className:"inline",children:"Last reviewed: "}),r.jsx("dd",{className:"inline",children:is})]})]})]}),Xx=()=>{const e="Tax Sources & References | MyThaiTaxes",t="See the official and authoritative sources MyThaiTaxes uses to research Thai tax rules, calculations, deductions, and related tax information.";return r.jsxs("div",{className:"max-w-4xl mx-auto px-4 py-12",children:[r.jsxs(Le,{children:[r.jsx("title",{children:e}),r.jsx("meta",{name:"description",content:t}),r.jsx("link",{rel:"canonical",href:`${zc}/sources/`}),r.jsx("meta",{property:"og:title",content:e}),r.jsx("meta",{property:"og:description",content:t}),r.jsx("meta",{property:"og:url",content:`${zc}/sources/`}),r.jsx("meta",{property:"og:type",content:"website"})]}),r.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Tax Sources & References"}),r.jsxs("p",{className:"text-sm text-gray-500 mb-8",children:["Registry last reviewed: ",is]}),r.jsxs("div",{className:"space-y-10 text-gray-700 leading-relaxed",children:[r.jsxs("section",{children:[r.jsx("p",{children:"MyThaiTaxes is an independent website and calculator — we are not the Thai Revenue Department or any other government body. To research and check the figures behind our calculator and articles, we rely on authoritative sources: official Thai government publications where we can find them, and reputable professional tax-advisory firms where a primary government page is unavailable, outdated, or hard to parse."}),r.jsx("p",{className:"mt-3",children:"Thai tax rules change, and every taxpayer's situation is different. Nothing on this site is a substitute for checking an official source or consulting a licensed Thai tax advisor for your specific circumstances."})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"How we verify tax information"}),r.jsxs("ol",{className:"list-decimal list-inside space-y-1.5",children:[r.jsx("li",{children:"Identify the specific tax rule or requirement being calculated or explained."}),r.jsx("li",{children:"Consult authoritative sources — starting with official Thai government publications."}),r.jsx("li",{children:"Determine which tax year the rule applies to."}),r.jsx("li",{children:"Record the source, the applicable tax year, and any conditions or limitations that affect it."}),r.jsx("li",{children:"Incorporate the figure into the calculator or an article, with the source attached."}),r.jsx("li",{children:"Review the information again when Thai tax rules change."})]}),r.jsxs("p",{className:"mt-3 text-sm text-gray-600",children:["Every figure in our"," ",r.jsx(F,{to:"/methodology/",className:"text-blue-600 hover:underline",children:"calculator methodology"})," ","traces back to a source recorded this way. Where a rule could only be confirmed against a secondary source rather than a primary government document, we say so rather than presenting it as settled fact."]})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Primary sources"}),r.jsx("p",{className:"mb-4 text-sm text-gray-600",children:"The official government and treaty documents we lean on most for the calculator's core figures."}),r.jsx("div",{className:"grid sm:grid-cols-2 gap-3",children:Gx.map(n=>r.jsx(Yc,{source:n},n.id))})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Sources by topic"}),r.jsx("div",{className:"space-y-8",children:qx().map(n=>r.jsxs("div",{children:[r.jsx("h3",{className:"text-lg font-medium text-gray-900 mb-3",children:n}),n==="Tax Rates & Brackets"&&r.jsx("p",{className:"mb-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2",children:"The Revenue Department's own English-language rate page has not been updated since before the current bracket structure took effect in 2017 and still shows outdated figures — we do not use it as a source for current brackets. Until an updated primary page is available, we rely on the professional tax-advisory source below."}),r.jsx("div",{className:"grid sm:grid-cols-2 gap-3",children:Hh(n).map(a=>r.jsx(Yc,{source:a},a.id))})]},n))})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"A note on tax years"}),r.jsxs("p",{children:["Thai tax rules can and do change from year to year — allowances get adjusted, thresholds are revised, and new decrees are issued. Every source on this page is tagged with the tax year it was reviewed for (",Oh,") and the date of that review (",is,"). If you are relying on a figure for a different tax year, check the source directly rather than assuming it still applies."]})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Related resources"}),r.jsx("ul",{className:"space-y-2",children:[{to:"/annual-tax/",label:"Thailand Tax Calculator"},{to:"/methodology/",label:"How Thai Income Tax Is Calculated"},{to:"/articles/understanding-thai-tax-residency/",label:"Tax Residency Guide"},{to:"/articles/foreign-income-thailand-tax/",label:"Foreign Income Guide"},{to:"/about/",label:"About MyThaiTaxes"}].map(({to:n,label:a})=>r.jsxs("li",{className:"flex gap-2",children:[r.jsx("span",{className:"text-blue-500",children:"→"}),r.jsx(F,{to:n,className:"text-blue-600 hover:underline",children:a})]},n))})]}),r.jsxs("section",{children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Found something that looks outdated or incorrect?"}),r.jsxs("p",{children:["We'd rather hear about it than leave it wrong. If you spot a source that's outdated, a broken link, a figure that doesn't match an official document, or a calculator result that seems inconsistent with the sources above, please let us know at"," ",r.jsx("a",{href:`mailto:${$c}`,className:"text-blue-600 hover:underline",children:$c})," ","— or see the"," ",r.jsx(F,{to:"/about/",className:"text-blue-600 hover:underline",children:"About page"})," ","for more ways to get in touch."]})]})]})]})},Vc="https://mythaitaxes.com",os="info@mythaitaxes.com",lr=(e,t)=>`mailto:${os}?subject=${encodeURIComponent(e)}&body=${encodeURIComponent(t)}`,Qx=()=>{const e="Contact | My Thai Taxes",t="Report incorrect tax information, a calculator bug, or suggest a correction, or get in touch with My Thai Taxes.";return r.jsxs("div",{className:"max-w-3xl mx-auto px-4 py-12",children:[r.jsxs(Le,{children:[r.jsx("title",{children:e}),r.jsx("meta",{name:"description",content:t}),r.jsx("link",{rel:"canonical",href:`${Vc}/contact/`}),r.jsx("meta",{property:"og:title",content:e}),r.jsx("meta",{property:"og:description",content:t}),r.jsx("meta",{property:"og:url",content:`${Vc}/contact/`}),r.jsx("meta",{property:"og:type",content:"website"})]}),r.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-6",children:"Contact"}),r.jsxs("div",{className:"space-y-8 text-gray-700 leading-relaxed",children:[r.jsxs("p",{children:["Every issue below goes to the same inbox and is read by the person who maintains this site. Using the right link helps route your message correctly — see"," ",r.jsx(F,{to:"/about/",className:"text-blue-600 hover:underline",children:"About"})," for how figures are sourced and reviewed."]}),r.jsxs("div",{className:"border border-gray-200 rounded-lg p-5",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Found an incorrect calculation or outdated tax rule? Tell us."}),r.jsxs("p",{className:"text-sm text-gray-600 mb-3",children:["Every rate, threshold, and allowance used in the calculator is tracked in the"," ",r.jsx("a",{href:"https://github.com/holsson95/thai-tax-calculator/blob/main/TAX_RULES.md",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline",children:"Thai Tax Rules Registry"}),". If a figure looks wrong, out of date, or you have a primary source (Revenue Department document, official announcement) that says otherwise, let us know — include the tax year and, if possible, a link to the source."]}),r.jsx("a",{href:lr("[Tax Rule Correction] ",`Which figure or rule is incorrect?

What tax year does it apply to?

What should it be, and do you have a source (link or document)?
`),className:"inline-block text-sm font-medium text-blue-600 hover:underline",children:"Report incorrect tax information →"})]}),r.jsxs("div",{className:"border border-gray-200 rounded-lg p-5",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Found a calculator bug?"}),r.jsx("p",{className:"text-sm text-gray-600 mb-3",children:"If the annual tax calculator or monthly withholding estimator produces a result that looks wrong, crashes, or behaves unexpectedly, please report it — include which calculator you were using and the inputs that triggered the issue so it can be reproduced."}),r.jsx("a",{href:lr("[Bug Report] ",`Which calculator? (Annual Tax / Monthly Withholding)

What inputs did you enter?

What result did you expect, and what did you get instead?
`),className:"inline-block text-sm font-medium text-blue-600 hover:underline",children:"Report a calculator bug →"})]}),r.jsxs("div",{className:"border border-gray-200 rounded-lg p-5",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Suggest a correction"}),r.jsx("p",{className:"text-sm text-gray-600 mb-3",children:"Spotted an error, unclear explanation, or outdated statement in an article, the FAQ, or anywhere else on the site that isn't a calculator figure? Suggest a correction, including a link to the page."}),r.jsx("a",{href:lr("[Correction Suggestion] ",`Which page is this about? (link)

What should be corrected?
`),className:"inline-block text-sm font-medium text-blue-600 hover:underline",children:"Suggest a correction →"})]}),r.jsxs("div",{className:"border border-gray-200 rounded-lg p-5",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"General contact"}),r.jsx("p",{className:"text-sm text-gray-600 mb-3",children:"Questions, feedback, partnership inquiries, or anything else not covered above."}),r.jsx("a",{href:lr("[General Inquiry] ",""),className:"inline-block text-sm font-medium text-blue-600 hover:underline",children:"Send a general message →"})]}),r.jsxs("p",{className:"text-sm text-gray-500",children:["Prefer email directly?"," ",r.jsx("a",{href:`mailto:${os}`,className:"text-blue-600 hover:underline",children:os})]})]})]})},Jx=Qe.lazy(()=>kg(()=>import("./AnnualTaxWizard-Bcw6pjwJ.js"),[])),Zx={"@context":"https://schema.org","@type":"SoftwareApplication",name:"Thai Annual Tax Calculator",applicationCategory:"FinanceApplication",operatingSystem:"Web",url:"https://mythaitaxes.com/annual-tax/",description:"Free calculator that estimates annual Thai personal income tax liability for salaried employees, freelancers, sole proprietors, and company owners, including deductions and allowances.",offers:{"@type":"Offer",price:"0",priceCurrency:"USD"},featureList:["Supports salaried employees, freelancers, sole proprietors, and company owners","Covers standard allowances, deductions, and progressive tax brackets","Downloadable PDF summary of results"]},e0=()=>r.jsx(Eg,{children:r.jsxs(py,{children:[r.jsx(Te,{path:"/",element:r.jsx(_x,{})}),r.jsx(Te,{path:"/monthly-withholding",element:r.jsx(Nx,{})}),r.jsx(Te,{path:"/annual-tax",element:r.jsx(v.Suspense,{fallback:r.jsxs("div",{className:"bg-gray-100 min-h-screen py-8 px-4",children:[r.jsxs(Le,{children:[r.jsx("title",{children:"Annual Tax Calculator | Thai Tax Calculator"}),r.jsx("meta",{name:"description",content:"Calculate your annual Thai income tax liability. Free calculator for salaried employees, freelancers, sole proprietors, and company owners in Thailand."}),r.jsx("link",{rel:"canonical",href:"https://mythaitaxes.com/annual-tax/"}),r.jsx("script",{type:"application/ld+json",children:JSON.stringify(Zx)})]}),r.jsxs("div",{className:"bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-2xl w-full mx-auto",children:[r.jsx("div",{className:"flex justify-between items-center mb-6",children:r.jsx(F,{to:"/",className:"text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm",children:"Home"})}),r.jsx("h1",{className:"text-2xl font-bold text-gray-900 mb-3",children:"Annual Tax Calculator"}),r.jsx("p",{className:"text-gray-600 mb-4",children:"Estimate your annual Thai personal income tax liability for free. Walk through a guided form covering income, deductions, and allowances, and get a full breakdown of your tax owed — plus a downloadable PDF summary."}),r.jsxs("ul",{className:"text-gray-600 text-sm space-y-1.5 mb-6 list-disc list-inside",children:[r.jsx("li",{children:"Supports salaried employees, freelancers, sole proprietors, and company owners"}),r.jsx("li",{children:"Covers standard allowances, deductions, and progressive tax brackets"}),r.jsx("li",{children:"Free, no signup required, runs entirely in your browser"})]}),r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Thailand's progressive tax brackets"}),r.jsx("p",{className:"text-gray-600 text-sm mb-6",children:"Thailand taxes income progressively: the first 150,000 THB of taxable income is exempt, and income above that is taxed in increasing bands from 5% up to 35% for taxable income over 5,000,000 THB. Your effective tax rate is always lower than your top marginal rate, since only the income within each bracket is taxed at that bracket's rate."}),r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Frequently asked questions"}),r.jsxs("div",{className:"space-y-3 mb-6",children:[r.jsxs("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-800",children:"Who should use this calculator?"}),r.jsx("p",{className:"text-sm text-gray-600",children:"Anyone filing a Thai PND 90/91 return — salaried employees, freelancers, sole proprietors, and company owners — including expats with foreign income remitted to Thailand."})]}),r.jsxs("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-800",children:"Is my data saved anywhere?"}),r.jsx("p",{className:"text-sm text-gray-600",children:"No. Your answers are kept only in your browser's session storage and nothing is transmitted to a server."})]})]}),r.jsx("p",{className:"text-center text-gray-500",children:"Loading calculator…"})]})]}),children:r.jsx(Jx,{})})}),r.jsx(Te,{path:"/articles",element:r.jsx(Lx,{})}),r.jsx(Te,{path:"/articles/:slug",element:r.jsx(Mx,{})}),r.jsx(Te,{path:"/faq",element:r.jsx(Ox,{})}),r.jsx(Te,{path:"/search",element:r.jsx(Hx,{})}),r.jsx(Te,{path:"/privacy",element:r.jsx(Wx,{})}),r.jsx(Te,{path:"/about",element:r.jsx($x,{})}),r.jsx(Te,{path:"/methodology",element:r.jsx(Vx,{})}),r.jsx(Te,{path:"/sources",element:r.jsx(Xx,{})}),r.jsx(Te,{path:"/contact",element:r.jsx(Qx,{})})]})}),to=document.getElementById("root"),Kc=r.jsx(Qe.StrictMode,{children:r.jsx(Rh,{children:r.jsx(Hy,{children:r.jsx(e0,{})})})});to.hasChildNodes()?jr.hydrateRoot(to,Kc):jr.createRoot(to).render(Kc);export{p0 as A,u0 as B,s0 as C,nx as D,l0 as E,d0 as F,_g as G,i0 as H,Ih as I,yi as J,r0 as K,Le as L,g0 as M,Qe as R,D as T,a0 as a,n0 as b,ul as c,ca as d,v0 as e,y0 as f,Jr as g,ua as h,wx as i,r as j,x0 as k,Tx as l,ox as m,Fc as n,Ra as o,h0 as p,c0 as q,v as r,m0 as s,Gg as t,Xg as u,Ph as v,o0 as w,f0 as x,ex as y,Zg as z};
