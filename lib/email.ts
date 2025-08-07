import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendOrderConfirmation(
  email: string,
  orderData: {
    orderId: string
    customerName: string
    totalAmount: number
    items: any
  }
) {
  if (!resend) {
    console.log('Email service not configured. Would send order confirmation to:', email)
    return
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'orders@customcaddie.com',
      to: email,
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #2d5a2d; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .footer { text-align: center; padding: 20px; color: #666; }
              .button { display: inline-block; padding: 12px 24px; background-color: #2d5a2d; color: white; text-decoration: none; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You for Your Order!</h1>
              </div>
              <div class="content">
                <p>Dear ${orderData.customerName},</p>
                <p>Your custom golf set order has been confirmed!</p>
                <h2>Order Details</h2>
                <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                <p><strong>Total Amount:</strong> $${(orderData.totalAmount / 100).toFixed(2)}</p>
                <h3>What's Next?</h3>
                <ul>
                  <li>Our design team will review your customization within 24 hours</li>
                  <li>Production will begin once the design is approved (3-5 business days)</li>
                  <li>You'll receive tracking information once your order ships</li>
                </ul>
                <p>If you have any questions, please don't hesitate to contact us.</p>
                <div style="text-align: center; margin-top: 30px;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL}/orders/${orderData.orderId}" class="button">View Order Status</a>
                </div>
              </div>
              <div class="footer">
                <p>© 2024 Custom Caddie. All rights reserved.</p>
                <p>Premium Golf Gift Customization</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('Error sending order confirmation email:', error)
  }
}

export async function sendDesignShare(
  toEmail: string,
  fromName: string,
  designUrl: string,
  message?: string
) {
  if (!resend) {
    console.log('Email service not configured. Would send design share to:', toEmail)
    return
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'share@customcaddie.com',
      to: toEmail,
      subject: `${fromName} shared a Custom Caddie design with you`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #2d5a2d; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .button { display: inline-block; padding: 12px 24px; background-color: #2d5a2d; color: white; text-decoration: none; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>You've Received a Custom Golf Set Design!</h1>
              </div>
              <div class="content">
                <p>${fromName} has shared a custom golf set design with you.</p>
                ${message ? `<p><em>"${message}"</em></p>` : ''}
                <p>Click the button below to view and customize the design:</p>
                <div style="text-align: center; margin-top: 30px;">
                  <a href="${designUrl}" class="button">View Design</a>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('Error sending design share email:', error)
  }
}