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
}
const button = document.getElementById("submitBtn");
let dataJson = {};
button.addEventListener("click", async (value) => {
  value.preventDefault();

  const data = new FormData(form);
  for (const [key, value] of data) {
    dataJson[`${key}`] = value;
  }
  const resquest = await httpRequest("Meetup");
  console.log("response", resquest);
  form.reset();
  //console.log(data.getAll());
  console.log(dataJson);
  const body = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Event Registration Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        color: #333;
      }
      .container {
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
        background-color: #f2f2f2;
      }
      .header {
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
      }
      .title {
        font-size: 24px;
      }
      .content {
        padding: 20px;
      }
      .details {
        margin-bottom: 10px;
      }
      .details span {
        font-weight: bold;
      }
      .buttons {
        text-align: center;
        margin-top: 20px;
      }
      .button {
        background-color: #007f77; /* Green */
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 10px;
      }
      .button:hover {
        background-color: #A8DDD7;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="title">Event Registration Confirmation</h1>
      </div>
      <div class="content">
        <p>Dear ${dataJson[`first_name`]},</p>
        <p>This email confirms your registration for the upcoming event:</p>
        <div class="details"><span>Event Name:</span> Journeyeasy Meetup</div>
        <div class="details"><span>Date:</span> March 14th, 2024</div>
        <div class="details"><span>Time:</span> 11 am WAT</div>
        <div class="details"><span>Location:</span> Virtual</div>
        <p>We're excited to have you join us!</p>
        <div class="buttons">
          <a href="[Link to Update Registration]" target="_blank" class="button"
            >Click to Join Zoom</a
          >
        </div>
        <p>
          If you have any questions, please don't hesitate to contact us at
          <a href="mailto:agency@btmlimited.net">agency@btmlimited.net</a>.
        </p>
        <p>See you there!</p>
        <p>Sincerely,</p>
        <p>Journeyeasy.</p>
      </div>
    </div>
  </body>
</html>
`;
  Email.send({
    SecureToken: "adb1b8ff-18a2-488c-9a45-1eaefac58f07",
    To: dataJson[`Email`],
    From: "agency@btmlimited.net",
    Subject: "Registration Confirmation",
    Body: body,
  }).then((message) => alert("Thank you for registring"));
});
