export interface GuildRaid {
  season: number;
  seasonConfigId: string;
  entries: RaidEntry[];
}

export interface RaidEntry {
  userId: string;
  tier: number;
  set: number;
  encounterIndex: number;
  remainingHp: number;
  maxHp: number;
  encounterType: string;
  unitId: string;
  type: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  damageDealt: number;
  damageType: string;
  startedOn: string;
  completedOn: string;
  heroDetails: HeroDetail[];
  machineOfWarDetails: MachineOfWarDetail;
  globalConfigHash: string;
}

export interface HeroDetail {
  unitId: string;
  power: number;
}

export interface MachineOfWarDetail {
  unitId: string;
  power: number;
}

export interface ApiError {
  type: 'FORBIDDEN' | 'NOT_FOUND' | 'UNKNOWN_ERROR';
}
