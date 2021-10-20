/*!
 * Start Bootstrap - Stylish Portfolio v6.0.3 (https://startbootstrap.com/theme/stylish-portfolio)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
 */
window.addEventListener("DOMContentLoaded", (event) => {
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

      const endDate = new Date("Oct 23 2021 22:00:00 GMT-0700");
      const daysLeft = Math.ceil(
        (endDate - new Date()) / (24 * 60 * 60 * 1000)
      );
      const hoursLeft = Math.ceil((endDate - new Date()) / (60 * 60 * 1000));

      if (daysLeft > 1) {
        document.getElementById("stat-days").innerText = daysLeft;
      } else {
        document.getElementById("stat-days").innerText = hoursLeft;
        if (hoursLeft === 1) {
          document.getElementById("label-days").innerText = "hour to go";
        } else {
          document.getElementById("label-days").innerText = "hours to go";
        }
      }

      const LAST_GOAL = 25000;
      const percentToGoal = Math.floor((data.data.dollars / LAST_GOAL) * 100);
      document.getElementById("progress-label").innerText = percentToGoal;

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
