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
        const { email, name, id, refund } = await request.json();

        const mailOptions = {
            from: "museumpass.services@gmail.com",
            to: email,
            subject: "Your Ticket Has Been Cancelled",
            html: `
                <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; line-height: 1.6; color: #99a1af;">
                    <div style="max-width: 600px; margin: 20px auto; background: linear-gradient(to bottom right, #1e2939, #101828); padding: 20px; border: 2px solid #84cc16; border-radius: 8px;">
                        <h2 style="color: #ddd; text-align: center; font-size: 24px;">Dear <span 
                                style="color: transparent; background: linear-gradient(to right, #84cc16, #10b981); background-clip: text;">
                                    ${name},
                                </span></h2>
                        <p style="color: #99a1af; font-size: 16px; margin-bottom: 20px;">
                            Your museum ticket has been successfully cancelled. Here are the refund details:
                        </p>
                        <p style="color: #ddd; font-size: 16px; margin-bottom: 20px; font-weight: bold;">
                            Ticket ID: <span style="color: transparent; background: linear-gradient(to right, #84cc16, #10b981); background-clip: text;">${id}</span>
                        </p>
                        <p style="color: #ddd; font-size: 16px; margin-bottom: 10px; font-weight: bold;">
                            Refund Amount: <strong style="color: transparent; background: linear-gradient(to right, #84cc16, #10b981); background-clip: text;">₹${refund}</strong>
                        </p>
                        <p style="color: #99a1af; font-size: 16px; margin-bottom: 20px;">
                            The refund will be processed to your original payment method within <span style="color: #ddd;" >**2-5 business days**</span>. If you have any issues, please contact our support team.
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
        console.error("Error sending cancellation email:", error);
        return new Response(JSON.stringify({ error: "Failed to send cancellation email" }), { status: 500 });
    }
};
