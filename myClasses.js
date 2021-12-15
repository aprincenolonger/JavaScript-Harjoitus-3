class Question {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
    static getQuestion() {
        return Question.question;
    }
}

// Tee myClasses tiedostoon luokka Question 
// Anna luokalle attribuutit question ja answer 
// Tee sille constructori johon tulee parametreitä question ja answer objektit 
// Tee luokalle myös staattinen metodi getQuestion joka palauttaa parametrinä syötetyn Question-luokan question parametrin. 
// answer on array objekti joka voi sisältää useamman vastausvaihtoehdon