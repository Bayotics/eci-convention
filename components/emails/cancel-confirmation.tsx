import * as React from "react"

interface CancelConfirmationEmailProps {
  firstName: string
  lastName: string
  email: string
  registrationId: string
}

export const CancelConfirmationEmail: React.FC<CancelConfirmationEmailProps> = ({
  firstName,
  lastName,
  email,
  registrationId,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 600, margin: "0 auto", padding: 24, background: "#fff" }}>
    <h2 style={{ color: "#b91c1c" }}>ECI Convention Registration Cancelled</h2>
    <p>Dear {firstName} {lastName},</p>
    <p>
      This is to confirm that your registration for the ECI Convention has been <b>cancelled</b>.
    </p>
    <table style={{ margin: "24px 0", fontSize: 15 }}>
      <tbody>
        <tr>
          <td style={{ fontWeight: "bold", paddingRight: 8 }}>Name:</td>
          <td>{firstName} {lastName}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold", paddingRight: 8 }}>Email:</td>
          <td>{email}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold", paddingRight: 8 }}>Registration ID:</td>
          <td>{registrationId}</td>
        </tr>
      </tbody>
    </table>
    <p>
      If you did not request this cancellation or have any questions, please contact us at <a href="mailto:info@waletayo2000@yahoo.com.org">info@ekoclubevents.org</a>.
    </p>
    <p style={{ color: "#6b7280", fontSize: 13, marginTop: 32 }}>
      Thank you,<br />
      ECI Convention Team
    </p>
  </div>
)