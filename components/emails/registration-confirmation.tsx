import type * as React from "react"

interface RegistrationConfirmationEmailProps {
  firstName: string
  lastName: string
  email: string
  chapterName: string
  registrationCategory: string
  attendanceDays: string[]
  ticketPrice: number
  paymentId: string
  registrationId: string
  registrationType: string
}

export const RegistrationConfirmationEmail: React.FC<RegistrationConfirmationEmailProps> = ({
  firstName,
  lastName,
  email,
  chapterName,
  registrationCategory,
  attendanceDays,
  ticketPrice,
  paymentId,
  registrationId,
  registrationType,
}) => {
  const dayLabels = {
    day1: "Thursday, Sept 18 - Economic Development & Youth",
    day2: "Friday, Sept 19 - Community Service & Reflection",
    day3: "Saturday, Sept 20 - Health, Governance & Celebration",
    day4: "Sunday, Sept 21 - Spiritual Reflection & Farewell",
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div
        style={{ textAlign: "center", marginBottom: "30px", borderBottom: "3px solid #7c3aed", paddingBottom: "20px" }}
      >
        {/* ECI Logo */}
        <div style={{ marginBottom: "20px" }}>
          <img
            src="https://www.ekoclubevents.org/images/eci-logo.png"
            alt="ECI Logo"
            style={{
              width: "120px",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
        <h1 style={{ color: "#7c3aed", fontSize: "28px", margin: "0 0 10px 0" }}>ECI@25</h1>
        <p style={{ color: "#6b7280", fontSize: "16px", margin: "0" }}>14th Biennial Convention</p>
        <p style={{ color: "#059669", fontSize: "18px", fontWeight: "bold", margin: "10px 0 0 0" }}>
          Registration Confirmed!
        </p>
      </div>

      {/* Welcome Message */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#1f2937", fontSize: "24px", marginBottom: "15px" }}>Welcome to ECI@25, {firstName}!</h2>
        <p style={{ color: "#4b5563", fontSize: "16px", lineHeight: "1.6" }}>
          Thank you for registering for the 14th Biennial Eko Club International Convention in Newark, NJ. We're thrilled to have
          you join us for this historic celebration from September 18-21, 2025.
        </p>
      </div>

      {/* Registration Details */}
      <div style={{ backgroundColor: "#f9fafb", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h3
          style={{
            color: "#1f2937",
            fontSize: "20px",
            marginBottom: "15px",
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "10px",
          }}
        >
          Registration Details
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tr>
            <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold", width: "40%" }}>Registration ID:</td>
            <td style={{ padding: "8px 0", color: "#1f2937" }}>{registrationId}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Name:</td>
            <td style={{ padding: "8px 0", color: "#1f2937" }}>
              {firstName} {lastName}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Email:</td>
            <td style={{ padding: "8px 0", color: "#1f2937" }}>{email}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Chapter:</td>
            <td style={{ padding: "8px 0", color: "#1f2937" }}>{chapterName}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Ticket Type:</td>
            <td style={{ padding: "8px 0", color: "#1f2937" }}>
              {registrationCategory.charAt(0).toUpperCase() + registrationCategory.slice(1)} Pass
            </td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Payment ID:</td>
            <td style={{ padding: "8px 0", color: "#1f2937", fontSize: "12px" }}>
              {registrationType === "economic-session-only" ? "Free" : paymentId}
            </td>
          </tr>
        </table>
      </div>

      {/* Event Information */}
      <div style={{ backgroundColor: "#f0fdf4", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h3 style={{ color: "#1f2937", fontSize: "20px", marginBottom: "15px" }}>Event Information</h3>
        <div style={{ marginBottom: "15px" }}>
          <p style={{ color: "#1f2937", fontWeight: "bold", margin: "0 0 5px 0" }}>📅 Dates:</p>
          <p style={{ color: "#4b5563", margin: "0" }}>September 18-21, 2025</p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <p style={{ color: "#1f2937", fontWeight: "bold", margin: "0 0 5px 0" }}>📍 Venue:</p>
          <p style={{ color: "#4b5563", margin: "0" }}>DoubleTree by Hilton Hotel Newark Airport</p>
          <p style={{ color: "#4b5563", margin: "0" }}>128 Frontage Rd, Newark, NJ 07114</p>
        </div>
        <div>
          <p style={{ color: "#1f2937", fontWeight: "bold", margin: "0 0 5px 0" }}>🎯 Theme:</p>
          <p style={{ color: "#4b5563", margin: "0" }}>"Bridging Generations, Building Communities"</p>
        </div>
      </div>

      {/* Next Steps */}
      <div style={{ backgroundColor: "#fef3c7", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h3 style={{ color: "#1f2937", fontSize: "20px", marginBottom: "15px" }}>What's Next?</h3>
        <ul style={{ margin: "0", paddingLeft: "20px" }}>
          <li style={{ color: "#1f2937", marginBottom: "10px" }}>
            <strong>Convention Materials:</strong> Will be mailed to you 2 weeks before the event
          </li>
          <li style={{ color: "#1f2937", marginBottom: "10px" }}>
            <strong>Hotel Booking:</strong> Use group code "ECI25" for special rates at the venue
          </li>
          <li style={{ color: "#1f2937", marginBottom: "10px" }}>
            <strong>Travel Information:</strong> Detailed travel guide will be sent soon
          </li>
          <li style={{ color: "#1f2937", marginBottom: "10px" }}>
            <strong>Updates:</strong> Follow us on social media for the latest convention news
          </li>
        </ul>
      </div>

      {/* Modify/Cancel Registration Button */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <a
          href={`https://www.ekoclubevents.org/register/preview?email=${encodeURIComponent(email)}`}
          style={{
            display: "inline-block",
            backgroundColor: "#7c3aed",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Modify or Cancel Registration
        </a>
      </div>

      {/* Contact Information */}
      <div style={{ backgroundColor: "#f3f4f6", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h3 style={{ color: "#1f2937", fontSize: "20px", marginBottom: "15px" }}>Need Help?</h3>
        <p style={{ color: "#4b5563", margin: "0 0 10px 0" }}>
          If you have any questions or need assistance, please don't hesitate to contact us:
        </p>
        <p style={{ color: "#1f2937", margin: "0 0 5px 0" }}>
          <strong>Email:</strong> waletayo2000@yahoo.com
        </p>
        <p style={{ color: "#1f2937", margin: "0 0 5px 0" }}>
          <strong>Phone:</strong> +1 (610) 203-0370
        </p>
        <p style={{ color: "#1f2937", margin: "0" }}>
          <strong>Website:</strong> www.ekoclubevents.org
        </p>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", borderTop: "2px solid #e5e7eb", paddingTop: "20px", color: "#6b7280" }}>
        <p style={{ margin: "0 0 10px 0", fontSize: "18px", fontWeight: "bold", color: "#7c3aed" }}>
          See you in Newark!
        </p>
        <p style={{ margin: "0 0 10px 0" }}>Eko Club International - Bridging Generations, Building Communities</p>
        <p style={{ margin: "0", fontSize: "14px" }}>© 2025 Eko Club International. All rights reserved.</p>
      </div>
    </div>
  )
}
