import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 12px;
  white-space: pre;
`;

export default ({ error }) => <ErrorContainer>{error}</ErrorContainer>;
