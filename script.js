let unord = document.getElementById("unord-el")
let inputBox = document.getElementById("input-el")
let inputBtn = document.getElementById("input-btn")
let deleteBtn = document.getElementById("delete-btn")
let saveTabBtn = document.getElementById("saveTab-btn")
var deleteIconBtn
let checkHttp = true


function del(){
    console.log("called")
    let index = this.id
    console.log(index)
    inputs.splice(index,1)
    localStorage.setItem("list",JSON.stringify(inputs))
    populate()
}

let inputs = []

populate()

inputBtn.addEventListener("click",insertlist)

function insertlist(){
    let temp = inputBox.value
    if(temp !== ""){
        check(temp)
        
    }

   
}

function addToArray(a){
    inputs.push(a)
    localStorage.setItem("list",JSON.stringify(inputs))
    console.log(a)
    inputBox.value = ""
    populate()
}

function check(t){
    if(checkHttp === true && checkIfHttp(t)){
        addToArray(t)
    }else{
        let temp = "https://" + t
        addToArray(temp)
    }

}


deleteBtn.addEventListener("click",function(){
    localStorage.clear()
    inputs = []
    populate()
})


saveTabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tab){
        check(tab[0].url)
       
    })
    
})




function populate(){
    
    let list = ""
    if(localStorage.getItem("list") == null){
        localStorage.setItem("list",JSON.stringify(inputs))
    }else{
        inputs = JSON.parse(localStorage.getItem("list"))
    }
    for(let i=0; i<inputs.length; i++){
        list += `
            <li>
                <a target="_blank" href="${inputs[i]}">${inputs[i]}</a>
                <span class="deleteIcon" id="${i}"><img  src="images/delete.png" alt="delete button"></span>
            </li>
        `
        // unord.innerHTML +=  '<li><a href="' + inputs[i] + '">' + inputs[i] + "</li>"
        // const li = document.createElement("li")
        // li.textContent = inputs[i]
        
        // unord.append(li)
    }
    unord.innerHTML = list
    deleteIconBtn = document.querySelectorAll(".deleteIcon")
    console.log(deleteIconBtn)
    for(let i=0; i<deleteIconBtn.length; i++){
        deleteIconBtn[i].addEventListener("click",del)
        console.log(deleteIconBtn[i])
    }
    
}



function checkIfHttp(str){
    let a = str.split("")
    let res =0
    let https = ["h","t","t","p"]
    for(let i=0; i<4; i++){
        if(https[i] == a[i]){
            res++
        }
    }

    if(res == 4)
        return true
    else
        return false
}
