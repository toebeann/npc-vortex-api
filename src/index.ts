import { Callback, Result } from '@toebean/npc';
import { types } from 'vortex-api';
import { z } from 'zod';
import * as nexus from './nexus/schemas';

export * as nexus from './nexus';
export * as vortex from './vortex';

/**
 * Interface for npc-vortex-extension's built-in Nexus convenience functions.
 */
export interface NexusApi {
    /**
     * Endorse or abstrain from endorsing a mod.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#endorseMod}
     */
    endorseMod: (
        input: z.infer<typeof nexus.endorseModArgsSchema>
    ) => Promise<z.infer<typeof nexus.iEndorseResponseSchema>>;
    /**
     * Retrieve all changelogs for a mod.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getChangelogs}
     */
    getChangelogs: (
        input: z.infer<typeof nexus.modIdArgsSchema>
    ) => Promise<z.infer<typeof nexus.iChangelogsSchema>>;
    /**
     * Retrieves details about a collection.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getCollection}
     */
    getCollection: (
        input: z.infer<typeof nexus.getCollectionArgsSchema>
    ) => Promise<z.infer<typeof nexus.iCollectionSchema>>;
    /**
     * Retrieves details about a collection revision.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getCollectionRevision}
     */
    getCollectionRevision: (
        input: z.infer<typeof nexus.getCollectionRevisionArgsSchema>
    ) => Promise<z.infer<typeof nexus.iRevisionSchema>>;
    /**
     * Retrieves all collections for a game.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getCollections}
     */
    getCollections: (
        input: z.infer<typeof nexus.gameIdArgsSchema>
    ) => Promise<z.infer<typeof nexus.iCollectionSchema>[]>;
    /**
     * Retrieves a list of color schemes used by Nexus Mods.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getColorSchemes}
     */
    getColorSchemes: () => Promise<z.infer<typeof nexus.iColourSchemeSchema>[]>;
    /**
     * Retrieves a list of download links for a file.
     * @remarks If the user isn't premium on Nexus Mods, this requires a key that can only be generated on the website.
     * The key is part of the `nxm:` links which are generated for the "Download with Manager" button on the website.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getDownloadUrls}
     */
    getDownloadUrls: (
        input: z.infer<typeof nexus.getDownloadUrlArgsSchema>
    ) => Promise<z.infer<typeof nexus.iDownloadURLSchema>[]>;
    /**
     * Retrieves a list of endorsements the user has given.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getEndorsements}
     */
    getEndorsements: () => Promise<z.infer<typeof nexus.iEndorsementSchema>[]>;
    /**
     * Searches for a file by md5 hash and retrieves information about all matching files.
     * Can be used to lookup a file when you don't know its Nexus Mods mod and file id.
     * @remarks Note that there may be multiple files matching the same md5 hash, as multiple users may have uploaded the same file or (less likely),
     * md5 hash collisions are possible and the file may be completely unrelated but happens to have the same hash. It is your responsibility to filter the
     * list of results and determine whether any of them match the file you are looking for, e.g. by comparing file size, contents, name of the mod, etc.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getFileByMd5}
     */
    getFileByMd5: (
        input: z.infer<typeof nexus.getFileByMd5ArgsSchema>
    ) => Promise<z.infer<typeof nexus.iMD5ResultSchema>[]>;
    /**
     * Retrieves details about a file.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getFileInfo}
     */
    getFileInfo: (
        input: z.infer<typeof nexus.fileIdArgsSchema>
    ) => Promise<z.infer<typeof nexus.iFileInfoSchema>>;
    /**
     * Retrieves details about a specific game.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getGameInfo}
     */
    getGameInfo: (
        input: z.infer<typeof nexus.gameIdArgsSchema>
    ) => Promise<z.infer<typeof nexus.iGameInfoSchema>>;
    /**
     * Retrieves a list of all games currently supported by Nexus Mods.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getGames}
     */
    getGames: () => Promise<z.infer<typeof nexus.iGameListEntrySchema>[]>;
    /**
     * Retrieves a list of the latest added mods for a game.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getLatestAdded}
     */
    getLatestAdded: (
        input: z.infer<typeof nexus.gameIdArgsSchema>
    ) => Promise<z.infer<typeof nexus.iModInfoSchema>[]>;
    /**
     * Retrieves a list of the latest updated mods for a game.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getLatestUpdated}
     */
    getLatestUpdated: (
        input: z.infer<typeof nexus.gameIdArgsSchema>
    ) => Promise<z.infer<typeof nexus.iModInfoSchema>[]>;
    /**
     * Retrieves a list of files uploaded for a mod.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getModFiles}
     */
    getModFiles: (
        input: z.infer<typeof nexus.modIdArgsSchema>
    ) => Promise<z.infer<typeof nexus.iModFilesSchema>>;
    /**
     * Retrieves details about a mod.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getModInfo}
     */
    getModInfo: (
        input: z.infer<typeof nexus.modIdArgsSchema>
    ) => Promise<z.infer<typeof nexus.iModInfoSchema>>;
    /**
     * Retrieves a list of collections the user has created.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getMyCollections}
     */
    getMyCollections: (
        input: z.infer<typeof nexus.getMyCollectionsArgsSchema>
    ) => Promise<z.infer<typeof nexus.iRevisionSchema>[]>;
    /**
     * Retrieves information about the rate limits for the user.
     * @remarks This call does not affect your rate limits.
     * @returns A {@link !Promise Promise} which when resolved, passes details of the user's remaining rate limits to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getRateLimits}
     */
    getRateLimits: () => Promise<{ daily: number; hourly: number }>;
    /**
     * Retrieves a list of mods that have recently been updated for a game.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getRecentlyUpdatedMods}
     */
    getRecentlyUpdatedMods: (
        input: z.infer<typeof nexus.getRecentlyUpdatedModsArgsSchema>
    ) => Promise<z.infer<typeof nexus.iUpdateEntrySchema>[]>;
    /**
     * Retrieves a list of all mods the user is tracking.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getTrackedMods}
     */
    getTrackedMods: () => Promise<z.infer<typeof nexus.iTrackedModSchema>[]>;
    /**
     * Retrieves a list of trending mods for a game.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getTrending}
     */
    getTrending: (
        input: z.infer<typeof nexus.gameIdArgsSchema>
    ) => Promise<z.infer<typeof nexus.iModInfoSchema>[]>;
    /**
     * Retrieves the last key validation result.
     * @remarks This call does not affect your rate limits.
     * @returns A {@link !Promise Promise} which when resolved, passes the last key validation result to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#getValidationResult}
     */
    getValidationResult: () => Promise<
        z.infer<typeof nexus.iValidateKeyResponseSchema>
    >;
    /**
     * Rate a collection revision.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#rateCollectionRevision}
     */
    rateCollectionRevision: (
        input: z.infer<typeof nexus.rateCollectionRevisionArgsSchema>
    ) => Promise<unknown>;
    /**
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#resolveCollectionUrl}
     */
    resolveCollectionUrl: (
        input: z.infer<typeof nexus.resolveCollectionUrlArgsSchema>
    ) => Promise<z.infer<typeof nexus.iDownloadURLSchema>[]>;
    /**
     * Track a mod.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#trackMod}
     */
    trackMod: (
        input: z.infer<typeof nexus.trackModArgsSchema>
    ) => Promise<z.infer<typeof nexus.iTrackedModSchema>>;
    /**
     * Stop tracking a mod.
     * @returns A {@link !Promise Promise} which when resolved, passes the response from the Nexus Mods API to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.NexusApi#untrackMod}
     */
    untrackMod: (
        input: z.infer<typeof nexus.trackModArgsSchema>
    ) => Promise<z.infer<typeof nexus.iTrackedModSchema>>;
}

/**
 * Interface for the createNexusApi function.
 */
export interface CreateNexusApi {
    /**
     * Creates a {@link NexusApi} instance.
     * @param {types.IExtensionApi} api The Vortex extension API passed to the extension.
     * @returns An instance of {@link NexusApi}.
     */
    (api: types.IExtensionApi): NexusApi;
}

/**
 * Interface for npc-vortex-extension's built-in Vortex convenience functions.
 */
export interface VortexApi {
    /**
     * Ensures the Vortex user is logged in to their Nexus account.
     * @returns A {@link !Promise Promise} which when resolved, indicates the user is logged into their Nexus account.
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.VortexApi#ensureLoggedIn}
     */
    ensureLoggedIn: () => void | Promise<void>;
    /**
     * Retrieves details about the currently active Vortex profile.
     * @returns The currently active Vortex profile, or void if not found.
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.VortexApi#getActiveProfile}
     */
    getActiveProfile: () => types.IProfile | void;
    /**
     * Retrieves the stored static details about the currently selected game mode.
     * @remarks If there is no currently selected game mode, the result will have the fallback id `__placeholder`.
     * @returns A {@link !Promise Promise} which when resolved, passes the currently selected game mode to its {@link !Promise.then then} handler(s).
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.VortexApi#getCurrentGame}
     */
    getCurrentGame: () => Promise<types.IGameStored>;
    /**
     * Retrieves the details of installed mods for the currently selected game mode.
     * @returns Mod details for the currently selected game mode as an object where each mod is indexed by its id,
     * or an empty object if no game mode is currently selected.
     * @see {@link https://toebeann.github.io/npc-vortex-api/stable/?page=Interface.VortexApi#getMods}
     */
    getMods: () => Record<string, types.IProfileMod> &
        Record<string, types.IMod>;
}

/**
 * Interface for the createVortexApi function.
 */
export interface CreateVortexApi {
    /**
     * Creates a {@link VortexApi} instance.
     * @param {types.IExtensionApi} api The Vortex extension API passed to the extension.
     * @returns An instance of {@link VortexApi}.
     */
    (api: types.IExtensionApi): VortexApi;
}

/**
 * {@link https://zod.dev Zod schema} for npc API objects.
 */
export const npcApiSchema = z.record(z.unknown()).and(
    z.object({
        middleware: z.record(z.unknown()).optional(),
    })
);

/**
 * Interface for the registerNpcApi function.
 */
export interface RegisterNpcApi {
    /**
     * Registers an {@link @toebean/npc!Npc npc procedure} at a given path. The procedure callback will then be available to other processes via the npc protocol.
     * @remarks
     * * The procedure callback will only receive a single argument when called. It is your responsibility to validate this argument.
     * We recommend {@link https://zod.dev Zod} for validation.
     * * registerNpcApi should be called within the context.once callback.
     * @example
     * ```ts
     * // subnautica-support/src/index.ts
     * import { join } from "path";
     * import { RegisterNpcApi } from "@toebean/npc-vortex-api";
     * import { types } from "vortex-api";
     * import { getQmmInstallation } from "./api";
     *
     * export default function main(context: types.IExtensionContext) {
     *     // make sure to only call registerNpcApi within the context.once callback
     *     context.once(async () => {
     *         const registerNpcApi: RegisterNpcApi = context.api.ext.registerNpcApi; // assign the interface to the function for TypeScript type safety.
     *
     *         // register the function `getQmmInstallation` namespaced by the name of the extenstion
     *         const endpoint = await registerNpcApi?.(join('subnauticaSupport', 'getQmmInstallation'), getQmmInstallation);
     *         // endpoint = 'vortex\\subnauticaSupport\\getQmmInstallation'
     *         // `getQmmInstallation` is now available via the npc protocol at this address.
     *
     *         if (!endpoint) {
     *             // if endpoint is undefined, this is likely because the user does not have this extension installed
     *             // you can confirm this by inspecting their installed extensions with context.api.getState().session.extensions.installed
     *         }
     *     });
     * }
     * ```
     * @param {string} path The path at which the procedure will be available.
     * It is generally recommended to combine the name of your extension with the name of the function.
     * @param {Callback} callback The underlying callback powering the procedure to expose at the path.
     * @returns A {@link !Promise Promise} which when resolved, indicates the callback is available to be called via the {@link @toebean/npc!Npc npc} protocol at the endpoint
     * passed to the {@link !Promise.then then} handler.
     */
    (path: string, callback: Callback): Promise<string | undefined>;

    /**
     * Registers an {@link @toebean/npc!Npc npc procedure} at a given path with middleware. The procedure callback will then be available to other processes via the npc protocol.
     * @remarks
     * * The procedure callback will only receive a single argument when called. It is your responsibility to validate this argument.
     * We recommend {@link https://zod.dev Zod} for validation.
     * * registerNpcApi should be called within the context.once callback.
     * @example
     * ```ts
     * // subnautica-support/src/index.ts
     * import { join } from "path";
     * import { RegisterNpcApi } from "@toebean/npc-vortex-api";
     * import { types } from "vortex-api";
     * import { enableMod, enableModArgsSchema } from "./api";
     *
     * export default function main(context: types.IExtensionContext) {
     *
     *     // make sure to only call registerNpcApi within the context.once callback
     *     context.once(async () => {
     *         const registerNpcApi: RegisterNpcApi = context.api.ext.registerNpcApi; // assign the interface to the function for TypeScript type safety.
     *
     *         // register the function `enableMod` with a Zod schema validator middleware function, namespaced by the name of the extension
     *         const endpoint = await registerNpcApi?.(join('subnauticaSupport', 'enableMod'), enableMod, enableModArgsSchema.parse);
     *         // endpoint = 'vortex\\subnauticaSupport\\enableMod'
     *         // `enableMod` is now available via the npc protocol at this address.
     *
     *         if (!endpoint) {
     *             // if endpoint is undefined, this is likely because the user does not have this extension installed
     *             // you can confirm this by inspecting their installed extensions with context.api.getState().session.extensions.installed
     *         }
     *     });
     * }
     * ```
     * @param {string} path The path at whic hthe procedure will be available.
     * It is generally recommended to combine the name of your extension with the name of the function.
     * @param {(input: T) => Result} callback The underlying callback powering the procedure to expose at the path.
     * @param {(input: unknown) => T} middleware A middleware function which will be applied to the callback's input argument.
     * The return of this function will be passed to the callback as its input. Useful for inserting argument validation or transformation, for example.
     * @returns A {@link !Promise Promise} which when resolved, indicates the callback is available to be called via the {@link @toebean/npc!Npc npc} protocol at the endpoint
     * passed to the {@link !Promise.then then} handler.
     */
    <T>(
        path: string,
        callback: (input: T) => Result,
        middleware: (input: unknown) => T
    ): Promise<string | undefined>;

    /**
     * Registers all function properties of the passed `api` object as {@link @toebean/npc!Npc npc procedures}, namespaced by the given `namespace` string.
     * @remarks
     * * Procedure endpoints will take the form `vortex\\${namespace}\\${key}` where `namespace` is the passed `namespace` argument,
     * and `key` is the key of the property in the passed `api` object.
     * * To automatically assign middleware to property function, simply create an object property `middleware` on the `api` object,
     * and set a property of this object with a matching key, e.g. `{ foo: (n: number) => isNaN(n), middleware: { foo: z.number().parse } }`
     * * Procedure callbacks will only receive a single argument when called. It is your responsibility to validate this argument.
     * We recommend {@link https://zod.dev Zod} for validation.
     * * registerNpcApi should be called within the context.once callback.
     * @example
     * ```ts
     * // subnautica-support/src/index.ts
     * import { RegisterNpcApi } from "@toebean/npc-vortex-api";
     * import { types } from "vortex-api";
     * import { z } from "zod";
     *
     * export default function main(context: types.IExtensionContext) {
     *
     *     // make sure to only call registerNpcApi within the context.once callback
     *     context.once(async () => {
     *         const registerNpcApi: RegisterNpcApi = context.api.ext.registerNpcApi; // assign the interface to the function for TypeScript type safety.
     *
     *         // register the function `enableMod` with a Zod schema validator middleware function, namespaced by the name of the extension
     *         const endpoints = await registerNpcApi?.('subnauticaSupport', {
     *             getSquareRoot: Math.sqrt,
     *             middleware: {
     *                 getSquareRoot: z.number().parse
     *             }
     *         });
     *         // endpoints = [ 'vortex\\subnauticaSupport\\getSquareRoot' ]
     *
     *         if (!endpoints) {
     *             // if endpoints is undefined, this is likely because the user does not have this extension installed
     *             // you can confirm this by inspecting their installed extensions with context.api.getState().session.extensions.installed
     *         }
     *     });
     * }
     * ```
     * @param {string} namespace The namespace to apply to all functions of the passed `api` object.
     * @param {Record<string, unknown> & { middleware: Record<string, unknown> }} api An object whose function properties should be registered as
     * {@link @toebean/npc!Npc npc procedures}.
     * @returns A {@link !Promise Promise} which when resolved, indicates all function properties of the `api` object are available to be called via the
     * {@link @toebean/npc!Npc npc} protocol at the endpoints passed to the {@link !Promise.then then} handler.
     */
    (namespace: string, api: z.infer<typeof npcApiSchema>): Promise<
        (string | undefined)[]
    >;
}
