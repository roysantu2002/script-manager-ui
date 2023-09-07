// ThankYou.js
import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="container">
      <h1>Thank You!</h1>
      <p>Your message has been sent successfully.</p>
      <Link href="/">Go to Home</Link>
    </div>
  );
}
