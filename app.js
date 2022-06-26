const menuBtn = document.querySelector(".c-menu-btn");
const menu = document.querySelector(".c-menu-wrapper");
const linkField=document.querySelector(".c-shortner__input");
const shorteringBtn=document.querySelector(".c-shortner__btn");
const shorteringMessage=document.querySelector(".c-shortner__message");
const shortedLinksWrapper=document.querySelector(".c-shortend-wrapper")
const links=JSON.parse(localStorage.getItem("links"))||[];


function checkInput(){
    if(linkField.value.trim()===""){
        showMessage("please add a link")
        showRecentLinks(links)
    }else{
        hideMessage()
        const linkObj=links.find(obj=>obj.url.toLowerCase()===linkField.value.toLowerCase());
        if(linkObj){
            shortedLinksWrapper.innerHTML="";
            createNewLinkElement(linkObj);
        }else{
               fetchToApi(linkField.value)
        }
     
    }
}
function showMessage(message){
    shorteringMessage.textContent=message;
    linkField.classList.add("js-invalid");
}
function hideMessage(){
    shorteringMessage.textContent="";
    linkField.classList.remove("js-invalid");
}
function openCloseMenu(e) {
    e.target.classList.toggle("fa-bars");
    e.target.classList.toggle("fa-times")
     menu.classList.toggle("js-open")
}
function showRecentLinks(links){
    shortedLinksWrapper.innerHTML=""
    links.forEach(link => {
        createNewLinkElement(link);
    });
      
}
function createNewLinkElement(link){
     const divElem=document.createElement("div");
     divElem.classList="c-shortend-item u-ai-center u-d-flex u-jc-spacebetween u-br-5";
     divElem.innerHTML=` <p class="c-shortend-item__link">${link.url}</p>
     <p class="c-shorted-item__short-link">${link.shortUrl}</p>`;
     const copyBtn=document.createElement("button");
     copyBtn.classList="c-shorted-item__copy u-fs-15 o-round-btn u-br-5";
     copyBtn.addEventListener("click",(e)=>{
        const copyButton=e.target;
          const shortLink=copyButton.previousElementSibling.textContent;
          window.navigator.clipboard.writeText(shortLink);
          copyButton.classList.add("click");
          copyButton.textContent="Copied !";
          setTimeout(()=>{
            copyButton.classList.remove("click");
            copyButton.textContent="copy";
          },1000)
     })
     copyBtn.textContent="copy";
     divElem.appendChild(copyBtn);
     shortedLinksWrapper.append(divElem)
    //  return divElem
}
async function fetchToApi(url){
       const response= await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
       const result=await response.json();
       if(result.ok){
        const newShortUrl={
            url:url,
            shortUrl:result["result"]["short_link"]
        }
        renderNewUrl(newShortUrl)
       }else{
        showMessage(result["error"]);
        showRecentLinks(links)
       }
}

function renderNewUrl(url){
    links.push(url);
    updateLocalStorage(links);
    shortedLinksWrapper.innerHTML="";
    createNewLinkElement(url);

}
function updateLocalStorage(links){
  localStorage.setItem("links",JSON.stringify(links));
}


shorteringBtn.addEventListener("click",checkInput);
menuBtn.addEventListener("click", openCloseMenu);