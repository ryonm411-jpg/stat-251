// Auto-answers every question with the key and checks all are graded correct. Run: node tools/<file> .
const {JSDOM}=require("jsdom");const fs=require("fs");const p=require("path");
const root=process.argv[2];
const html=fs.readFileSync(p.join(root,"lessons/0003-mock-midterm-weakness-finder.html"),"utf8").replace(/<script src="[^"]+"><\/script>/g,"");
const dom=new JSDOM(html,{runScripts:"outside-only",url:"http://x/"});const w=dom.window;
for(const f of ["quiz.js","ztable.js","timer.js"]) w.eval(fs.readFileSync(p.join(root,"assets",f),"utf8"));
const answers={2:"0.029",3:"0.0668",4:"1/9",5:"0.2510",6:"25",7:"0.3448",8:"0.7037",9:"0.0369",10:"0.8185",11:"0.2231",14:"0.1353",16:"55.12",17:"2.381",18:"0.2416",19:"7.071",20:"0.8333",21:"1.667",22:"0.4060",23:"0.8664",24:"0.3352",26:"0.1635"};
const mc={1:2,12:1,13:3,15:1,25:2};
const qs=[...w.document.querySelectorAll("section.q")];
qs.forEach((q,i)=>{const n=i+1;
 if(answers[n]){q.querySelector("input").value=answers[n];q.querySelector(".q-num-row button").click();}
 else q.querySelectorAll(".q-opts button")[mc[n]].click();});
console.log(qs.length, w.document.querySelector("#scoreboard h3").textContent);
qs.forEach((q,i)=>{if(!q.querySelector(".verdict.right"))console.log("WRONG",i+1)});
console.log(w.document.querySelector(".timer-clock").textContent, w.document.querySelectorAll(".ztable-wrap td").length);
