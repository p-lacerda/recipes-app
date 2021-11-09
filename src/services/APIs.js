const getApis = async (url) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export default getApis;

// export function generatesFilters(meals) {
//   const arrFilt = [];
//   meals.map((meal) => {
//     if (!arrFilt.includes(`${meal.strCategory}`)) {
//       arrFilt.push(meal.strCategory);
//     }
//     console.log(arrFilt);
//     return arrFilt;
//   });
// }
