import"./style-D24wJ6YD.js";document.addEventListener("DOMContentLoaded",()=>{const d=document.querySelector(".menu-toggle"),u=document.querySelector(".menu");d.addEventListener("click",function(){u.classList.toggle("show")});const s=document.getElementById("breathing-circle"),a=document.getElementById("instruction"),i=document.getElementById("timer"),o=document.getElementById("start-button");let e=null;o.addEventListener("click",m);function m(){o.disabled=!0;const t=120;let n=0;e=setInterval(()=>{n<t?(i.textContent=`Aikaa jäljellä: ${t-n} s`,n++):(clearInterval(e),a.textContent="Harjoitus päättyi",i.textContent="",o.disabled=!1)},1e3),r()}function r(t="inhale",n=0){const l={inhale:{next:"hold",duration:5,text:"Hengitä sisään"},hold:{next:"exhale",duration:2,text:"Pidä hengitystä"},exhale:{next:"inhale",duration:8,text:"Hengitä ulos"}}[t];let c=l.duration;a.textContent=l.text,t==="inhale"?s.style.transform="scale(1.5)":t==="exhale"&&(s.style.transform="scale(1)"),clearInterval(e),e=setInterval(()=>{c>0?i.textContent=`${l.text}: ${c--} s`:(clearInterval(e),r(l.next))},1e3)}});
