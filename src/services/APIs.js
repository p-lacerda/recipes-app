export const getApis = async (url) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export function generatesFilters(meals) {
  const arrFilt = [];
  meals.map((meal) => {
    if (!arrFilt.includes(`${meal.strCategory}`)) {
      arrFilt.push(meal.strCategory);
    }
    return arrFilt;
  });
}
