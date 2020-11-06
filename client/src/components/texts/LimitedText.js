import React, { useState } from 'react';

export const LimitedText = ({ text }) => {
  const [limitedText] = useState(text.substring(0, 90));
  return <p>{limitedText && `${limitedText}...`}</p>;
};
