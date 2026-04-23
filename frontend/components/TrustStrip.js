import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

const trustItems = [
  { icon: <Truck size={32} />, title: "Free Delivery", sub: "On orders above ₹999" },
  { icon: <ShieldCheck size={32} />, title: "1-Year Warranty", sub: "On all products" },
  { icon: <RefreshCw size={32} />, title: "Easy Returns", sub: "7-day hassle-free" },
  { icon: <Headphones size={32} />, title: "24/7 Support", sub: "Always here for you" },
];

export default function TrustStrip() {
  return (
    <section className="nexus-trust-strip">
      <div className="nexus-trust-inner">
        {trustItems.map((item, i) => (
          <div key={i} className="nexus-trust-item">
            <div className="nexus-trust-icon">{item.icon}</div>
            <div>
              <p className="nexus-trust-title">{item.title}</p>
              <p className="nexus-trust-sub">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
