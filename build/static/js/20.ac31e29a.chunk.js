(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{173:function(e,a,t){"use strict";t.r(a);var n=t(19),r=t(10),i=t(11),c=t(13),o=t(12),l=t(14),s=t(0),u=t.n(s),d=t(80),m=t(73),h=t(64),f=t(119),p=t(86),E=t(24),b=t(56),g=function(e){function a(){var e,t;Object(r.a)(this,a);for(var i=arguments.length,l=new Array(i),s=0;s<i;s++)l[s]=arguments[s];return(t=Object(c.a)(this,(e=Object(o.a)(a)).call.apply(e,[this].concat(l)))).state={isBasic:!1,isMultiTarget:[],accordionKey:1},t.targetHandler=function(e){t.state.isMultiTarget.some(function(a){return a===e})?t.setState(function(a){return{isMultiTarget:a.isMultiTarget.filter(function(a){return a!==e})}}):t.setState(function(a){return{isMultiTarget:[].concat(Object(n.a)(a.isMultiTarget),[e])}})},t.multiTargetHandler=function(){["target1","target2"].map(function(e){return t.targetHandler(e),!1})},t}return Object(l.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){var e=this,a=this.state,t=a.isBasic,n=a.isMultiTarget,r=a.accordionKey;return u.a.createElement(E.a,null,u.a.createElement(d.a,null,u.a.createElement(m.a,{sm:12},u.a.createElement("h5",null,"Basic Collapse"),u.a.createElement("hr",null),u.a.createElement(h.a,null,u.a.createElement(h.a.Header,null,u.a.createElement(f.a,{href:b.a.BLANK_LINK,onClick:function(){return e.setState({isBasic:!t})},"aria-controls":"basic-collapse","aria-expanded":t},"Collapse Link"),u.a.createElement(f.a,{onClick:function(){return e.setState({isBasic:!t})}},"Collapse Button")),u.a.createElement(p.a,{in:this.state.isBasic},u.a.createElement("div",{id:"basic-collapse"},u.a.createElement(h.a.Body,null,u.a.createElement(h.a.Text,null,"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.")))))),u.a.createElement(m.a,{sm:12},u.a.createElement("h5",null,"Multiple Targets"),u.a.createElement("hr",null),u.a.createElement(f.a,{onClick:function(){return e.targetHandler("target1")},"aria-controls":"target1","aria-expanded":n.some(function(e){return"target1"===e})},"Toggle first element"),u.a.createElement(f.a,{onClick:function(){return e.targetHandler("target2")},"aria-controls":"target2","aria-expanded":n.some(function(e){return"target2"===e})},"Toggle second element"),u.a.createElement(f.a,{onClick:this.multiTargetHandler},"Toggle both elements"),u.a.createElement(d.a,null,u.a.createElement(m.a,null,u.a.createElement(h.a,{className:"mt-2"},u.a.createElement(p.a,{in:n.some(function(e){return"target1"===e})},u.a.createElement("div",{id:"target1"},u.a.createElement(h.a.Header,{as:"h5"},"First Element"),u.a.createElement(h.a.Body,null,u.a.createElement(h.a.Text,null,"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.")))))),u.a.createElement(m.a,null,u.a.createElement(h.a,{className:"mt-2"},u.a.createElement(p.a,{in:n.some(function(e){return"target2"===e})},u.a.createElement("div",{id:"target2"},u.a.createElement(h.a.Header,{as:"h5"},"Second Element"),u.a.createElement(h.a.Body,null,u.a.createElement(h.a.Text,null,"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.")))))))),u.a.createElement(m.a,{sm:12,className:"accordion"},u.a.createElement("h5",null,"Accordion Example"),u.a.createElement("hr",null),u.a.createElement(h.a,{className:"mt-2"},u.a.createElement(h.a.Header,null,u.a.createElement(h.a.Title,{as:"h5"},u.a.createElement("a",{href:b.a.BLANK_LINK,onClick:function(){return e.setState({accordionKey:1!==r?1:0})},"aria-controls":"accordion1","aria-expanded":1===r},"Collapsible Group Item #1"))),u.a.createElement(p.a,{in:1===this.state.accordionKey},u.a.createElement("div",{id:"accordion1"},u.a.createElement(h.a.Body,null,u.a.createElement(h.a.Text,null,"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."))))),u.a.createElement(h.a,{className:"mt-2"},u.a.createElement(h.a.Header,null,u.a.createElement(h.a.Title,{as:"h5"},u.a.createElement("a",{href:b.a.BLANK_LINK,onClick:function(){return e.setState({accordionKey:2!==r?2:0})},"aria-controls":"accordion2","aria-expanded":2===r},"Collapsible Group Item #2"))),u.a.createElement(p.a,{in:2===this.state.accordionKey},u.a.createElement("div",{id:"accordion2"},u.a.createElement(h.a.Body,null,u.a.createElement(h.a.Text,null,"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."))))),u.a.createElement(h.a,{className:"mt-2"},u.a.createElement(h.a.Header,null,u.a.createElement(h.a.Title,{as:"h5"},u.a.createElement("a",{href:b.a.BLANK_LINK,onClick:function(){return e.setState({accordionKey:3!==r?3:0})},"aria-controls":"accordion3","aria-expanded":3===r},"Collapsible Group Item #3"))),u.a.createElement(p.a,{in:3===this.state.accordionKey},u.a.createElement("div",{id:"accordion3"},u.a.createElement(h.a.Body,null,u.a.createElement(h.a.Text,null,"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."))))))))}}]),a}(s.Component);a.default=g},64:function(e,a,t){"use strict";var n=t(7),r=t(8),i=t(9),c=t(54),o=t.n(c),l=t(0),s=t.n(l),u=t(55),d=t(59),m=function(e){return s.a.forwardRef(function(a,t){return s.a.createElement("div",Object(n.a)({},a,{ref:t,className:o()(a.className,e)}))})},h=t(58),f=function(e){function a(){return e.apply(this,arguments)||this}return Object(i.a)(a,e),a.prototype.render=function(){var e=this.props,a=e.bsPrefix,t=e.className,i=e.variant,c=e.as,l=Object(r.a)(e,["bsPrefix","className","variant","as"]),u=i?a+"-"+i:a;return s.a.createElement(c,Object(n.a)({className:o()(u,t)},l))},a}(s.a.Component);f.defaultProps={as:"img",variant:null};var p=Object(u.a)(f,"card-img"),E=Object(d.a)("card-body"),b=function(e){function a(){for(var a,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return(a=e.call.apply(e,[this].concat(n))||this).state={},a}return Object(i.a)(a,e),a.getDerivedStateFromProps=function(e){return{cardContext:{cardHeaderBsPrefix:e.bsPrefix+"-header"}}},a.prototype.render=function(){var e=this.props,a=e.bsPrefix,t=e.className,i=e.as,c=e.bg,l=e.text,u=e.border,d=e.body,m=e.children,f=Object(r.a)(e,["bsPrefix","className","as","bg","text","border","body","children"]),p=o()(t,a,c&&"bg-"+c,l&&"text-"+l,u&&"border-"+u);return s.a.createElement(h.a.Provider,{value:this.state.cardContext},s.a.createElement(i,Object(n.a)({className:p},f),d?s.a.createElement(E,null,m):m))},a}(s.a.Component);b.defaultProps={as:"div",body:!1};var g=m("h5"),y=m("h6"),v=Object(u.a)(b,"card");v.Img=p,v.Title=Object(d.a)("card-title",{Component:g}),v.Subtitle=Object(d.a)("card-subtitle",{Component:y}),v.Body=E,v.Link=Object(d.a)("card-link",{Component:"a"}),v.Text=Object(d.a)("card-text",{Component:"p"}),v.Header=Object(d.a)("card-header"),v.Footer=Object(d.a)("card-footer"),v.ImgOverlay=Object(d.a)("card-img-overlay");a.a=v},86:function(e,a,t){"use strict";var n,r=t(7),i=t(8),c=t(9),o=t(54),l=t.n(o),s=t(75),u=t.n(s),d=t(0),m=t.n(d),h=t(68),f=t.n(h),p=t(67),E=t.n(p),b=t(69),g=t(66),y={height:["marginTop","marginBottom"],width:["marginLeft","marginRight"]};var v=((n={})[p.EXITED]="collapse",n[p.EXITING]="collapsing",n[p.ENTERING]="collapsing",n[p.ENTERED]="collapse show",n),x={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1,dimension:"height",getDimensionValue:function(e,a){var t=a["offset"+e[0].toUpperCase()+e.slice(1)],n=y[e];return t+parseInt(u()(a,n[0]),10)+parseInt(u()(a,n[1]),10)}},N=function(e){function a(){for(var a,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return(a=e.call.apply(e,[this].concat(n))||this).handleEnter=function(e){e.style[a.getDimension()]="0"},a.handleEntering=function(e){var t=a.getDimension();e.style[t]=a._getScrollDimensionValue(e,t)},a.handleEntered=function(e){e.style[a.getDimension()]=null},a.handleExit=function(e){var t=a.getDimension();e.style[t]=a.props.getDimensionValue(t,e)+"px",Object(b.a)(e)},a.handleExiting=function(e){e.style[a.getDimension()]="0"},a}Object(c.a)(a,e);var t=a.prototype;return t.getDimension=function(){return"function"===typeof this.props.dimension?this.props.dimension():this.props.dimension},t._getScrollDimensionValue=function(e,a){return e["scroll"+a[0].toUpperCase()+a.slice(1)]+"px"},t.render=function(){var e=this,a=this.props,t=a.onEnter,n=a.onEntering,c=a.onEntered,o=a.onExit,s=a.onExiting,u=a.className,d=a.children,h=Object(i.a)(a,["onEnter","onEntering","onEntered","onExit","onExiting","className","children"]);delete h.dimension,delete h.getDimensionValue;var p=Object(g.a)(this.handleEnter,t),b=Object(g.a)(this.handleEntering,n),y=Object(g.a)(this.handleEntered,c),x=Object(g.a)(this.handleExit,o),N=Object(g.a)(this.handleExiting,s);return m.a.createElement(E.a,Object(r.a)({addEndListener:f.a},h,{"aria-expanded":h.role?h.in:null,onEnter:p,onEntering:b,onEntered:y,onExit:x,onExiting:N}),function(a,t){return m.a.cloneElement(d,Object(r.a)({},t,{className:l()(u,d.props.className,v[a],"width"===e.getDimension()&&"width")}))})},a}(m.a.Component);N.defaultProps=x,a.a=N}}]);
//# sourceMappingURL=20.ac31e29a.chunk.js.map