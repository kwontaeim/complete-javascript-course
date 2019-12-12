function Person(name) {
    this.name = name;
}
/* ES5
Person.prototype.myFriends5 = function(friends) {
    
    var arr = friends.map(function(el) {
       return this.name + ' is friends with ' + el; 
    }.bind(this));
    
    console.log(arr);
}
*/
// ES6
Person.prototype.myFriends5 = friends => { 
    var arr = friends.map((el) => `${this.name} is friends with ${el}`);
    console.log(arr);
}