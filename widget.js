(function () {
  const html = `
  <div class="car-rental-widget">
    <form action="">
      <div class="car-rental-widget__container">
        <h3>Car Rental</h3>
        <div class="car-rental-widget__location">
          <label for="location" class="car-rental-widget__location-label"
            >Location</label
          >
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            class="car-rental-widget__location-input"
          />
        </div>
        <div class="car-rental-widget__pickup">
          <label
            for="pickup-date"
            class="car-rental-widget__pickup-date-label"
            >Pick-up Date:</label
          >
          <input
            type="date"
            id="pickup-date"
            name="pickup-date"
            class="car-rental-widget__pickup-date-input"
          />
          <label
            for="pickup-time"
            class="car-rental-widget__pickup-time-label"
            >Pick-up Time:</label
          >
          <input
            type="time"
            id="pickup-time"
            name="pickup-time"
            class="car-rental-widget__pickup-time-input"
          />
        </div>
        <div class="car-rental-widget__dropoff">
          <label
            for="dropoff-date"
            class="car-rental-widget__dropoff-date-label"
            >Drop-off Date:</label
          >
          <input
            type="date"
            id="dropoff-date"
            name="dropoff-date"
            class="car-rental-widget__dropoff-date-input"
          />
          <label
            for="dropoff-time"
            class="car-rental-widget__dropoff-time-label"
            >Drop-off Time:</label
          >
          <input
            type="time"
            id="dropoff-time"
            name="dropoff-time"
            class="car-rental-widget__dropoff-time-input"
          />
        </div>
        <button type="submit" class="car-rental-widget__submit-button">
          Search
        </button>
      </div>
    </form>
  </div>
  `;

  const styles = `
  .car-rental-widget {
    border: 0.0625rem solid #ccc;
    padding: 1rem;
    border-radius: 0.5rem;
    max-width: 12rem;
    font-family: Arial, sans-serif;
    background-color: white;

    & h3 {
      margin-block: 0;
      font-size: 1rem;
    }
  }

  .car-rental-widget__container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .car-rental-widget__location,
  .car-rental-widget__pickup,
  .car-rental-widget__dropoff {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: 0.7rem;
  }

  .car-rental-widget__submit-button {
    margin-top: 0.5rem;
    background-color: hsl(30 100% 50% / 1);
    border: none;
    border-radius: 0.25rem;
    height: 2rem;
    color: white;
  }

  [class$="-label"] {
    margin-top: 0.5rem;
  }

  [class$="-input"] {
    border: solid 0.0625rem #ccc;
    border-radius: 0.2rem;
    padding: 0.25rem;
  }`;

  const locations = [
    {
      id: 1,
      code: "LGW",
      Name: "London Gatwick Airport",
    },
    {
      id: 2,
      code: "FAO",
      Name: "Faro Airport",
    },
    {
      id: 3,
      code: "LIS",
      Name: "Lisbon Airport",
    },
    {
      id: 4,
      code: "FCO",
      Name: "Fiumicino Airport",
    },
  ];

  function handleSearch(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Highlight empty fields
    const inputs = event.target.querySelectorAll("input");
    inputs.forEach(
      (input) => (input.style.borderColor = input.value ? "" : "red")
    );

    // Remove previous error messages
    const oldError = document.querySelector(".car-rental-widget__error");
    if (oldError) oldError.remove();

    // Simple validation
    const location = formData.get("location").trim();
    const pickupDate = formData.get("pickup-date").trim();
    const pickupTime = formData.get("pickup-time").trim();
    const dropoffDate = formData.get("dropoff-date").trim();
    const dropoffTime = formData.get("dropoff-time").trim();

    const formValues = {
      location,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
    };

    const errors = Object.entries(formValues)
      .map(([key, value]) =>
        !value
          ? `Please enter a ${key.replace(/([A-Z])/g, " $1").toLowerCase()}.` // Insert a space before each uppercase letter and convert to lowercase
          : null
      )
      .filter(Boolean); // Remove null values

    if (errors.length > 0) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "car-rental-widget__error";
      errorDiv.style.color = "red";
      errorDiv.style.fontSize = "0.85rem";
      errorDiv.style.marginTop = "0.5rem";
      errorDiv.innerHTML = errors.join("<br/>");

      event.target
        .querySelector(".car-rental-widget__container")
        .appendChild(errorDiv);

      return;
    }

    const locid =
      locations.find((loc) =>
        loc.Name.toLowerCase().includes(location.toLowerCase())
      )?.code ?? location;

    // Build the URL with parameters
    const params = new URLSearchParams({
      locid,
      pdate: pickupDate,
      ddate: dropoffDate,
      dtime: dropoffTime,
      ptime: pickupTime,
    });

    // Redirect to the results page with parameters
    window.location.href = `/results.html?${params.toString()}`;
  }

  function injectStyles() {
    const styleSheet = document.createElement("style");
    // styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }

  function init() {
    const container = document.getElementById("app");

    if (!container) {
      console.error(`Container with id 'app' not found`);
    } else {
      injectStyles();
      container.innerHTML = html;

      const form = container.querySelector("form");
      form.addEventListener("submit", handleSearch);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
