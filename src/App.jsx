import { useState } from "react";
import "./style.css";

function numberToWords(num) {
  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
    "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];

  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  function convert(n) {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000)
      return ones[Math.floor(n / 100)] + " Hundred" +
        (n % 100 ? " " + convert(n % 100) : "");
    if (n < 100000)
      return convert(Math.floor(n / 1000)) + " Thousand" +
        (n % 1000 ? " " + convert(n % 1000) : "");
    if (n < 10000000)
      return convert(Math.floor(n / 100000)) + " Lakh" +
        (n % 100000 ? " " + convert(n % 100000) : "");
    return convert(Math.floor(n / 10000000)) + " Crore" +
      (n % 10000000 ? " " + convert(n % 10000000) : "");
  }

  return convert(Math.floor(num)) || "Zero";
}

function App() {
  const [qty, setQty] = useState(25);
  const [rate, setRate] = useState(975);
  const [paymentTerms, setPaymentTerms] = useState("100% Advance Payment");
  const [creditPeriod, setCreditPeriod] = useState("");

  const total = qty * rate;
  const taxable = total / 1.05;
  const cgst = taxable * 0.025;
  const sgst = taxable * 0.025;

  return (
    <div className="app">

      <div className="invoice">

        <header className="invoice-header">
          <div className="logo-box">
            <div className="logo-mark">W</div>
            <div className="logo-text">
              WORLD OF<br />
              WILLPOWER
              <small>PVT LTD</small>
            </div>
          </div>

          <div className="company">
            <h1>World of Willpower Private Limited</h1>
            <p>Correspondence Address: Gayatri Farms, Khamagaon Maval, Haveli, Pune 411025, Maharashtra</p>
            <p>CIN: U86900PN2026PTC251855</p>
            <p>GSTIN: 27AAECW3784C1Z7</p>
          </div>

          <div className="invoice-title">
            <h2>SALE INVOICE</h2>
            <div><b>Invoice No.</b> WWPL/RE/001</div>
            <div><b>Invoice Date</b> 19/08/2026</div>
          </div>
        </header>

        <section className="top-details">

          <div className="party-box">
            <h3>SUPPLIER</h3>
            <b>World of Willpower Private Limited</b>
            <p>Gayatri Farms, Khamagaon Maval, Haveli, Pune 411025, Maharashtra</p>
            <p>CIN: U86900PN2026PTC251855</p>
            <p>GSTIN: 27AAECW3784C1Z7</p>
          </div>

          <div className="party-box">
            <h3>BUYER (BILLED TO)</h3>
            <b>Raghavendra Enterprises</b>
            <p>548, LIG, 14th Cross, Navanagar, Hubballi - 580025</p>
            <p>Karnataka</p>
            <p>GSTIN: Unregistered Buyer</p>
          </div>

        </section>

        <section className="payment-section">

          <label>
            <b>Payment Terms</b>

            <select
              value={paymentTerms}
              onChange={(e) => {
                setPaymentTerms(e.target.value);
                if (e.target.value !== "Credit") {
                  setCreditPeriod("");
                }
              }}
            >
              <option>100% Advance Payment</option>
              <option>Payment on Delivery</option>
              <option>Credit</option>
            </select>
          </label>

          {paymentTerms === "Credit" && (
            <label>
              <b>Credit Period</b>
              <input
                type="text"
                placeholder="e.g. 30 Days / 3 Months"
                value={creditPeriod}
                onChange={(e) => setCreditPeriod(e.target.value)}
              />
            </label>
          )}

        </section>

        <table className="items-table">
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Product Name & Description</th>
              <th>HSN Code</th>
              <th>Qty.</th>
              <th>Packing Type</th>
              <th>Rate / Unit<br />(Incl. GST)</th>
              <th>Taxable Value</th>
              <th>Amount<br />(Incl. GST)</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>

              <td className="product">
                <b>Willpower Indian Cow Ghee</b>
                <span>Mfg Date: 15/08/2026</span>
                <span>Exp Date: 14/02/2027</span>
              </td>

              <td>04059020</td>

              <td>
                <input
                  className="small-input"
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                />
              </td>

              <td>One Litre Jar</td>

              <td>
                <input
                  className="small-input"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                />
              </td>

              <td>₹{taxable.toFixed(2)}</td>

              <td><b>₹{total.toFixed(2)}</b></td>
            </tr>
          </tbody>
        </table>

        <section className="summary">

          <div className="gst-summary">
            <h3>HSN / GST SUMMARY</h3>

            <table>
              <thead>
                <tr>
                  <th>HSN</th>
                  <th>Taxable Value</th>
                  <th>CGST 2.5%</th>
                  <th>SGST 2.5%</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>04059020</td>
                  <td>₹{taxable.toFixed(2)}</td>
                  <td>₹{cgst.toFixed(2)}</td>
                  <td>₹{sgst.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="totals">
            <div>Taxable Value <span>₹{taxable.toFixed(2)}</span></div>
            <div>CGST @ 2.5% <span>₹{cgst.toFixed(2)}</span></div>
            <div>SGST @ 2.5% <span>₹{sgst.toFixed(2)}</span></div>
            <div className="grand-total">
              INVOICE TOTAL <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

        </section>

        <div className="amount-words">
          <b>Amount Chargeable (in words):</b>{" "}
          {numberToWords(total)} Rupees Only
        </div>

        <section className="bottom-section">

          <div className="terms">
            <h3>PAYMENT TERMS / CONDITIONS</h3>

            <p>
              <b>Payment Terms:</b> {paymentTerms}
              {paymentTerms === "Credit" && creditPeriod
                ? ` — ${creditPeriod}`
                : ""}
            </p>

            <p>
              Goods once sold will not be taken back or refunded unless
              there is physical damage to the product at the time of delivery.
            </p>
          </div>

          <div className="bank">
            <h3>BANK ACCOUNT DETAILS</h3>
            <p><b>Account Name:</b> World of Willpower Pvt Ltd</p>
            <p><b>Bank:</b> Cosmos Bank</p>
            <p><b>Account Type:</b> Current Account</p>
            <p><b>Account No.:</b> 0041001019220</p>
            <p><b>IFSC:</b> COSB0000004</p>
            <p><b>Branch:</b> Kothrud, Pune Branch</p>
          </div>

        </section>

        <footer>
          <div>Thank you for your business!</div>
          <div className="signature">
            For World of Willpower Private Limited<br /><br />
            <b>Authorised Signatory</b>
          </div>
        </footer>

      </div>

    </div>
  );
}

export default App;
