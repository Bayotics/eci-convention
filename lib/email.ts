import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface RegistrationData {
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
interface CancelData {
  firstName: string
  lastName: string
  email: string
  registrationId: string
}
interface ImmigrationData {
  name:string,
  service: string,
  email: string
}
function generateCancelConfirmationHTML(cancelData: CancelData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Registration Cancelled</title>
    </head>
    <body style="font-family: Arial, sans-serif; background: #fff; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #b91c1c;">ECI Convention Registration Cancelled</h2>
        <p>Dear ${cancelData.firstName} ${cancelData.lastName},</p>
        <p>
          This is to confirm that your registration for the ECI Convention has been <b>cancelled</b>.
        </p>
        <table style="margin: 24px 0; font-size: 15px;">
          <tr>
            <td style="font-weight: bold; padding-right: 8px;">Name:</td>
            <td>${cancelData.firstName} ${cancelData.lastName}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding-right: 8px;">Email:</td>
            <td>${cancelData.email}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding-right: 8px;">Registration ID:</td>
            <td>${cancelData.registrationId}</td>
          </tr>
        </table>
        <p>
          If you did not request this cancellation or have any questions, please contact us at
          <a href="mailto:info@waletayo2000@yahoo.com">info@waletayo2000@yahoo.com</a>.
        </p>
        <p style="color: #6b7280; font-size: 13px; margin-top: 32px;">
          Thank you,<br />
          ECI Convention Team
        </p>
      </div>
    </body>
    </html>
  `
}
function generateVisaConfirmationHTML(immigrationData: ImmigrationData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Immigration Service Registration Confirmed</title>
    </head>
    <body style="font-family: Arial, sans-serif; background: #fff; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #b91c1c;">ECI Immigration Service Registration Confirmation</h2>
        <p>Dear ${immigrationData.name},</p>
        <p>
          This is to confirm that your registration for the ECI Immigration service has been <b>saved</b>.
        </p>
        <table style="margin: 24px 0; font-size: 15px;">
          <tr>
            <td style="font-weight: bold; padding-right: 8px;">Name:</td>
            <td>${immigrationData.name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding-right: 8px;">Service:</td>
            <td>${immigrationData.service}</td>
          </tr>
        </table>
        <p>
          If you did not request this cancellation or have any questions, please contact us at
          <a href="mailto:info@waletayo2000@yahoo.com">info@waletayo2000@yahoo.com</a>.
        </p>
        <p style="color: #6b7280; font-size: 13px; margin-top: 32px;">
          Thank you,<br />
          ECI Convention Team
        </p>
      </div>
    </body>
    </html>
  `
}

function generateConfirmationEmailHTML(registrationData: RegistrationData): string {
  const dayLabels = {
    day1: "Thursday, Sept 18 - Economic Development & Youth",
    day2: "Friday, Sept 19 - Community Service & Reflection",
    day3: "Saturday, Sept 20 - Health, Governance & Celebration",
    day4: "Sunday, Sept 21 - Spiritual Reflection & Farewell",
  }

  const attendanceDaysList = registrationData.attendanceDays
    .map(
      (day) =>
        `<li style="color: #1f2937; margin-bottom: 8px; font-size: 16px;">${dayLabels[day as keyof typeof dayLabels]}</li>`,
    )
    .join("")

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ECI@25 Registration Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #7c3aed; padding: 30px 20px 20px 20px; background: linear-gradient(135deg, #7c3aed 0%, #059669 100%); color: white;">
          <!-- ECI Logo -->
          <div style="margin-bottom: 20px;">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Eko_club_logo-removebg-preview-SAUiEpYRjmONtSd1YKYL42qyW13AzD.png" 
              alt="ECI Logo" 
              style="width: 120px; height: auto; display: block; margin: 0 auto;" 
            />
          </div>
          <h1 style="color: white; font-size: 32px; margin: 0 0 10px 0; font-weight: bold;">ECI@25</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 0 0 15px 0;">14th Biennial Convention</p>
          <div style="background-color: rgba(255,255,255,0.2); padding: 12px 24px; border-radius: 25px; display: inline-block;">
            <p style="color: white; font-size: 20px; font-weight: bold; margin: 0;">✅ Registration Confirmed!</p>
          </div>
        </div>

        <div style="padding: 0 20px;">
          <!-- Welcome Message -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1f2937; font-size: 28px; margin-bottom: 15px;">Welcome to ECI@25, ${registrationData.firstName}!</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
              Thank you for registering for the 14th Biennial Eko Club International Convention in Newark, NJ. We're thrilled to have
              you join us for this historic celebration from September 18-21, 2025.
            </p>
          </div>

          <!-- Registration Details -->
          <div style="background-color: #f9fafb; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #7c3aed;">
            <h3 style="color: #1f2937; font-size: 22px; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              📋 Registration Details
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold; width: 40%; border-bottom: 1px solid #f3f4f6;">Registration ID:</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: bold; border-bottom: 1px solid #f3f4f6;">${registrationData.registrationId}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Name:</td>
                <td style="padding: 10px 0; color: #1f2937; border-bottom: 1px solid #f3f4f6;">${registrationData.firstName} ${registrationData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Email:</td>
                <td style="padding: 10px 0; color: #1f2937; border-bottom: 1px solid #f3f4f6;">${registrationData.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Chapter:</td>
                <td style="padding: 10px 0; color: #1f2937; border-bottom: 1px solid #f3f4f6;">${registrationData.chapterName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Ticket Type:</td>
                <td style="padding: 10px 0; color: #1f2937; border-bottom: 1px solid #f3f4f6;">${registrationData.registrationCategory.charAt(0).toUpperCase() + registrationData.registrationCategory.slice(1)} Pass</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Payment ID:</td>
                <td style="padding: 10px 0; color: #1f2937; font-size: 12px; font-family: monospace;">${registrationData.registrationType === "economic-session-only" ? "Free" : registrationData.paymentId}</td>
              </tr>
            </table>
          </div>

          <!-- Event Information -->
          <div style="background-color: #f0fdf4; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #22c55e;">
            <h3 style="color: #1f2937; font-size: 20px; margin-bottom: 15px;">🎯 Event Information</h3>
            <div style="margin-bottom: 15px;">
              <p style="color: #1f2937; font-weight: bold; margin: 0 0 5px 0;">📅 Dates:</p>
              <p style="color: #4b5563; margin: 0; font-size: 16px;">September 18-21, 2025</p>
            </div>
            <div style="margin-bottom: 15px;">
              <p style="color: #1f2937; font-weight: bold; margin: 0 0 5px 0;">📍 Venue:</p>
              <p style="color: #4b5563; margin: 0; font-size: 16px;">DoubleTree by Hilton Hotel Newark Airport</p>
              <p style="color: #4b5563; margin: 0; font-size: 14px;">128 Frontage Rd, Newark, NJ 07114</p>
            </div>
            <div>
              <p style="color: #1f2937; font-weight: bold; margin: 0 0 5px 0;">🎯 Theme:</p>
              <p style="color: #4b5563; margin: 0; font-size: 16px; font-style: italic;">"Bridging Generations, Building Communities"</p>
            </div>
          </div>

          <!-- Next Steps -->
          <div style="background-color: #fef3c7; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #f59e0b;">
            <h3 style="color: #1f2937; font-size: 20px; margin-bottom: 15px;">🚀 What's Next?</h3>
            <ul style="margin: 0; padding-left: 0; list-style: none;">
              <li style="color: #1f2937; margin-bottom: 12px; padding-left: 25px; position: relative;">
                <span style="position: absolute; left: 0; color: #22c55e; font-weight: bold;">✅</span>
                <strong>Hotel Booking:</strong> Use group code "ECI25" for special rates at the venue
              </li>
              <li style="color: #1f2937; margin-bottom: 12px; padding-left: 25px; position: relative;">
                <span style="position: absolute; left: 0; color: #22c55e; font-weight: bold;">✅</span>
                <strong>Travel Information:</strong> Detailed travel guide will be sent soon
              </li>
              <li style="color: #1f2937; margin-bottom: 12px; padding-left: 25px; position: relative;">
                <span style="position: absolute; left: 0; color: #22c55e; font-weight: bold;">✅</span>
                <strong>Updates:</strong> Follow us on social media for the latest convention news
              </li>
            </ul>
          </div>

          <!-- Modify/Cancel Registration Button -->
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 2px dashed #cbd5e1;">
            <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">Need to make changes?</h3>
            <a 
              href="https://www.ekoclubevents.org/register/preview?email=${encodeURIComponent(registrationData.email)}"
              style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #059669 100%); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; border: none; cursor: pointer; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
            >
              🔧 Modify or Cancel Registration
            </a>
            <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">
              You can update your registration details or cancel if needed
            </p>
          </div>

          <!-- Contact Information -->
          <div style="background-color: #f3f4f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
            <h3 style="color: #1f2937; font-size: 20px; margin-bottom: 15px;">📞 Need Help?</h3>
            <p style="color: #4b5563; margin: 0 0 15px 0; line-height: 1.6;">
              If you have any questions or need assistance, please don't hesitate to contact us:
            </p>
            <div style="background-color: white; padding: 15px; border-radius: 8px;">
              <p style="color: #1f2937; margin: 0 0 8px 0;">
                <strong>📧 Email:</strong> <a href="mailto:waletayo2000@yahoo.com" style="color: #7c3aed;">info@ekoclubevents.org</a>
              </p>
              <p style="color: #1f2937; margin: 0 0 8px 0;">
                <strong>📱 Phone:</strong> <a href="tel:+15551234567" style="color: #7c3aed;">+1 (555) 123-4567</a>
              </p>
              <p style="color: #1f2937; margin: 0;">
                <strong>🌐 Website:</strong> <a href="https://www.ekoclubevents.org" style="color: #7c3aed;">www.ekoclubevents.org</a>
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; background: linear-gradient(135deg, #7c3aed 0%, #059669 100%); color: white; padding: 30px 20px;">
          <p style="margin: 0 0 15px 0; font-size: 24px; font-weight: bold;">🎉 See you in Newark!</p>
          <p style="margin: 0 0 10px 0; font-size: 16px;">Eko Club International - Bridging Generations, Building Communities</p>
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">© 2025 Eko Club International. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateAdminNotificationHTML(registrationData: RegistrationData): string {
  const dayLabels = {
    day1: "Thursday, Sept 18 - Economic Development & Youth",
    day2: "Friday, Sept 19 - Community Service & Reflection",
    day3: "Saturday, Sept 20 - Health, Governance & Celebration",
    day4: "Sunday, Sept 21 - Spiritual Reflection & Farewell",
  }

  const attendanceDaysList = registrationData.attendanceDays
    .map((day) => dayLabels[day as keyof typeof dayLabels])
    .join(", ")

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New ECI@25 Registration</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #7c3aed 0%, #059669 100%); border-radius: 12px; color: white;">
          <h1 style="color: white; font-size: 28px; margin: 0 0 10px 0;">🎉 New ECI@25 Registration</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">Registration completed successfully</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #7c3aed;">
          <h3 style="color: #1f2937; font-size: 20px; margin-bottom: 20px;">Registration Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold; width: 30%; border-bottom: 1px solid #e5e7eb;">Name:</td>
              <td style="padding: 8px 0; color: #1f2937; border-bottom: 1px solid #e5e7eb;">${registrationData.firstName} ${registrationData.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Email:</td>
              <td style="padding: 8px 0; color: #1f2937; border-bottom: 1px solid #e5e7eb;">${registrationData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Chapter:</td>
              <td style="padding: 8px 0; color: #1f2937; border-bottom: 1px solid #e5e7eb;">${registrationData.chapterName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Category:</td>
              <td style="padding: 8px 0; color: #1f2937; border-bottom: 1px solid #e5e7eb;">${registrationData.registrationCategory.charAt(0).toUpperCase() + registrationData.registrationCategory.slice(1)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Amount:</td>
              <td style="padding: 8px 0; color: #059669; font-weight: bold; font-size: 18px; border-bottom: 1px solid #e5e7eb;">$${registrationData.ticketPrice}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Payment ID:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 12px; font-family: monospace; border-bottom: 1px solid #e5e7eb;">${registrationData.paymentId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Registration ID:</td>
              <td style="padding: 8px 0; color: #1f2937; font-weight: bold; border-bottom: 1px solid #e5e7eb;">${registrationData.registrationId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Attendance Days:</td>
              <td style="padding: 8px 0; color: #1f2937;">${attendanceDaysList}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #1f2937; margin: 0; text-align: center;">
            <strong>Registration completed on:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function sendRegistrationConfirmation(registrationData: RegistrationData) {
  try {
    const { data, error } = await resend.emails.send({
      from: "ECI@25 Convention <www@ekoclub.org>",
      to: [registrationData.email],
      bcc: ["abolajiabdullah001@gmail.com"], // Send copy to admin
      subject: `Registration Confirmed - ECI@25 Convention | ${registrationData.firstName} ${registrationData.lastName}`,
      html: generateConfirmationEmailHTML(registrationData),
    })

    if (error) {
      console.error("Email sending error:", error)
      return { success: false, error }
    }

    console.log("Registration confirmation email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Email service error:", error)
    return { success: false, error }
  }
}

export async function sendAdminNotification(registrationData: RegistrationData) {
  try {
    const { data, error } = await resend.emails.send({
      from: "ECI@25 Registration System <www@ekoclub.org>",
      to: ["abolajiabdullah001@gmail.com"],
      subject: `New Registration - ${registrationData.firstName} ${registrationData.lastName} (${registrationData.chapterName})`,
      html: generateAdminNotificationHTML(registrationData),
    })

    if (error) {
      console.error("Admin notification error:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Admin notification service error:", error)
    return { success: false, error }
  }
}
export async function sendCancelConfirmation(cancelData: CancelData) {
  try {
    console.log("Cancel function is fired")
    console.log(cancelData)
    const { data, error } = await resend.emails.send({
      from: "ECI@25 Convention <www@ekoclub.org>",
      to: [cancelData.email],
      subject: "Your ECI Convention Registration Has Been Cancelled",
      html: generateCancelConfirmationHTML(cancelData),
    })

    if (error) {
      console.error("Cancel confirmation email error:", error)
      return { success: false, error }
    }

    console.log("Cancellation confirmation email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Cancel confirmation email service error:", error)
    return { success: false, error }
  }
}
export async function sendImmigrationConfirmation(immigrationData: ImmigrationData) {
  try {
    console.log("immigration function is fired")
    console.log(immigrationData)
    const { data, error } = await resend.emails.send({
      from: "ECI@25 Convention <www@ekoclub.org>",
      to: [immigrationData.email],
      subject: "Your ECI Convention Immigration service registration Has Been confirmed",
      html: generateVisaConfirmationHTML(immigrationData),
    })

    if (error) {
      console.error("Immigration confirmation email error:", error)
      return { success: false, error }
    }

    console.log("Immigration confirmation email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Immigration confirmation email service error:", error)
    return { success: false, error }
  }
}