$(function () {
  let calendar = $("#calendar"); // Container element for FullCalendar

  // Initialize FullCalendar
  calendar.fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    defaultView: 'month', // Initial view set to month
    now: moment(), // Set the initial date/time to the current moment
    editable: true,
    selectable: true, // Enable selection of time range
    selectHelper: true, // Display a placeholder event while selecting
    slotDuration: '00:15:00', // Set the slot duration to 15 minutes
    events: getStoredEvents(), // Load events from local storage

    // Day click handler
    dayClick: function (date, jsEvent, view) {
      // Remove highlighting from previously clicked date
      $('.fc-highlight').removeClass('fc-highlight');
      // Highlight the clicked date
      $(this).addClass('fc-highlight');
    },

    // Time range selection callback
    select: function (startDate, endDate, jsEvent, view) {
      // Prompt the user to enter the event title
      let title = prompt("Enter a title for the event:");
      if (title) {
        // Create the event object with the selected time range
        let event = {
          title: title,
          start: startDate,
          end: endDate,
          allDay: false
        };

        // Render the event on the calendar
        calendar.fullCalendar('renderEvent', event, true);

        // Save the updated events to local storage
        saveEvents();
      }

      // Clear the selection
      calendar.fullCalendar('unselect');
    },

    // Event click handler
    eventClick: function (calEvent, jsEvent, view) {
      let action = prompt("Do you want to edit or delete the event? Enter 'edit' or 'delete':");
      if (action === 'edit') {
        let newTitle = prompt("Enter a new title for the event:", calEvent.title);
        if (newTitle) {
          calEvent.title = newTitle;
          calendar.fullCalendar('updateEvent', calEvent); // Update the event on the calendar
          saveEvents(); // Save the updated events to local storage
        }
      } else if (action === 'delete') {
        if (confirm("Are you sure you want to delete this event?")) {
          calendar.fullCalendar('removeEvents', calEvent._id); // Remove the event from the calendar
          saveEvents(); // Save the updated events to local storage
        }
      }
    },

    viewRender: function (view, element) {
      let currentDate = calendar.fullCalendar('getDate');
      let formattedDate = currentDate.format('dddd, MMM D, YYYY');
      $('.fc-toolbar .fc-center').text(formattedDate);
    },

    // Set specific days as selectable
    selectConstraint: {
      dow: [1, 2, 3, 4, 5, 6, 7] // Sunday to Monday (1-7)
      // dow: [3] // Only Tuesday (3)
      // You can modify the array to include the specific days you want to allow selection for
    }
  });

  // Save events to local storage
  function saveEvents() {
    let events = calendar.fullCalendar('clientEvents');
    let serializedEvents = events.map(function (event) {
      return {
        title: event.title,
        start: event.start.format(), // Convert date to string format
        end: event.end.format(), // Convert date to string format
        allDay: event.allDay
      };
    });
    localStorage.setItem('calendarEvents', JSON.stringify(serializedEvents));
  }

  // Get stored events from local storage
  function getStoredEvents() {
    let storedEvents = localStorage.getItem('calendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
  }

  // Today button click handler
  $("#todayButton").click(function() {
    calendar.fullCalendar('today'); // Go to today's date
  });
});
