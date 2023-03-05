import { join } from 'path';
import { call } from '@toebean/npc';
import { z } from 'zod';
import {
    iGameStoredSchema,
    iModSchema,
    iProfileModSchema,
    iProfileSchema,
} from './schemas';

const namespace = 'vortex';

/**
 * Ensures the Vortex user is logged in to their Nexus account.
 * @returns A {@link !Promise Promise} which when resolved, indicates the user is logged into their Nexus account.
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=vortex.Function.ensureLoggedIn}
 */
export const ensureLoggedIn = (options?: { signal?: AbortSignal }) =>
    <Promise<void>>(
        call({ endpoint: join(namespace, 'ensureLoggedIn'), ...options })
    );

/**
 * Retrieves details about the currently active Vortex profile.
 * @returns A {@link !Promise Promise} which when resolved, passes the currently active Vortex profile to its {@link !Promise.then then} handler(s),
 * or `undefined` if not found.
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=vortex.Function.getActiveProfile}
 */
export const getActiveProfile = async (options?: { signal?: AbortSignal }) =>
    iProfileSchema.parse(
        await call({
            endpoint: join(namespace, 'getActiveProfile'),
            ...options,
        })
    );

/**
 * Retrieves the stored static details about the currently selected game mode.
 * @remarks If there is no currently selected game mode, the result will have the fallback id `__placeholder`.
 * @returns A {@link !Promise Promise} which when resolved, passes the currently selected game mode to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=vortex.Function.getCurrentGame}
 */
export const getCurrentGame = async (options?: { signal?: AbortSignal }) =>
    iGameStoredSchema.parse(
        await call({ endpoint: join(namespace, 'getCurrentGame'), ...options })
    );

/**
 * Retrieves the details of installed mods for the currently selected game mode.
 * @returns A {@link !Promise Promise} when when resolved, passes mod details for the currently selected game mode to its {@link !Promise.then then} handler(s)
 * as an object where each mod is indexed by its id, or an empty object if no game mode is currently selected.
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=vortex.Function.getMods}
 */
export const getMods = async (options?: { signal?: AbortSignal }) =>
    z
        .record(iProfileModSchema)
        .and(z.record(iModSchema))
        .parse(
            await call({ endpoint: join(namespace, 'getMods'), ...options })
        );
