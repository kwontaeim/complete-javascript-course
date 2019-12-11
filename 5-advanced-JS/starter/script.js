//////////////////////////////
// Lecture: Closures
//

function interviewQuestion(job) {
    var question;
    if (job === 'designer') {
        question = ', can you please explain what UX design is?';
        return function(name) {
            console.log(name + question);
        }
    } else if (job === 'teacher') {
        question = 'What subject do you teach, ';
        return function(name) {
            console.log(question + name + '?');
        }
    } else {
        question = ', what do you do?';
        return function(name) {
            console.log('Hello ' + name + question);
        }
    }
}

/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

// make it as IIFE
(function() { 
    var Question = 
    function (question, answers, correctAns) {
        this.question = question;
        this.answers = answers;
        this.correctAns = correctAns; 
    }
    
    Question.prototype.print = 
    function() {
        console.log(this.question);
        for(var i = 0; i < this.answers.length; i++) {
            console.log(' '+(i+1) + ') ' + this.answers[i]);
        }
    }
    Question.prototype.checkAnswer = 
    function(ans, callback) {
        var sc;
        if (ans === this.correctAns) {
            console.log('You are right!');
            sc = callback(true);
        } else {
            console.log('Mm, Not really, Please try again');
            sc = callback(false);
        }
        this.displayScore(sc);
    }

    Question.prototype.displayScore = 
    function (score) {
        console.log('Your current score is '+ score);
        console.log('-----------------------------');
    }
    var questions = [];
    
    questions.push(new Question (
        '1. what is my age?',
        [29, 30, 31],
        2
    ));
    
    questions.push(new Question (
        '2. where do I live?',
        ['Seoul', 'Copenhagen', 'London'],
        3
    ));
    
    questions.push(new Question (
        '3. what am I learning now?',
        ['JS', 'Java', 'React'],
        1
    ));

    /*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/
    // use closure
    function addScore() {
        var score = 0;
        return function (correct) {
            if (correct) {
                score++;
            }
            return score;
        }
    }
    var keepScore = addScore();

    displayQustion();

    function displayQustion() {
        var n = Math.floor(Math.random() * questions.length);
        questions[n].print();
        var answer = prompt('Please enter the right answer below');

        if (answer !== 'exit') {
            questions[n].checkAnswer(parseInt(answer), keepScore);
            displayQustion();   
        }
    }

})();



