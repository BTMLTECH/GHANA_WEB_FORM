// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCZXipPZUtKgkDLg_--MegqvVfXF9G3eJQ",
//   authDomain: "btm-webform.firebaseapp.com",
//   databaseURL: "https://btm-webform-default-rtdb.firebaseio.com",
//   projectId: "btm-webform",
//   storageBucket: "btm-webform.appspot.com",
//   messagingSenderId: "588547210353",
//   appId: "1:588547210353:web:f4fa396c6b6ea42a27efd0",
//   measurementId: "G-8Q8XNVMYB3",
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
async function updateImmigration() {
  const tableBody = document.getElementById("table_body");
  let bodyInner = ``;
  let tableData = ``;
  const response = await fetch(
    `https://btm-webform-default-rtdb.firebaseio.com/immigration.json`
  );
  const result = await response.json();
  //console.log(result);
  for (const property in result) {
    const answer = result[property];
    tableData += `<tr id=${property} class=tablerow>
                        <td id=${property}>${answer.Title}</td>
                        <td id=${property}>${answer.Full_name}</td>
                        <td id=${property}>${answer.Email}</td>
                        <td id=${property}>${answer.Phone_Number}</td>
                        <td id=${property}>${answer.Visa_Type}</td>
                        <td id=${property}>${answer.contact}</td>
                        <td id=${property}>${answer.Passport_Type}</td>
                        <td id=${property}>${answer.Nationality}</td>
                        <td id=${property}>${answer.Originating_Country}</td>
                        <td id=${property}>${answer.expiration_date}</td>
                        <td id=${property}>${answer.Issued_By}</td>
                        <td id=${property}>${answer.Country_of_Arrival}</td>
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

updateImmigration();

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
  const resquest = await httpRequest("immigration");
  console.log("response", resquest);
  form.reset();
  //console.log(data.getAll());
  console.log(dataJson);
});

document.getElementById("modal").addEventListener("click", () => {
  document.getElementById("modal").classList.remove("modal_open");
});
loadCountry();
