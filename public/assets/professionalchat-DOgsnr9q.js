import"./style-rboiuBOe.js";import{f as a}from"./fetch-CGUiTqyx.js";import{s as _}from"./toast-B-6j1RQv.js";document.addEventListener("DOMContentLoaded",function(){const k=document.getElementById("send-button"),p=document.getElementById("message-content"),i=document.getElementById("recipient-id"),c=document.getElementById("messages-container"),h=document.getElementById("user-list"),r=localStorage.getItem("token"),u=localStorage.getItem("user_id");console.log("User ID on load:",u);let d=null;const L=document.querySelector(".menu-toggle"),C=document.querySelector(".menu");L.addEventListener("click",function(){C.classList.toggle("show")}),k.addEventListener("click",U),M();async function M(){a("https://hyte24.northeurope.cloudapp.azure.com/api/student/",{headers:{Authorization:`Bearer ${r}`}}).then(t=>{B(t)}).catch(t=>{console.error("Error fetching users:",t)})}function B(n){h.innerHTML="",n.forEach(t=>{const e=document.createElement("li");e.textContent=t.username,e.dataset.userId=t.user_id,e.addEventListener("click",y),h.appendChild(e)})}async function l(n){const t=`https://hyte24.northeurope.cloudapp.azure.com/api/messages/user/${n}`;a(t,{headers:{Authorization:`Bearer ${r}`}}).then(e=>{c.innerHTML="",e.length>0?(d=e[0].conversation_id,e.forEach(o=>v(o.conversation_id))):d=null}).catch(e=>{console.error("Error fetching conversations:",e),c.innerHTML="Ei viestejä."})}async function g(n){const t=`https://hyte24.northeurope.cloudapp.azure.com/api/users/${n}`;try{const e=await fetch(t,{headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}});if(!e.ok)throw new Error("Failed to fetch user");return(await e.json())[0].username}catch(e){return console.error("Failed to fetch user name:",e),"Nimetön käyttäjä"}}function f(n){const t=document.getElementById("conversation-header");t.textContent=`Keskustelu käyttäjän ${n} kanssa`}async function y(n){const t=n.target.dataset.userId;i.dataset.userId=t;const e=await g(t);f(e),l(t)}function v(n){const t=`https://hyte24.northeurope.cloudapp.azure.com/api/messages/conversation/${n}`;a(t,{headers:{Authorization:`Bearer ${r}`}}).then(e=>{Array.isArray(e)&&e.length>0?T(e,u):c.innerHTML='<div class="no-messages">Ei viestejä tässä keskustelussa.</div>'}).catch(e=>{console.error(`Viestien haku epäonnistui keskustelulle ${n}:`,e)})}function T(n,t){const e=document.getElementById("messages-container");e.innerHTML="",n.forEach(o=>{const m=new Date(o.message_sent_at).toLocaleString("fi-FI",{timeZone:"Europe/Helsinki"}),s=document.createElement("div");parseInt(o.sender_id)===parseInt(t)?s.className="message client":s.className="message professional",s.innerHTML=`
      <div class="date">${m}</div>
        <div class="message-text">${o.message_content}</div>
      `,e.appendChild(s)}),n.length===0&&(e.innerHTML='<div class="no-messages">Ei saapuneita viestejä</div>')}async function U(){const n=i.dataset.userId,t=p.value,e=new Date().toISOString().slice(0,19).replace("T"," "),o={conversation_id:d,sender_id:u,recipient_id:n,message_content:t,message_sent_at:e},I="https://hyte24.northeurope.cloudapp.azure.com/api/messages",m={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(o)};try{const s=await a(I,m);if(console.log(s.conversation_id),s.conversation_id){console.log("Message sent successfully");let E=s.conversation_id;console.log(E),p.value="",v(E)}else console.error("Viestin lähettäminen epäonnistui"),_("Viestin lähettäminen epäonnistui")}catch(s){console.error(s),_("Viestin lähettäminen epäonnistui")}}});