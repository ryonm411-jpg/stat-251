// Auto-answers every question with the key and checks all are graded correct. Run: node tools/<file> .
const {JSDOM}=require("jsdom");const fs=require("fs");const p=require("path");const root=process.argv[2];
const html=fs.readFileSync(p.join(root,"lessons/0004-poisson-transformations-drill.html"),"utf8").replace(/<script src="[^"]+"><\/script>/g,"");
const w=new JSDOM(html,{runScripts:"outside-only",url:"http://x/"}).window;w.eval(fs.readFileSync(p.join(root,"assets/quiz.js"),"utf8"));
const a=["0.37","0.195","0.594","0.0498","10.4","2.83","0.27","1/8",1,"2.5","0.15","0.16","0.625","0.0808","0.7865","0.34",2,"0.449","0.109"];
const mc={6:"2.83",9:1,17:2};
[...w.document.querySelectorAll("section.q")].forEach((q,i)=>{const v=a[i];const inp=q.querySelector("input");
 if(inp){inp.value=String(v);q.querySelector(".q-num-row button").click();}else q.querySelectorAll(".q-opts button")[v].click();
 if(!q.querySelector(".verdict.right"))console.log("WRONG",i+1);});
console.log(w.document.querySelector("#scoreboard h3").textContent);
