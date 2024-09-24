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
  
  declare module "react-awesome-slider/dist/autoplay" {
    import AwesomeSlider, { AwesomeSliderProps } from "react-awesome-slider";
  
    interface AutoplaySliderProps extends AwesomeSliderProps {
      play?: boolean;
      interval?: number;
      cancelOnInteraction?: boolean;
    }
  
    const withAutoplay: (slider: typeof AwesomeSlider) => React.ComponentType<AutoplaySliderProps>;
  
    export default withAutoplay;
  }
  