jest.mock('nodemailer', () => ({ createTransport: jest.fn() }));

describe('utils/email', () => {
  afterEach(() => {
    jest.resetModules();
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.FRONTEND_URL;
  });

  test('returns info when transporter configured', async () => {
    process.env.SMTP_HOST = 'smtp.test';
    process.env.SMTP_PORT = '2525';
    process.env.SMTP_USER = 'u';
    process.env.SMTP_PASS = 'p';

    const nodemailer = await import('nodemailer');
    const mockSend = jest.fn().mockResolvedValue({ accepted: ['a@a.com'] });
    nodemailer.createTransport.mockReturnValue({ sendMail: mockSend });

    const { sendResetPasswordEmail } = await import('../../utils/email.js');
    const info = await sendResetPasswordEmail('a@a.com', 'token123');

    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(mockSend).toHaveBeenCalled();
    expect(info).toHaveProperty('accepted');
  });

  test('returns token info when transporter not configured', async () => {
    // ensure transporter will be null at module load
    delete process.env.SMTP_HOST;
    const { sendResetPasswordEmail } = await import('../../utils/email.js');
    const result = await sendResetPasswordEmail('b@b.com', 't2');
    expect(result).toEqual({ info: 'transporter not configured', token: 't2' });
  });
});
