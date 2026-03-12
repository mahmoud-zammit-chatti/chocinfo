"use client";
import { maintenanceServices } from "@/data/products";

export default function MaintenanceBanner() {
  return (
    <section className="maintenance-banner">
      <div className="maintenance-inner">
        <div className="maint-header">
          <h2>🔧 Professional Tech Maintenance</h2>
          <p>Expert repair and diagnostics services for all your devices</p>
        </div>
        <div className="maint-cards">
          {maintenanceServices.map((service) => (
            <div className="maint-card" key={service.id}>
              <div className="maint-icon">{service.icon}</div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="maint-price">{service.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBadges() {
  const badges = [
    { icon: "🚚", title: "Fast Delivery", desc: "Free shipping over 500 TND" },
    { icon: "🛡️", title: "Warranty", desc: "Up to 2 years manufacturer warranty" },
    { icon: "🎧", title: "24/7 Support", desc: "Expert technical assistance" },
    { icon: "🔄", title: "Easy Returns", desc: "14-day return policy" },
  ];

  return (
    <section className="trust-badges">
      <div className="trust-inner">
        {badges.map((badge, i) => (
          <div className="trust-badge" key={i}>
            <div className="trust-icon">{badge.icon}</div>
            <h4>{badge.title}</h4>
            <p>{badge.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
