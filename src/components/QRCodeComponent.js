import React from "react";
import QRCode from "qrcode.react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const QRCodeContainer = styled.div`
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const QRCodeComponent = () => {
  const qrValue = "Thank you for donating";

  return (
    <>
      <Container>
        <QRCodeContainer>
          <QRCode value={qrValue} size={200} />
        </QRCodeContainer>

        <Text>Your contributions can saves lives!</Text>
      </Container>
      <div style={{ padding: "15px" }}>
        <button type="button" class="btn btn-warning">
          Donate Now
        </button>
      </div>
    </>
  );
};

export default QRCodeComponent;
