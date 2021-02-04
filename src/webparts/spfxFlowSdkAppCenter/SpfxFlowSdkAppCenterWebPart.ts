import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxFlowSdkAppCenterWebPartStrings';
import SpfxFlowSdkAppCenter from './components/SpfxFlowSdkAppCenter';
import { ISpfxFlowSdkAppCenterProps } from './components/ISpfxFlowSdkAppCenterProps';

export interface ISpfxFlowSdkAppCenterWebPartProps {
  envId: string;
  filterParam: string;
}

export default class SpfxFlowSdkAppCenterWebPart extends BaseClientSideWebPart<ISpfxFlowSdkAppCenterWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpfxFlowSdkAppCenterProps> = React.createElement(
      SpfxFlowSdkAppCenter,
      {
        envId: this.properties.envId,
        filterParam: this.properties.filterParam,
        webPartContext: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('envId', {
                  label: strings.EnvIdFieldLabel
                }),
                PropertyPaneTextField('filterParam', {
                  label: strings.FilterParamFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
