(this["webpackJsonpcontrails-app"]=this["webpackJsonpcontrails-app"]||[]).push([[0],{14:function(e){e.exports=JSON.parse('[{"id":1,"ensembleMember":1,"timeSteps":[2.305,2.31,2.315,2.32,2.325,2.33,2.335,2.34,2.345,2.35,2.355,2.36,2.365,2.37,2.38,2.39,2.4]},{"id":2,"ensembleMember":2,"timeSteps":[2.3075,2.3135,2.3175,2.3225,2.3275,2.3325,2.3375,2.3425,2.3475,2.375,2.385,2.395]}]')},79:function(e,t,n){},80:function(e,t,n){},82:function(e,t,n){},83:function(e,t,n){"use strict";n.r(t);var r=n(6),a=n(5),c=n.n(a),s=n(39),o=n.n(s),i=(n(79),n(0)),d=n(4),l=n(2),u=n(1),h=(n(80),n(8)),p=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(i.a)(this,n),(e=t.call(this)).state={currentVal:0,value:[4,5]},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("/backendscript",{method:"POST",mode:"cors",cache:"no-cache",headers:{content_type:"application/json"},body:JSON.stringify(this.state.value)}).then((function(e){return e.json()})).then((function(t){return e.setState({currentVal:t.val})}))}},{key:"render",value:function(){return Object(r.jsxs)("div",{children:["Query panel and val is ",this.state.currentVal]})}}]),n}(c.a.Component),f=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(i.a)(this,n),(e=t.call(this)).state={},e}return Object(d.a)(n,[{key:"render",value:function(){return Object(r.jsx)("div",{children:"Parameters panel"})}}]),n}(c.a.Component),m=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(i.a)(this,n),(e=t.call(this)).state={},e}return Object(d.a)(n,[{key:"render",value:function(){return Object(r.jsx)("div",{children:"Clusters and other components"})}}]),n}(c.a.Component),b=n(3),j=function e(){Object(i.a)(this,e),this.scatterplot=function(e,t,n,r,a){h.e(a).select("svg").remove();var c=h.e(a).node().clientWidth,s=h.e(a).node().clientHeight,o=40,i=10,d=20,l=20,u=h.e(a).append("svg").attr("width",c).attr("height",s),p=h.d().domain([t.min,t.max]).range(["#fff5f0","#67000d"]),f=h.d().domain([n.min,n.max]).range([o,c-i]),m=h.a().scale(f),b=h.d().domain([r.min,r.max]).range([s-l,d]),j=h.b().scale(b);u.append("g").attr("transform","translate(0,"+(s-d)+")").call(m),u.append("g").attr("transform","translate(".concat(o,",0)")).call(j),u.append("g").selectAll("dot").data(e).enter().append("circle").attr("cx",(function(e){return f(e.x)})).attr("cy",(function(e){return b(e.y)})).attr("r",1.5).style("fill",(function(e){return p(e.temp)}))}},v=(c.a.Component,n(26)),x={height:240},O=(c.a.Component,function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(i.a)(this,n),(e=t.call(this)).sceneSetup=function(t,n){var r=h.e(t).node().clientWidth,a=h.e(t).node().clientHeight;e.scene=new b.j,e.scene.background=new b.a(3225919);var c=r/a;e.camera=new b.e(4,c,.5,1e3),e.camera.position.z=40,e.renderer=new b.o,e.renderer.setSize(r,a),e.controls=new v.a(e.camera,e.renderer.domElement),n.appendChild(e.renderer.domElement)},e.addCustomSceneObjects=function(t,n){e.tempColor=["#fff5f0","#67000d"];var r=h.d().domain([n.min,n.max]).range(e.tempColor),a=new b.c;t.forEach((function(e){a.vertices.push(new b.n(e.x,e.y,e.z));var t=r(e.temp);a.colors.push(new b.a(t))})),e.cube&&e.scene.remove(e.cube);var c=new b.h({size:.2,vertexColors:!0});e.cube=new b.g(a,c),e.scene.add(e.cube);var s=[];s[0]=new b.f(16777215,1,0),s[1]=new b.f(16777215,1,0),s[2]=new b.f(16777215,1,0),s[0].position.set(0,200,0),s[1].position.set(100,200,100),s[2].position.set(-100,-200,-100),e.scene.add(s[0]),e.scene.add(s[1]),e.scene.add(s[2]),e.startAnimationLoop()},e.startAnimationLoop=function(){e.renderer.render(e.scene,e.camera),e.requestID=window.requestAnimationFrame(e.startAnimationLoop)},e.handleWindowResize=function(t){var n=h.e(t).node().clientWidth,r=h.e(t).node().clientHeight;e.renderer.setSize(n,r),e.camera.aspect=n/r,e.camera.updateProjectionMatrix()},e.widnowResizeHandler=function(t){window.addEventListener("resize",e.handleWindowResize(t))},e.scene=null,e.camera=null,e.renderer=null,e.controls=null,e}return n}(c.a.Component)),w=n(15),g=n.n(w),C=n(14),S=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(i.a)(this,n),(e=t.call(this)).createDropdown=function(e,t,n,r,a,c,s){C[n-1].timeSteps;h.e(r).append("label").attr("for","members").text("Members: "),h.e(r).append("select").attr("class","members").attr("id","member".concat(a)).on("change",(function(){var n=this.value;!function(n,r,a){h.e("#timestep".concat(a)).selectAll("option").remove(),h.e("#timestep".concat(a)).selectAll("option").data(r).enter().append("option").attr("id",(function(e){return e})).attr("value",(function(e){return e})).text((function(e){return e})),(new z).dataLoader(e,n,r[0],t,c,s)}(n,C[n-1].timeSteps,a)})).selectAll("option").data(C).enter().append("option").attr("id",(function(e){return e.ensembleMember})).attr("value",(function(e){return e.ensembleMember})).property("selected",(function(e){return e.ensembleMember===n})).text((function(e){return e.ensembleMember})),h.e(r).append("button").text("Previous").on("click",(function(){var n=+g()("#timestep".concat(a)).val(),r=+g()("#member".concat(a)).val(),o=C[r-1].timeSteps,i=o.indexOf(n),d=o.length-1,l=r,u=o[0!=i?i-1:d];g()("#timestep".concat(a)).val(u),(new z).dataLoader(e,l,u,t,c,s)})),h.e(r).append("label").attr("for","timesteps").text("Time steps"),h.e(r).append("select").attr("class","timesteps").attr("id","timestep".concat(a)).on("change",(function(){var n=+g()("#member".concat(a)).val(),r=this.value;(new z).dataLoader(e,n,r,t,c,s)})).selectAll("option").data(C[n-1].timeSteps).enter().append("option").attr("id",(function(e){return e})).attr("value",(function(e){return e})).text((function(e){return e})),h.e(r).append("button").text("Next").on("click",(function(){var n=+g()("#timestep".concat(a)).val(),r=+g()("#member".concat(a)).val(),o=C[r-1].timeSteps,i=o.indexOf(n),d=o.length-1,l=r,u=o[i!=d?i%d+1:0];g()("#timestep".concat(a)).val(u),(new z).dataLoader(e,l,u,t,c,s)}))},e.state={},e}return n}(c.a.Component),y=(n(82),n(41)),k=n(12),M=n(10),P=new S,T=new S,D=new O,F=new O,L=new j,R=new j,z=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(i.a)(this,n),(e=t.call(this)).dropdownCreator=function(e,t,n,r,a,c,s,o){n.createDropdown(e,t,r,a,c,s,o)},e.createScene=function(e,t,n){e.sceneSetup(t,n)},e.forPromise=function(t,n,r,a,c,s){return Promise.resolve(e.dataLoader(t,n,r,a,c,s))},e.dataLoader=function(e,t,n,r,a,c){var s="https://raw.githubusercontent.com/CarlaFloricel/Contrails/nafiul-testing/src/data/".concat(t,"/").concat(n,".csv"),o=[],i={},d={},l={};h.c(s,(function(e){o.push({x:parseFloat(e["Points:0"]),y:parseFloat(e["Points:1"]),z:parseFloat(e["Points:2"]),temp:parseFloat(e.T)}),i.min=Math.min(i.min||1/0,parseFloat(e.T)),i.max=Math.max(i.max||-1/0,parseFloat(e.T)),d.min=Math.min(d.min||1/0,parseFloat(e["Points:0"])),d.max=Math.max(d.max||-1/0,parseFloat(e["Points:0"])),l.min=Math.min(l.min||1/0,parseFloat(e["Points:1"])),l.max=Math.max(l.max||-1/0,parseFloat(e["Points:1"]))})).then((function(){console.log("data"),function(e,t,n,r,a,c){e.addCustomSceneObjects(t,n),e.widnowResizeHandler(r),a.scatterplot(t,n,d,l,c),console.log("updated")}(e,o,i,r,a,c)}))},e.state={},e.firstCanvas=c.a.createRef(),e.firstThree=c.a.createRef(),e.firstDropdown=c.a.createRef(),e.firstScatter=c.a.createRef(),e.secondCanvas=c.a.createRef(),e.secondThree=c.a.createRef(),e.secondDropdown=c.a.createRef(),e.secondScatter=c.a.createRef(),e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.dropdownCreator(D,this.firstThree.current,P,1,this.firstDropdown.current,"firstDropdown",L,this.firstScatter.current),this.dropdownCreator(F,this.secondThree.current,T,2,this.secondDropdown.current,"secondDropdown",R,this.secondScatter.current),this.createScene(D,this.firstThree.current,this.firstCanvas.current),this.createScene(F,this.secondThree.current,this.secondCanvas.current),this.forPromise(D,1,2.305,this.firstThree.current,L,this.firstScatter.current).then((function(){console.log("first 3D loaded")})),this.forPromise(F,2,2.3075,this.secondThree.current,R,this.secondScatter.current).then((function(){console.log("second 3D loaded")}))}},{key:"render",value:function(){return Object(r.jsx)(y.a,{fluid:!0,children:Object(r.jsxs)(k.a,{xs:12,children:[Object(r.jsx)(M.a,{xs:2,style:{backgroundColor:"#b2182b",height:"100vh"},children:Object(r.jsx)(p,{})}),Object(r.jsxs)(M.a,{xs:6,style:{height:"100vh"},children:[Object(r.jsxs)(k.a,{xs:3,children:[Object(r.jsxs)(M.a,{xs:6,children:[Object(r.jsx)(k.a,{xs:2,children:Object(r.jsx)(M.a,{xs:12,style:{height:"3vh"},children:Object(r.jsx)("div",{ref:this.firstDropdown})})}),Object(r.jsx)(k.a,{xs:10,children:Object(r.jsx)(M.a,{xs:12,style:{height:"22vh"},ref:this.firstThree,children:Object(r.jsx)("div",{ref:this.firstCanvas})})})]}),Object(r.jsx)(M.a,{xs:6,style:{backgroundColor:"#636363",height:"25vh"},ref:this.firstScatter})]}),Object(r.jsxs)(k.a,{xs:3,children:[Object(r.jsxs)(M.a,{xs:6,children:[Object(r.jsx)(k.a,{xs:2,children:Object(r.jsx)(M.a,{xs:12,style:{height:"3vh"},children:Object(r.jsx)("div",{ref:this.secondDropdown})})}),Object(r.jsx)(k.a,{xs:10,children:Object(r.jsx)(M.a,{xs:12,style:{height:"22vh"},ref:this.secondThree,children:Object(r.jsx)("div",{ref:this.secondCanvas})})})]}),Object(r.jsx)(M.a,{xs:6,style:{backgroundColor:"#636363",height:"25vh"},ref:this.secondScatter})]}),Object(r.jsx)(k.a,{xs:6,children:Object(r.jsx)(M.a,{xs:12,style:{backgroundColor:"#67a9cf",height:"50vh"},children:Object(r.jsx)(m,{})})})]}),Object(r.jsx)(M.a,{xs:4,style:{backgroundColor:"#2166ac",height:"100vh"},children:Object(r.jsx)(f,{})})]})})}}]),n}(c.a.Component),A=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(z,{})})}}]),n}(a.Component),E=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,84)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(A,{})}),document.getElementById("root")),E()}},[[83,1,2]]]);
//# sourceMappingURL=main.566b56b6.chunk.js.map