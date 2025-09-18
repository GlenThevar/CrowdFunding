class car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  describe() {
    console.log("Make: " + this.make + " Model: " + this.model);
  }
}

const obj = new car("Make", "Model");

function normal() {
  console.log("Normal");
}

normal();

const aarow = () => {
  console.log("Arrow Function");
};

obj.describe();
