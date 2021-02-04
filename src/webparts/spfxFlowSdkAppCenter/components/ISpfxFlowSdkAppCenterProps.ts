import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpfxFlowSdkAppCenterProps {
  envId: string;
  filterParam: string;
  webPartContext: WebPartContext;
}
