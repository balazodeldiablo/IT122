let cars = [
  
{
  make : "Ford",
  model : "Mustang",
  year : 1964,
  engine : "V8",
  miles: "100,500",
  id : 1
},

{
  make : "Chevrolet",
  model : "Impala",
  year : 1967,
  engine : "V8",
  miles: "123,500",
  id : 2
},

{
  make : "Buick",
  model : "LaCrosse",
  year : 1964,
  engine : "V6",
  miles: "200,560",
  id : 3
},

{
  make : "Pontiac",
  model : "Grand Prix",
  year : 2004,
  engine : "V8",
  miles: "104,504",
  id : 4
},

{
  make : "Dodge",
  model : "Ram 1500",
  year : 1994,
  engine : "V6",
  miles: "223,560",
  id : 5
}
];

export const getAll = () => {
  return cars;
}

export const getItem = (id) => {
  return cars.find(car => car.id == id);
}