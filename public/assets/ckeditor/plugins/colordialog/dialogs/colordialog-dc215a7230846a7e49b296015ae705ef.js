/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.dialog.add("colordialog",function(e){function t(){g.getById(w).removeStyle("background-color"),d.getContentElement("picker","selectedColor").setValue(""),c&&c.removeAttribute("aria-selected"),c=null}function i(e){var t,i=e.data.getTarget();"td"==i.getName()&&(t=i.getChild(0).getHtml())&&(c=i,c.setAttribute("aria-selected",!0),d.getContentElement("picker","selectedColor").setValue(t))}function n(e){e=e.replace(/^#/,"");for(var t=0,i=[];2>=t;t++)i[t]=parseInt(e.substr(2*t,2),16);var n=.2126*i[0]+.7152*i[1]+.0722*i[2];return"#"+(n>=165?"000":"fff")}function a(e){!e.name&&(e=new CKEDITOR.event(e));var t,i=!/mouse/.test(e.name),a=e.data.getTarget();"td"==a.getName()&&(t=a.getChild(0).getHtml())&&(r(e),i?u=a:h=a,i&&(a.setStyle("border-color",n(t)),a.setStyle("border-style","dotted")),g.getById(y).setStyle("background-color",t),g.getById(k).setHtml(t))}function o(){var e=u.getChild(0).getHtml();u.setStyle("border-color",e),u.setStyle("border-style","solid"),g.getById(y).removeStyle("background-color"),g.getById(k).setHtml("&nbsp;"),u=null}function r(e){var t=!/mouse/.test(e.name),i=t&&u;if(i){var n=i.getChild(0).getHtml();i.setStyle("border-color",n),i.setStyle("border-style","solid")}u||h||(g.getById(y).removeStyle("background-color"),g.getById(k).setHtml("&nbsp;"))}function s(t){var n,a,o=t.data,r=o.getTarget(),s=o.getKeystroke(),l="rtl"==e.lang.dir;switch(s){case 38:(n=r.getParent().getPrevious())&&(a=n.getChild([r.getIndex()]),a.focus()),o.preventDefault();break;case 40:(n=r.getParent().getNext())&&(a=n.getChild([r.getIndex()]),a&&1==a.type&&a.focus()),o.preventDefault();break;case 32:case 13:i(t),o.preventDefault();break;case l?37:39:(a=r.getNext())?1==a.type&&(a.focus(),o.preventDefault(!0)):(n=r.getParent().getNext())&&(a=n.getChild([0]),a&&1==a.type&&(a.focus(),o.preventDefault(!0)));break;case l?39:37:(a=r.getPrevious())?(a.focus(),o.preventDefault(!0)):(n=r.getParent().getPrevious())&&(a=n.getLast(),a.focus(),o.preventDefault(!0));break;default:return}}function l(){function e(e,i){for(var a=e;e+3>a;a++){var o=new m(p.$.insertRow(-1));o.setAttribute("role","row");for(var r=i;i+3>r;r++)for(var s=0;6>s;s++)t(o.$,"#"+n[r]+n[s]+n[a])}}function t(e,t){var n=new m(e.insertCell(-1));n.setAttribute("class","ColorCell"),n.setAttribute("tabIndex",-1),n.setAttribute("role","gridcell"),n.on("keydown",s),n.on("click",i),n.on("focus",a),n.on("blur",r),n.setStyle("background-color",t),n.setStyle("border","1px solid "+t),n.setStyle("width","14px"),n.setStyle("height","14px");var o=b("color_table_cell");n.setAttribute("aria-labelledby",o),n.append(CKEDITOR.dom.element.createFromHtml('<span id="'+o+'" class="cke_voice_label">'+t+"</span>",CKEDITOR.document))}p=CKEDITOR.dom.element.createFromHtml('<table tabIndex="-1" aria-label="'+f.options+'" role="grid" style="border-collapse:separate;" cellspacing="0"><caption class="cke_voice_label">'+f.options+'</caption><tbody role="presentation"></tbody></table>'),p.on("mouseover",a),p.on("mouseout",r);var n=["00","33","66","99","cc","ff"];e(0,0),e(3,0),e(0,3),e(3,3);var o=new m(p.$.insertRow(-1));o.setAttribute("role","row");for(var l=0;6>l;l++)t(o.$,"#"+n[l]+n[l]+n[l]);for(var d=0;12>d;d++)t(o.$,"#000000")}var d,c,u,h,p,m=CKEDITOR.dom.element,g=CKEDITOR.document,f=e.lang.colordialog,v={type:"html",html:"&nbsp;"},b=function(e){return CKEDITOR.tools.getNextId()+"_"+e},y=b("hicolor"),k=b("hicolortext"),w=b("selhicolor");return l(),{title:f.title,minWidth:360,minHeight:220,onLoad:function(){d=this},onHide:function(){t(),o()},contents:[{id:"picker",label:f.title,accessKey:"I",elements:[{type:"hbox",padding:0,widths:["70%","10%","30%"],children:[{type:"html",html:"<div></div>",onLoad:function(){CKEDITOR.document.getById(this.domId).append(p)},focus:function(){(u||this.getElement().getElementsByTag("td").getItem(0)).focus()}},v,{type:"vbox",padding:0,widths:["70%","5%","25%"],children:[{type:"html",html:"<span>"+f.highlight+'</span>												<div id="'+y+'" style="border: 1px solid; height: 74px; width: 74px;"></div>												<div id="'+k+'">&nbsp;</div><span>'+f.selected+'</span>												<div id="'+w+'" style="border: 1px solid; height: 20px; width: 74px;"></div>'},{type:"text",label:f.selected,labelStyle:"display:none",id:"selectedColor",style:"width: 74px",onChange:function(){try{g.getById(w).setStyle("background-color",this.getValue())}catch(e){t()}}},v,{type:"button",id:"clear",style:"margin-top: 5px",label:f.clear,onClick:t}]}]}]}]}});