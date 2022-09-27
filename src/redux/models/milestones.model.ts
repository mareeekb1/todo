import { DataModel } from ".";

export interface Milestone extends DataModel {
  title: string;
  from: string;
  to: string;
  description: string;
}
export interface MilestoneList {
  data: Milestone[];
}
