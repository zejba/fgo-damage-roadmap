export interface QuestTurn {
  targetDamage: number;
  dsr: number | null;
  dtdr: number | null;
}

export interface QuestData {
  id: string;
  name: string;
  turns: QuestTurn[];
}

declare const questData: QuestData[];
export default questData;
