import SibApiV3Sdk from 'sib-api-v3-sdk';
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;
import "dotenv/config"

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendOtpEmail = async (email, otp) => {
  const sender = {
    email: "mr.money.bhandal@gmail.com",
    name: "GreenCart Admin"
  };

  const receivers = [
    { email: email }
  ];

  try {
    
    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Email Verification Code",
      textContent: `Your 6 digit secret code to reset password is ${otp}.\nUse this to reset your password, the code is valid for 15 minutes only.`,
    });
    return true
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return false
  }
};
