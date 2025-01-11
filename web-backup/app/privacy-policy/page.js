import Head from 'next/head';

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Our privacy policy explains how we handle your data." />
      </Head>
      <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Privacy Policy</h1>
        <p>
          Effective Date: [Insert Date]
        </p>

        <h2>Information We Collect</h2>
        <p>
          [Explain the types of data you collect, e.g., personal information, cookies, analytics, etc.]
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          [Describe how the collected data is used, e.g., to improve the service, analytics, etc.]
        </p>

        <h2>Sharing Your Information</h2>
        <p>
          [Explain whether you share data with third parties and for what purposes.]
        </p>

        <h2>Your Rights</h2>
        <p>
          [Describe user rights, e.g., access to data, deletion requests, etc.]
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, you can contact us at:
          <br />
          Email: [Insert Email]
          <br />
          Address: [Insert Address]
        </p>
      </main>
    </>
  );
};

export default PrivacyPolicy;
