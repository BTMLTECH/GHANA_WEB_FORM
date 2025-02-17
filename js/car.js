// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCV-x7ngNGrQirAziyUXFdsCGTcvrXsmLM",
//   authDomain: "btm-ghana-webform.firebaseapp.com",
//   databaseURL: "https://btm-ghana-webform-default-rtdb.firebaseio.com",
//   projectId: "btm-ghana-webform",
//   storageBucket: "btm-ghana-webform.firebasestorage.app",
//   messagingSenderId: "239365523867",
//   appId: "1:239365523867:web:7a3a3b0e5e67d2eda0793e",
//   measurementId: "G-FGBL2YJXKM"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// import {
//   ref,
//   set,
//   child,
//   update,
//   remove,
//   getDatabase,
// } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

// const db = getDatabase();

// window.addEventListener("load", (event) => {
//   document.getElementById("modal").style.display = "none";
//   console.log("page is fully loaded");
// });

// Webfont Loader
WebFont.load({
  google: {
    families: ["Inter", "Montserrat"],
  },
});

const banner = document.getElementById("banner");
const closeBannerBtn = document.getElementById("closeBanner");

// Navbar Logic
const navBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("menu");

function toggleMenu() {
  mobileMenu.classList.toggle("show-menu");
}

navBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);

// Store alerts
let alerts;

function handleAlerts() {
  // Check for alerts
  if (alerts) {
    banner.classList.remove("hide");
    const p = document.createElement("p");
    p.textContent = alerts[0].description;
    banner.appendChild(p);
  } else {
    banner.classList.add("hide");
  }
}

handleAlerts();

closeBannerBtn.addEventListener("click", function () {
  banner.classList.add("hide");
});

// Last Modified Date
const currentDateSpan = document.getElementById("currentDate");

const now = new Date();
currentDateSpan.textContent = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "full",
}).format(now);

/***
 * This fuction will load all country and put
 * it in the select fuction.
 */
async function loadCountry() {
  const country = await fetch("https://api.yeve.co.uk/country");
  const data = await country.json();
  console.log(data);
  let elementOption = `<option selected disabled value="">Please enter Country name.</option>`;
  data.map((element) => {
    elementOption += `<option value=${element.name}>${element.name}</option>`;
  });
  let Nationality = document.getElementById("Nationality");
  let Country_of_Arrival = document.getElementById("Country_of_Arrival");
  let Originating_country = document.getElementById("Originating_country");
  let issued_by = document.getElementById("issued_by");
  Nationality.innerHTML = elementOption;
  issued_by.innerHTML = elementOption;
  Country_of_Arrival.innerHTML = elementOption;
  Originating_country.innerHTML = elementOption;
  console.log(Nationality);
}

// declear json data variable.
let dataJson = {};

async function httpRequest(url) {
  //const response = fetch("https://btm-webform-default-rtdb.firebaseio.com",);
  const response = await fetch(
    `https://btm-webform-default-rtdb.firebaseio.com/${url}.json`,
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(dataJson), // body data type must match "Content-Type" header
    }
  );

  return response.json();
}

/**
 *
 *
 */
async function updatecar() {
  const tableBody = document.getElementById("table_body");
  let bodyInner = ``;
  let tableData = ``;
  const response = await fetch(
    `https://btm-webform-default-rtdb.firebaseio.com/car.json`
  );
  const result = await response.json();
  console.log(result);
  for (const property in result) {
    const answer = result[property];
    tableData += `<tr id=${property} class=tablerow>
                        <td id=${property}>${answer.Title}</td>
                        <td id=${property}>${answer.Full_name}</td>
                        <td id=${property}>${answer.Email}</td>
                        <td id=${property}>${answer.Phone_Number}</td>
                        <td id=${property}>${answer.Car_Hire}</td>
                        <td id=${property}>${answer.Drive_Option}</td>
                        <td id=${property}>${answer.Drop_off_Location}</td>
                        <td id=${property}>${answer.Loyalty_Number}</td>
                        <td id=${property}>${answer.Number_of_Passengers}</td>
                        <td id=${property}>${answer.Pick_up_Date}</td>
                        <td id=${property}>${answer.Pick_up_location}</td>
                        <td id=${property}>${answer.Rental_Company}</td>
                        <td id=${property}>${answer.Rental_Option}</td>
                        <td id=${property}>${answer.Security_Escort}</td>
                        <td id=${property}>${answer.Vehicle_Type}</td>
                    </tr>`;
  }
  console.log(tableData);
  tableBody.innerHTML = tableData;
  document
    .querySelector(".tablerow")
    .addEventListener("click", async (event) => {
      console.log(event);
    });
}

updatecar();
// get the form document
const form = document.getElementById("form");
/**
 * this function will perform the posting of form
 */
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  document.getElementById("modal").classList.add("modal_open");
  for (const [key, value] of data) {
    dataJson[`${key}`] = value;
  }

  const resquest = await httpRequest("car");
  console.log("response", resquest);
  form.reset();
  //console.log(data.getAll());
  console.log(dataJson);
});

document.getElementById("modal").addEventListener("click", () => {
  document.getElementById("modal").classList.remove("modal_open");
});
loadCountry();
