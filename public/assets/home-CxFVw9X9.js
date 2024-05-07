import"./style-D24wJ6YD.js";import{f as I}from"./fetch-dnjvk_SN.js";import{s as E}from"./toast-B-6j1RQv.js";async function R(){const t=localStorage.getItem("token"),n="https://hyte24.northeurope.cloudapp.azure.com/api/kubios/user-info",l={method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}};I(n,l).then(r=>{console.log(r),document.getElementById("name").innerHTML=r.user.given_name})}R();let M=!1,O=!1,j=!1;function N(){M&&O&&j&&A(w,b).then(([t,n,l])=>{if(t.length>0&&n.length>0&&l.length>0){const{symptomPoints:r,hrvPoints:m,lifestylePoints:i}=P(t[0],n[0],l[0]),a=Math.round((r+m+i)/3);let e="";a<=1?e="Matala stressi":a<=2?e="Kohtalainen stressi":e="Korkea stressi",H(r,m,i,a,e)}else console.log("Kaikkia tietoja ei ole saatavilla analyysia varten.")})}let z=[],q=[],F=[];async function C(t,n){const l={symptoms:`https://hyte24.northeurope.cloudapp.azure.com/api/symptoms/${t}`,lifestyle:`https://hyte24.northeurope.cloudapp.azure.com/api/lifestyle/${t}`,hrv:`https://hyte24.northeurope.cloudapp.azure.com/api/hrv/${t}`},r={method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`}};function m(a){const e=new Date(a),o=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-o).toISOString().split("T")[0]}const i=async a=>{const e=await fetch(a,r);if(!e.ok)throw new Error(`Network response was not ok from ${a}`);return(await e.json()).map(s=>m(s.entry_date))};try{[z,q,F]=await Promise.all([i(l.symptoms),i(l.lifestyle),i(l.hrv)]),M=!0,O=!0,j=!0,B(k,f),N()}catch(a){console.error("Error fetching data:",a)}}const $=localStorage.getItem("user_id"),K=localStorage.getItem("token");C($,K);const D=new Date;let k=D.getMonth(),f=D.getFullYear();const Y=["Tammikuu","Helmikuu","Maaliskuu","Huhtikuu","Toukokuu","Kesäkuu","Heinäkuu","Elokuu","Syyskuu","Lokakuu","Marraskuu","Joulukuu"];document.getElementById("prevMonth").addEventListener("click",()=>G());document.getElementById("nextMonth").addEventListener("click",()=>X());function B(t,n){const l=(new Date(n,t).getDay()+6)%7,r=32-new Date(n,t,32).getDate(),m=document.getElementById("calendar-body");m.innerHTML="",document.getElementById("monthAndYear").innerText=Y[t]+" "+n;let i=1;for(let a=0;a<6;a++){const e=document.createElement("tr");for(let o=0;o<7;o++){const s=document.createElement("td");if(a===0&&o<l)e.appendChild(s);else{if(i>r)break;{const c=new Date(n,t,i),y=new Date(c.getTime()-c.getTimezoneOffset()*6e4).toISOString().split("T")[0];if(s.textContent=i,i===D.getDate()&&n===D.getFullYear()&&t===D.getMonth()&&s.classList.add("current-date"),z.includes(y)){const d=document.createElement("span");d.className="dot oirekysely-dot",s.appendChild(d)}if(q.includes(y)){const d=document.createElement("span");d.className="dot elamantapa-dot",s.appendChild(d)}if(F.includes(y)){const d=document.createElement("span");d.className="dot hrv-dot",s.appendChild(d)}e.appendChild(s),i++}}}m.appendChild(e)}}function G(){f=k===0?f-1:f,k=k===0?11:k-1,B(k,f)}function X(){f=k===11?f+1:f,k=(k+1)%12,B(k,f)}B(k,f);document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".menu-toggle"),n=document.querySelector(".menu");t.addEventListener("click",function(){n.classList.toggle("show")})});am5.ready(function(){const t=am5.Root.new("graph");t.setThemes([am5themes_Animated.new(t)]);const n=t.container.children.push(am5xy.XYChart.new(t,{panX:!1,panY:!1,wheelX:"panX",wheelY:"zoomX",paddingLeft:20,paddingRight:40,paddingBottom:80,layout:t.verticalLayout}));n.children.unshift(am5.Label.new(t,{text:"Stressitasoanalyysi",fontSize:22,fontWeight:"600",fontFamily:"Poppins, sans-serif",textAlign:"center",x:am5.percent(50),centerX:am5.percent(50),paddingTop:0,paddingBottom:20}));const l=localStorage.getItem("user_id"),r=localStorage.getItem("token"),m=`https://hyte24.northeurope.cloudapp.azure.com/api/analysis/user/${l}`,i={method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}};I(m,i).then(a=>{console.log(a);const e=a.map(d=>({date:new Date(d.created_at),value:d.analysis_enumerated})),o=am5xy.AxisRendererX.new(t,{minGridDistance:85,minorGridEnabled:!0}),s=n.xAxes.push(am5xy.CategoryAxis.new(t,{categoryField:"date",renderer:o}));o.grid.template.setAll({location:1}),o.labels.template.setAll({paddingTop:20}),s.data.setAll(e);const c=n.yAxes.push(am5xy.ValueAxis.new(t,{min:0,max:3,maxPrecision:0,renderer:am5xy.AxisRendererY.new(t,{strokeOpacity:.1})})),u=n.series.push(am5xy.ColumnSeries.new(t,{xAxis:s,yAxis:c,valueYField:"value",categoryXField:"date"}));u.columns.template.setAll({tooltipText:"{categoryX}: {valueY}",tooltipY:0,strokeOpacity:0,cornerRadiusTL:6,cornerRadiusTR:6});const y={1:am5.color(568094),2:am5.color(16231954),3:am5.color(16199186)};u.columns.template.adapters.add("fill",function(d,h){const p=h.dataItem.get("valueY");return y[p]||d}),u.data.setAll(e),u.appear(),n.appear(1e3,100),console.log(e)})});document.addEventListener("DOMContentLoaded",t=>{const n=document.getElementById("survey-modal"),l=document.getElementById("survey-form-mental"),r=document.getElementById("survey-form-physical"),m=document.querySelector(".next-button"),i=document.querySelector(".prev-button"),a=document.querySelector(".tallenna-button"),e=document.querySelector(".close-button"),o=document.getElementById("openArvioKyselyModal");o.onclick=function(){const s=localStorage.getItem("surveyCompletionDate"),c=new Date().toISOString().split("T")[0];if(s===c){alert("Olet jo suorittanut oirearviokyselyn tänään.");return}n.style.display="block",l.style.display="block",r.style.display="none"},e.onclick=()=>{n.style.display="none"},m.addEventListener("click",function(){l.style.display="none",r.style.display="block"}),i.addEventListener("click",function(){r.style.display="none",l.style.display="block"}),a.addEventListener("click",function(s){s.preventDefault();const c=document.getElementById("stress_level"),u=parseInt(c.value,10),y={entry_date:new Date().toISOString().split("T")[0],frustration:document.getElementById("frustration").checked?"1":"0",grumpiness:document.getElementById("grumpiness").checked?"1":"0",recall_problems:document.getElementById("recall_problems").checked?"1":"0",restlesness:document.getElementById("restlesness").checked?"1":"0",disquiet:document.getElementById("disquiet").checked?"1":"0",tiredness:document.getElementById("tiredness").checked?"1":"0",anxiety:document.getElementById("anxiety").checked?"1":"0",difficulty_making_decisions:document.getElementById("difficulty").checked?"1":"0",sleep_disturbances:document.getElementById("sleep_disturbances").checked?"1":"0",changes_in_appetite:document.getElementById("changes_appetite").checked?"1":"0",headache:document.getElementById("headache").checked?"1":"0",neck_pain:document.getElementById("neck_pain").checked?"1":"0",vertigo:document.getElementById("vertigo").checked?"1":"0",palpitation:document.getElementById("palpitation").checked?"1":"0",nausea:document.getElementById("nausea").checked?"1":"0",upset_stomach:document.getElementById("upset_stomach").checked?"1":"0",recurring_colds:document.getElementById("recurring_colds").checked?"1":"0",back_issues:document.getElementById("back_issues").checked?"1":"0",stress_level:u},d=localStorage.getItem("user_id"),h=localStorage.getItem("token"),p="https://hyte24.northeurope.cloudapp.azure.com/api/symptoms/",v={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify(y)};I(p,v).then(g=>{console.log(g),E("Oirearviokysely tallennettu."),C(d,h).then(()=>{B(k,f)}),n.style.display="none";const S=new Date().toISOString().split("T")[0];localStorage.setItem("surveyCompletionDate",S)}).catch(g=>{console.error("Error:",g),E("Virhe tallennettaessa oirearviokyselyä. Täytä lomake uudelleen.")})}),e.onclick=()=>{n.style.display="none"},window.onclick=s=>{s.target===n&&(n.style.display="none")}});document.addEventListener("DOMContentLoaded",t=>{const n=document.getElementById("sleep-modal"),l=document.getElementById("sleep-form"),r=document.querySelector(".close-button2"),m=document.getElementById("openElamantapaKyselyModal"),i=document.getElementById("exercise-additional-questions"),a=document.getElementById("duration"),e=document.getElementById("intensity"),o=document.getElementById("exerciseYes"),s=document.getElementById("exerciseNo");function c(){o.checked?(i.style.display="",a.required=!0,e.required=!0):(i.style.display="none",a.required=!1,e.required=!1)}o.addEventListener("change",c),s.addEventListener("change",c),c(),s.addEventListener("change",u=>{s.checked&&(i.style.display="none")}),m.onclick=function(){const u=localStorage.getItem("lifestyleSurveyDate"),y=new Date().toISOString().split("T")[0];if(u===y){alert("Olet jo suorittanut elämäntapakyselyn tänään.");return}n.style.display="block",l.style.display="block"},r.onclick=()=>{n.style.display="none"},window.onclick=u=>{u.target===n&&(n.style.display="none")},l.addEventListener("submit",function(u){if(u.preventDefault(),!l.checkValidity()){l.reportValidity();return}const y={entry_date:new Date().toISOString().split("T")[0],hours_slept:document.getElementById("sleep-hours").value,enough_sleep:document.querySelector('input[name="enoughSleep"]:checked')?document.querySelector('input[name="enoughSleep"]:checked').value:"",quality_sleep:document.getElementById("sleepQuality").value,feel_healthy:document.querySelector('input[name="feelHealthy"]:checked')?document.querySelector('input[name="feelHealthy"]:checked').value:"",caffeine_intake:document.getElementById("caffeine").value,nicotine_intake:document.getElementById("nicotine").value,alcohol_intake:document.getElementById("alcohol").value,physical_activity:document.querySelector('input[name="exercise"]:checked')?document.querySelector('input[name="exercise"]:checked').value:"",duration:document.getElementById("duration").value?document.getElementById("duration").value:"0",intensity:document.querySelector('input[name="exercise"]:checked')&&document.querySelector('input[name="exercise"]:checked').value==="yes"?document.getElementById("intensity").value:null,user_id:localStorage.getItem("user_id")},d=localStorage.getItem("user_id"),h=localStorage.getItem("token"),p="https://hyte24.northeurope.cloudapp.azure.com/api/lifestyle/",v={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify(y)};console.log(y),I(p,v).then(g=>{console.log(g),E("Elämäntapakysely tallennettu."),C(d,h).then(()=>{B(k,f)}),n.style.display="none";const S=new Date().toISOString().split("T")[0];localStorage.setItem("lifestyleSurveyDate",S)}).catch(g=>{console.error("Error:",g),E("Virhe tallennettaessa elämäntapakyselyä. Täytä lomake uudelleen.")})})});let T=null;document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("hrv-modal"),n=document.getElementById("hrv-form"),l=document.querySelector(".close-button3"),r=document.getElementById("hrvMeasurements"),m=document.querySelector(".hrv-kubios"),i=document.getElementById("loadingIndicator");document.querySelector(".tallenna-hrv").addEventListener("click",function(e){if(e.preventDefault(),e.stopPropagation(),!T){E("Virhe. Yritä uudelleen.");return}const o=localStorage.getItem("token"),s="https://hyte24.northeurope.cloudapp.azure.com/api/hrv/",c={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(T)};console.log(T),I(s,c).then(u=>{console.log(u),E("HRV-mittauksen tulokset tallennettu."),C($,o).then(()=>{B(k,f)});const y=new Date().toISOString().split("T")[0];localStorage.setItem("hrvCompletionDate",y),t.style.display="none"}).catch(u=>{console.error("Error:",u),E("Virhe tallennettaessa HRV-mittauksen tuloksia. Täytä lomake uudelleen.")})}),t.addEventListener("click",function(){}),r.onclick=function(){const e=localStorage.getItem("hrvCompletionDate"),o=new Date().toISOString().split("T")[0];if(e===o){alert("Olet jo suorittanut HRV-mittaustulosten haun tänään.");return}t.style.display="block",n.style.display="block"},l.onclick=()=>{t.style.display="none"},window.onclick=e=>{e.target===t&&(t.style.display="none")},m.addEventListener("click",function(e){e.preventDefault();const o=localStorage.getItem("token"),s="https://hyte24.northeurope.cloudapp.azure.com/api/kubios/user-data",c={method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}};i.style.display="block",I(s,c).then(u=>{i.style.display="none",console.log(u);const y=document.getElementById("results"),d=new Date().toISOString().split("T")[0],h=u.results.filter(p=>p.daily_result===d);if(h.length>0){const{mean_hr_bpm:p,stress_index:v,readiness:g,mean_rr_ms:S,sdnn_ms:x}=h[0].result,_=h[0].user_happiness;T={user_id:localStorage.getItem("user_id"),av_hrv:p,stress_index:v,readiness:g,mean_rr_ms:S,sdnn_ms:x,entry_date:d,user_happiness:_},y.innerHTML=`
          Päivämäärä: ${d}<br>
          Sykkeen keskiarvo: ${parseFloat(p).toFixed(0)} bpm<br>
          Stressi-indeksi: ${parseFloat(v).toFixed(0)}<br>
          Mieliala: ${_}<br>
          Valmiustila: ${parseFloat(g).toFixed(0)} %<br>
          Keskimääräinen RR väli: ${parseFloat(S).toFixed(0)} ms<br>
          SDNN: ${parseFloat(x).toFixed(0)} ms
      `}else y.textContent="Ei tuloksia tämän päivän osalta. Suorita HRV-mittaus Kubios HRV sovelluksella ja hae mittaustulokset uudelleen."}).catch(u=>{i.style.display="none",console.error("Error:",u)})})});const A=(t,n)=>{const l=new Date,r=l.getDate(),m=l.getMonth()+1,i=(p,v)=>I(p,v).then(g=>g.filter(x=>{const _=new Date(x.entry_date),L=_.getDate(),V=_.getMonth()+1;return L===r&&V===m})).catch(g=>(console.error("Virhe haettaessa tuloksia:",g),[])),a=`https://hyte24.northeurope.cloudapp.azure.com/api/symptoms/${t}`,e={method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`}},o=i(a,e),s=`https://hyte24.northeurope.cloudapp.azure.com/api/hrv/${t}`,c={method:"GET",headers:{"Content-type":"application/json",Authorization:`Bearer ${n}`}},u=i(s,c),y=`https://hyte24.northeurope.cloudapp.azure.com/api/lifestyle/${t}`,d={method:"GET",headers:{"Content-type":"application/json",Authorization:`Bearer ${n}`}},h=i(y,d);return Promise.all([o,u,h])},b=localStorage.getItem("token"),w=localStorage.getItem("user_id");A(w,b).then(([t,n,l])=>{console.log("Tämän päivän oirekyselyn tulokset:",t),console.log("Tämän päivän HRV-tulokset:",n),console.log("Tämän päivän elämäntapakyselyn tulokset:",l)});function P(t,n,l){let r=0,m=0;if(t.length>0){const o=t[0];for(const s in o)if(!["entry_date","symptom_id","user_id","stress_level"].includes(s)&&o[s]!==void 0&&o[s]!==null){const c=Number(o[s]);!isNaN(c)&&c!==0&&(m+=c)}console.log("Valittujen oireiden määrä:",m)}m<=2?r+=1:m<=10?r+=2:r+=3;const i=parseInt(t.stress_level);i<=2?r+=1:i<=4?r+=2:r+=3,r=Math.ceil(r/2);let a=0;if(n){const o=n.stress_index;o>=-5&&o<=0?a-=1:o>0&&o<=10?a+=1:o>10&&o<=20?a+=2:o>20&&(a+=3);const s=n.readiness;s<=25?a+=3:s>25&&s<=50?a+=2:s>50&&(a-=1)}a=Math.round(a/2);let e=0;if(l){const o=l.alcohol_intake;o<=2?e+=1:o>2&&o<=4?e+=2:e+=3;const s=l.caffeine_intake;s<=2?e+=1:s>2&&s<=4?e+=2:e+=3;const c=l.enough_sleep;c==="no"?e+=3:c==="yes"&&(e+=1);const u=l.feel_healthy;u==="yes"?e-=1:u==="no"&&(e+=3);const y=l.hours_slept;y>=7?e+=1:y>=5&&y<7?e+=2:e+=3;const d=l.nicotine_intake;d<=2?e+=1:d>=2&&d<6?e+=2:e+=3,l.physical_activity==="yes"?e-=1:e+=2;const p=l.duration;p==="null"&&p==="0"?e+=3:e+=1;const v=l.quality_sleep;v>=3?e+=1:v===2?e+=2:v===1&&(e+=3),e=Math.round(e/9)}return{symptomPoints:r,hrvPoints:a,lifestylePoints:e}}function U(t){t.map(n=>({date:new Date(n.created_at),value:n.analysis_enumerated}))}function H(t,n,l,r,m){if(localStorage.getItem("analysisModalShown")!=="true"){I("https://hyte24.northeurope.cloudapp.azure.com/api/analysis/user/"+localStorage.getItem("user_id"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(y=>{U(y)});const i=document.getElementById("overall-analysis-modal");i.style.display="block";const a=document.getElementById("overall-score"),e=document.getElementById("overall-text"),o=document.getElementById("additional-info"),s=document.getElementById("stress-advice"),c=document.getElementById("stress-link");a.textContent=`Kokonaisanalyysin pistemäärä: ${r}/3 pistettä`,e.textContent=`Stressitasoanalyysin tulos: ${m}`,r<=1?e.style.backgroundColor="rgba(108, 231, 149, 0.7)":r===2?(e.style.backgroundColor="rgba(245, 206, 90, 0.7)",o.style.display="block",s.textContent="Huomioi stressitasosi. Kokeile rentoutumisharjoituksia ja tarkasta elämäntapojasi.",c.textContent="Rentoutumisharjoitukset"):r>=3?(e.style.backgroundColor="rgba(249, 101, 101, 0.7)",o.style.display="block",s.textContent="Korkea stressitaso havaittu. Kokeile rentoutumisharjoituksia ja tarkasta elämäntapojasi. Korkean stressin pitkittyessä on suositeltavaa ottaa yhteyttä terveydenhuollon ammattilaiseen.",c.textContent="Rentoutumisharjoitukset"):o.style.display="none";const u=document.getElementsByClassName("close-button4")[0];u.onclick=()=>{i.style.display="none",localStorage.setItem("analysisModalShown","true")}}}A(w,b).then(([t,n,l])=>{if(t.length>0&&n.length>0&&l.length>0){const{symptomPoints:r,hrvPoints:m,lifestylePoints:i}=P(t[0],n[0],l[0]),a=Math.round((r+m+i)/3);let e="";const o=document.querySelector(".stress");a<=1?(e="Matala stressitaso",o.style.backgroundColor="rgba(108, 231, 149, 0.7)"):a<=2?(e="Kohtalainen stressitaso",o.style.backgroundColor="rgba(245, 206, 90, 0.7)"):(e="Korkea stressitaso",o.style.backgroundColor="rgba(249, 101, 101, 0.7)"),H(r,m,i,a,e);const s=document.getElementById("stress-today");s.textContent=e,console.log("kokonaisanalyysi:",a);const c=new Date().toISOString().split("T")[0];if(localStorage.getItem("lastAnalysisDate")!==c){const y={user_id:w,analysis_result:e,analysis_enumerated:a,created_at:c},d="https://hyte24.northeurope.cloudapp.azure.com/api/analysis/",h={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify(y)};I(d,h).then(p=>{console.log("Analyysi tallennettu:",p),localStorage.setItem("lastAnalysisDate",c)})}else console.log("Analyysi on jo suoritettu ja tallennettu tänään.")}else console.log("Oirekyselyn, HRV-datan tai elämäntapakyselyn haku epäonnistui.")}).catch(t=>{console.error("Virhe haettaessa ja laskettaessa tietoja:",t)});document.addEventListener("DOMContentLoaded",function(){document.querySelector(".logout a").addEventListener("click",function(n){n.preventDefault(),localStorage.removeItem("analysisModalShown"),localStorage.removeItem("user_id"),localStorage.removeItem("token"),E("Kirjaudutaan ulos."),setTimeout(()=>{window.location.href="index.html"},1e3)})});
