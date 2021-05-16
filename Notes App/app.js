console.log("Hello!!")
var noteText = document.getElementById("noteText");
var impBtn = document.getElementById("impBtn");
var notes = localStorage.getItem("notes")
var impNotes = localStorage.getItem("impNotes")
var notesArr = [];
var impNotesArr = [];
var html = '';
showNote();
var addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e){
    showNote();
});


var search = document.getElementById("search");
search.addEventListener("input", function(){
    let allNotesTextArr = document.getElementsByClassName("noteCard");
    Array.from(allNotesTextArr).forEach(function(element){
        let cardText = element.getElementsByTagName("p")[0].innerText;
        console.log(element,cardText);
        cardText = cardText.toLowerCase();
        if(cardText.includes(search.value.toLowerCase())){
            console.log(cardText, search.value.toLowerCase());
            element.style.display = "block";
        }
        else{
            console.log(cardText, search.value.toLowerCase());
            element.style.display = "none";
        }
    });
});

function inputArray(){
    notes = localStorage.getItem("notes")
    impNotes = localStorage.getItem("impNotes")
    if(notes==null&&impNotes==null)
    {
        notesArr = [];
        impNotesArr = [];
    }
    else if(impNotes==null&&notes!=null)
    {
        impNotesArr = [];
        notesArr = JSON.parse(notes);
    }
    else if(impNotes!=null&&notes==null){
            notesArr = [];
            impNotesArr = JSON.parse(impNotes);
    }
    else{
        notesArr = JSON.parse(notes);
        impNotesArr = JSON.parse(impNotes);
    }
}

function showNote(){
    inputArray();
    if(noteText.value!=""){
        if(impBtn.checked==true)
        {
            impNotesArr.unshift(noteText.value);
            localStorage.setItem("impNotes", JSON.stringify(impNotesArr));
        }
        else
        {
            notesArr.push(noteText.value);
            localStorage.setItem("notes", JSON.stringify(notesArr));
        }
        noteText.value = "";
        impBtn.checked = false;
    }
    html='';
    impNotesArr.forEach(function(element, index){
    html+= `
    
    <div class="card noteCard mx-2 my-2" style="width: 18rem; height: auto">
                <div class="card-header bg-info">
                    <h6 class="text-center">Important</h6>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Note ${index +1}</h5>
                    <p class="card-text">
                    ${element}
                    </p>
                    <button id="${(index+1)*10}" onclick="setNotImpNote(this.id)" class="btn btn-warning my-2">Not Important</button>
                    <button id="${(index+1)*1000}" onclick="deleteImpNote(this.id)" class="btn btn-danger">Delete</button>
                </div>
            </div>
            </div>`
    });
    notesArr.forEach(function(element, index){
    html+= `
    <div class="card noteCard mx-2 my-2" style="width: 18rem; height: auto">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + impNotesArr.length + 1}</h5>
                    <p class="card-text">
                        ${element}
                    </p>
                    <button id="${index+1}" onclick="setImpNote(this.id)" class="btn btn-info my-2">Set Important</button>
                    <buttom id="${(index+1)*100}" onclick="deleteNote(this.id)" class="btn btn-warning my-2">Delete</button>
                </div>
            </div>
            </div>`        
    });
let notesBox = document.getElementById("notes");
if(html=='')
{
    html=`<div class="alert alert-info" role="alert">
    Nothing to display here! Use the above section to 'Add Your Note'.
  </div>`
}
notesBox.innerHTML = html;
}

function deleteNote(id){
    id=id/100;
    id=id-1;
    inputArray();
    notesArr.splice(id,1);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    showNote();
}

function deleteImpNote(id){
    id=id/1000;
    id=id-1;
    inputArray();
    impNotesArr.splice(id,1);
    localStorage.setItem("impNotes", JSON.stringify(impNotesArr));
    showNote();
}

function setImpNote(id){
    id=id-1;
    inputArray();
    impNotesArr.unshift(notesArr[id])
    notesArr.splice(id,1);
    localStorage.setItem("impNotes", JSON.stringify(impNotesArr));
    localStorage.setItem("notes", JSON.stringify(notesArr));
    showNote();
}

function setNotImpNote(id){
    id=id/10;
    id=id-1;
    console.log(id);
    inputArray();
    notesArr.unshift(impNotesArr[id]);
    impNotesArr.splice(id,1);
    localStorage.setItem("impNotes", JSON.stringify(impNotesArr));
    localStorage.setItem("notes", JSON.stringify(notesArr));
    showNote();
}


