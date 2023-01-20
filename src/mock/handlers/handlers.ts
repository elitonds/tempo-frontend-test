import { TeamHandler } from "./team.handler";
import { UserHandler } from "./user.handler";

export const handlers = [...TeamHandler, ...UserHandler];
