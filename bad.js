const fs = require("fs");

const startDate = new Date();

const file = fs.readFileSync("10m.txt", "utf-8");   //here you can write your file name

const arr = file.split("\n").map((el) => +el);

const max = arr.reduce((prev, next) => Math.max(prev, next), -Infinity);
const min = arr.reduce((prev, next) => Math.min(prev, next), Infinity);

const arithmetic = arr.reduce((prev, next) => prev + next, 0) / arr.length;

function median(array) {
  const sorted = array.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    return sorted[middle];
  }
}

function consecutivePlus() {
  const mainArr = [];
  let prevResult = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] === 1) {
      if (!prevResult.length) prevResult.push(arr[i - 1]);
      prevResult.push(arr[i]);
    } else if (prevResult.length) {
      if (prevResult.length > 0) mainArr.push(prevResult);
      prevResult = [];
      continue;
    }
  }
  const result = findLargestArray(mainArr);
  return result;
}

function findLargestArray(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (result.length < arr[i].length) result = arr[i];
  }
  return result;
}

function consecutiveMinus() {
  const mainArr = [];
  let prevResult = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] - arr[i] === 1) {
      if (!prevResult.length) prevResult.push(arr[i - 1]);
      prevResult.push(arr[i]);
    } else if (prevResult.length) {
      if (prevResult.length > 0) mainArr.push(prevResult);
      prevResult = [];
      continue;
    }
  }
  const result = findLargestArray(mainArr);
  return result;
}

console.log("Max: ", max);
console.log("Min: ", min);
console.log("Median:", median(arr));
console.log("Arithmetic mean:", arithmetic);
console.log("Growing array: ", consecutivePlus());
console.log("Descending array: ", consecutiveMinus());
const endDate = new Date();
console.log(`Total time : ${(endDate - startDate) / 1000} seconds`);
