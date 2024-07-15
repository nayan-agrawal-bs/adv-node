export default {
  data: `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" align="center">
          Password Reset Request
        </mj-text>
        <mj-text font-size="16px" align="center">
          Hello ##FIRST_NAME##,
        </mj-text>
        <mj-text font-size="16px">
          We received a request to reset your password. Click the button below to reset it.
        </mj-text>
        <mj-button background-color="#007BFF" href="##RESET_PASSWORD_LINK##">
          Reset Password
        </mj-button>
        <mj-text font-size="16px">
          If you didn't request a password reset, please ignore this email or contact support if you have questions.
        </mj-text>
        <mj-text font-size="16px">
          Thanks,
          <br />
          Your ##ORG_NAME$$ Team
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text font-size="12px" color="#9B9B9B" align="center">
          If the button above doesn't work, paste this link into your browser:
          <br />
          <a href="##RESET_PASSWORD_LINK##">##RESET_PASSWORD_LINK##</a>
        </mj-text>
        <mj-text font-size="12px" color="#9B9B9B" align="center">
          &copy; 2024 Your ##ORG_NAME##, All rights reserved.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
};
