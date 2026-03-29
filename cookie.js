(function () {
  // ─── Helpers ────────────────────────────────────────────────────────────────

  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  }

  function setCookie(name, value, seconds) {
    document.cookie =
      name + "=" + value + "; max-age=" + seconds + "; path=/";
  }

  // ─── Styles ─────────────────────────────────────────────────────────────────

  const css = `
    #cc-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 999;
    }

    #cc-popup {
      position: fixed;
      bottom: -200px;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      max-width: 500px;
      background: #fff;
      color: #333;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      gap: 15px;
      z-index: 1000;
      transition: bottom 0.4s ease;
      font-family: Arial, sans-serif;
      box-sizing: border-box;
    }

    #cc-popup.cc-show {
      bottom: 30px;
    }

    #cc-popup h3 {
      margin: 0;
      font-size: 16px;
    }

    #cc-popup p {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }

    #cc-popup .cc-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    #cc-popup button {
      padding: 10px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: bold;
      font-family: Arial, sans-serif;
    }

    #cc-popup .cc-accept {
      background: #ff9900;
      color: #fff;
    }

    #cc-popup .cc-accept:hover {
      background: #e68a00;
    }

    #cc-popup .cc-decline {
      background: #ddd;
      color: #333;
    }

    #cc-popup .cc-decline:hover {
      background: #ccc;
    }
  `;

  // ─── Inject styles ───────────────────────────────────────────────────────────

  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── Build DOM ───────────────────────────────────────────────────────────────

  // Overlay
  const overlay = document.createElement("div");
  overlay.id = "cc-overlay";

  // Popup
  const popup = document.createElement("div");
  popup.id = "cc-popup";

  const title = document.createElement("h3");
  title.textContent = "🍪 We Use Cookies";

  const text = document.createElement("p");
  text.textContent =
    "We use cookies to improve your experience, analyze traffic, and personalize content.";

  const btnWrapper = document.createElement("div");
  btnWrapper.className = "cc-buttons";

  const declineBtn = document.createElement("button");
  declineBtn.className = "cc-decline";
  declineBtn.textContent = "Decline";
  declineBtn.addEventListener("click", declineCookies);

  const acceptBtn = document.createElement("button");
  acceptBtn.className = "cc-accept";
  acceptBtn.textContent = "Accept";
  acceptBtn.addEventListener("click", acceptCookies);

  btnWrapper.appendChild(declineBtn);
  btnWrapper.appendChild(acceptBtn);

  popup.appendChild(title);
  popup.appendChild(text);
  popup.appendChild(btnWrapper);

  // ─── Actions ─────────────────────────────────────────────────────────────────

  function showPopup() {
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
    // Trigger transition on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => popup.classList.add("cc-show"));
    });
  }

  function closePopup() {
    popup.classList.remove("cc-show");
    overlay.remove();
    setTimeout(() => popup.remove(), 400); // wait for slide-out transition
  }

  function acceptCookies() {
    setCookie("accepted", "true", 7 * 24 * 60 * 60);
    closePopup();
    setTimeout(() => {
      window.location.href = "https://eoclindia.com/";
    }, 300);
  }

  function declineCookies() {
    setCookie("accepted", "false", 7 * 24 * 60 * 60);
    closePopup();
  }

  // ─── Init ────────────────────────────────────────────────────────────────────

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    if (!getCookie("accepted")) {
      showPopup();
    }
  }
})();
