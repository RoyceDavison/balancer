const address = ["1299 ABC Stree", "Boston", "Mass", "10003"];

//map by position
const [, city, state = "Default: New York"] = address;

console.log(`You are in the city: ${city}, in the state: ${state}`);
