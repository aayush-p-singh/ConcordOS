/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as agents from "../agents.js";
import type * as ai from "../ai.js";
import type * as ai_approval from "../ai/approval.js";
import type * as ceo from "../ceo.js";
import type * as dashboard from "../dashboard.js";
import type * as decisions from "../decisions.js";
import type * as engineering from "../engineering.js";
import type * as finance from "../finance.js";
import type * as marketing from "../marketing.js";
import type * as negotiation from "../negotiation.js";
import type * as orchestrator from "../orchestrator.js";
import type * as seed from "../seed.js";
import type * as simulation from "../simulation.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  agents: typeof agents;
  ai: typeof ai;
  "ai/approval": typeof ai_approval;
  ceo: typeof ceo;
  dashboard: typeof dashboard;
  decisions: typeof decisions;
  engineering: typeof engineering;
  finance: typeof finance;
  marketing: typeof marketing;
  negotiation: typeof negotiation;
  orchestrator: typeof orchestrator;
  seed: typeof seed;
  simulation: typeof simulation;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
