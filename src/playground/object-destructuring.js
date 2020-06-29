const person = {
  name: "Royce",
  age: 10,
  location: {
    city: "amherst",
    temp: "92",
  },
};

// const { name = "Anonymous", age } = person;
const { name: firstName = "Anonymous", age } = person;

console.log(
  `The person's name is ${firstName}, and the person's age is ${age}`
);

const { city, temp: temperature } = person.location;
console.log(
  `The person's city is ${city}, and the city's temperature is ${temperature}`
);
