$(document).ready(function() {
  let currentHour = dayjs().format("HH");
  const timeBlockArray = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
  let currentDay = $("#currentDay");
  let timeBlocks = $(".time-block");
  let saveBtns = $(".saveBtn");
  let inputs = $(".description");

  console.log(currentHour);

  saveBtns.on("click", function() {
    let key = $(this).data("key");
    let value = $("#" + key).val();
    localStorage.setItem(key, value);
    console.log(localStorage);
  });

  inputs.each(function() {
    let key = $(this).attr("id");
    let storedValue = localStorage.getItem(key);
    if (storedValue) {
      $(this).val(storedValue);
    }
  });

  timeBlockArray.forEach(function(id) {
    if (id < currentHour) {
      $("#" + id).addClass("past");
    } else if (id === currentHour) {
      $("#" + id).addClass("present");
    } else if (id > currentHour) {
      $("#" + id).addClass("future");
    }
  });

  let today = dayjs().format("dddd, MMM D, YYYY");
  currentDay.text(today);

  // View buttons
  const dayViewBtn = $("#dayViewBtn");
  const weekViewBtn = $("#weekViewBtn");
  const monthViewBtn = $("#monthViewBtn");

  function showDayView() {
    // Update your scheduler display for day view
    // Example: show/hide appropriate elements based on day view
    timeBlocks.show();
    
  }

  function showWeekView() {
    // Update your scheduler display for week view
    // Example: show/hide appropriate elements based on week view
    timeBlocks.hide();
        // TODO: Implement week view display logic
        $(".time-block:lt(5)").show();
  }

  function showMonthView() {
    // Update your scheduler display for month view
    // Example: show/hide appropriate elements based on month view
    timeBlocks.hide();
    // TODO: Implement month view display logic
    $(".time-block:lt(2)").show();
  }

  // Add event listeners to view buttons
  dayViewBtn.click(function () {
    $(".viewBtn").removeClass("active");
    dayViewBtn.addClass("active");
    showDayView();
  });

  weekViewBtn.click(function () {
    $(".viewBtn").removeClass("active");
    weekViewBtn.addClass("active");
    showWeekView();
  });

  monthViewBtn.click(function () {
    $(".viewBtn").removeClass("active");
    monthViewBtn.addClass("active");
    showMonthView();
  });

  // Default: Day view active
  dayViewBtn.addClass("active");
  showDayView();
});
