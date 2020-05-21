import React from 'react';
import styled from '@emotion/styled';
import Sidebar from 'components/Sidebar';

const BuilderWrapper = styled.aside`
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  background-color: #151515;
`;

const Builder = () => {
  return (
    <BuilderWrapper>
      <Sidebar />
    </BuilderWrapper>
  );
};

export default Builder;
