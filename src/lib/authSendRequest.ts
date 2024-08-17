import { Resend } from "resend";
import {EmailConfig} from "@auth/core/providers";
import MagicLinkEmail from "../../emails/MagicLinkEmail";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function sendVerificationRequest(params: Parameters<EmailConfig["sendVerificationRequest"]>[0]): Promise<void> {
    const { identifier, provider, url, theme } = params
    const { host } = new URL(url)

    const { data, error } = await resend.emails.send({
        from: 'hello@guillaume-michel.com',
        to: [identifier],
        subject: `Sign in to ${host}`,
        text: text({ url, host }),
        react: MagicLinkEmail({ magicLink: url }),
    });

    if (error) {
        console.error('Resend error: ', error);
        throw new Error("Failed to send the verification email")
    }
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
}
