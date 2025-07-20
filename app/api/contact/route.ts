import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.IONOS_EMAIL || 'admin@hvac35242.com',
        pass: 'Hershyman1965?1',
      },
    })
    
    const mailOptions = {
      from: process.env.IONOS_EMAIL || 'admin@hvac35242.com',
      to: process.env.IONOS_EMAIL || 'admin@hvac35242.com',
      subject: 'Birmingham HVAC Contact - ' + name,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Sent from hvac35242.com contact form</small></p>
      `,
    }
    
    await transporter.sendMail(mailOptions)
    
    return NextResponse.json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}