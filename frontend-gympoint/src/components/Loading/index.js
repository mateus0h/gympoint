import React from 'react';
import { MdAutorenew } from 'react-icons/md';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <MdAutorenew id="lupa" size={100} color="#ef566c" />
    </Container>
  );
}
