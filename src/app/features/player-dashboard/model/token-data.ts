import { GuildRaidTokens, TokenInfo } from "../../../core/models/player.model";

export interface TokensData {
  arena: TokenInfo;
  guildRaid: GuildRaidTokens;
  onslaught: TokenInfo;
  salvageRun: TokenInfo;
}
