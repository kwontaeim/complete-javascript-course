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

/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Element {
    constructor(name, buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element {
    constructor(name, buildYear, area, tree) {
        super(name, buildYear);
        this.area = area;
        this.tree = tree;
    }
    density() {
        return this.tree / this.area;
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    classifySize() {
        const sizeClass = new Map();
        sizeClass.set(1, 'tiny');
        sizeClass.set(2, 'small');
        sizeClass.set(3, 'normal');
        sizeClass.set(4, 'big');
        sizeClass.set(5, 'huge');
        return sizeClass.get(this.size);
    }
}

function calc(arr) {
    const sum = arr.reduce((pre, cur) => pre + cur);
    return [sum, sum / arr.length];
}

const parks = [new Park('Green Park', 1987, 0.2, 215),
new Park('National Park', 1894, 2.9, 3541),
new Park('Oak Park', 1953, 0.4, 949)];

const streets = [new Street('Ocean Avenue', 1999, 1.1, 4),
  new Street('Evergreen Street', 2008, 2.7, 2),
  new Street('4th Street', 2015, 0.8),
  new Street('Sunset Boulevard', 1982, 2.5, 5)];

const parkReport  = arr => {
    console.log('-----PARK REPORT-----');

    //2. Average age of each town's park (forumla: sum of all ages/number of parks)
    const ages = arr.map(el => new Date().getFullYear() - el.buildYear);
    const average = calc(ages);
    console.log(`Our ${arr.length} parks have an average age of ${average} years`);

    //1. Tree density of each park in the town (forumla: number of trees/park area)
    arr.forEach(el => console.log(`${el.name} has a tree density of ${el.density()} per squere km`));

    //3. The name of the park that has more than 1000 trees
    const i = arr.map(el => el.tree).findIndex(el => el >= 1000);
    console.log(`${arr[i].name} has more than 1000 trees`);
    console.log('--------------------');
}

const streetReport = arr => {
    console.log('-----STREET REPORT-----');

    //4. Total and average length of the town's streets
    const [sum, average] = calc(arr.map(el => el.length));
    console.log(`Our ${arr.length} streets have total length of ${sum} km and with average of ${average} km`);

    //5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
    arr.forEach(el => console.log(`${el.name}, built in ${el.buildYear}, is a ${el.classifySize()} street`));
    console.log('-----------------------');
}

parkReport(parks);
streetReport(streets);
