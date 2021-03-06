//
var noop = function(){}; // do nothing.
var pageLoadedTime = (new Date()).getTime();
var isMobile = false; //initiate as false
var freeUserQuotaInBytes = 100000000;
var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var crypto = window.crypto || window.msCrypto; // a fix for IE. ughhh microsoft. y u do dis.

var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor;
var isOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");

var isInWebAppiOS = (window.navigator.standalone === true);
var isInWebAppChrome = (window.matchMedia('(display-mode: standalone)').matches);
var isios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var isipados = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) && (navigator.platform === "MacIntel") && (navigator.maxTouchPoints > 1);
var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;

var monthsOfYearArray = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

var isGoogleChrome = false;
if (isIOSChrome) {
   // is Google Chrome on IOS
} else if (
  isChromium !== null && typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." && isOpera === false && isIEedge === false
) {
   // is Google Chrome
   isGoogleChrome = true;
} else {
   // not Google Chrome
   isGoogleChrome = false;
}

function inIframe () {
  try {
      return window.self !== window.top;
  } catch (e) {
      return true;
  }
}

var canUploadFolders = false;

var isMSFT = false;
if (detectIE() !== false) {
  isMSFT = true;
  alert("We've detected that you're using Internet Explorer or Edge for your web browser. \n\nCrypt.ee relies on multiple cutting edge web encryption technologies, and sadly Internet Explorer and Edge don't have some of these features. \n\nBefore you proceed any further, we recommend that you download either Google Chrome or Firefox as a web browser for your computer, otherwise we can't promise that Crypt.ee will work in your current browser.");
}

function isRetina() {
  return window.devicePixelRatio > 1;
}

function checkDOMRectBlocked() {
  var isItBlocked = true;

  try {
    Element.prototype.getClientRects();
  } catch(error) {
    isItBlocked = false;
  }

  return isItBlocked;
}

var isDOMRectBlocked = checkDOMRectBlocked();


function iosVersion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    try { 
      var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      var ver = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
      return ver;
    } catch (error) {
      return false;
    }
  }
}

// If iOS is greater than 12.2
// You can do a bunch of cool things with PWAs. 
// State will be remembered between sessions, but more importantly google login will work, and won't need all the bullshit redirect anymore. 
// So instead use the regular popup for iOS 12.2 and above.

isIOSPWAAdvanced = false;
if (iosVersion()) {

  if (iosVersion()[0] > 12) {
    isIOSPWAAdvanced = false;
  } else if (iosVersion()[0] === 12 && iosVersion()[1] >= 2) {
    isIOSPWAAdvanced = true;
  } else {
    isIOSPWAAdvanced = false;
  }
  
}

if (isipados) {
  isIOSPWAAdvanced = false;
}

////////////////////////////////////////////////////
///////////////////   HELPERS    ///////////////////
////////////////////////////////////////////////////

// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;


if (typeof Object.values === "undefined") { 
  Object.prototype.values = function(obj) {
    var res = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) { res.push(obj[i]); }
    }
    return res;
  };
}

//JQUERY AJAX PROGRESS
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){var n=e.ajax.bind(e);e.ajax=function(r,t){"object"==typeof r&&(t=r,r=void 0),t=t||{};var o;o=t.xhr?t.xhr():e.ajaxSettings.xhr(),t.xhr=function(){return o};var s=t.chunking||e.ajaxSettings.chunking;o.upload.onprogress=null;var i=n(r,t);return i.progress=function(e){var n=0;return o.addEventListener("progress",function(r){var t=[r],o="";3==this.readyState&&s&&(o=this.responseText.substr(n),n=this.responseText.length,t.push(o)),e.apply(this,t)},!1),this},i.uploadProgress=function(e){return o.upload&&o.upload.addEventListener("progress",function(n){e.apply(this,[n])},!1),this},i}});

// JOIN ARRAYS
Array.prototype.unique = function() {
  var a = this.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i] === a[j])
              a.splice(j--, 1);
      }
  }

  return a;
};

function findOne (haystack, needles) {
  return needles.some(function (v) {
      return haystack.indexOf(v) >= 0;
  });
}

// GET URL PARAMETERS

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

// CREATE URL SLUG FROM STRING

function slugify(string) {
  var a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;';
  var b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------';
  var p = new RegExp(a.split('').join('|'), 'g');

  return string.toString().toLowerCase()
    .replace("</strong>","")
    .replace("<strong>", "")
    .replace(/\//g, "-")
    .replace(/&nbsp;/g, "")
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, function(c) { b.charAt(a.indexOf(c))}) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

function parseSlug(string) {
  return string.replace(/-/g, " ").replace(".html", "");
}

function stringToB64URL(str) {
  return btoa(encodeURI(str)).replace("/", "_");
}

function b64URLToString(str) {
  return decodeURI(atob(str.replace("_", "/")));
}





// Format Bytes

function formatBytes (bytes) {
   if (bytes <= 0) { return '0 MB'; }
   var k = 1000,
       dm = 1,
       sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Time Since

function timeSince(epoch) {

    var seconds = Math.floor((new Date().getTime() - epoch) / 1000);
    var intervalType;

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }

    if (interval > 1) {
      intervalType += 's';
    }

    if (typeof epoch !== "number" || interval <= 0) {
      interval = 0;
      intervalType += 's';
    }
    
    return interval + ' ' + intervalType;
}

// FEATURE DETECTION


$("a").click(function (event) {
  var href = $(this).attr('href');
  if ($(this).hasClass("rememberKey")) {
    if (keyToRemember) {
      sessionStorage.setItem("key", JSON.stringify(keyToRemember));
    }
  }
  if (isInWebAppiOS || isInWebAppChrome) {
    if (!$(this).hasClass("openInSafari")) {
      if (typeof href !== typeof undefined && href !== false) {
        event.preventDefault();
        // this is to ensure back swipe gesture is disabled in PWAs (especially on iOS)
        // this makes sure there's no history = no back gesture.
        document.location.replace(href);
      }
    }
  }
});



try {
  if (DataTransferItem.prototype.webkitGetAsEntry) {
    canUploadFolders = true;
  } else {
    canUploadFolders = false;
  }
} catch (e) {
  canUploadFolders = false;
}

function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}









// Data URI to Blob

function dataURIToBlob(dataURI) {
  var spacelessDataURI = dataURI.replace(/\s/g, ''); // ios doesn't accept spaces and crashes browser. like wtf apple. What. THE. FUCCK!!!
  var binStr = decodeBase64(spacelessDataURI.split(',')[1]),
    len = binStr.length,
    arr = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }

  return new Blob([arr]);
}

// WEB SAFE BASE64

function sanitizeB64(base64) {
  return base64.replace(/\n/g, "").replace(/\s/g, '');
}

// DECODE BASE64 (INSTEAD OF ATOB)

var decodeBase64 = function(s) {
    var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
    var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for(i=0;i<64;i++){e[A.charAt(i)]=i;}
    for(x=0;x<L;x++){
        c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
        while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
    }
    return r;
};

function decodeBase64Unicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

// BASE64 TO UINT8 ARRAY

function base64ToUint8Array(base64) {
  var raw = decodeBase64(base64);
  var uint8Array = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) {
    uint8Array[i] = raw.charCodeAt(i);
  }
  return uint8Array;
}


// dataURI TO UINT8 ARRAY

function convertDataURIToBinary(dataURI) {
  var b64Marker = ';base64,';
  var base64Index = dataURI.indexOf(b64Marker) + b64Marker.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

// REMOVE OBJ FROM ARRAY BY ATTR

var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value ) ){
           arr.splice(i,1);
       }
    }
    return arr;
};

// TOGGLE FULLSCREEN

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    if (requestFullScreen) {
      requestFullScreen.call(docEl);
    }
  }
  else {
    if (cancelFullScreen) {
      cancelFullScreen.call(doc);
    }
  }
}

function throttleScroll (func, wait) {
  var context, args, timeout, throttling, more, result;
  return function() {
    context = this; args = arguments;
    var later = function() {
      timeout = null;
      if (more) func.apply(context, args);
    };
    if (!timeout) timeout = setTimeout(later, wait);
    if (throttling) {
      more = true;
    } else {
      result = func.apply(context, args);
    }
    throttling = true;
    return result;
  };
}






// OBJECT BYTESIZE CALCULATOR (SAY FOR EXAMPLE HOW MANY BYTES IS A STRING ETC. OR A DOCUMENT / OR A PHOTO B64 ETC.)
function bytesize( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object' && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}



$.fn.extend({
    disable: function(state) {
        return this.each(function() {
            this.disabled = state;
        });
    }
});



// Load external JS
var loadJS = function(url, implementationCode, location){
  //url is URL of external file, implementationCode is the code
  //to be called from the file, location is the location to
  //insert the <script> element

  var scriptTag = document.createElement('script');
  scriptTag.src = url;
  scriptTag.onload = implementationCode;
  scriptTag.onreadystatechange = implementationCode;
  location.appendChild(scriptTag);
};


function lazyLoadUncriticalAssets() {
  [].forEach.call(document.querySelectorAll('img[lazy-src]'), function(img) {
    img.setAttribute('src', img.getAttribute('lazy-src'));
    img.onload = function() {
      img.removeAttribute('lazy-src');
    };
  });
}

// POPUP

function popupLoadURL(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (newWindow) {
      if (window.focus) {
        newWindow.focus();
      }
    }
}


function dec2hex (dec) {
  return ('0' + dec.toString(16)).substr(-2);
}

var process = {};
process.nextTick = (function() {
	var img,
		queue = [],
		noArgs = [],
		pm = !!window.postMessage,
		slice = Array.prototype.slice;
	function tick() {
		var len = queue.length,
			q = queue.splice(0, len),
			i;
		for (i=0; i<len; i+=2) {
			q[i].apply(process, q[i+1]);
		}
	}
	window.addEventListener('message', tick);
	return function nextTick(callback) {
		var args = noArgs;
		if (arguments.length>1) {
			args = slice.call(arguments, 1);
		}
		queue.push(callback, args);
		if (queue.length===2) {
			if (pm && nextTick.enablePostMessage===true) {
				window.postMessage(' ', '*');
			}
			else {
				img = new Image();
				img.onerror = tick;
				img.src = '';
			}
		}
	};
}());




function newUUID (len) {
  var arr = new Uint8Array((len || 32) / 2);
  crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

function cancelDuplicates(fn, threshhold, scope) {
    if (typeof threshhold !== 'number') threshhold = 50;
    var last = 0;

    return function () {
        var now = +new Date();

        if (now >= last + threshhold) {
            last = now;
            fn.apply(scope || this, arguments);
        }
    };
}

// SCROLLED INTO VIEW
function isScrolledIntoView(el) {
  if (el !== undefined) {
    var rect;
    try {
      rect = el.getBoundingClientRect();
    } catch (error) {
      return false;
    }
    
    if (rect) {
      var elemTop = rect.top;
      var elemBottom = rect.bottom;
      
      // Only completely visible elements return true:
      // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
      
      // Partially visible elements return true:
      var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      return isVisible;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// DELETE ALL COOKIES

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
deleteAllCookies();

function mapNumbers(num, in_min, in_max, out_min, out_max) { return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min; }

////////////////////////////////////////////////////
///////////// WEB APP SERVICE WORKER ///////////////
////////////////////////////////////////////////////

var canUseWorkers = false;

if ('serviceWorker' in navigator) {
  canUseWorkers = true;
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../service-worker.js').then( function(serviceWorker) {
      breadcrumb('[Service Worker] Registered');
      setSentryTag("worker", "yes");
    }).catch(function(error) {
      if (location.origin.indexOf("crypt.ee") !== -1) {
        breadcrumb('[Service Worker] Errored');
        setSentryTag("worker", "errored");
        canUseWorkers = false;
      }
    });
  });
} else {
  canUseWorkers = false;
  setSentryTag("worker", "no");
  breadcrumb("[Service Worker] No Support");
}

function removeServiceWorker() {
  navigator.serviceWorker.getRegistration().then(function(registration) {
    registration.unregister();
    window.location.reload();
  }).catch(function(error) {
    console.log(error);
  });
}


////////////////////////////////////////////////////
/////////////////   CONSOLE GUARD   ////////////////
////////////////////////////////////////////////////

if (location.origin.indexOf("crypt.ee") !== -1) {
  var warningTitleCSS = 'color:red; font-size:60px; font-weight: 600; font-family:Montserrat; letter-spacing:5px;';
  var warningDescCSS = 'font-size: 18px; font-family:Montserrat;';
  console.log('%cSTOP!', warningTitleCSS);
  console.log("%cThis is a browser feature intended for developers. \n\nIf someone told you to copy and paste something here to enable a Cryptee feature or \"hack\" someone's account, it is a scam and will give them access to your Cryptee account.", warningDescCSS);
}





////////////////////////////////////////////////////
///////////////// MODAL MANAGEMENT /////////////////
////////////////////////////////////////////////////

function cancelModal () {
  if ($(".modal.is-active:not(#key-modal)")){
    $("html, body").removeClass("modal-is-active");
    $(".modal.is-active").find("input").blur();
    $(".modal.is-active").find(".theStatus").html("").hide();
    $(".modal.is-active").find("#ghost-folder-confirm-button").prop("disabled", true);
    $(".modal.is-active:not(#key-modal)").removeClass('is-active');
  }
}

function showModal (id) {
  $("html, body").addClass("modal-is-active");
  $("#"+id).addClass("is-active");
  $("#"+id).find("input").val("");
  $("#"+id).find("input").focus();
}

function hideModal (id) {
  $("html, body").removeClass("modal-is-active");
  $("#"+id).removeClass("is-active");
  $("#"+id).find("input").blur();
  $("body").removeClass("disable-clicks");
  $("#"+id).find(".button").removeClass("is-loading");
  $("#"+id).find(".theStatus").html("").hide();
  setTimeout(function(){
    $("html, body").removeClass("modal-is-active");
  },250);
}

function hideActiveModal() {
  $("html, body").removeClass("modal-is-active");
  $(".modal.is-active").find("input").blur();
  $(".modal.is-active").find(".button").removeClass("is-loading");
  $(".modal.is-active").removeClass("is-active");
  $("body").removeClass("disable-clicks");
}

function showFlyingModal(id) {
  $("html, body").addClass("modal-is-active");
  $("#"+id).addClass("is-active");
  $("#"+id).find("input").val("");
  setTimeout(function() {
    $("#"+id).addClass("is-shown");
  }, 100);
}

function hideActiveFlyingModal() {
  $(".flying-modal.is-active").removeClass("is-shown");
  setTimeout(function() {
    cancelModal();
  }, 510);
}

function progressModal (id) {
  $("#"+id).find(".button").addClass("is-loading");
  $("body").addClass("disable-clicks");
}

function unprogressModal (id) {
  $("#"+id).find(".button").removeClass("is-loading");
  $("body").removeClass("disable-clicks");
}

$(".modal-close").on('click', function(event) {
  cancelModal ();
});

$(".modal:not(.flying-modal)").on('click', ".modal-background", function(event) {
  cancelModal();
});

function hideNotification(deleteButton) {
  $(deleteButton).parents(".notification").fadeOut();
}


////////////////////////////////////////////////////
////////////// INACTIVITY TIMEOUT //////////////////
////////////////////////////////////////////////////

// CURRENT DEFAULT IS 30 MINUTES. MAKE IT USER SETTABLE.

function inactivityTimeout () {
  if (theKey !== "" && theKey !== undefined && theKey !== null) {
    sessionStorage.removeItem('key');
    window.location.reload();
  }
}









////////////////////////////////////////////////////
///////////////// DISPLAY VERSION //////////////////
////////////////////////////////////////////////////

// DON'T CHANGE THIS.
// ADDED A CODEKIT BUILD HOOK SHELL SCRIPT THAT REPLACES THIS WITH THE LATEST GITHUB HASH
// WHICH IN RETURN GETS DISPLAYED ON PAGES IF NEEDED. (LIKE ACCOUNT PAGE ETC. TO GET HELP)
// ALSO GETS PASSED TO SENTRY FOR MORE GRANULAR INFO. YAS.

var latestDeployVersion = "local-beta-ver";
function displayVersion() {
  $(".cryptee-latest-deploy-version").html("" + latestDeployVersion);
}

displayVersion();

var serverDeployVersion;
function checkLatestVersion() {
  // get latest deploy version from server. don't trust the current one you've in cache.
  var updateOrigin;
  if (location.origin.indexOf("crypt.ee") !== -1) {
    // this allows for beta to get updates from beta, and prod from prod.
    updateOrigin = location.origin; 
  
    var now = (new Date()).getTime(); // milliseconds
    $.ajax({
      url: updateOrigin + "/v.json?cachebuster=" + now,
      type: 'GET'
    }).done(function( dep ) {
      // got server's latestDeployVersion.
      // now compare to local.
      if (dep) {
        serverDeployVersion = dep.v;
        if (serverDeployVersion !== latestDeployVersion) {
          // update available
          showUpdateAvailable();
        }
      }
    });

  }
}

if (firebaseVersion) {
  setSentryTag("firebase-ver", firebaseVersion);
}

function showUpdateAvailable () {
  if (!darkMode) {
    $("body").append("<div id='update-available' onclick='reloadForNewVersion();'><img src='../assets/cryptee-logo-w.svg' alt='Cryptee Logo' id='update-logo'><b>New version available</b><br>Click here to reload and install</div>");
  } else {
    $("body").append("<div id='update-available' onclick='reloadForNewVersion();'><img src='../assets/cryptee-logo-b.svg' alt='Cryptee Logo' id='update-logo'><b>New version available</b><br>Click here to reload and install</div>");
  }
  setTimeout(function () {
    $("#update-available").addClass("shown");
  }, 250);
}

function reloadForNewVersion () {
  if (navigator.serviceWorker) {
    $("#update-available").addClass("is-loading");
    navigator.serviceWorker.getRegistration().then(function (reg) {
      if (reg) {
        reg.unregister().then(function () {
          caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
              return caches.delete(key);
            }));
          }).then(function () {
            updateCompleteLoadNewVersion();
          });
        });
      } else {
        updateCompleteLoadNewVersion();
      }
    });
  } else {
    // strangely sometimes serviceWorker passes as undefined 
    // in some versions of FF Linux. This is here as a failsafe
    // just in case if the update bubble covers the whole home screen.
    updateCompleteLoadNewVersion();
  }
}

function updateCompleteLoadNewVersion() {

  // clear local caches if you're not in Docs. 
  // user could be in the middle of a save etc. we don't want to break things by wiping catalog altogether.

  if (window.location.pathname !== "/docs" && localforage) {

    try { localStorage.removeItem("encryptedCatalog"); } catch (e) {}
    
    encryptedIndexedCatalog = localforage.createInstance({ name: "encryptedIndexedCatalog" });
    encryptedIndexedCatalog.removeItem('encat').then(function() {
      window.location.reload(true);
    }).catch(function(err) {
      window.location.reload(true);
    });

  } else {
    window.location.reload(true); 
  }

}

setSentryRelease(latestDeployVersion);

////////////////////////////////////////////////
///////////// CHECK CONNECTION /////////////////
////////////////////////////////////////////////

var retriedCheckConnection = 0;
function checkConnection (callback) {
  callback = callback || noop;
  var now = (new Date()).getTime(); // milliseconds
  // t = cachebuster to make sure we don't get a cached result
  var checkConnectionURL = "https://check.crypt.ee/1?t=" + now;
  $.ajax({
    url: checkConnectionURL,
    type: 'GET',
    dataType: 'json',
    success: function(data){
      retriedCheckConnection = 0;
      callback(true);
    },
    error: function(x) {
      if (x.status === 200) {
        retriedCheckConnection = 0;
        callback(true);
      } else {
        if (retriedCheckConnection < 2) {
          console.log("Connection offline, trying again in 1sec...");
          setTimeout(function () {
            retriedCheckConnection++;
            checkConnection (callback);
          }, 1000);
        } else {
          console.log("Connection offline, tried 2 times.");
          retriedCheckConnection = 0;
          callback(false);
        }
      }
    },
  });
}




/////////////////////////////////////////////////////////////////////////////////
//////////////////// PICK CLOUD FUNCTIONS API URL ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function setCloudFunctionsAPIBaseURL() {
  if (cloudfunctions._url) { 
    var apiOrigin = "https://crypt.ee";
    if (location.origin.indexOf("crypt.ee") !== -1) { apiOrigin = location.origin; }
    cloudfunctions._url = function (name) { return apiOrigin + "/api/" + name; };
  }
}


/////////////////////////////////////////////////////////////////////////////////
//////////////// CLOUD JSON PARSER //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function cloudParsedStorageURL(url) {
  if (url) {
    var preParsedURL = "https://atlas.crypt.ee/cjp?src=" + stringToB64URL(url);
    return preParsedURL;
  } else {
    return null;
  }
}

function parsedFileURL(id, token) {
  if (token && id && theUserID) {
    var path = theUserID + "%2F" + id + ".crypteefile";
    var preParsedURL = "https://atlas.crypt.ee/file?p=" + path + "&t=" + token;
    return preParsedURL;
  } else {
    return null;
  }
}

function parsedDocURL(filename, token) {
  if (token && filename && theUserID) {
    var path = theUserID + "%2F" + filename;
    var preParsedURL = "https://atlas.crypt.ee/doc?p=" + path + "&t=" + token;
    return preParsedURL;
  } else {
    return null;
  }
}

////////////////////////////////////////////////////
/////////////////// GET FILE META  /////////////////
////////////////////////////////////////////////////
// meant as a semi-drop-in replacement for getMetadata()
// returns gen, size, token

function getFileMeta(filename) {
  return new Promise(function (resolve, reject) {
    getFileMetaFromAtlasOrAPI(filename, "atlas").then(resolve).catch(function(e){
      getToken(function() { // if the auth token is outdated, i.e. if we're using an old one from sesssionStorage etc. this could cause atlas to throw an error. So force get a new token, THEN call regular api. This could help in some cases.
        getFileMetaFromAtlasOrAPI(filename, "api").then(resolve).catch(function(e){
          getFileMetaFromCstore(filename).then(resolve).catch(function(e){
            reject();
          });
        });
      });
    });
  });
}

function getFileMetaFromCstore(filename) {
  return new Promise(function (resolve, reject) {
    rootRef.child(filename).getMetadata().then(function(metadata) {
      if (metadata) { 
        if (metadata.generation) { 
          breadcrumb("Atlas & API were both unresponsive, got doc meta from Cstore");
          resolve(metadata); 
        } else {
          handleError("Error getting doc/file meta using Cstore", {"filename" : filename});
          reject();
        }
      } else {
        handleError("Error getting doc/file meta using Cstore", {"filename" : filename});
        reject();
      }
    }).catch(function(error) {
      error = error || {};
      error.filename = filename;
      handleError("Error getting doc/file meta using Atlas & Cstore", error);
      reject();
    });
  });
}

function getFileMetaFromAtlasOrAPI(filename, using) {
  using = using || "atlas";
  var url;
  if (using === "api") { url = "https://crypt.ee/api/getFileMeta"; }
  if (using === "atlas") { url = "https://atlas.crypt.ee/getFileMeta"; }

  return new Promise(function (resolve, reject) {
    if (theUser) {
      firebase.auth().currentUser.getIdToken().then(function(accessToken) {       
        $.ajax({
          url: url,
          method: "POST",
          dataType : "json",
          data: {"filename":filename},
          headers: { "Authorization": 'Bearer ' + accessToken },
          success: function (meta) {
            if (meta) { 
              if (meta.generation) { 
                resolve(meta); 
              } else {
                handleError("Error getting doc/file meta using " + using, {"filename" : filename});
                reject();
              }
            } else {
              handleError("Error getting doc/file meta using " + using, {"filename" : filename});
              reject();
            }
          },
          error:function (xhr, ajaxOptions, thrownError){
            thrownError = thrownError || {};
            thrownError.filename = filename;
            handleError("Error getting doc/file meta using " + using, thrownError);
            reject();
          }
        });
      }).catch(function(err){
        err = err || {};
        err.filename = filename;
        handleError("Can't get user ID Token to get doc/file meta", err);
        reject();
      });
    } else {
      handleError("Tried getting doc/file meta without user", {"filename" : filename});
      reject();
    }
  });
}

/////////////////////////////////////////////////////////////////////////////////
//////////////// OPENPGPJS SETUP ////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

var cryptoThreadsCount = 1;
var multithreadedCrypto = false;

if (navigator.hardwareConcurrency && canUseWorkers) {
  cryptoThreadsCount = navigator.hardwareConcurrency;
  setSentryTag("cryptoThreadsCount", cryptoThreadsCount);
}

try {
  openpgp.config.aead_protect = true; // activate fast AES-GCM mode (not yet OpenPGP standard)
  openpgp.config.aead_protect_version = 0;
  openpgp.initWorker({path: '../js/lib/openpgp.worker-4.5.3.min.js', n :cryptoThreadsCount }); // set the relative web worker path
} catch (e) {
  if (pgpCrossCheck) {
    breadcrumb("Problem initializing openpgp in main js, failed in try/catch.");
    handleError("Problem initializing openpgp in main js, failed in try/catch.", e, "warning");
  }
}

if (!openpgp) {
  if (pgpCrossCheck) {
    breadcrumb("Problem initializing openpgp in main js.");
    handleError("Problem initializing openpgp in main js, openpgp is undefined.", {}, "warning");
  }
} else {
  var openpgpversion = openpgp.config.versionstring.split("v")[1];
  setSentryTag("openpgp-ver", openpgpversion);

  if (cryptoThreadsCount >= 2 && canUseWorkers) {
    breadcrumb("[OpenPGPjs] Using " + cryptoThreadsCount + " worker threads");
    breadcrumb("[OpenPGPjs] Bypassing native WebCrypto for better multi-threaded performance");
    openpgp.config.use_native = false;
    multithreadedCrypto = true;
  } else {
    breadcrumb("[OpenPGPjs] Using " + cryptoThreadsCount + " worker threads, with native WebCrypto");
  }

}





/////////////////////////////////////////
// ENCRYPT PLAINTEXT USING KEYS
//                               
// A DROP-IN, SHORTHAND REPLACEMENT FOR    
// OPENPGPJS's .encrypt
// WORKS STARTING WITH OPENPGPJS V4.4.1
//////////////////////////////////////////

function encrypt(plaintext, keys) {
  return new Promise(function (resolve, reject) {

    var options = {
      message: openpgp.message.fromText(plaintext),
      passwords: keys,
      armor: true
    };

    openpgp.encrypt(options).then(function (ciphertext) {
      resolve(ciphertext);
    }).catch(function (error) {
      reject(error);
    });

  });
}

/////////////////////////////////////////
// DECRYPT CIPHERTEXT USING KEYS
//                               
// A DROP-IN, SHORTHAND REPLACEMENT FOR    
// OPENPGPJS's .decrypt
// WORKS STARTING WITH OPENPGPJS V4.4.1
//////////////////////////////////////////

function decrypt(ciphertext, keys) {
  return new Promise(function (resolve, reject) {
    openpgp.message.readArmored(ciphertext).then(function (msg) {

      var options = {
        message: msg,
        passwords: keys,
        format: 'utf8'
      };

      openpgp.decrypt(options).then(function (plaintext) {
        resolve(plaintext);
      }).catch(function (error) {
        reject(error);
      });

    });
  });
}

/////////////////////////////////////////////////////////////
// ENCRYPT Uint8Array USING KEYS
//
// TAKES IN AN ARRAYBUFFER FROM base64ToUint8Array
// RETURNS A Uint8Array
/////////////////////////////////////////////////////////////

function encryptUint8Array(plaintext, keys) {
  return new Promise(function (resolve, reject) {
    var options = {
      message: openpgp.message.fromBinary(plaintext),
      passwords: keys,
      armor: false
    };

    openpgp.encrypt(options).then(function(ciphertext) {
      resolve(ciphertext.message.packets.write()); //ciphertext Uint8Array
    }).catch(function (error) {
      reject(error);
    });
  });
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////










function hashString (str, strength) {
  return new Promise(function (resolve, reject) {
    var uinta = openpgp.util.str_to_Uint8Array(str);
    var algo = openpgp.crypto.hash.sha256(uinta);
    strength = strength || "256";
    if (strength === "512") { 
      algo = openpgp.crypto.hash.sha512(uinta); 
    }
    algo.then(function (hashedUintA) {
      var hashedStr = openpgp.util.Uint8Array_to_str(hashedUintA);
      var hashedHex = openpgp.util.str_to_hex(hashedStr);
      var result = hashedHex.split(" ").join("").split("\n").join("");
      resolve(result);
    }).catch(function (error) {
      reject(error);
    });
  });
}


function generateStrongKey() {
  var arr = new Uint8Array(1024);
  crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

function checkLegacyKey (dataRef, typedKey, hashedKey, encryptedStrongKey, callback) {
  decrypt(encryptedStrongKey, [typedKey]).then(function(plaintext) {
    // WE HAVE A LEGACY KEY. ( which was just the former checkKeyString )
    convertLegacyKey (dataRef, typedKey, hashedKey, callback);
  }).catch(function(error) {
    // IT IS THE WRONG KEY IN GENERAL.
    wrongKey(error);
  });
}

function convertLegacyKey (dataRef, typedKey, hashedKey, callback) {

  encrypt(typedKey, [hashedKey]).then(function(ciphertext) {
      var encryptedStrongKey = JSON.stringify(ciphertext);
      dataRef.update({ keycheck : encryptedStrongKey }, function(error){
        if (error) {
          console.log("couldn't convert legacy key");
          callback({data: typedKey});
        } else {
          console.log("converted legacy key");
          callback({data: typedKey});
        }
      });
  });
}

function newEncryptedKeycheck(hashedKey, callback) {
  var now = ((new Date()).getTime()).toString();
  encrypt(now, [hashedKey]).then(function(ciphertext) {
    var encryptedKeycheck = JSON.stringify(ciphertext);
    callback(encryptedKeycheck);
  });
}





///////////////////////////////////////////
//////////// LAYOUT MODIFICATIONS /////////
///////////////////////////////////////////

if (isios) {
  if (isSafari) {
    $(".is-in-safari").show();
    $(".is-not-in-safari").hide();
  } else {
    $(".is-not-in-safari").show();
    $(".is-in-safari").hide();
  }
} else {
  $(".is-not-in-safari").show();
  $(".is-in-safari").hide();
}


if (isAndroid) {
  if (isGoogleChrome) {
    $(".is-in-chrome").show();
    $(".is-not-in-chrome").hide();
  } else {
    $(".is-not-in-chrome").show();
    $(".is-in-chrome").hide();
  }
} else {
  $(".is-not-in-chrome").show();
  $(".is-in-chrome").hide();
}

if (isAndroid && isFirefox) {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1456557
  // seriously. yeah. seriously firefox. WTF. 
  $('input[type="file"]').removeAttr("multiple");
  breadcrumb('Detected Firefox on Android. Multiple file selections for input elements will be disabled.');
  setSentryTag("input-multiple-upload", "disabled");
} else {
  setSentryTag("input-multiple-upload", "enabled");
}

var jQueryVersion = $.fn.jquery;
setSentryTag("jquery-version", jQueryVersion);

///////////////////////////////////////////
////// SEARCH RELATED HELPER FUNCTIONS ////
///////////////////////////////////////////

function underlineSearchResult(indices,string) {
  var pair = indices.shift();
  var formattedString = string;
  var resultname = [];
  // Build the formatted string
  for (var j = 0; j < string.length; j++) {
    var char = string.charAt(j);
    if (pair && j == pair[0]) {
      resultname.push('<u>');
    }
    resultname.push(char);
    if (pair && j == pair[1]) {
      resultname.push('</u>');
      pair = indices.shift();
    }
  }
  formattedString = resultname.join('');
  return formattedString;
}

///////////////////////////////////////////
//////       FEATURE BREADCRUMBS       ////
///////////////////////////////////////////

if (window.MediaSource) {
  setSentryTag("media-source-api", "supported");
} else {
  setSentryTag("media-source-api", "unsupported");
}

if (isipados) {
  setSentryTag("ipados", "true");
}