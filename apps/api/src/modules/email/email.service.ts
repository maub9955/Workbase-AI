import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || smtpUser;

    if (smtpHost && smtpUser && smtpPass) {
      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });
      this.logger.log("이메일 전송 서비스가 초기화되었습니다.");
    } else {
      this.logger.warn("SMTP 설정이 없어 이메일 전송이 비활성화되었습니다. 환경 변수를 설정하세요: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS");
    }
  }

  async sendInviteEmail(to: string, pageTitle: string, ownerName: string, inviteLink: string) {
    const subject = `[Workbase AI] ${ownerName}님이 "${pageTitle}" 페이지에 초대했습니다`;
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0066cc; color: white; padding: 20px; text-align: center; border-radius: 4px 4px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 4px 4px; }
            .button { display: inline-block; padding: 12px 24px; background: #0066cc; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { margin-top: 20px; font-size: 0.875rem; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Workbase AI - 페이지 초대</h1>
            </div>
            <div class="content">
              <p>안녕하세요,</p>
              <p><strong>${ownerName}</strong>님이 <strong>"${pageTitle}"</strong> 페이지에 초대했습니다.</p>
              <p>아래 버튼을 클릭하여 페이지에 접근하세요:</p>
              <p style="text-align: center;">
                <a href="${inviteLink}" class="button">페이지 열기</a>
              </p>
              <p>또는 아래 링크를 복사하여 브라우저에 붙여넣으세요:</p>
              <p style="word-break: break-all; color: #0066cc;">${inviteLink}</p>
              <p><strong>참고:</strong> 로그인이 필요합니다. 계정이 없으시면 먼저 회원가입을 진행해주세요.</p>
              <div class="footer">
                <p>이 이메일은 Workbase AI에서 자동으로 전송되었습니다.</p>
                <p>문의사항이 있으시면 workbase-ai@support.com으로 연락주세요.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
    const text = `${ownerName}님이 "${pageTitle}" 페이지에 초대했습니다.\n\n링크: ${inviteLink}\n\n로그인이 필요합니다.`;

    if (!this.transporter) {
      this.logger.warn(`이메일 전송 시도 (SMTP 미설정): ${to} - ${subject}`);
      this.logger.log(`이메일 내용:\n${text}`);
      return { success: false, message: "SMTP가 설정되지 않았습니다." };
    }

    try {
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject,
        text,
        html
      });

      this.logger.log(`이메일 전송 성공: ${to} - Message ID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error: any) {
      this.logger.error(`이메일 전송 실패: ${to}`, error);
      return { success: false, message: error.message };
    }
  }
}
