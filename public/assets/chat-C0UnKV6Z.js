import"./style-Bvx2onkj.js";import{f as h}from"./fetch-dnjvk_SN.js";import{s as _}from"./toast-B-6j1RQv.js";document.addEventListener("DOMContentLoaded",function(){const l=document.querySelector(".menu-toggle"),o=document.querySelector(".menu");l.addEventListener("click",function(){o.classList.toggle("show")})});document.addEventListener("DOMContentLoaded",function(){const l=localStorage.getItem("token"),o=localStorage.getItem("user_id"),I=document.getElementById("send-button"),u=document.getElementById("conversation-list"),m=document.getElementById("messages-container"),g=document.querySelector(".message-write");u.addEventListener("click",n=>{const e=n.target.closest("li");e&&e.dataset.conversationId&&e.dataset.recipientId&&(c=e.dataset.conversationId,a=e.dataset.recipientId,console.log(`Current recipient ID: ${a}`),console.log(c),p(c))}),I.addEventListener("click",L);let a=null,c=null;const y=`http://localhost:3000/api/messages/user/${o}`,v={method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`}};h(y,v).then(n=>{Array.isArray(n)&&n.length>0?(g.style.display="block",n.forEach(e=>{const t=document.createElement("li");t.textContent=`Keskustelu ${e.conversation_id}`,t.dataset.conversationId=e.conversation_id,t.dataset.recipientId=e.recipient_id,u.appendChild(t)})):(m.innerHTML='<div class="no-messages">Sinulle ei ole uusia viestejä.</div>',g.style.display="none")}).catch(n=>{console.error("Keskusteluiden haku epäonnistui:",n),m.innerHTML='<div class="no-messages">Virhe haettaessa keskusteluja.</div>',g.style.display="none"}),u.addEventListener("click",n=>{const e=n.target.closest("li");if(e&&e.dataset.conversationId){c=e.dataset.conversationId,a=e.dataset.recipientId,a||console.error("No recipient ID found for selected conversation");const t=document.getElementById("messages-container");t.innerHTML="",p(c)}});function p(n){const e=`http://localhost:3000/api/messages/conversation/${n}`;h(e,v).then(t=>{if(Array.isArray(t)&&t.length>0){const s=t.find(i=>i.sender_id!==o);s?(a=s.sender_id,console.log("tämä on vastaanottaja",a),k(a).then(i=>{E(i),f(t,o)}).catch(i=>{console.error("Failed to fetch user name:",i)})):f(t,o)}else m.innerHTML='<div class="no-messages">Ei viestejä tässä keskustelussa.</div>'}).catch(t=>{console.error(`Viestien haku epäonnistui keskustelulle ${n}:`,t)})}async function k(n){const e=`http://localhost:3000/api/users/${n}`,t=await fetch(e,{headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`}});if(!t.ok)throw new Error("Failed to fetch user");return(await t.json())[0].username}function E(n){const e=document.getElementById("conversation-header");e.textContent=`Keskustelu sairaanhoitajan ${n} kanssa`}function f(n,e){const t=document.getElementById("messages-container");t.innerHTML="",n.forEach(s=>{const d=new Date(s.message_sent_at).toLocaleString("fi-FI",{timeZone:"Europe/Helsinki"}),r=document.createElement("div");parseInt(s.sender_id)===parseInt(e)?r.className="message client":r.className="message professional",r.innerHTML=`
      <div class="date">${d}</div>
        <div class="message-text">${s.message_content}</div>
      `,t.appendChild(r)}),n.length===0&&(t.innerHTML='<div class="no-messages">Ei saapuneita viestejä</div>')}function L(){const n=localStorage.getItem("token"),e=localStorage.getItem("user_id"),t=document.getElementById("message-input"),s=t.value,i=new Date().toISOString().slice(0,19).replace("T"," "),d={conversation_id:c,recipient_id:a,message_content:s,message_sent_at:i,sender_id:e};console.log(d);const r="http://localhost:3000/api/messages/",S={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(d)};h(r,S),t.value="",console.log("Lähetetty viesti:",s),p(c)}});document.addEventListener("DOMContentLoaded",function(){document.querySelector(".logout a").addEventListener("click",function(o){o.preventDefault(),localStorage.removeItem("analysisModalShown"),localStorage.removeItem("user_id"),localStorage.removeItem("token"),_("Kirjaudutaan ulos."),setTimeout(()=>{window.location.href="index.html"},2e3)})});
