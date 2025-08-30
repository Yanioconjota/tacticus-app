export interface Player {
  guild: Guild;
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
  role: 'LEADER' | 'OFFICER' | 'MEMBER';
  level: number;
  lastActivityOn: string;
}
