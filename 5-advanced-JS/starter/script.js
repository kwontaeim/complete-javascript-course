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

