const challengeData = {
  zero: {category:"CLUB BUILDING",title:"Zero to Hero",intro:"Start with a club outside the spotlight and take it all the way to the top. Build patiently, recruit smartly and turn a small side into a football powerhouse.",rules:["Start with a club outside the top division of its nation.","Use realistic transfers and stay within the club's finances.","Do not use editor changes to boost your club or players."],wins:["Win the top domestic division.","Qualify for and win a major continental trophy."]},
  glory: {category:"CLUB BUILDING",title:"Road to Glory",intro:"Choose a small club and write a rise-to-the-top story. Every promotion, signing and trophy should move the project forward.",rules:["Start in the lowest playable division available in your chosen nation.","Keep the club financially sustainable.","Build a squad capable of progressing through the divisions."],wins:["Reach the top division.","Win a major domestic trophy."]},
  academy: {category:"YOUTH DEVELOPMENT",title:"Youth Academy Only",intro:"Build a team using players developed through your own youth academy. Make your facilities, coaching and recruitment the foundations of success.",rules:["Only use players produced by your own youth academy.","Do not sign players from other clubs, including on loan.","You may retain staff and improve facilities within the club's finances."],wins:["Win your domestic league.","Win a major continental trophy using an academy-only squad."]},
  wonderkid: {category:"YOUTH DEVELOPMENT",title:"The Wonderkid Factory",intro:"Become the world's best club for developing young talent. Recruit early, develop brilliantly and sell your stars for record fees.",rules:["Only sign players aged 19 or younger.","Prioritise player development, coaching and facilities.","Track the progress and transfer value of academy and first-team prospects."],wins:["Win a major trophy.","Sell a developed player for a club-record transfer fee."]},
  journey: {category:"JOURNEYMAN",title:"Journey Manager",intro:"Build a career across different leagues and football cultures. Take opportunities, earn your reputation and see where the journey takes you.",rules:["Begin unemployed or at a lower-reputation club.","Move clubs only when a suitable new challenge becomes available.","Do not reload matches to change results."],wins:["Manage in at least three different countries.","Win a major domestic trophy in two different nations."]},
  giants: {category:"CLUB BUILDING",title:"Fallen Giants",intro:"Take a historic club that has fallen from the top and restore its place among the elite.",rules:["Choose a club with a significant history that is outside its nation's current elite.","Work within realistic financial limits.","Prioritise sustainable squad building over short-term spending."],wins:["Return the club to the top division if necessary.","Win the domestic league and re-establish the club in continental competition."]}
};
const grid=document.getElementById("challengeGrid");
const cards=[...document.querySelectorAll(".challenge-card")];
const filters=[...document.querySelectorAll(".filter-button")];
const search=document.getElementById("searchInput");
const empty=document.getElementById("emptyState");
let activeFilter="All";
function updateCards(){
  const term=search.value.trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const categoryMatch=activeFilter==="All"||card.dataset.category===activeFilter;
    const searchMatch=(card.dataset.search+" "+card.innerText).toLowerCase().includes(term);
    const show=categoryMatch&&searchMatch;
    card.hidden=!show;
    if(show) visible++;
  });
  empty.hidden=visible!==0;
}
filters.forEach(button=>button.addEventListener("click",()=>{
  activeFilter=button.dataset.filter;
  filters.forEach(item=>item.classList.toggle("active",item===button));
  updateCards();
}));
search.addEventListener("input",updateCards);
const dialog=document.getElementById("challengeDialog");
document.querySelectorAll(".details-button").forEach(button=>button.addEventListener("click",()=>{
  const item=challengeData[button.dataset.challenge];
  if(!item)return;
  document.getElementById("dialogCategory").textContent=item.category;
  document.getElementById("dialogTitle").textContent=item.title;
  document.getElementById("dialogIntro").textContent=item.intro;
  document.getElementById("dialogRules").innerHTML=item.rules.map(x=>`<li>${x}</li>`).join("");
  document.getElementById("dialogWins").innerHTML=item.wins.map(x=>`<li>${x}</li>`).join("");
  dialog.showModal();
}));
document.getElementById("dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>nav.classList.remove("open")));
