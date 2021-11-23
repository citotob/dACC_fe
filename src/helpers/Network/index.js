export const testConsoleLog = () => {
  console.log("ini lewat testConsoleLog");
};

// =================== solusi stackoverflow =====================
var imageAddr =
  "https://effigis.com/wp-content/uploads/2015/02/DigitalGlobe_WorldView1_50cm_8bit_BW_DRA_Bangkok_Thailand_2009JAN06_8bits_sub_r_1.jpg";
var downloadSize = 17036243; //bytes

// function InitiateSpeedDetection() {
//   window.setTimeout(measureConnectionSpeed, 1);
// }

// if (window.addEventListener) {
//   window.addEventListener("load", InitiateSpeedDetection, false);
// } else if (window.attachEvent) {
//   window.attachEvent("onload", InitiateSpeedDetection);
// }
const measureConnectionSpeed = new Promise((resolve, reject) => {
  var startTime, endTime;
  var download = new Image();
  download.onload = function () {
    endTime = new Date().getTime();
    //=======
    var duration = (endTime - startTime) / 1000;
    var bitsLoaded = downloadSize * 8;
    var speedBps = (bitsLoaded / duration).toFixed(2);
    var speedKbps = (speedBps / 1024).toFixed(2);
    var speedMbps = (speedKbps / 1024).toFixed(2);
    console.log(
      "Your connection speed is:",
      speedBps + " bps",
      speedKbps + " kbps",
      speedMbps + " Mbps"
    );
    window.localStorage.setItem("downloadSpeed", speedMbps + "Mbps");
    //=======
    resolve("Bisa Promise");
  };

  download.onerror = function (err, msg) {
    console.log("Invalid image, or error downloading");
    reject("Ga bisa promise");
  };

  startTime = new Date().getTime();
  var cacheBuster = "?nnn=" + startTime;
  download.src = imageAddr + cacheBuster;
});
