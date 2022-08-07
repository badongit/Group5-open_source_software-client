import React from 'react';

export default function Helmet(props) {
  document.title = props.title || 'Document';

  return <React.Fragment>{props.children}</React.Fragment>;
}