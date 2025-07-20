import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.IONOS_EMAIL || 'your-email@yourdomain.com',
        pass: '19c35d2673ec42a29599b798083bb0',
      },
    })
    
    const mailOptions = {
      from: process.env.IONOS_EMAIL || 'your-email@yourdomain.com',
      to: process.env.IONOS_EMAIL || 'your-email@yourdomain.com',
      subject: 'Birmingham HVAC Contact - ' + name,
      html: '<h2>New Contact</h2><p>Name: ' + name + '</p><p>Email: ' + email + '</p><p>Phone: ' + phone + '</p><p>Message: ' + message + '</p>',
    }
    
    await transporter.sendMail(mailOptions)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
