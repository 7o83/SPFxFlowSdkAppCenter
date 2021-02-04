import * as React from 'react';
import { ISpfxFlowSdkAppCenterProps } from './ISpfxFlowSdkAppCenterProps';

import SpApp from './SpApp';

export default class SpfxFlowSdkAppCenter extends React.Component<ISpfxFlowSdkAppCenterProps, {}> {
  public render(): React.ReactElement<ISpfxFlowSdkAppCenterProps> {
    return (
      <>
        <SpApp {...this.props}/>
      </>
    );
  }
}
