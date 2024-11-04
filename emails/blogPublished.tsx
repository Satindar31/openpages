import React from "react";
import {
  Html,
  Text,
  Heading,
  Container,
  Button,
  Hr,
} from "@react-email/components";

// Define the component props
interface BlogPublishedEmailProps {
  username: string;
  blogTitle: string;
  blogUrl: string;
}

export function BlogPublished({
  username,
  blogTitle,
  blogUrl,
}: BlogPublishedEmailProps): React.ReactElement {
  return (
    <Html>
      <Container style={styles.container}>
        <Heading style={styles.heading}>
          🎉 Congratulations, {username}!
        </Heading>
        <Text style={styles.text}>
          Your new blog post titled <strong>{blogTitle}</strong> has been
          published successfully!
        </Text>

        <Button
          href={blogUrl}
          style={styles.button}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Your Post
        </Button>

        <Hr style={styles.hr} />

        <Text style={styles.footerText}>
          Thank you for sharing your thoughts with us! Keep writing and
          inspiring others.
        </Text>
      </Container>
    </Html>
  );
}

export default BlogPublished;

// Styles for the email component
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "0 auto",
    padding: "20px",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    color: "#333",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  section: {
    margin: "20px 0",
  },
  previewText: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "20px",
  },
  button: {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#0070f3",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "5px",
  },
  hr: {
    border: "0",
    borderTop: "1px solid #eee",
    margin: "20px 0",
  },
  footerText: {
    fontSize: "14px",
    color: "#888",
    textAlign: "center" as const,
  },
};
