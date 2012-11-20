/* ===================================================
 * animate.js v1.0
 * http://joshuapekera.github.com/animate/
 * ===================================================
 * Copyright 2012 - Joshua Pekera & PyroCMS
 * Works with jQuery 1.4.3 and above
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://pyrocms.com/legal/license
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */(function(e){var t=parseFloat(e.fn.jquery);t||(t=0);var n=["Webkit","Moz","O","Ms","Khtml",""],r=["borderRadius","boxShadow","userSelect","transformOrigin","transformStyle","transition","transitionDuration","transitionProperty","transitionTimingFunction","backgroundOrigin","backgroundSize","animation","filter","zoom","columns","perspective","perspectiveOrigin","appearance"];e.fn.cssSetQueue=function(t,n){v=this;var r=v.data("cssQueue")?v.data("cssQueue"):[],i=v.data("cssCall")?v.data("cssCall"):[],s=0,o={};e.each(n,function(e,t){o[e]=t});for(;;){if(!i[s]){i[s]=o.complete;break}s++}o.complete=s;r.push([t,o]);v.data({cssQueue:r,cssRunning:!0,cssCall:i})};e.fn.cssRunQueue=function(){v=this;var e=v.data("cssQueue")?v.data("cssQueue"):[];e[0]?v.cssEngine(e[0][0],e[0][1]):v.data("cssRunning",!1);e.shift();v.data("cssQueue",e)};e.cssMerge=function(t,n,r){e.each(n,function(n,i){e.each(r,function(e,r){t[r+n]=i})});return t};e.fn.cssAnimationData=function(e,t){var n=this,r=n.data("cssAnimations");r||(r={});r[e]||(r[e]=[]);r[e].push(t);n.data("cssAnimations",r);return r[e]};e.fn.cssAnimationRemove=function(){var t=this,n=t.data("cssAnimations"),r=t.data("identity");e.each(n,function(e,t){n[e]=t.splice(r+1,1)});t.data("cssAnimations",n)};e.css3D=function(t){e("body").data("cssPerspective",isFinite(t)?t:t?1e3:0).cssOriginal(e.cssMerge({},{TransformStyle:t?"preserve-3d":"flat"},n))};e.cssPropertySupporter=function(t){e.each(r,function(r,i){t[i]&&e.each(n,function(e,n){var r=i.substr(0,1);t[n+r[n?"toUpperCase":"toLowerCase"]()+i.substr(1)]=t[i]})});return t};e.cssAnimateSupport=function(){var t=!1;e.each(n,function(e,n){t=document.body.style[n+"AnimationName"]!==undefined?!0:t});return t};e.fn.cssEngine=function(t,r){function i(e){return String(e).replace(/([A-Z])/g,"-$1").toLowerCase()}var s=this,s=this;typeof r.complete=="number"&&s.data("cssCallIndex",r.complete);var o={linear:"linear",swing:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out"},u={},f=e("body").data("cssPerspective");t.transform&&e.each(n,function(e,n){var r=n+(n?"T":"t")+"ransform",o=s.cssOriginal(i(r)),a=t.transform;if(!o||o=="none")u[r]="scale(1)";t[r]=(f&&!/perspective/gi.test(a)?"perspective("+f+") ":"")+a});t=e.cssPropertySupporter(t);var l=[];e.each(t,function(e,t){l.push(i(e))});var h=!1,p=[],d=[];for(var v=0;v<l.length;v++){p.push(String(r.duration/1e3)+"s");var m=o[r.easing];d.push(m?m:r.easing)}p=s.cssAnimationData("dur",p.join(", ")).join(", ");d=s.cssAnimationData("eas",d.join(", ")).join(", ");var g=s.cssAnimationData("prop",l.join(", "));s.data("identity",g.length-1);g=g.join(", ");var y={TransitionDuration:p,TransitionProperty:g,TransitionTimingFunction:d},b={};b=e.cssMerge(b,y,n);var w=t;e.extend(b,t);b.display=="callbackHide"?h=!0:b.display&&(u.display=b.display);s.cssOriginal(u);setTimeout(function(){s.cssOriginal(b);var t=s.data("runningCSS");t=t?e.extend(t,w):w;s.data("runningCSS",t);setTimeout(function(){s.data("cssCallIndex","a");h&&s.cssOriginal("display","none");s.cssAnimationRemove();r.queue&&s.cssRunQueue();if(typeof r.complete=="number"){s.data("cssCall")[r.complete].call(s);s.data("cssCall")[r.complete]=0}else r.complete.call(s)},r.duration)},0)};e.str2Speed=function(e){return isNaN(e)?e=="slow"?1e3:e=="fast"?200:600:e};e.fn.cssAnimate=function(t,n,r,i){var s=this,o={duration:0,easing:"swing",complete:function(){},queue:!0},u={};u=typeof n=="object"?n:{duration:n};u[r?typeof r=="function"?"complete":"easing":0]=r;u[i?"complete":0]=i;u.duration=e.str2Speed(u.duration);e.extend(o,u);e.cssAnimateSupport()?s.each(function(n,r){r=e(r);if(o.queue){var i=!r.data("cssRunning");r.cssSetQueue(t,o);i&&r.cssRunQueue()}else r.cssEngine(t,o)}):s.animate(t,o);return s};e.cssPresetOptGen=function(e,t){var n={};n[e?typeof e=="function"?"complete":"easing":0]=e;n[t?"complete":0]=t;return n};e.fn.cssFadeTo=function(t,n,r,i){var s=this;opt=e.cssPresetOptGen(r,i);var o={opacity:n};opt.duration=t;e.cssAnimateSupport()?s.each(function(t,r){r=e(r);r.data("displayOriginal")!=r.cssOriginal("display")&&r.cssOriginal("display")!="none"?r.data("displayOriginal",r.cssOriginal("display")?r.cssOriginal("display"):"block"):r.data("displayOriginal","block");o.display=n?r.data("displayOriginal"):"callbackHide";r.cssAnimate(o,opt)}):s.fadeTo(t,opt);return s};e.fn.cssFadeOut=function(t,n,r){if(e.cssAnimateSupport()){this.cssOriginal("opacity")||this.cssOriginal("opacity",1);this.cssFadeTo(t,0,n,r)}else this.fadeOut(t,n,r);return this};e.fn.cssFadeIn=function(t,n,r){if(e.cssAnimateSupport()){this.cssOriginal("opacity")&&this.cssOriginal("opacity",0);this.cssFadeTo(t,1,n,r)}else this.fadeIn(t,n,r);return this};e.cssPx2Int=function(e){return e.split("p")[0]*1};e.fn.cssStop=function(){var t=this,r=0;t.data("cssAnimations",!1).each(function(i,s){s=e(s);var o={TransitionDuration:"0s"},u=s.data("runningCSS"),f={};u?e.each(u,function(t,n){n=isFinite(e.cssPx2Int(n))?e.cssPx2Int(n):n;var r=[0,1],i={color:["#000","#fff"],background:["#000","#fff"],"float":["none","left"],clear:["none","left"],border:["none","0px solid #fff"],position:["absolute","relative"],family:["Arial","Helvetica"],display:["none","block"],visibility:["hidden","visible"],transform:["translate(0,0)","scale(1)"]};e.each(i,function(e,n){(new RegExp(e,"gi")).test(t)&&(r=n)});f[t]=r[0]!=n?r[0]:r[1]}):u={};o=e.cssMerge(f,o,n);s.cssOriginal(o);setTimeout(function(){var n=e(t[r]);n.cssOriginal(u).data({runningCSS:{},cssAnimations:{},cssQueue:[],cssRunning:!1});typeof n.data("cssCallIndex")=="number"&&n.data("cssCall")[n.data("cssCallIndex")].call(n);n.data("cssCall",[]);r++},0)});return t};e.fn.cssDelay=function(e){return this.cssAnimate({},e)};e.fn.cssOriginal=e.fn.css;e.fn.css=function(r,i){var s=this,o={};if(typeof r=="string"){if(!i)return s.cssOriginal(r);o[e.camelCase(r)]=i}else o=r;o.transitionDuration||(o.transitionDuration="0s");t<1.8&&(o=e.cssPropertySupporter(o));var u=e("body").data("cssPerspective");o.transform&&e.each(t<1.8?n:[""],function(e,t){var n=t+(t?"T":"t")+"ransform",r=o.transform;o[n]=(u&&!/perspective/gi.test(r)?"perspective("+u+") ":"")+r});var f=s.cssOriginal("transition-duration");s.cssOriginal(o);setTimeout(function(){s.cssOriginal("transition-duration",f)},0);return s}})(jQuery);