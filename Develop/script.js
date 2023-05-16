$(function () {
  var Target = document.getElementById('currentDay');

  function clock() {
    var time = new Date();

    var month = time.getMonth();
    var date = time.getDate();
    var day = time.getDay();
    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var year = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    Target.innerText =
      `${year[month]} ${date}, ${week[day]}` +
      ` ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  clock();
  setInterval(clock, 1000);

  $(".saveBtn").on("click", function () {
    var scheduledEvent = $(this).siblings(".description").val();
    var scheduledTime = $(this).parent().attr("id");

    localStorage.setItem(scheduledTime, scheduledEvent);
  });

  $("#hour-9 .description").val(localStorage.getItem("hour-9"));
  $("#hour-10 .description").val(localStorage.getItem("hour-10"));
  $("#hour-11 .description").val(localStorage.getItem("hour-11"));
  $("#hour-12 .description").val(localStorage.getItem("hour-12"));
  $("#hour-13 .description").val(localStorage.getItem("hour-13"));
  $("#hour-14 .description").val(localStorage.getItem("hour-14"));
  $("#hour-15 .description").val(localStorage.getItem("hour-15"));
  $("#hour-16 .description").val(localStorage.getItem("hour-16"));
  $("#hour-17 .description").val(localStorage.getItem("hour-17"));

  function color() {
    var currentTime = dayjs().get('h');

    var hour9 = 9;
    var hour10 = 10;
    var hour11 = 11;
    var hour12 = 12;
    var hour13 = 13;
    var hour14 = 14;
    var hour15 = 15;
    var hour16 = 16;
    var hour17 = 17;

    // Add your logic to apply appropriate styling based on the current time and the time blocks here

  }

  color();
});