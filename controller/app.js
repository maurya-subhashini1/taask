const express=require("express");
// require("./db/con")
const Usersdetail=require("../model/schema")





const datagetcontrise=async(req,res)=>{
    // Define the countries array
const countries = ["India", "Nepal", "Germany", "Finland"];

// Define the matrix size
const matrixSize = 3;

// Define a function to get a random country from the countries array
function getRandomCountry() {
  return countries[Math.floor(Math.random() * countries.length)];
}

// Define a function to generate the matrix
function generateMatrix() {
  const matrix = [];

  // Loop through each row of the matrix
  for (let i = 0; i < matrixSize; i++) {
    const row = [];

    // Loop through each column of the matrix
    for (let j = 0; j < matrixSize; j++) {
      // Get a random country and add it to the row
      const country = getRandomCountry();
      row.push(country);
    }

    // Add the row to the matrix
    matrix.push(row);
  }

  return matrix;
}

// Define a function to calculate the ranks of the countries
function calculateRanks(matrix) {
  const ranks = {};

  // Loop through each row of the matrix
  for (let i = 0; i < matrixSize; i++) {
    let currentCountry = null;
    let currentCount = 0;

    // Loop through each column of the matrix
    for (let j = 0; j < matrixSize; j++) {
      const country = matrix[i][j];

      if (country === currentCountry) {
        // If the country is the same as the previous country, increase the count
        currentCount++;
      } else {
        // If the country is different from the previous country, update the rank for the previous country
        if (currentCountry) {
          if (!ranks[currentCountry] || currentCount > ranks[currentCountry]) {
            ranks[currentCountry] = currentCount;
          }
        }

        // Start counting for the new country
        currentCountry = country;
        currentCount = 1;
      }
    }

    // Update the rank for the last country in the row
    if (currentCountry) {
      if (!ranks[currentCountry] || currentCount > ranks[currentCountry]) {
        ranks[currentCountry] = currentCount;
      }
    }
  }

  return ranks;
}

// Generate the matrix
const matrix = generateMatrix();

// Calculate the ranks of the countries
const ranks = calculateRanks(matrix);

// Log the matrix and ranks to the console
console.log(matrix);
res.send({
    matrix:matrix,
    ranks:ranks
})
console.log(ranks);
}



const getRankOfContrise=async(req,res)=>{
    // Define the list of countries
const countries = ['India', 'Nepal', 'Bhutan', 'Bangladesh'];

// Function to generate a random country from the list
function getRandomCountry() {
  return countries[Math.floor(Math.random() * countries.length)];
}

// Generate a 2-D array with random countries
const outcome = [];
for (let i = 0; i < 10; i++) { // Assuming 10 rows for example purposes
  const row = [];
  for (let j = 0; j < 5; j++) { // Assuming 5 columns for example purposes
    row.push(getRandomCountry());
  }
  outcome.push(row);
}

// Function to calculate the rank of consecutive countries in a row
function calculateRank(row) {
  let currentCountry = '';
  let currentCount = 0;
  const rank = {};
  for (let i = 0; i < row.length; i++) {
    if (row[i] === currentCountry) {
      currentCount++;
    } else {
      if (currentCount > 1) {
        rank[currentCountry] = currentCount;
      }
      currentCountry = row[i];
      currentCount = 1;
    }
  }
  if (currentCount > 1) {
    rank[currentCountry] = currentCount;
  }
  return rank;
}

// Calculate the rank of consecutive countries in each row
const rank = {};
for (let i = 0; i < outcome.length; i++) {
  const rowRank = calculateRank(outcome[i]);
  for (let country in rowRank) {
    if (country in rank) {
      rank[country] += rowRank[country];
    } else {
      rank[country] = rowRank[country];
    }
  }
}

// Return the outcome and rank as the response
const response = {
  outcome: outcome,
  rank: rank
};
return response;


}
module.exports={datagetcontrise,getRankOfContrise}