/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.dialog.add("docProps",function(e){function t(t,i){var n=function(){a(this),i(this,this._.parentDialog)},a=function(e){e.removeListener("ok",n),e.removeListener("cancel",a)},o=function(e){e.on("ok",n),e.on("cancel",a)};e.execCommand(t),e._.storedDialogs.colordialog?o(e._.storedDialogs.colordialog):CKEDITOR.on("dialogDefinition",function(e){if(e.data.name==t){var i=e.data.definition;e.removeListener(),i.onLoad=CKEDITOR.tools.override(i.onLoad,function(e){return function(){o(this),i.onLoad=e,"function"==typeof e&&e.call(this)}})}})}function i(){var e=this.getDialog(),t=e.getContentElement("general",this.id+"Other");t&&("other"==this.getValue()?(t.getInputElement().removeAttribute("readOnly"),t.focus(),t.getElement().removeClass("cke_disabled")):(t.getInputElement().setAttribute("readOnly",!0),t.getElement().addClass("cke_disabled")))}function n(t,i,n){return function(a,o,r){var s=c,l="undefined"!=typeof n?n:this.getValue();if(!l&&t in s)s[t].remove();else if(l&&t in s)s[t].setAttribute("content",l);else if(l){var d=new CKEDITOR.dom.element("meta",e.document);d.setAttribute(i?"http-equiv":"name",t),d.setAttribute("content",l),r.append(d)}}}function a(e,t){return function(){var i=c,n=e in i?i[e].getAttribute("content")||"":"";return t?n:(this.setValue(n),null)}}function o(e){return function(t,i,n,a){a.removeAttribute("margin"+e);var o=this.getValue();""!==o?a.setStyle("margin-"+e,CKEDITOR.tools.cssLength(o)):a.removeStyle("margin-"+e)}}function r(e){for(var t={},i=e.getElementsByTag("meta"),n=i.count(),a=0;n>a;a++){var o=i.getItem(a);t[o.getAttribute(o.hasAttribute("http-equiv")?"http-equiv":"name").toLowerCase()]=o}return t}function s(e,t,i){e.removeStyle(t),e.getComputedStyle(t)!=i&&e.setStyle(t,i)}var l=e.lang.docprops,d=e.lang.common,c={},u=function(e,i,n){return{type:"hbox",padding:0,widths:["60%","40%"],children:[CKEDITOR.tools.extend({type:"text",id:e,label:l[i]},n||{},1),{type:"button",id:e+"Choose",label:l.chooseColor,className:"colorChooser",onClick:function(){var i=this;t("colordialog",function(t){var n=i.getDialog();n.getContentElement(n._.currentTabId,e).setValue(t.getContentElement("picker","selectedColor").getValue())})}}]}},h="javascript:void((function(){"+encodeURIComponent("document.open();"+(CKEDITOR.env.isCustomDomain()?"document.domain='"+document.domain+"';":"")+'document.write( \'<html style="background-color: #ffffff; height: 100%"><head></head><body style="width: 100%; height: 100%; margin: 0px">'+l.previewHtml+"</body></html>' );document.close();")+"})())";return{title:l.title,minHeight:330,minWidth:500,onShow:function(){var t=e.document,i=t.getElementsByTag("html").getItem(0),n=t.getHead(),a=t.getBody();c=r(t),this.setupContent(t,i,n,a)},onHide:function(){c={}},onOk:function(){var t=e.document,i=t.getElementsByTag("html").getItem(0),n=t.getHead(),a=t.getBody();this.commitContent(t,i,n,a)},contents:[{id:"general",label:d.generalTab,elements:[{type:"text",id:"title",label:l.docTitle,setup:function(e){this.setValue(e.getElementsByTag("title").getItem(0).data("cke-title"))},commit:function(e,t,i,n,a){a||e.getElementsByTag("title").getItem(0).data("cke-title",this.getValue())}},{type:"hbox",children:[{type:"select",id:"dir",label:d.langDir,style:"width: 100%",items:[[d.notSet,""],[d.langDirLtr,"ltr"],[d.langDirRtl,"rtl"]],setup:function(e,t,i,n){this.setValue(n.getDirection()||"")},commit:function(e,t,i,n){var a=this.getValue();a?n.setAttribute("dir",a):n.removeAttribute("dir"),n.removeStyle("direction")}},{type:"text",id:"langCode",label:d.langCode,setup:function(e,t){this.setValue(t.getAttribute("xml:lang")||t.getAttribute("lang")||"")},commit:function(e,t,i,n,a){if(!a){var o=this.getValue();o?t.setAttributes({"xml:lang":o,lang:o}):t.removeAttributes({"xml:lang":1,lang:1})}}}]},{type:"hbox",children:[{type:"select",id:"charset",label:l.charset,style:"width: 100%",items:[[d.notSet,""],[l.charsetASCII,"us-ascii"],[l.charsetCE,"iso-8859-2"],[l.charsetCT,"big5"],[l.charsetCR,"iso-8859-5"],[l.charsetGR,"iso-8859-7"],[l.charsetJP,"iso-2022-jp"],[l.charsetKR,"iso-2022-kr"],[l.charsetTR,"iso-8859-9"],[l.charsetUN,"utf-8"],[l.charsetWE,"iso-8859-1"],[l.other,"other"]],"default":"",onChange:function(){var e=this;e.getDialog().selectedCharset="other"!=e.getValue()?e.getValue():"",i.call(e)},setup:function(){var e=this;e.metaCharset="charset"in c;var t=a(e.metaCharset?"charset":"content-type",1,1),n=t.call(e);if(!e.metaCharset&&n.match(/charset=[^=]+$/)&&(n=n.substring(n.indexOf("=")+1)),n){if(e.setValue(n.toLowerCase()),!e.getValue()){e.setValue("other");var o=e.getDialog().getContentElement("general","charsetOther");o&&o.setValue(n)}e.getDialog().selectedCharset=n}i.call(e)},commit:function(e,t,i,a,o){var r=this;if(!o){var s=r.getValue(),l=r.getDialog().getContentElement("general","charsetOther");"other"==s&&(s=l?l.getValue():""),s&&!r.metaCharset&&(s=(c["content-type"]?c["content-type"].getAttribute("content").split(";")[0]:"text/html")+"; charset="+s);var d=n(r.metaCharset?"charset":"content-type",1,s);d.call(r,e,t,i)}}},{type:"text",id:"charsetOther",label:l.charsetOther,onChange:function(){this.getDialog().selectedCharset=this.getValue()}}]},{type:"hbox",children:[{type:"select",id:"docType",label:l.docType,style:"width: 100%",items:[[d.notSet,""],["XHTML 1.1",'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'],["XHTML 1.0 Transitional",'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'],["XHTML 1.0 Strict",'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'],["XHTML 1.0 Frameset",'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">'],["HTML 5","<!DOCTYPE html>"],["HTML 4.01 Transitional",'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">'],["HTML 4.01 Strict",'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">'],["HTML 4.01 Frameset",'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">'],["HTML 3.2",'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">'],["HTML 2.0",'<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">'],[l.other,"other"]],onChange:i,setup:function(){var t=this;if(e.docType&&(t.setValue(e.docType),!t.getValue())){t.setValue("other");var n=t.getDialog().getContentElement("general","docTypeOther");n&&n.setValue(e.docType)}i.call(t)},commit:function(t,i,n,a,o){if(!o){var r=this.getValue(),s=this.getDialog().getContentElement("general","docTypeOther");e.docType="other"==r?s?s.getValue():"":r}}},{type:"text",id:"docTypeOther",label:l.docTypeOther}]},{type:"checkbox",id:"xhtmlDec",label:l.xhtmlDec,setup:function(){this.setValue(!!e.xmlDeclaration)},commit:function(t,i,n,a,o){o||(this.getValue()?(e.xmlDeclaration='<?xml version="1.0" encoding="'+(this.getDialog().selectedCharset||"utf-8")+'"?>',i.setAttribute("xmlns","http://www.w3.org/1999/xhtml")):(e.xmlDeclaration="",i.removeAttribute("xmlns")))}}]},{id:"design",label:l.design,elements:[{type:"hbox",widths:["60%","40%"],children:[{type:"vbox",children:[u("txtColor","txtColor",{setup:function(e,t,i,n){this.setValue(n.getComputedStyle("color"))},commit:function(e,t,i,n,a){if(this.isChanged()||a){n.removeAttribute("text");var o=this.getValue();o?n.setStyle("color",o):n.removeStyle("color")}}}),u("bgColor","bgColor",{setup:function(e,t,i,n){var a=n.getComputedStyle("background-color")||"";this.setValue("transparent"==a?"":a)},commit:function(e,t,i,n,a){if(this.isChanged()||a){n.removeAttribute("bgcolor");var o=this.getValue();o?n.setStyle("background-color",o):s(n,"background-color","transparent")}}}),{type:"hbox",widths:["60%","40%"],padding:1,children:[{type:"text",id:"bgImage",label:l.bgImage,setup:function(e,t,i,n){var a=n.getComputedStyle("background-image")||"";a="none"==a?"":a.replace(/url\(\s*(["']?)\s*([^\)]*)\s*\1\s*\)/i,function(e,t,i){return i}),this.setValue(a)},commit:function(e,t,i,n){n.removeAttribute("background");var a=this.getValue();a?n.setStyle("background-image","url("+a+")"):s(n,"background-image","none")}},{type:"button",id:"bgImageChoose",label:d.browseServer,style:"display:inline-block;margin-top:10px;",hidden:!0,filebrowser:"design:bgImage"}]},{type:"checkbox",id:"bgFixed",label:l.bgFixed,setup:function(e,t,i,n){this.setValue("fixed"==n.getComputedStyle("background-attachment"))},commit:function(e,t,i,n){this.getValue()?n.setStyle("background-attachment","fixed"):s(n,"background-attachment","scroll")}}]},{type:"vbox",children:[{type:"html",id:"marginTitle",html:'<div style="text-align: center; margin: 0px auto; font-weight: bold">'+l.margin+"</div>"},{type:"text",id:"marginTop",label:l.marginTop,style:"width: 80px; text-align: center",align:"center",inputStyle:"text-align: center",setup:function(e,t,i,n){this.setValue(n.getStyle("margin-top")||n.getAttribute("margintop")||"")},commit:o("top")},{type:"hbox",children:[{type:"text",id:"marginLeft",label:l.marginLeft,style:"width: 80px; text-align: center",align:"center",inputStyle:"text-align: center",setup:function(e,t,i,n){this.setValue(n.getStyle("margin-left")||n.getAttribute("marginleft")||"")},commit:o("left")},{type:"text",id:"marginRight",label:l.marginRight,style:"width: 80px; text-align: center",align:"center",inputStyle:"text-align: center",setup:function(e,t,i,n){this.setValue(n.getStyle("margin-right")||n.getAttribute("marginright")||"")},commit:o("right")}]},{type:"text",id:"marginBottom",label:l.marginBottom,style:"width: 80px; text-align: center",align:"center",inputStyle:"text-align: center",setup:function(e,t,i,n){this.setValue(n.getStyle("margin-bottom")||n.getAttribute("marginbottom")||"")},commit:o("bottom")}]}]}]},{id:"meta",label:l.meta,elements:[{type:"textarea",id:"metaKeywords",label:l.metaKeywords,setup:a("keywords"),commit:n("keywords")},{type:"textarea",id:"metaDescription",label:l.metaDescription,setup:a("description"),commit:n("description")},{type:"text",id:"metaAuthor",label:l.metaAuthor,setup:a("author"),commit:n("author")},{type:"text",id:"metaCopyright",label:l.metaCopyright,setup:a("copyright"),commit:n("copyright")}]},{id:"preview",label:d.preview,elements:[{type:"html",id:"previewHtml",html:'<iframe src="'+h+'" style="width: 100%; height: 310px" hidefocus="true" frameborder="0" id="cke_docProps_preview_iframe"></iframe>',onLoad:function(){this.getDialog().on("selectPage",function(e){if("preview"==e.data.page){var t=this;setTimeout(function(){var e=CKEDITOR.document.getById("cke_docProps_preview_iframe").getFrameDocument(),i=e.getElementsByTag("html").getItem(0),n=e.getHead(),a=e.getBody();t.commitContent(e,i,n,a,1)},50)}}),CKEDITOR.document.getById("cke_docProps_preview_iframe").getAscendant("table").setStyle("height","100%")}}]}]}});