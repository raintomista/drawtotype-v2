import React, { useState } from 'react';
import styled from '@emotion/styled';

import Sidebar from 'components/Sidebar/Sidebar';

const BuilderWrapper = styled.aside`
  display: grid;
  grid-template-columns: 250px 1fr 250px;
`;

const Builder = () => {
  const [groupItems, setGroupItems] = useState([
    [true, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);
  return (
    <BuilderWrapper>
      <Sidebar />
    </BuilderWrapper>
  );
};

export default Builder;
