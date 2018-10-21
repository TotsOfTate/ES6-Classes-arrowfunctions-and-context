var temp = {
  name: "Ryan",
  tasks: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  method: function() {
    // "this" refers to temp's context (properties).

    // ES5 way of doing it. "this" will have access to the properties on the temp object.
    this.tasks.forEach(
      function(task) {
        task.forEach(
          function(subTask) {
            // Name is avaiable because "this" was proxied as temp.
            console.log(this.name + " has subtask " + subTask);
          }.bind(this)
        );
      }.bind(this)
    );

    // Bind "this" to the function call.
    this.tasks.forEach(task => {
      // Keep proxying it in.
      task.forEach(subTask => {
        // Name is avaiable because "this" was proxied as temp.
        console.log(this.name + " has subtask " + subTask);
      });
    });
  },
  jaseCode: function() {
    // Outside of the class, "this" refers to temp.

    class Person {
      // Inside the class, "this" refers to Person.

      constructor(id, email, name, gender) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.gender = gender;
      }

      speakInsideClass = () => "Hello, my name is " + this.name;

      // the above code in ES5 is:
      speakInsideClassES5 = function() {
        return "Hello, my name is " + this.name;
      }.bind(this); // Right now, this is "Person", which does have a name.
    } // Left the class context, now "this" will mean it is the temp object.

    const kennan = new Person(2, "kdiben1@tinypic.com", "Kennan", "M");
    // kennan does not know what "speak" is.

    kennan.speak = () => `Hello, my name is ${this.name}`;

    kennan.es5speak = function() {
      return "Hello, my name is " + this.name;
    }.bind(this); // At this point, this is the "temp" object.

    // Creates a new function. When it does that, it is
    // binding to the lexical environment.
    kennan.speak2 = function() {
      return "Hello, my name is " + this.name;
    }; // There is no binding happening here. So, this refers to the
    // object it is called on, which is kennan.

    console.log(kennan.speak());
    console.log(kennan.es5speak());
    console.log(kennan.speakInsideClass());
    console.log(kennan.speakInsideClassES5());
    console.log(kennan.speak2());
  }
};

temp.jaseCode();
