import { join } from 'path';
import { call } from '@toebean/npc';
import { z } from 'zod';
import {
    iChangelogsSchema,
    iCollectionSchema,
    iColourSchemeSchema,
    iDownloadURLSchema,
    iEndorseResponseSchema,
    iEndorsementSchema,
    iFileInfoSchema,
    iGameInfoSchema,
    iGameListEntrySchema,
    iMD5ResultSchema,
    iModFilesSchema,
    iModInfoSchema,
    iRevisionSchema,
    iTrackedModSchema,
    iUpdateEntrySchema,
    iValidateKeyResponseSchema,
    updatePeriodSchema,
} from './schemas';

const namespace = join('vortex', 'nexus');

/**
 * Endorse or abstain from endorsing a mod.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.endorseMod}
 */
export const endorseMod = async (options: {
    input: {
        gameId: string;
        modId: number | string;
        modVersion: string;
        endorseStatus: 'endorse' | 'abstain';
    };
    signal?: AbortSignal;
}) =>
    iEndorseResponseSchema.parse(
        await call({ endpoint: join(namespace, 'endorseMod'), ...options })
    );

/**
 * Retrieve all changelogs for a mod.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getChangelogs}
 */
export const getChangelogs = async (options: {
    input: { modId: number | string; gameId: string };
    signal?: AbortSignal;
}) =>
    iChangelogsSchema.parse(
        await call({ endpoint: join(namespace, 'getChangelogs'), ...options })
    );

/**
 * Retrieves details about a collection.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getCollection}
 */
export const getCollection = async (options: {
    input: { slug: string };
    signal?: AbortSignal;
}) =>
    iCollectionSchema.parse(
        await call({ endpoint: join(namespace, 'getCollection'), ...options })
    );

/**
 * Retrieves details about a collection revision.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getCollectionRevision}
 */
export const getCollectionRevision = async (options: {
    input: { collectionSlug: string; revisionNumber: number };
    signal?: AbortSignal;
}) =>
    iRevisionSchema.parse(
        await call({
            endpoint: join(namespace, 'getCollectionRevision'),
            ...options,
        })
    );

/**
 * Retrieves all collections for a game.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getCollections}
 */
export const getCollections = async (options: {
    input: { gameId: string };
    signal?: AbortSignal;
}) =>
    iCollectionSchema.array().parse(
        await call({
            endpoint: join(namespace, 'getCollections'),
            ...options,
        })
    );

/**
 * Retrieves a list of color schemes used by Nexus Mods.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getColorSchemes}
 */
export const getColorSchemes = async (options?: { signal?: AbortSignal }) =>
    iColourSchemeSchema.array().parse(
        await call({
            endpoint: join(namespace, 'getColorSchemes'),
            ...options,
        })
    );

/**
 * Retrieves a list of download links for a file.
 * @remarks If the user isn't premium on Nexus Mods, this requires a key that can only be generated on the website.
 * The key is part of the `nxm:` links which are generated for the "Download with Manager" button on the website.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getDownloadUrls}
 */
export const getDownloadUrls = async (options: {
    input: {
        modId: number | string;
        fileId: number | string;
        key?: string;
        expires?: number;
        gameId: string;
    };
    signal?: AbortSignal;
}) =>
    iDownloadURLSchema.array().parse(
        await call({
            endpoint: join(namespace, 'getDownloadUrls'),
            ...options,
        })
    );

/**
 * Retrieves a list of endorsements the user has given.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getEndorsements}
 */
export const getEndorsements = async (options?: { signal?: AbortSignal }) =>
    iEndorsementSchema.array().parse(
        await call({
            endpoint: join(namespace, 'getEndorsements'),
            ...options,
        })
    );

/**
 * Searches for a file by md5 hash and retrieves information about all matching files.
 * Can be used to lookup a file when you don't know its Nexus Mods mod and file id.
 * @remarks Note that there may be multiple files matching the same md5 hash, as multiple users may have uploaded the same file or (less likely),
 * md5 hash collisions are possible and the file may be completely unrelated but happens to have the same hash. It is your responsibility to filter the
 * list of results and determine whether any of them match the file you are looking for, e.g. by comparing file size, contents, name of the mod, etc.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getFileByMd5}
 */
export const getFileByMd5 = async (options: {
    input: { hash: string; gameId: string };
    signal?: AbortSignal;
}) =>
    iMD5ResultSchema.array().parse(
        await call({
            endpoint: join(namespace, 'getFileByMd5'),
            ...options,
        })
    );

/**
 * Retrieves details about a file.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getFileInfo}
 */
export const getFileInfo = async (options: {
    input: { modId: number | string; fileId: number | string; gameId: string };
    signal?: AbortSignal;
}) =>
    iFileInfoSchema.parse(
        await call({ endpoint: join(namespace, 'getFileInfo'), ...options })
    );

/**
 * Retrieves details about a specific game.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getGameInfo}
 */
export const getGameInfo = async (options: {
    input: { gameId: string };
    signal?: AbortSignal;
}) =>
    iGameInfoSchema.parse(
        await call({ endpoint: join(namespace, 'getGameInfo'), ...options })
    );

/**
 * Retrieves a list of all games currently supported by Nexus Mods.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getGames}
 */
export const getGames = async (options?: { signal?: AbortSignal }) =>
    iGameListEntrySchema
        .array()
        .parse(
            await call({ endpoint: join(namespace, 'getGames'), ...options })
        );

/**
 * Retrieves a list of the latest added mods for a game.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getLatestAdded}
 */
export const getLatestAdded = async (options: {
    input: { gameId: string };
    signal?: AbortSignal;
}) =>
    iModInfoSchema.array().parse(
        await call({
            endpoint: join(namespace, 'getLatestAdded'),
            ...options,
        })
    );

/**
 * Retrieves a list of the latest updated mods for a game.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getLatestUpdated}
 */
export const getLatestUpdated = async (options: {
    input: { gameId: string };
    signal?: AbortSignal;
}) =>
    iModInfoSchema.array().parse(
        await call({
            endpoint: join(namespace, 'getLatestUpdated'),
            ...options,
        })
    );

/**
 * Retrieves a list of files uploaded for a mod.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getModFiles}
 */
export const getModFiles = async (options: {
    input: { modId: number; gameId: string };
    signal?: AbortSignal;
}) =>
    iModFilesSchema.parse(
        await call({ endpoint: join(namespace, 'getModFiles'), ...options })
    );

/**
 * Retrieves details about a mod.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getModInfo}
 */
export const getModInfo = async (options: {
    input: { modId: number; gameId: string };
    signal?: AbortSignal;
}) =>
    iModInfoSchema.parse(
        await call({ endpoint: join(namespace, 'getModInfo'), ...options })
    );

/**
 * Retrieves a list of collections the user has created.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getMyCollections}
 */
export const getMyCollections = async (options: {
    input: { gameId: string; count?: number; offset?: number };
    signal?: AbortSignal;
}) =>
    iRevisionSchema.array().parse(
        await call({
            endpoint: join(namespace, 'getMyCollections'),
            ...options,
        })
    );

/**
 * Retrieves information about the rate limits for the user.
 * @remarks This call does not affect your rate limits.
 * @returns A {@link !Promise Promise} which when resolved, passes details of the user's remaining rate limits to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getRateLimits}
 */
export const getRateLimits = async (options?: { signal?: AbortSignal }) =>
    z.object({ daily: z.number(), hourly: z.number() }).parse(
        await call({
            endpoint: join(namespace, 'getRateLimits'),
            ...options,
        })
    );

/**
 * Retrieves a list of mods that have recently been updated for a game.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getRecentlyUpdatedMods}
 */
export const getRecentlyUpdatedMods = async (options: {
    input: { period: z.infer<typeof updatePeriodSchema>; gameId: string };
    signal?: AbortSignal;
}) =>
    iUpdateEntrySchema.array().parse(
        await call({
            endpoint: join(namespace, 'getRecentlyUpdatedMods'),
            ...options,
        })
    );

/**
 * Retrieves a list of all mods the user is tracking.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getTrackedMods}
 */
export const getTrackedMods = async (options?: { signal?: AbortSignal }) =>
    iTrackedModSchema.array().parse(
        await call({
            endpoint: join(namespace, 'getTrackedMods'),
            ...options,
        })
    );

/**
 * Retrieves a list of trending mods for a game.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getTrending}
 */
export const getTrending = async (options: {
    input: { gameId: string };
    signal?: AbortSignal;
}) =>
    iModInfoSchema
        .array()
        .parse(
            await call({ endpoint: join(namespace, 'getTrending'), ...options })
        );

/**
 * Retrieves the last key validation result.
 * @remarks This call does not affect your rate limits.
 * @returns A {@link !Promise Promise} which when resolved, passes the last key validation result to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.getValidationResult}
 */
export const getValidationResult = async (options?: { signal?: AbortSignal }) =>
    iValidateKeyResponseSchema.parse(
        await call({
            endpoint: join(namespace, 'getValidationResult'),
            ...options,
        })
    );

/**
 * Rate a collection revision.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.rateCollectionRevision}
 */
export const rateCollectionRevision = async (options: {
    input: { rating: number; revisionId: number };
    signal?: AbortSignal;
}) =>
    z.any().parse(
        await call({
            endpoint: join(namespace, 'rateCollectionRevision'),
            ...options,
        })
    );

/**
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.resolveCollectionUrl}
 */
export const resolveCollectionUrl = async (options: {
    input: { apiLink: string };
    signal?: AbortSignal;
}) =>
    iDownloadURLSchema.array().parse(
        await call({
            endpoint: join(namespace, 'resolveCollectionUrl'),
            ...options,
        })
    );

/**
 * Track a mod.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.trackMod}
 */
export const trackMod = async (options: {
    input: { modId: string; gameId: string };
    signal?: AbortSignal;
}) =>
    iTrackedModSchema.parse(
        await call({ endpoint: join(namespace, 'trackMod'), ...options })
    );

/**
 * Stop tracking a mod.
 * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
 * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=nexus.Function.untrackMod}
 */
export const untrackMod = async (options: {
    input: { modId: string; gameId: string };
    signal?: AbortSignal;
}) =>
    iTrackedModSchema.parse(
        await call({ endpoint: join(namespace, 'untrackMod'), ...options })
    );
