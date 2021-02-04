import * as React from 'react';
import { useEffect } from 'react';
import styles from './SpfxFlowSdkAppCenter.module.scss';

import 'MsFlowSdk';
import { AadTokenProvider } from '@microsoft/sp-http';

import { ISpfxFlowSdkAppCenterProps } from './ISpfxFlowSdkAppCenterProps';

const SpApp = (props: ISpfxFlowSdkAppCenterProps) => {

  const initSdkWidget = async () => {

    //管理できない要素の削除
    const parent = document.getElementById('myFlowDiv');
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }

    const sdk: any = await new window.MsFlowSdk({
      hostName: 'https://japan.flow.microsoft.com',
      locale: 'ja-jp',
      hostId: window.WellKnownHostIds.SHAREPOINT
    });

    //承認画面のオプション設定
    const widget: any = await sdk.renderWidget('approvalCenter', {
      container: 'myFlowDiv',
      enableOnBehalfOfTokens: true,
      environmentId: props.envId,
      debugMode: false,
      approvalCenterSettings: {
        approvalsFilter: props.filterParam,
        autoNavigateToDetails: true,
        hideFlowCreation: true,
        hideInfoPaneCloseButton: true,
        hideLink: false,
        showSimpleEmptyPage: true
      }
    });
    //Tokenの取得
    const tokenProvider: AadTokenProvider = await props.webPartContext.aadTokenProviderFactory.getTokenProvider();
    const myToken: string = await tokenProvider.getToken('https://service.flow.microsoft.com/');

    //Tokenの設定
    widget.listen("GET_ACCESS_TOKEN", (requestParam, widgetDoneCallback) => {
      widgetDoneCallback(null, { token: myToken });
    });

    //イベント発生時の処理
    widget.listen("WIDGET_READY", () => {
      console.log("The flow widget is now ready.");
    });
    widget.listen("WIDGET_RENDERED", () => {
      console.log("The flow widget is now rendered.");
    });
    widget.listen("RECEIVED_APPROVAL_STATUS_CHANGED", () => {
      console.log("received event.");
    });
    widget.listen("SENT_APPROVAL_STATUS_CHANGED", () => {
      console.log("sent event.");
    });

  };

  useEffect(() => {
    initSdkWidget();
  });

  return (
    <div className={styles.spfxFlowSdkAppCenter}>
      <div className={styles.container}>
        <div id="myFlowDiv" />
      </div>
    </div>
  );
};

export default SpApp;