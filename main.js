var currentQuestionID = 0;
var answerIndexes = [];

function OnStart() {
    // Luo kyselyssä käytettävän testidatan
    q1 = new Question("Onko tänään hyvä päivä?", ["On", "Ei", "8^)"])
    q2 = new Question("Oletko hyvä ihminen?", ["Kyllä", "Ehkä?", "8^)"])
    q3 = new Question("Mitä kuuluu?", ["Hyvää", "äÄnIÄ", "8^)"])
    q4 = new Question("Mitä tänään tehdään?", ["Koodia", "8^)", ">8^)"])
    qArr = [q1, q2, q3, q4]
    console.log("qArr length: " +qArr.length)
    // Piilottaa DOM elementit, joita ei haluta alussa näyttää.
    document.getElementById("questionsBlock").style.display = "none";
    document.getElementById("endSummary").style.display = "none";
    // Voi myös hakea arvot muuttujille, jotka sisältävät DOM elementtejä ja joita kutsutaan myöhemmin ohjelman aikana.
}

function StartQuestionnaire() {
    // Antaa globaalille muuttujalle currentQuestionID arvon 0.
    currentQuestionID = 0;
    // luo uuden answerIndexes arrayn.
    answerIndexes = [];
    // piilottaa DOM elementit joita ei tarvita.
    document.getElementById("startBlock").style.display = "none";
    document.getElementById("endSummary").style.display = "none";
    document.getElementById("questionsBlock").style.display = "block";
    // tyhjennä kooste
    let parent = document.getElementById("endBlock");
    while (parent.querySelector("p")) {
        parent.removeChild(parent.firstChild)
    }
    // kutsuu funktiota askNextQuestion()
    AskNextQuestion();
}

function AskNextQuestion() {
    // Tarkastaa, onko kysykymksiä jäljellä. Jos on, kutsuu metodia ShowQuestion. Jos ei, kutsuu metodia ShowEndSummary()
    console.log("currentQuestionID: " +currentQuestionID)
    if (currentQuestionID < qArr.length) {
        ShowQuestion();
    } else {
        ShowEndSummary();
    }
}

function ShowQuestion(question) {
    // question on luokkaa Question
    question = qArr[currentQuestionID];
    // vie question parametrin question DOM elementtiin id “questionline”
    document.getElementById("questionline").innerHTML = question.question;
    console.log(question.question)
    // kutsuu functiota ShowAnswerOptions()
    ShowAnswerOptions(question.answer);
}

function ShowAnswerOptions(answer) {
    // answer on Question luokan answer objekti(array)
    // answer = qArr[currentQuestionID].answer;
    // luo jokaisesta answer arrayn objektista elementin, joka viedään DOM elementtiin id ”answerBlock”
    // UUDET OHJEET luodaan table, johon vastaukset laitetaan
    let ansTable = document.createElement("table");
    ansTable.setAttribute("id", "ansTable");
    document.getElementById("answerBlock").appendChild(ansTable);
    for (let choice of answer) {
        // luo uusi rivi vastaukselle
        let ansRow = ansTable.insertRow(answer.indexOf(choice));
        // luo uusi solu vastaukselle
        let ansCell = ansRow.insertCell(0);
        let choiceText = choice;
        ansCell.innerHTML = choiceText + " ";
        // choicePara = document.createElement("p");
        // choicePara.innerHTML = choiceText + " ";
        // document.getElementById("answerBlock").appendChild(choicePara);
        // jokaiseen luotavaan elementtiin tulee tulee nappi, joka kutsuu metodia answerButtonClicked. Jokaiseen tällaiseen kutsuun tulee parametriksi answerin indexi arrayssä.
        let choiceBtn = document.createElement("button");
        choiceBtn.id = "choice-button"+answer.indexOf(choice);
        choiceBtn.innerHTML = "<i class='fa fa-hand-pointer-o' aria-hidden='true'></i> Valitse" //+answer.indexOf(choice);
        ansCell.insertAdjacentElement("beforeend", choiceBtn);
        document.getElementById(choiceBtn.id).addEventListener("click", function() {AnswerButtonClicked(answer.indexOf(choice))});
    }
    // Tässä kohdassa haasteita voi aiheuttaa se, ettei answer elementtiä tunnisteta arrayksi. Luo siitä silloin uusi array käyttäen Array.from() metodia.
}

function AnswerButtonClicked(index) {
    console.log("AnswerButtonClicked" +index)
    // tyhjentää ruudun
    let node = document.getElementById("answerBlock");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }    
    // laittaa index parametrin answerIndexes arrayn jatkoksi
    answerIndexes.push(index);
    console.log(answerIndexes);
    // nostaa currenQuestionID:tä yhdellä
    currentQuestionID++;
    // kutsuu funktiota AskNextQuestion
    AskNextQuestion();
}

function ShowEndSummary() {
    // kytkee pois DOM elementit joita ei haluta näyttää.
    document.getElementById("questionsBlock").style.display = "none";
    document.getElementById("endSummary").style.display = "block";
    // Vie jokaisen kysymys ja vastaus parin DOM elementtiin id ”endBlock”
    let answerIndexesCounter = 0;
    let i = answerIndexesCounter;
    for (let item of qArr) {
        let qText = item.question;
        let aText = item.answer[answerIndexes[i]]
        console.log("aText: " +aText)
        i++;
        qPara = document.createElement("p");
        qPara.innerHTML = qText +" " +aText;
        document.getElementById("endBlock").appendChild(qPara);
    }
}

console.log("answerIndexes length: " +answerIndexes.length)