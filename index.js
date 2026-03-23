/**
 * Landing Page Logic
 * Error-first: all DOM interactions wrapped in try/catch.
 * Tracks which product button was clicked for future analytics hookup.
 */
document.addEventListener("DOMContentLoaded", () => {
  try {
    const buttons = document.querySelectorAll('.btn-purchase');

    if (buttons.length === 0) {
      console.warn("[Warning] No purchase buttons found in DOM.");
      return;
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        try {
          const productType = e.currentTarget.getAttribute('data-product');
          console.log(`[Action] Navigating to Gumroad checkout for: ${productType}`);
          // Future: fire analytics event here (e.g. gtag, plausible, etc.)
        } catch (err) {
          console.error("[Error] Button click handler failed.", err);
        }
      });
    });

  } catch (fatalError) {
    console.error("[Fatal Error] Landing page script failed:", fatalError);
  }
});
