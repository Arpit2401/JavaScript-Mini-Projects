document.getElementById("searchBtn").addEventListener("click", function(e){
    displayMeaning();
});
var input = document.getElementById("input");
input.addEventListener('keypress',function(e){
  if(e.key=='Enter'){
      e.preventDefault();
      displayMeaning();
  }
});

function displayMeaning()
{
  var response;
  async function fetchMeaning(){
    response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${input.value}`);
    const data = await response.json();
    return data; 
  }

  function setMeaning(dataObj){
    document.querySelector(".meaning-container").style.display = "block";

    document.querySelector(".word").innerHTML = `<b>Word: </b> ${input.value}`;
    if(response.status ==  404){
      document.querySelector(".word").innerHTML += `<br><br><b>${dataObj.title}</b><br>${dataObj.message}<br><br>${dataObj.resolution}`;
      document.querySelector(".phonetics").innerHTML = ``;
      document.querySelector(".audio").innerHTML = ``;
      document.querySelector(".meanings").innerHTML = ``;
      return
    }
    if(dataObj[0].phonetics.length>0){
      document.querySelector(".phonetics").innerHTML = `<b>Phonetics: </b>  ${dataObj[0].phonetics[0].text}`;
    }
    if(dataObj[0].phonetics[0].audio!=null){
      document.querySelector(".audio").innerHTML = `<audio controls><source src="${dataObj[0].phonetics[0].audio}"></audio>`;
    }
    document.querySelector(".meanings").innerHTML = ``;
    meaningData = ``;
    console.log(dataObj[0].meanings);
    dataObj[0].meanings.forEach((element,index) => {
      meaningData += `<b>Meaning ${index + 1}</b><br><br>
                      <b>Part of Speech: </b> ${element.partOfSpeech}<br>
                      <b>Definition: </b> ${element.definitions[0].definition}<br>`;
      if(element.definitions[0].example!=null)
      {
        meaningData += `<b>Example: </b> ${element.definitions[0].example}<br>`;
      }
      if(element.definitions[0].synonyms!=null)
      {
        s=``
        element.definitions[0].synonyms.forEach(element => s+=` ${element} | `)
        meaningData += `<b>Synonyms: </b> ${s}<br>`;
      }
      if(element.definitions[0].antonyms!=null)
      {
        a=``
        element.definitions[0].antonyms.forEach(element => a+=` ${element} | `)
        meaningData += `<b>Antonyms: </b> ${a}<br>`;
      }
      meaningData +=`<br><br>`;
    });
    document.querySelector(".meanings").innerHTML = `${meaningData}`;
    
  }

  var dataPromise = fetchMeaning();
  dataPromise.then(dataObj => setMeaning(dataObj)).catch();
}