let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById('ul-el')
const inputBtn = document.getElementById('input-btn')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')


function prevLeads (){
  const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
  // check ob wert wahr oder falsch ist
  if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage // gibt myLeads seinen wert
    render(myLeads) // gibt die Liste aus, da render mit der var. myLeads arbeitet
  }
}
prevLeads()

function render (leads){
  // gibt den lead aus.
  let listItems = "";

  for(let i = 0; i < leads.length; i++){
    // oldfahioned way:  listItems += "<li> <a href= '" + myLeads[i] +"' target='_blank'>" + myLeads[i] + "</a> </li>"
    // Links: /*<a href="url">link text</a>*/
    listItems += `
      <li>
          <a href= '${leads[i]}' target='_blank'>
            ${leads[i]}
          </a>
      </li>
`
// console.log(listItems);
  }
  ulEl.innerHTML = listItems
}


tabBtn.addEventListener("click",function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    console.log(tabs)
    myLeads.push(tabs[0].url) // *1
    console.log(myLeads)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
  })

})

deleteBtn.addEventListener("click",function(){
  console.log("delete button clicked :D");
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener("click", function(){
  myLeads.push(inputEl.value)
  inputEl.value = ''
  // speichert den input wert im local storage
  localStorage.setItem("myLeads",JSON.stringify(myLeads));
  console.log(myLeads);
  render(myLeads);
})

// *1
// const tabs = [
//   {url:"https://twitter.com/serdarplg"},
// ]


// https://www.youtube.com/watch?v=jS4aFq5-91M&ab_channel=freeCodeCamp.org
// 6:41:15 (functions with parameters)
