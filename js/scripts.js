/*!
 * Start Bootstrap - Stylish Portfolio v6.0.3 (https://startbootstrap.com/theme/stylish-portfolio)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
 */
window.addEventListener("DOMContentLoaded", (event) => {
  const NEXT_GOAL = 20000;
  const morePrizesThresholdDynamicSpan = document.getElementById(
    "more-prizes-threshold-dynamic"
  );
  const morePrizesThresholdSpan = document.getElementById(
    "more-prizes-threshold"
  );
  morePrizesThresholdSpan.innerText = `once we have raised \$${Number(
    NEXT_GOAL
  ).toLocaleString()}.`;

  /* document.getElementById("stat-goal").innerText =
    Number(NEXT_GOAL).toLocaleString(); */

  fetch(
    "https://script.google.com/macros/s/AKfycbyOWUsJXvVOrY4G5LExslJ0xxAaHkrLa1pDLdopNsiaI3TRy6Xx/exec",
    {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        method: "GET",
        sheet: "totals",
        id: 2,
      }),
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data == null || data.status !== 200 || data.data == null) {
        return;
      }

      document.getElementById("stat-dollars").innerText = `\$${Number(
        data.data.dollars
      ).toLocaleString()}`;
      document.getElementById("stat-donors").innerText = Number(
        data.data.donors
      ).toLocaleString();
      const daysLeft = Math.ceil(
        (new Date("Oct 22 2021 22:00:00 GMT-0700") - new Date()) /
          (24 * 60 * 60 * 1000)
      );
      document.getElementById("stat-days").innerText = daysLeft;
      if (daysLeft === 1) {
        document.getElementById("label-days").innerText = "day to go";
      }

      if (data.data.dollars < NEXT_GOAL) {
        const dollarsToGoal = `once we have raised \$${Number(
          NEXT_GOAL
        ).toLocaleString()}. We’re only \$${Number(
          NEXT_GOAL - data.data.dollars
        ).toLocaleString()} away!`;
        morePrizesThresholdDynamicSpan.innerText = dollarsToGoal;
        morePrizesThresholdSpan.innerText = dollarsToGoal;
      }

      const percentToGoal = Math.floor(
        Math.min(100, (data.data.dollars / NEXT_GOAL) * 100)
      );
      document.getElementById("progress-label").innerText = percentToGoal;
      document.getElementById(
        "progress-indicator"
      ).style.width = `${percentToGoal}%`;

      document.getElementById(
        "more-prizes-threshold-dynamic-container"
      ).style.visibility = "visible";
      document.getElementById("section-progress").className +=
        " visible-section";
    });

  const sidebarWrapper = document.getElementById("sidebar-wrapper");
  let scrollToTopVisible = false;
  // Closes the sidebar menu
  const menuToggle = document.body.querySelector(".menu-toggle");
  if (menuToggle != null) {
    menuToggle.addEventListener("click", (event) => {
      event.preventDefault();
      sidebarWrapper.classList.toggle("active");
      _toggleMenuIcon();
      menuToggle.classList.toggle("active");
    });
  }

  // Closes responsive menu when a scroll trigger link is clicked
  var scrollTriggerList = [].slice.call(
    document.querySelectorAll("#sidebar-wrapper .js-scroll-trigger")
  );
  scrollTriggerList.map((scrollTrigger) => {
    scrollTrigger.addEventListener("click", () => {
      sidebarWrapper.classList.remove("active");
      menuToggle.classList.remove("active");
      _toggleMenuIcon();
    });
  });

  function _toggleMenuIcon() {
    const menuToggleBars = document.body.querySelector(
      ".menu-toggle > .fa-bars"
    );
    const menuToggleTimes = document.body.querySelector(
      ".menu-toggle > .fa-times"
    );
    if (menuToggleBars) {
      menuToggleBars.classList.remove("fa-bars");
      menuToggleBars.classList.add("fa-times");
    }
    if (menuToggleTimes) {
      menuToggleTimes.classList.remove("fa-times");
      menuToggleTimes.classList.add("fa-bars");
    }
  }

  // Scroll to top button appear
  document.addEventListener("scroll", () => {
    const scrollToTop = document.body.querySelector(".scroll-to-top");
    if (document.documentElement.scrollTop > 100) {
      if (!scrollToTopVisible) {
        fadeIn(scrollToTop);
        scrollToTopVisible = true;
      }
    } else {
      if (scrollToTopVisible) {
        fadeOut(scrollToTop);
        scrollToTopVisible = false;
      }
    }
  });
});

function fadeOut(el) {
  if (el == null) {
    return;
  }
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display) {
  if (el == null) {
    return;
  }
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
