/**
 * Error-First Logic: Generator Application State
 * Separating JS allows the browser to cache this logic file, improving load speeds.
 * We wrap the entire init sequence in a try/catch to log fundamental failures.
 */
document.addEventListener("DOMContentLoaded", () => {
  try {
    // 1. Data Schema Mapping
    // Explicitly define UI nodes to ensure strict targeting.
    const domNodes = {
      input: document.getElementById('nameInput'),
      select: document.getElementById('fontSelect'),
      display: document.getElementById('displayName'),
      btn: document.getElementById('generateBtn'),
      date: document.getElementById('dynamicDate'),
      policy: document.getElementById('dynamicPolicy')
    };

    // Validate Schema presence to avoid silent null reference exceptions.
    for (const [key, node] of Object.entries(domNodes)) {
      if (!node) throw new Error(`DOM node missing for key: ${key}`);
    }

    // 2. Initialize Date State (Ensures certificate shows current day)
    const today = new Date();
    domNodes.date.innerText = today.toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    }).toUpperCase();

    // 3. Initialize Unique Policy Number State (Stateless Architecture)
    // Extract the receipt_id sent by Gumroad from the URL for verification.
    const urlParams = new URLSearchParams(window.location.search);
    const receiptId = urlParams.get('receipt_id');

    if (receiptId) {
      // Format the Gumroad ID into a bureaucratic string
      domNodes.policy.innerText = `RAI-${receiptId.substring(0, 8).toUpperCase()}`;
    } else {
      // Fallback logic for local testing
      const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
      domNodes.policy.innerText = `RAI-TEST-${randomHex}`;
    }

    // 4. Bind Event Listeners
    // Individual try/catch blocks ensure one broken event doesn't brick the UI.
    domNodes.input.addEventListener('input', (e) => {
      try {
        domNodes.display.innerText = e.target.value || "____________";
      } catch (err) {
        console.error("[Error] Failed to bind text state.", err);
      }
    });

    domNodes.select.addEventListener('change', (e) => {
      try {
        domNodes.display.style.fontFamily = e.target.value;
      } catch (err) {
        console.error("[Error] Failed to bind font state.", err);
      }
    });

    domNodes.btn.addEventListener('click', () => {
      try {
        window.print(); // Triggers the @media print CSS rules
      } catch (err) {
        console.error("[Error] Print spooler invocation failed.", err);
        alert("Could not open print dialog. Use browser menu.");
      }
    });

  } catch (fatalError) {
    console.error("[Fatal Error] Generator initialization failed: ", fatalError);
  }
});