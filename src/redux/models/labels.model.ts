import { DataModel } from ".";

export interface Label extends DataModel {
  name: string;
  color: string;
}
export interface LabelList {
  data: Label[];
}
