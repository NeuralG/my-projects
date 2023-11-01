import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-3cdb5-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const webInDB = ref(database, "Sitelerim")

const myPass = "umcumc1."
const myName = "NeuralG"

const userEl = document.getElementById("username")
const passEl = document.getElementById("password") 
const webNameEl = document.getElementById("website-name")
const webLinkEl = document.getElementById("website")

const buttonEl = document.getElementById("button")
const webListEl = document.getElementById("web-list")


buttonEl.addEventListener("click", function(){
    let name = userEl.value 
    let pass = passEl.value 
    let webName = webNameEl.value
    let webLink = webLinkEl.value

    if (name == myName && pass == myPass){
        let webData = [webName,webLink]
        let webDataStringed = webData.toString()
        push(webInDB,webDataStringed)
    }
    else {
        alert("Bilgileriniz yanlıştır tekrar deneyiniz")
    }
})

onValue(webInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.values(snapshot.val())

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let myObject = currentItem.split(",")
            let currentName = myObject[0]
            let currentLink = myObject[1]
            webListEl.innerHTML += `<li><a href="https://${currentLink}">${currentName}</a></li>`
            
        }    
    } else {
        webListEl.innerHTML = "No items here... yet"
    }
})
