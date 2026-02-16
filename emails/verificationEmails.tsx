import {
  Html,
  Head,
  Font,
  Preview,
  Row,
  Heading,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head>
        <title>Verification Code</title>

      </Head>
      <Preview>Here&apos;s your verification code</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username},</Heading>

        </Row>
        <Row>
          <Text>
            Thank you for registering with us. Please use the following code to
            verify your account:
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
