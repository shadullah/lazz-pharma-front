declare module 'react-portal' {
    import * as React from 'react';
  
    export interface PortalWithStateProps {
      closeOnOutsideClick?: boolean;
      closeOnEsc?: boolean;
      children: (state: {
        openPortal: () => void;
        closePortal: () => void;
        isOpen: boolean;
        portal: (content: React.ReactNode) => React.ReactPortal;
      }) => React.ReactNode;
    }
  
    export class PortalWithState extends React.Component<PortalWithStateProps> {}
  }
  