import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { google } from "googleapis";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

app.get("/google", (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  res.redirect(url);
});

app.get("/google/redirect", async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.send("Authentication successful!");
  } catch (error) {
    console.error("Error retrieving tokens", error);
    res.status(500).send("Error retrieving tokens");
  }
});

app.post("/freebusy", async (req, res) => {
  const { calendarId, timeMin, timeMax } = req.body;

  try {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        timeZone: "Asia/Colombo",
        items: [{ id: calendarId }],
      },
    });

    const busyIntervals = response.data.calendars[calendarId].busy;

    res.json(busyIntervals);
  } catch (error) {
    console.error("Error fetching free/busy information", error);
    res.status(500).send(`Error - , ${error}`);
  }
});

app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
});
