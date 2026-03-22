/**
 * Error-First Logic: Landing Page Interactions
 * We isolate click tracking logic to ensure analytics or future modal logic
 * won't crash the browser if a DOM element is missing.
 */
document.addEventListener("DOMContentLoaded", () => {
  try {
    const buttons = document.querySelectorAll('.btn-purchase');
    
    if (buttons.length === 0) {
      console.warn("[Warning] No purchase buttons found in the DOM.");
      return;
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        try {
          // Capturing intent. Since these are <a> tags, the browser will 
          // natively navigate to Gumroad immediately after this logs.
          const productType = e.target.getAttribute('data-product');
          console.log(`[Action] User navigating to checkout for: ${productType}`);
        } catch (err) {
          console.error("[Error] Button click handler failed.", err);
        }
      });
    });

  } catch (fatalError) {
    console.error("[Fatal Error] Main landing page script failed: ", fatalError);
  }
});