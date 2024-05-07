import"./style-D24wJ6YD.js";import{f as E}from"./fetch-dnjvk_SN.js";import{s as I}from"./toast-B-6j1RQv.js";async function N(){const t=localStorage.getItem("token"),o="https://hyte24.northeurope.cloudapp.azure.com/api/kubios/user-info",l={method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}};E(o,l).then(i=>{console.log(i),document.getElementById("name").innerHTML=i.user.given_name})}N();let O=!1,j=!1,A=!1;function K(){O&&j&&A&&L(C,w).then(([t,o,l])=>{if(t.length>0&&o.length>0&&l.length>0){const{symptomPoints:i,hrvPoints:u,lifestylePoints:r}=P(t[0],o[0],l[0]),n=Math.round((i+u+r)/3);let e="";n<=1?e="Matala stressi":n<=2?e="Kohtalainen stressi":e="Korkea stressi",H(i,u,r,n,e)}else console.log("Kaikkia tietoja ei ole saatavilla analyysia varten.")})}let z=[],$=[],q=[];async function x(t,o){const l={symptoms:`https://hyte24.northeurope.cloudapp.azure.com/api/symptoms/${t}`,lifestyle:`https://hyte24.northeurope.cloudapp.azure.com/api/lifestyle/${t}`,hrv:`https://hyte24.northeurope.cloudapp.azure.com/api/hrv/${t}`},i={method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}};function u(n){const e=new Date(n),s=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-s).toISOString().split("T")[0]}const r=async n=>{const e=await fetch(n,i);if(!e.ok)throw new Error(`Network response was not ok from ${n}`);return(await e.json()).map(a=>u(a.entry_date))};try{[z,$,q]=await Promise.all([r(l.symptoms),r(l.lifestyle),r(l.hrv)]),O=!0,j=!0,A=!0,B(k,f),K()}catch(n){console.error("Error fetching data:",n)}}const F=localStorage.getItem("user_id"),R=localStorage.getItem("token");x(F,R);const D=new Date;let k=D.getMonth(),f=D.getFullYear();const Y=["Tammikuu","Helmikuu","Maaliskuu","Huhtikuu","Toukokuu","Kesäkuu","Heinäkuu","Elokuu","Syyskuu","Lokakuu","Marraskuu","Joulukuu"];document.getElementById("prevMonth").addEventListener("click",()=>G());document.getElementById("nextMonth").addEventListener("click",()=>U());function B(t,o){const l=(new Date(o,t).getDay()+6)%7,i=32-new Date(o,t,32).getDate(),u=document.getElementById("calendar-body");u.innerHTML="",document.getElementById("monthAndYear").innerText=Y[t]+" "+o;let r=1;for(let n=0;n<6;n++){const e=document.createElement("tr");for(let s=0;s<7;s++){const a=document.createElement("td");if(n===0&&s<l)e.appendChild(a);else{if(r>i)break;{const c=new Date(o,t,r),m=new Date(c.getTime()-c.getTimezoneOffset()*6e4).toISOString().split("T")[0];if(a.textContent=r,r===D.getDate()&&o===D.getFullYear()&&t===D.getMonth()&&a.classList.add("current-date"),z.includes(m)){const y=document.createElement("span");y.className="dot oirekysely-dot",a.appendChild(y)}if($.includes(m)){const y=document.createElement("span");y.className="dot elamantapa-dot",a.appendChild(y)}if(q.includes(m)){const y=document.createElement("span");y.className="dot hrv-dot",a.appendChild(y)}e.appendChild(a),r++}}}u.appendChild(e)}}function G(){f=k===0?f-1:f,k=k===0?11:k-1,B(k,f)}function U(){f=k===11?f+1:f,k=(k+1)%12,B(k,f)}B(k,f);document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".menu-toggle"),o=document.querySelector(".menu");t.addEventListener("click",function(){o.classList.toggle("show")})});am5.ready(function(){const t=am5.Root.new("graph");t.setThemes([am5themes_Animated.new(t)]);const o=t.container.children.push(am5xy.XYChart.new(t,{panX:!1,panY:!1,wheelX:"panX",wheelY:"zoomX",paddingLeft:20,paddingRight:40,paddingBottom:80,layout:t.verticalLayout})),l=localStorage.getItem("user_id"),i=localStorage.getItem("token"),u=`https://hyte24.northeurope.cloudapp.azure.com/api/analysis/user/${l}`,r={method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`}};fetch(u,r).then(n=>{if(!n.ok)throw new Error(`HTTP ${n.status} - ${n.statusText}`);return n.json()}).then(n=>{if(n.length===0){t.dom.innerHTML='<p style="text-align:center; padding: 20px;">No data available.</p>';return}o.children.unshift(am5.Label.new(t,{text:"Stressitasoanalyysi",fontSize:22,fontWeight:"600",fontFamily:"Poppins, sans-serif",textAlign:"center",x:am5.percent(50),centerX:am5.percent(50),paddingTop:0,paddingBottom:20}))}).catch(n=>{console.error("Fetch error:",n),t.dom.innerHTML='<p style="text-align:center; padding: 20px;">Error retrieving data. '+n.message+"</p>"})});document.addEventListener("DOMContentLoaded",t=>{const o=document.getElementById("survey-modal"),l=document.getElementById("survey-form-mental"),i=document.getElementById("survey-form-physical"),u=document.querySelector(".next-button"),r=document.querySelector(".prev-button"),n=document.querySelector(".tallenna-button"),e=document.querySelector(".close-button"),s=document.getElementById("openArvioKyselyModal");s.onclick=function(){const a=localStorage.getItem("surveyCompletionDate"),c=new Date().toISOString().split("T")[0];if(a===c){alert("Olet jo suorittanut oirearviokyselyn tänään.");return}o.style.display="block",l.style.display="block",i.style.display="none"},e.onclick=()=>{o.style.display="none"},u.addEventListener("click",function(){l.style.display="none",i.style.display="block"}),r.addEventListener("click",function(){i.style.display="none",l.style.display="block"}),n.addEventListener("click",function(a){a.preventDefault();const c=document.getElementById("stress_level"),d=parseInt(c.value,10),m={entry_date:new Date().toISOString().split("T")[0],frustration:document.getElementById("frustration").checked?"1":"0",grumpiness:document.getElementById("grumpiness").checked?"1":"0",recall_problems:document.getElementById("recall_problems").checked?"1":"0",restlesness:document.getElementById("restlesness").checked?"1":"0",disquiet:document.getElementById("disquiet").checked?"1":"0",tiredness:document.getElementById("tiredness").checked?"1":"0",anxiety:document.getElementById("anxiety").checked?"1":"0",difficulty_making_decisions:document.getElementById("difficulty").checked?"1":"0",sleep_disturbances:document.getElementById("sleep_disturbances").checked?"1":"0",changes_in_appetite:document.getElementById("changes_appetite").checked?"1":"0",headache:document.getElementById("headache").checked?"1":"0",neck_pain:document.getElementById("neck_pain").checked?"1":"0",vertigo:document.getElementById("vertigo").checked?"1":"0",palpitation:document.getElementById("palpitation").checked?"1":"0",nausea:document.getElementById("nausea").checked?"1":"0",upset_stomach:document.getElementById("upset_stomach").checked?"1":"0",recurring_colds:document.getElementById("recurring_colds").checked?"1":"0",back_issues:document.getElementById("back_issues").checked?"1":"0",stress_level:d},y=localStorage.getItem("user_id"),h=localStorage.getItem("token"),p="https://hyte24.northeurope.cloudapp.azure.com/api/symptoms/",v={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify(m)};E(p,v).then(g=>{console.log(g),I("Oirearviokysely tallennettu."),x(y,h).then(()=>{B(k,f)}),o.style.display="none";const S=new Date().toISOString().split("T")[0];localStorage.setItem("surveyCompletionDate",S)}).catch(g=>{console.error("Error:",g),I("Virhe tallennettaessa oirearviokyselyä. Täytä lomake uudelleen.")})}),e.onclick=()=>{o.style.display="none"},window.onclick=a=>{a.target===o&&(o.style.display="none")}});document.addEventListener("DOMContentLoaded",t=>{const o=document.getElementById("sleep-modal"),l=document.getElementById("sleep-form"),i=document.querySelector(".close-button2"),u=document.getElementById("openElamantapaKyselyModal"),r=document.getElementById("exercise-additional-questions"),n=document.getElementById("duration"),e=document.getElementById("intensity"),s=document.getElementById("exerciseYes"),a=document.getElementById("exerciseNo");function c(){s.checked?(r.style.display="",n.required=!0,e.required=!0):(r.style.display="none",n.required=!1,e.required=!1)}s.addEventListener("change",c),a.addEventListener("change",c),c(),a.addEventListener("change",d=>{a.checked&&(r.style.display="none")}),u.onclick=function(){const d=localStorage.getItem("lifestyleSurveyDate"),m=new Date().toISOString().split("T")[0];if(d===m){alert("Olet jo suorittanut elämäntapakyselyn tänään.");return}o.style.display="block",l.style.display="block"},i.onclick=()=>{o.style.display="none"},window.onclick=d=>{d.target===o&&(o.style.display="none")},l.addEventListener("submit",function(d){if(d.preventDefault(),!l.checkValidity()){l.reportValidity();return}const m={entry_date:new Date().toISOString().split("T")[0],hours_slept:document.getElementById("sleep-hours").value,enough_sleep:document.querySelector('input[name="enoughSleep"]:checked')?document.querySelector('input[name="enoughSleep"]:checked').value:"",quality_sleep:document.getElementById("sleepQuality").value,feel_healthy:document.querySelector('input[name="feelHealthy"]:checked')?document.querySelector('input[name="feelHealthy"]:checked').value:"",caffeine_intake:document.getElementById("caffeine").value,nicotine_intake:document.getElementById("nicotine").value,alcohol_intake:document.getElementById("alcohol").value,physical_activity:document.querySelector('input[name="exercise"]:checked')?document.querySelector('input[name="exercise"]:checked').value:"",duration:document.getElementById("duration").value?document.getElementById("duration").value:"0",intensity:document.querySelector('input[name="exercise"]:checked')&&document.querySelector('input[name="exercise"]:checked').value==="yes"?document.getElementById("intensity").value:null,user_id:localStorage.getItem("user_id")},y=localStorage.getItem("user_id"),h=localStorage.getItem("token"),p="https://hyte24.northeurope.cloudapp.azure.com/api/lifestyle/",v={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify(m)};console.log(m),E(p,v).then(g=>{console.log(g),I("Elämäntapakysely tallennettu."),x(y,h).then(()=>{B(k,f)}),o.style.display="none";const S=new Date().toISOString().split("T")[0];localStorage.setItem("lifestyleSurveyDate",S)}).catch(g=>{console.error("Error:",g),I("Virhe tallennettaessa elämäntapakyselyä. Täytä lomake uudelleen.")})})});let b=null;document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("hrv-modal"),o=document.getElementById("hrv-form"),l=document.querySelector(".close-button3"),i=document.getElementById("hrvMeasurements"),u=document.querySelector(".hrv-kubios"),r=document.getElementById("loadingIndicator");document.querySelector(".tallenna-hrv").addEventListener("click",function(e){if(e.preventDefault(),e.stopPropagation(),!b){I("Virhe. Yritä uudelleen.");return}const s=localStorage.getItem("token"),a="https://hyte24.northeurope.cloudapp.azure.com/api/hrv/",c={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(b)};console.log(b),E(a,c).then(d=>{console.log(d),I("HRV-mittauksen tulokset tallennettu."),x(F,s).then(()=>{B(k,f)});const m=new Date().toISOString().split("T")[0];localStorage.setItem("hrvCompletionDate",m),t.style.display="none"}).catch(d=>{console.error("Error:",d),I("Virhe tallennettaessa HRV-mittauksen tuloksia. Täytä lomake uudelleen.")})}),t.addEventListener("click",function(){}),i.onclick=function(){const e=localStorage.getItem("hrvCompletionDate"),s=new Date().toISOString().split("T")[0];if(e===s){alert("Olet jo suorittanut HRV-mittaustulosten haun tänään.");return}t.style.display="block",o.style.display="block"},l.onclick=()=>{t.style.display="none"},window.onclick=e=>{e.target===t&&(t.style.display="none")},u.addEventListener("click",function(e){e.preventDefault();const s=localStorage.getItem("token"),a="https://hyte24.northeurope.cloudapp.azure.com/api/kubios/user-data",c={method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`}};r.style.display="block",E(a,c).then(d=>{r.style.display="none",console.log(d);const m=document.getElementById("results"),y=new Date().toISOString().split("T")[0],h=d.results.filter(p=>p.daily_result===y);if(h.length>0){const{mean_hr_bpm:p,stress_index:v,readiness:g,mean_rr_ms:S,sdnn_ms:T}=h[0].result,_=h[0].user_happiness;b={user_id:localStorage.getItem("user_id"),av_hrv:p,stress_index:v,readiness:g,mean_rr_ms:S,sdnn_ms:T,entry_date:y,user_happiness:_},m.innerHTML=`
          Päivämäärä: ${y}<br>
          Sykkeen keskiarvo: ${parseFloat(p).toFixed(0)} bpm<br>
          Stressi-indeksi: ${parseFloat(v).toFixed(0)}<br>
          Mieliala: ${_}<br>
          Valmiustila: ${parseFloat(g).toFixed(0)} %<br>
          Keskimääräinen RR väli: ${parseFloat(S).toFixed(0)} ms<br>
          SDNN: ${parseFloat(T).toFixed(0)} ms
      `}else m.textContent="Ei tuloksia tämän päivän osalta. Suorita HRV-mittaus Kubios HRV sovelluksella ja hae mittaustulokset uudelleen."}).catch(d=>{r.style.display="none",console.error("Error:",d)})})});const L=(t,o)=>{const l=new Date,i=l.getDate(),u=l.getMonth()+1,r=(p,v)=>E(p,v).then(g=>g.filter(T=>{const _=new Date(T.entry_date),M=_.getDate(),V=_.getMonth()+1;return M===i&&V===u})).catch(g=>(console.error("Virhe haettaessa tuloksia:",g),[])),n=`https://hyte24.northeurope.cloudapp.azure.com/api/symptoms/${t}`,e={method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}},s=r(n,e),a=`https://hyte24.northeurope.cloudapp.azure.com/api/hrv/${t}`,c={method:"GET",headers:{"Content-type":"application/json",Authorization:`Bearer ${o}`}},d=r(a,c),m=`https://hyte24.northeurope.cloudapp.azure.com/api/lifestyle/${t}`,y={method:"GET",headers:{"Content-type":"application/json",Authorization:`Bearer ${o}`}},h=r(m,y);return Promise.all([s,d,h])},w=localStorage.getItem("token"),C=localStorage.getItem("user_id");L(C,w).then(([t,o,l])=>{console.log("Tämän päivän oirekyselyn tulokset:",t),console.log("Tämän päivän HRV-tulokset:",o),console.log("Tämän päivän elämäntapakyselyn tulokset:",l)});function P(t,o,l){let i=0,u=0;if(t.length>0){const s=t[0];for(const a in s)if(!["entry_date","symptom_id","user_id","stress_level"].includes(a)&&s[a]!==void 0&&s[a]!==null){const c=Number(s[a]);!isNaN(c)&&c!==0&&(u+=c)}console.log("Valittujen oireiden määrä:",u)}u<=2?i+=1:u<=10?i+=2:i+=3;const r=parseInt(t.stress_level);r<=2?i+=1:r<=4?i+=2:i+=3,i=Math.ceil(i/2);let n=0;if(o){const s=o.stress_index;s>=-5&&s<=0?n-=1:s>0&&s<=10?n+=1:s>10&&s<=20?n+=2:s>20&&(n+=3);const a=o.readiness;a<=25?n+=3:a>25&&a<=50?n+=2:a>50&&(n-=1)}n=Math.round(n/2);let e=0;if(l){const s=l.alcohol_intake;s<=2?e+=1:s>2&&s<=4?e+=2:e+=3;const a=l.caffeine_intake;a<=2?e+=1:a>2&&a<=4?e+=2:e+=3;const c=l.enough_sleep;c==="no"?e+=3:c==="yes"&&(e+=1);const d=l.feel_healthy;d==="yes"?e-=1:d==="no"&&(e+=3);const m=l.hours_slept;m>=7?e+=1:m>=5&&m<7?e+=2:e+=3;const y=l.nicotine_intake;y<=2?e+=1:y>=2&&y<6?e+=2:e+=3,l.physical_activity==="yes"?e-=1:e+=2;const p=l.duration;p==="null"&&p==="0"?e+=3:e+=1;const v=l.quality_sleep;v>=3?e+=1:v===2?e+=2:v===1&&(e+=3),e=Math.round(e/9)}return{symptomPoints:i,hrvPoints:n,lifestylePoints:e}}function X(t){t.map(o=>({date:new Date(o.created_at),value:o.analysis_enumerated}))}function H(t,o,l,i,u){if(localStorage.getItem("analysisModalShown")!=="true"){E("https://hyte24.northeurope.cloudapp.azure.com/api/analysis/user/"+localStorage.getItem("user_id"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(m=>{X(m)});const r=document.getElementById("overall-analysis-modal");r.style.display="block";const n=document.getElementById("overall-score"),e=document.getElementById("overall-text"),s=document.getElementById("additional-info"),a=document.getElementById("stress-advice"),c=document.getElementById("stress-link");n.textContent=`Kokonaisanalyysin pistemäärä: ${i}/3 pistettä`,e.textContent=`Stressitasoanalyysin tulos: ${u}`,i<=1?e.style.backgroundColor="rgba(108, 231, 149, 0.7)":i===2?(e.style.backgroundColor="rgba(245, 206, 90, 0.7)",s.style.display="block",a.textContent="Huomioi stressitasosi. Kokeile rentoutumisharjoituksia ja tarkasta elämäntapojasi.",c.textContent="Rentoutumisharjoitukset"):i>=3?(e.style.backgroundColor="rgba(249, 101, 101, 0.7)",s.style.display="block",a.textContent="Korkea stressitaso havaittu. Kokeile rentoutumisharjoituksia ja tarkasta elämäntapojasi. Korkean stressin pitkittyessä on suositeltavaa ottaa yhteyttä terveydenhuollon ammattilaiseen.",c.textContent="Rentoutumisharjoitukset"):s.style.display="none";const d=document.getElementsByClassName("close-button4")[0];d.onclick=()=>{r.style.display="none",localStorage.setItem("analysisModalShown","true")}}}L(C,w).then(([t,o,l])=>{if(t.length>0&&o.length>0&&l.length>0){const{symptomPoints:i,hrvPoints:u,lifestylePoints:r}=P(t[0],o[0],l[0]),n=Math.round((i+u+r)/3);let e="";const s=document.querySelector(".stress");n<=1?(e="Matala stressitaso",s.style.backgroundColor="rgba(108, 231, 149, 0.7)"):n<=2?(e="Kohtalainen stressitaso",s.style.backgroundColor="rgba(245, 206, 90, 0.7)"):(e="Korkea stressitaso",s.style.backgroundColor="rgba(249, 101, 101, 0.7)"),H(i,u,r,n,e);const a=document.getElementById("stress-today");a.textContent=e,console.log("kokonaisanalyysi:",n);const c=new Date().toISOString().split("T")[0];if(localStorage.getItem("lastAnalysisDate")!==c){const m={user_id:C,analysis_result:e,analysis_enumerated:n,created_at:c},y="https://hyte24.northeurope.cloudapp.azure.com/api/analysis/",h={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${w}`},body:JSON.stringify(m)};E(y,h).then(p=>{console.log("Analyysi tallennettu:",p),localStorage.setItem("lastAnalysisDate",c)})}else console.log("Analyysi on jo suoritettu ja tallennettu tänään.")}else console.log("Oirekyselyn, HRV-datan tai elämäntapakyselyn haku epäonnistui.")}).catch(t=>{console.error("Virhe haettaessa ja laskettaessa tietoja:",t)});document.addEventListener("DOMContentLoaded",function(){document.querySelector(".logout a").addEventListener("click",function(o){o.preventDefault(),localStorage.removeItem("analysisModalShown"),localStorage.removeItem("user_id"),localStorage.removeItem("token"),I("Kirjaudutaan ulos."),setTimeout(()=>{window.location.href="index.html"},1e3)})});
