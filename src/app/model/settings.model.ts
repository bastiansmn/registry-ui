export default interface Setting {
  id: number;
  value: string;
}

export type Settings = { [k: string]: Setting };
