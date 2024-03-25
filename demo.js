//For real data
const user1 = {
    id: "",
    firstName: "",
    lastName: "",
    country: "",
    birthDate: "",
    photo: "",
    sex: "",
    state: "",
    city: ""
};

//For fake data
const user2 = {
    id: "",
    firstName: "",
    lastName: "",
    country: "",
    birthDate: "",
    photo: ""
};

const currentUser = {
    id: "",
    firstName: "",
    lastName: "",
    country: "",
    birthDate: "",
    photo: ""
};

//Players choice (true = accept, false = deny)
let playerChoice;

//Random chance to appear an error
let errorChance;
let errorLimit = 0.08;

function generateUsers(){
    document.getElementById("print").innerHTML = "";    //Reset print

    fetch("https://randomuser.me/api/?results=2")   //Generate 2 user. User 1 will have the real data and User 2 will have the wrong data
    .then(function getResult(result){
        return result.json();
    })
    .then(function getData(data){

        // User 1 (Real data)
        let user = data.results[0];
        user1.id = user.id.value;
        user1.firstName = user.name.first;
        user1.lastName = user.name.last;
        user1.country = user.location.country;
        user1.birthDate = user.dob.date.substring(0, user.dob.date.indexOf("T"));
        user1.photo = user.picture.large;
        user1.sex = user.gender.substring(0,1).toUpperCase();   //For passport
        user1.state = user.location.state;  //For passport
        user1.city = user.location.city;    //For passport

        //User 2 (Fake data)
        user = data.results[1];
        user2.id = user.id.value;
        user2.firstName = user.name.first;
        user2.lastName = user.name.last;
        user2.country = user.location.country;
        user2.birthDate = user.dob.date.substring(0, user.dob.date.indexOf("T"));
        user2.photo = user.picture.large;

        //Current User
        currentUser.id = rollDice()? user1.id : user2.id;
        currentUser.firstName = rollDice()? user1.firstName : user2.firstName;
        currentUser.lastName = rollDice()? user1.lastName : user2.lastName;
        currentUser.country = rollDice()? user1.country : user2.country;
        currentUser.birthDate = rollDice()? user1.birthDate : user2.birthDate;
        currentUser.photo = rollDice()? user1.photo : user2.photo;

        console.log(user1);
        console.log(user2);
        console.log(currentUser);

        print();
    })
}

//Print cards
function print(){
    document.getElementById("print").innerHTML += 
    `
    <div id="user">
    <h1>Entry permit</h1>
    <img src="${currentUser.photo}" alt="foto">
    <h2>ID number: ${currentUser.id}</h2> 
    <h2>Full name: ${currentUser.firstName} ${currentUser.lastName}</h2>
    <p>Date of birth: ${currentUser.birthDate}</p>
    <p>Country: ${currentUser.country}</p>
    </div>
    <div id="passport">
    <h1>Passport</h1>
    <div id="passportDesc">
    <div>
    <img src="${user1.photo}" alt="foto">
    </div>
    <div style="padding: 15px">
    <p><b>Surname</b>
    <br>${user1.lastName}</p>
    <p><b>Name</b>
    <br>${user1.firstName}</p>
    <p><b>Nationality</b>
    <br>${user1.country}</p>
    <p><b>Date of birth</b>
    <br>${user1.birthDate}</p>
    </div>
    <div style="padding: 5px">
    <h4>ID: ${user1.id}</h4>
    <p><b>Sex</b>
    <br>${user1.sex}</p>
    <p><b>State</b>
    <br>${user1.state}</p>
    <p><b>City of birth</b>
    <br>${user1.city}</p>
    </div>
    </div>
    </div>
    `
}

//Randomizes error
function rollDice(){
    errorChance = Math.random();
    if (errorChance > errorLimit){
        return true;
    }
    else{
        return false;
    }
}

//When player accepts
function playerAccept(){
    playerChoice = true;
    checkResult();
}

//When player denies
function playerDeny(){
    playerChoice = false;
    checkResult();
}

//Check if something is wrong and if player is correct
function checkResult(){
    let result = true;

    //Check data
    if (currentUser.id != user1.id){
        result = false;
    }

    if (currentUser.firstName != user1.firstName){
        result = false;
    }

    if (currentUser.lastName != user1.lastName){
        result = false;
    }

    if (currentUser.country != user1.country){
        result = false;
    }

    if (currentUser.birthDate != user1.birthDate){
        result = false;
    }

    //Check if player is right
    if (result == playerChoice){
        alert("CORRECT!");
    }
    else{
        alert("INCORRECT!");
    }

    //Next user
    generateUsers();
}