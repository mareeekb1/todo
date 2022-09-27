export interface IMilestone {
  id?: number | string;
  title?: string;
  description?: string;
  from?: string;
  to?: string;
}
export interface IMilestonesArray {
  data: IMilestone[];
}
