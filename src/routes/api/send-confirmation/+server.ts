import type { RequestHandler } from "@sveltejs/kit";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "museumpass.services@gmail.com",
        pass: "fphdpuimgjpjxjhq",
    },
});

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { email, name, title, dateTime, visitors, packages, price } = await request.json();

        const mailOptions = {
            from: "museumpass.services@gmail.com",
            to: email,
            subject: "Your Ticket Has Been Confirmed",
            html: `
                <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; line-height: 1.6; color: #99a1af;">
                    <div style="max-width: 600px; margin: 20px auto; background: linear-gradient(to bottom right, #1e2939, #101828); padding: 20px; border: 2px solid #84cc16; border-radius: 8px;">
                        <h2 style="color: #ddd; text-align: center; font-size: 24px;">Dear <span 
                                style="color: transparent; background: linear-gradient(to right, #84cc16, #10b981); background-clip: text;">
                                    ${name},
                                </span></h2>
                        <p style="color: #99a1af; font-size: 16px; margin-bottom: 20px;">
                            Thank you for choosing to book your museum tickets with us! Your museum ticket booking has been successfully confirmed!
                        </p>
                        <p style="color: #ddd; font-size: 18px; margin-bottom: 20px; font-weight: bold;">
                            Booking Details:
                        </p>
                        <p style="color: #ddd; font-size: 16px; margin-bottom: 10px;">
                            Museum: <strong style="color: transparent; background: linear-gradient(to right, #84cc16, #10b981); background-clip: text;">${title}</strong>
                        </p>
                        <p style="color: #ddd; font-size: 16px; margin-bottom: 10px;">
                            Date & Time: <strong style="color: transparent; background: linear-gradient(to right, #84cc16, #10b981); background-clip: text;">${dateTime}</strong>
                        </p>
                        <p style="color: #ddd; font-size: 16px; margin-bottom: 10px;">
                            Visitors: <strong style="color: transparent; background: linear-gradient(to right, #84cc16, #10b981); background-clip: text;">${visitors}</strong> 
                        </p>
                        <p style="color: #ddd; font-size: 16px; margin-bottom: 10px;">
                            Packages: <strong style="color: transparent; background: linear-gradient(to right, #84cc16, #10b981); background-clip: text;">${packages}</strong>
                        </p>
                        <p style="color: #ddd; font-size: 16px; margin-bottom: 10px;">
                            Amount Paid: <strong style="color: transparent; background: linear-gradient(to right, #84cc16, #10b981); background-clip: text;">₹${price}</strong>
                        </p>
                        <p style="color: #99a1af; font-size: 16px; margin-bottom: 20px;">
                            Your ticket is available for download from our website's user dashboard. Please show the downloaded ticket when you arrive at the museum. We're excited to have you visit!
                        </p>
                        <p style="color: #ddd; font-size: 16px; text-align: right; margin-top: 40px;">
                            Regards, <br>
                            <strong style="color: transparent; background: linear-gradient(to right, #84cc16, #10b981); background-clip: text;">MuseumPass</strong>
                        </p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Error sending confirmation:", error);
        return new Response(JSON.stringify({ error: "Failed to send confirmation" }), { status: 500 });
    }
};