export default {
  data: `<mjml>
  <mj-body>
    <mj-section background-color="#f0f0f0" padding="20px">
      <mj-column>
        <mj-text font-size="24px" font-weight="bold" align="center">
          Welcome to Our Service!
        </mj-text>
        <mj-text font-size="16px" align="center">
          Hello ##FIRST_NAME##,
        </mj-text>
        <mj-text font-size="16px">
          We're excited to have you on board. Here are some quick tips to get you started:
        </mj-text>
        <mj-list>
          <mj-text font-size="16px">Tip 1: Explore our features</mj-text>
          <mj-text font-size="16px">Tip 2: Customize your profile</mj-text>
          <mj-text font-size="16px">Tip 3: Connect with other users</mj-text>
        </mj-list>
        <mj-button background-color="#007BFF" href="https://yourapp.com/get-started">
          Get Started
        </mj-button>
        <mj-text font-size="16px">
          If you have any questions, feel free to reply to this email or visit our support center.
        </mj-text>
        <mj-text font-size="16px">
          Best regards,
          <br />
          The ##ORG_NAME## Team
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding="20px">
      <mj-column>
        <mj-text font-size="12px" color="#9B9B9B" align="center">
          You received this email because you signed up for [Your Service]. If you didn't, please ignore this email.
        </mj-text>
        <mj-text font-size="12px" color="#9B9B9B" align="center">
          &copy; 2024 ##ORG_NAME##, All rights reserved.
        </mj-text>
        <mj-social font-size="15px" icon-size="20px" mode="horizontal" align="center">
          <mj-social-element name="facebook" href="https://facebook.com/yourpage" />
          <mj-social-element name="twitter" href="https://twitter.com/yourprofile" />
          <mj-social-element name="linkedin" href="https://linkedin.com/company/yourcompany" />
        </mj-social>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`,
};
