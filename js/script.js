// 1. Parallex effect for background shape
document.addEventListener("mousemove", (e) => {
  const shapes = document.querySelectorAll(".shape");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    const xPos = (x - 0.5) * speed * 20;
    const yPos = (y - 0.5) * speed * 20;
    shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
  });
});

// 2. Scroll Animation for background shape
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".bg-shapes");
  const speed = scrolled * 0.5;
  parallax.style.transform = `translateY(${speed}px)`;
});

// 3. Click animation for glass element
document.querySelectorAll(".glass").forEach((element) => {
  element.addEventListener("click", function (e) {
    const ripple = document.createElement("div");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1000;
            `;

    this.style.position = "relative";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Click effect key animation
const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Fade in Animation
const fadeStyle = document.createElement("style");
fadeStyle.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
document.head.appendChild(fadeStyle);

// Auto-Copy Feature for WhatsApp & Email
document.querySelectorAll(".clickable-contact").forEach((item) => {
  item.addEventListener("click", function () {
    const textToCopy = this.getAttribute("data-copy");

    // Copy to clipboard feature
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Copy success pop up notification
      const notif = document.createElement("div");
      notif.textContent = `Berhasil disalin: ${textToCopy}`;
      notif.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(46, 204, 113, 0.95);
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: fadeInOut 2s ease forwards;
      `;

      document.body.appendChild(notif);

      // Automatic timeout after 2 sec
      setTimeout(() => {
        notif.remove();
      }, 2000);
    });
  });
});

//Keyframe animation for copy notification
const copyNotifStyle = document.createElement("style");
copyNotifStyle.textContent = `
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, 20px); }
    15% { opacity: 1; transform: translate(-50%, 0); }
    85% { opacity: 1; transform: translate(-50%, 0); }
    100% { opacity: 0; transform: translate(-50%, -20px); }
  }
`;
document.head.appendChild(copyNotifStyle);
