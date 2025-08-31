export interface Player {
  player: PlayerData;
}

export interface PlayerData {
  details: PlayerDetails;
  units: Unit[];
  inventory: Inventory;
  progress: Progress;
}

export interface PlayerDetails {
  name: string;
  powerLevel: number;
}

export interface Unit {
  id: string;
  name: string;
  faction: string;
  grandAlliance: string;
  progressionIndex: number;
  xp: number;
  xpLevel: number;
  rank: number;
  abilities: Ability[];
  upgrades: number[];
  items: Item[];
  shards: number;
  mythicShards: number;
}

export interface Ability {
  id: string;
  level: number;
}

export interface Item {
  slotId: string;
  level: number;
  id: string;
  name: string;
  rarity: string;
}

export interface Inventory {
  items: InventoryItem[];
  shards: Shard[];
  forgeBadges: ForgeBadge[];
  components: Component[];
  [key: string]: any; // For other inventory properties
}

export interface InventoryItem {
  id: string;
  name: string;
  level: number;
  amount: number;
}

export interface Shard {
  id: string;
  name: string;
  amount: number;
}

export interface ForgeBadge {
  name: string;
  rarity: string;
  amount: number;
}

export interface Component {
  name: string;
  grandAlliance: string;
  amount: number;
}

export interface Progress {
  campaigns: Campaign[];
  arena: TokenInfo;
  guildRaid: GuildRaidTokens;
  onslaught: TokenInfo;
  salvageRun: TokenInfo;
}

export interface Campaign {
  id: string;
  name: string;
  type: string;
  battles: Battle[];
}

export interface Battle {
  battleIndex: number;
  attemptsLeft: number;
  attemptsUsed: number;
}

export interface TokenInfo {
  tokens: {
    current: number;
    max: number;
    nextTokenInSeconds: number;
    regenDelayInSeconds: number;
  };
}

export interface GuildRaidTokens extends TokenInfo {
  bombTokens: {
    current: number;
    max: number;
    nextTokenInSeconds: number;
    regenDelayInSeconds: number;
  };
}

export interface Guild {
  guildId: string;
  guildTag: string;
  name: string;
  level: number;
  members: GuildMember[];
  guildRaidSeasons: number[];
}

export interface GuildMember {
  userId: string;
  role: 'LEADER' | 'OFFICER' | 'MEMBER' | 'CO_LEADER';
  level: number;
  lastActivityOn: number;
}
