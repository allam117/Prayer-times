import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import Select from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import moment from "moment";
import axios from "axios";
import "moment/dist/locale/ar"
moment.locale("ar")
export default function MainContend() {
    const [timings, setTimings] = useState({
      Fajr: "05:28",
      Dhuhr: "12:41",
      Asr: "15:59",
      Sunset: "18:27",
      Isha: "19:44",
    });
  const[remainingTime,setRemaningTime] = useState("")
   const prayersArray = [
     {
       key: "Fajr",
       displayName: "الفجر",
     },
     {
       key: "Dhuhr",
       displayName: "الظهر",
     },
     {
       key: "Asr",
       displayName: "العصر",
     },
     {
       key: "Maghrib",
       displayName: "المغرب",
     },
     {
       key: "Isha",
       displayName: "العشاء",
     },
   ];
  const [nextPrayerIndex,setNextPrayerIndex] = useState(3)
//  const setupCountdownTimer = () =>{
//   const momentNow = moment();
//   let prayerIndex = 3 ;
//   if (
//     momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
//     momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
//   ) {
//    prayerIndex = 1
//   } else if (
//     momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
//     momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
//   ) {
//     prayerIndex = 2;
//   } else if (
//     momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
//     momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
//   ) {
//     prayerIndex = 3;
//   } else if (
//     momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
//     momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
//   ) {
//    prayerIndex = 4;
//   } else {
//      prayerIndex = 0;
//   }
//   setNextPrayerIndex(prayerIndex)


//   const nextPrayerObject = prayersArray[prayerIndex];
//   const nextPrayerTime = timings[nextPrayerObject.key];
//   const nextPrayerTimeMoment = moment(nextPrayerTime,"hh:mm")
//   // const remainingTime = moment(nextPrayerIndex,"hh:mm").diff(momentNow)
//   let remainingTime = nextPrayerTimeMoment.diff(momentNow);

//   if(remainingTime<0){
//     const midnightDiff = moment("23:59:59","hh:mm:ss").diff(momentNow)
//     const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
//       moment("00:00:00", "hh:mm:ss")
//     );
//      remainingTime = midnightDiff + fajrToMidnightDiff;
    
//   }
// console.log(remainingTime);

// const durationRematio = moment.duration(remainingTime);
// setRemaningTime(`${durationRematio.seconds()}:${durationRematio.minutes()}:${durationRematio.hours()}`);

// console.log("duration is",durationRematio.hours(),
// durationRematio.minutes(),
// durationRematio.seconds())


//   console.log("next prayer",nextPrayerTime)

// console.log(momentNow.isAfter(moment(timings["Isha"], "hh:mm")));

// // const Isha = timings["Isha"];
// // const IshaMoment = moment (Isha, "hh:mm");
// // console .log(momentNow.isBefore(IshaMoment));


// }

const setupCountdownTimer = () => {
  const momentNow = moment();
  let prayerIndex = 3;

  if (
    momentNow.isAfter(moment(timings["Fajr"], "HH:mm")) &&
    momentNow.isBefore(moment(timings["Dhuhr"], "HH:mm"))
  ) {
    prayerIndex = 1;
  } else if (
    momentNow.isAfter(moment(timings["Dhuhr"], "HH:mm")) &&
    momentNow.isBefore(moment(timings["Asr"], "HH:mm"))
  ) {
    prayerIndex = 2;
  } else if (
    momentNow.isAfter(moment(timings["Asr"], "HH:mm")) &&
    momentNow.isBefore(moment(timings["Maghrib"], "HH:mm"))
  ) {
    prayerIndex = 3;
  } else if (
    momentNow.isAfter(moment(timings["Maghrib"], "HH:mm")) &&
    momentNow.isBefore(moment(timings["Isha"], "HH:mm"))
  ) {
    prayerIndex = 4;
  } else {
    prayerIndex = 0;
  }

  setNextPrayerIndex(prayerIndex);

  const nextPrayerObject = prayersArray[prayerIndex];
  const nextPrayerTime = timings[nextPrayerObject.key];
  const nextPrayerTimeMoment = moment(nextPrayerTime, "HH:mm");

  // حساب الوقت المتبقي
  let remainingTime = nextPrayerTimeMoment.diff(momentNow);
  if (remainingTime < 0) {
    const midnightDiff = moment("23:59:59", "HH:mm:ss").diff(momentNow);
    const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
      moment("00:00:00", "HH:mm:ss")
    );
    remainingTime = midnightDiff + fajrToMidnightDiff;
  }

  const duration = moment.duration(remainingTime);
  setRemaningTime(
    `${duration.hours().toString().padStart(2, "0")}:${duration
      .minutes()
      .toString()
      .padStart(2, "0")}:${duration.seconds().toString().padStart(2, "0")}`
  );
};


 const [timer ,setTimer] = useState(10);
const [selectedCity, setSelectedCity] = useState({
  displayName: "القاهره",
  apiNmae: "Al Qāhirah",
});
const [today ,setToday] = useState("");

const availableCities = [
  { displayName: "القاهره", apiNmae: "Al Qāhirah" },
  { displayName: "الغربيه", apiNmae: "Al Gharbīyah" },
  { displayName: "الاسكندريه", apiNmae: "Al Iskandarīyah" },
];



  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectedCity.apiNmae}`  
    );
    setTimings(response.data.data.timings);
  }
  useEffect(() =>{
    getTimings()
    const t = moment();
    setToday(t.format("MMM D YYYY |h:mm "
      
    ))

  
  },[selectedCity]);

  useEffect(()=>{
  let interval = setInterval(() => {
    setTimer((t) => {
      return t - 1;
    });
     setupCountdownTimer();
  }, 1000);
 
  return () => {
    clearInterval(interval);
  };
  },[timings])



    const [age, setAge] = React.useState("");
    const handleChange = (event) => {
      const cityObject = availableCities.find((city) =>{
        return city.apiNmae == event.target.value
      })
      setSelectedCity(cityObject);
    };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        style={{ width: "100%" }}
      >
        <Grid item xs={6}>
          <div style={{ textAlign: "center" }}>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName} </h1>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ textAlign: "center" }}>
            <h2>متبقي حتي صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{remainingTime}</h1>
          </div>
        </Grid>
      </Grid>

      <Divider style={{ borderColor: "white", opacity: "0.2" }} />
 

      <Stack
        direction={{ xs: "column", sm: "row" }} 
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        style={{ marginTop: "50px" }}
      >
        <Prayer
          name="الفجر"
          time={timings.Fajr}
          image="data:image/jpeg;base64,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"
        />
        <Prayer
          name="الظهر"
          time={timings.Dhuhr}
          image="data:image/jpeg;base64,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"
        />
        <Prayer
          name="العصر"
          time={timings.Asr}
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/%D8%B5%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D9%85%D8%B3%D8%AC%D8%AF_%D8%A7%D9%84%D9%86%D8%A8%D9%88%D9%8A_%D9%81%D9%8A_%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9_%D8%A7%D9%84%D9%85%D9%86%D9%88%D8%B1%D8%A9.jpg/3000px-%D8%B5%D9%88%D8%B1%D8%A9_%D8%A7%D9%84%D9%85%D8%B3%D8%AC%D8%AF_%D8%A7%D9%84%D9%86%D8%A8%D9%88%D9%8A_%D9%81%D9%8A_%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9_%D8%A7%D9%84%D9%85%D9%86%D9%88%D8%B1%D8%A9.jpg"
        />
        <Prayer
          name="المغرب"
          time={timings.Maghrib}
          image="https://arabic.people.com.cn/NMediaFile/2015/1104/FOREIGN201511041543000229946050820.jpg"
        />
        <Prayer
          name="العشاء"
          time={timings.Isha}
          image="https://mostaql.hsoubcdn.com/uploads/thumbnails/143618/37030/1374740f-8b6d-4de9-8d7e-48954a594a00.jpg"
        />
      </Stack>

      <Stack
        direction="row"
        justifyContent={"center"}
        style={{ marginTop: "55px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel style={{ color: "blue" }} id="demo-simple-select-label">
            المدينه
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            {availableCities.map((city) => {
              return (
                <MenuItem value={city.apiNmae}>{city.displayName}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
