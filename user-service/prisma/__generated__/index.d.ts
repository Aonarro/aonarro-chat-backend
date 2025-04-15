
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model AccountSettings
 * 
 */
export type AccountSettings = $Result.DefaultSelection<Prisma.$AccountSettingsPayload>
/**
 * Model FriendRequest
 * 
 */
export type FriendRequest = $Result.DefaultSelection<Prisma.$FriendRequestPayload>
/**
 * Model Friendship
 * 
 */
export type Friendship = $Result.DefaultSelection<Prisma.$FriendshipPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const FriendRequestStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED'
};

export type FriendRequestStatus = (typeof FriendRequestStatus)[keyof typeof FriendRequestStatus]

}

export type FriendRequestStatus = $Enums.FriendRequestStatus

export const FriendRequestStatus: typeof $Enums.FriendRequestStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accountSettings`: Exposes CRUD operations for the **AccountSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccountSettings
    * const accountSettings = await prisma.accountSettings.findMany()
    * ```
    */
  get accountSettings(): Prisma.AccountSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friendRequest`: Exposes CRUD operations for the **FriendRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FriendRequests
    * const friendRequests = await prisma.friendRequest.findMany()
    * ```
    */
  get friendRequest(): Prisma.FriendRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friendship`: Exposes CRUD operations for the **Friendship** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Friendships
    * const friendships = await prisma.friendship.findMany()
    * ```
    */
  get friendship(): Prisma.FriendshipDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.5.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Profile: 'Profile',
    AccountSettings: 'AccountSettings',
    FriendRequest: 'FriendRequest',
    Friendship: 'Friendship'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "profile" | "accountSettings" | "friendRequest" | "friendship"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      AccountSettings: {
        payload: Prisma.$AccountSettingsPayload<ExtArgs>
        fields: Prisma.AccountSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountSettingsPayload>
          }
          findFirst: {
            args: Prisma.AccountSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountSettingsPayload>
          }
          findMany: {
            args: Prisma.AccountSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountSettingsPayload>[]
          }
          create: {
            args: Prisma.AccountSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountSettingsPayload>
          }
          createMany: {
            args: Prisma.AccountSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountSettingsPayload>[]
          }
          delete: {
            args: Prisma.AccountSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountSettingsPayload>
          }
          update: {
            args: Prisma.AccountSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountSettingsPayload>
          }
          deleteMany: {
            args: Prisma.AccountSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountSettingsPayload>[]
          }
          upsert: {
            args: Prisma.AccountSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountSettingsPayload>
          }
          aggregate: {
            args: Prisma.AccountSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccountSettings>
          }
          groupBy: {
            args: Prisma.AccountSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<AccountSettingsCountAggregateOutputType> | number
          }
        }
      }
      FriendRequest: {
        payload: Prisma.$FriendRequestPayload<ExtArgs>
        fields: Prisma.FriendRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          findFirst: {
            args: Prisma.FriendRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          findMany: {
            args: Prisma.FriendRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>[]
          }
          create: {
            args: Prisma.FriendRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          createMany: {
            args: Prisma.FriendRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>[]
          }
          delete: {
            args: Prisma.FriendRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          update: {
            args: Prisma.FriendRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          deleteMany: {
            args: Prisma.FriendRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FriendRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>[]
          }
          upsert: {
            args: Prisma.FriendRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          aggregate: {
            args: Prisma.FriendRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriendRequest>
          }
          groupBy: {
            args: Prisma.FriendRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendRequestCountArgs<ExtArgs>
            result: $Utils.Optional<FriendRequestCountAggregateOutputType> | number
          }
        }
      }
      Friendship: {
        payload: Prisma.$FriendshipPayload<ExtArgs>
        fields: Prisma.FriendshipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendshipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendshipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          findFirst: {
            args: Prisma.FriendshipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendshipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          findMany: {
            args: Prisma.FriendshipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>[]
          }
          create: {
            args: Prisma.FriendshipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          createMany: {
            args: Prisma.FriendshipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendshipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>[]
          }
          delete: {
            args: Prisma.FriendshipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          update: {
            args: Prisma.FriendshipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          deleteMany: {
            args: Prisma.FriendshipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendshipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FriendshipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>[]
          }
          upsert: {
            args: Prisma.FriendshipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          aggregate: {
            args: Prisma.FriendshipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriendship>
          }
          groupBy: {
            args: Prisma.FriendshipGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendshipGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendshipCountArgs<ExtArgs>
            result: $Utils.Optional<FriendshipCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    profile?: ProfileOmit
    accountSettings?: AccountSettingsOmit
    friendRequest?: FriendRequestOmit
    friendship?: FriendshipOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    sentRequests: number
    receivedRequests: number
    friendshipsInitiated: number
    friendshipsReceived: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentRequests?: boolean | ProfileCountOutputTypeCountSentRequestsArgs
    receivedRequests?: boolean | ProfileCountOutputTypeCountReceivedRequestsArgs
    friendshipsInitiated?: boolean | ProfileCountOutputTypeCountFriendshipsInitiatedArgs
    friendshipsReceived?: boolean | ProfileCountOutputTypeCountFriendshipsReceivedArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountSentRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendRequestWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountReceivedRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendRequestWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountFriendshipsInitiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendshipWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountFriendshipsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendshipWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    username: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    avatarUrl: string | null
    bio: string | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    settingsId: string | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    username: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    avatarUrl: string | null
    bio: string | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    settingsId: string | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    username: number
    email: number
    firstName: number
    lastName: number
    avatarUrl: number
    bio: number
    lastLoginAt: number
    createdAt: number
    updatedAt: number
    settingsId: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    email?: true
    firstName?: true
    lastName?: true
    avatarUrl?: true
    bio?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    settingsId?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    email?: true
    firstName?: true
    lastName?: true
    avatarUrl?: true
    bio?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    settingsId?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    email?: true
    firstName?: true
    lastName?: true
    avatarUrl?: true
    bio?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    settingsId?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    userId: string
    username: string
    email: string
    firstName: string | null
    lastName: string | null
    avatarUrl: string | null
    bio: string | null
    lastLoginAt: Date | null
    createdAt: Date
    updatedAt: Date
    settingsId: string
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    username?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    avatarUrl?: boolean
    bio?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settingsId?: boolean
    settings?: boolean | AccountSettingsDefaultArgs<ExtArgs>
    sentRequests?: boolean | Profile$sentRequestsArgs<ExtArgs>
    receivedRequests?: boolean | Profile$receivedRequestsArgs<ExtArgs>
    friendshipsInitiated?: boolean | Profile$friendshipsInitiatedArgs<ExtArgs>
    friendshipsReceived?: boolean | Profile$friendshipsReceivedArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    username?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    avatarUrl?: boolean
    bio?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settingsId?: boolean
    settings?: boolean | AccountSettingsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    username?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    avatarUrl?: boolean
    bio?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settingsId?: boolean
    settings?: boolean | AccountSettingsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    username?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    avatarUrl?: boolean
    bio?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settingsId?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "username" | "email" | "firstName" | "lastName" | "avatarUrl" | "bio" | "lastLoginAt" | "createdAt" | "updatedAt" | "settingsId", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    settings?: boolean | AccountSettingsDefaultArgs<ExtArgs>
    sentRequests?: boolean | Profile$sentRequestsArgs<ExtArgs>
    receivedRequests?: boolean | Profile$receivedRequestsArgs<ExtArgs>
    friendshipsInitiated?: boolean | Profile$friendshipsInitiatedArgs<ExtArgs>
    friendshipsReceived?: boolean | Profile$friendshipsReceivedArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    settings?: boolean | AccountSettingsDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    settings?: boolean | AccountSettingsDefaultArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      settings: Prisma.$AccountSettingsPayload<ExtArgs>
      sentRequests: Prisma.$FriendRequestPayload<ExtArgs>[]
      receivedRequests: Prisma.$FriendRequestPayload<ExtArgs>[]
      friendshipsInitiated: Prisma.$FriendshipPayload<ExtArgs>[]
      friendshipsReceived: Prisma.$FriendshipPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      username: string
      email: string
      firstName: string | null
      lastName: string | null
      avatarUrl: string | null
      bio: string | null
      lastLoginAt: Date | null
      createdAt: Date
      updatedAt: Date
      settingsId: string
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    settings<T extends AccountSettingsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountSettingsDefaultArgs<ExtArgs>>): Prisma__AccountSettingsClient<$Result.GetResult<Prisma.$AccountSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sentRequests<T extends Profile$sentRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$sentRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedRequests<T extends Profile$receivedRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$receivedRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendshipsInitiated<T extends Profile$friendshipsInitiatedArgs<ExtArgs> = {}>(args?: Subset<T, Profile$friendshipsInitiatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendshipsReceived<T extends Profile$friendshipsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, Profile$friendshipsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */ 
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly userId: FieldRef<"Profile", 'String'>
    readonly username: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly firstName: FieldRef<"Profile", 'String'>
    readonly lastName: FieldRef<"Profile", 'String'>
    readonly avatarUrl: FieldRef<"Profile", 'String'>
    readonly bio: FieldRef<"Profile", 'String'>
    readonly lastLoginAt: FieldRef<"Profile", 'DateTime'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
    readonly settingsId: FieldRef<"Profile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.sentRequests
   */
  export type Profile$sentRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    where?: FriendRequestWhereInput
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    cursor?: FriendRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * Profile.receivedRequests
   */
  export type Profile$receivedRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    where?: FriendRequestWhereInput
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    cursor?: FriendRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * Profile.friendshipsInitiated
   */
  export type Profile$friendshipsInitiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    where?: FriendshipWhereInput
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    cursor?: FriendshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * Profile.friendshipsReceived
   */
  export type Profile$friendshipsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    where?: FriendshipWhereInput
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    cursor?: FriendshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model AccountSettings
   */

  export type AggregateAccountSettings = {
    _count: AccountSettingsCountAggregateOutputType | null
    _min: AccountSettingsMinAggregateOutputType | null
    _max: AccountSettingsMaxAggregateOutputType | null
  }

  export type AccountSettingsMinAggregateOutputType = {
    id: string | null
    isTwoFactorEnabled: boolean | null
    showLastSeen: boolean | null
    profileVisible: boolean | null
  }

  export type AccountSettingsMaxAggregateOutputType = {
    id: string | null
    isTwoFactorEnabled: boolean | null
    showLastSeen: boolean | null
    profileVisible: boolean | null
  }

  export type AccountSettingsCountAggregateOutputType = {
    id: number
    isTwoFactorEnabled: number
    showLastSeen: number
    profileVisible: number
    _all: number
  }


  export type AccountSettingsMinAggregateInputType = {
    id?: true
    isTwoFactorEnabled?: true
    showLastSeen?: true
    profileVisible?: true
  }

  export type AccountSettingsMaxAggregateInputType = {
    id?: true
    isTwoFactorEnabled?: true
    showLastSeen?: true
    profileVisible?: true
  }

  export type AccountSettingsCountAggregateInputType = {
    id?: true
    isTwoFactorEnabled?: true
    showLastSeen?: true
    profileVisible?: true
    _all?: true
  }

  export type AccountSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccountSettings to aggregate.
     */
    where?: AccountSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountSettings to fetch.
     */
    orderBy?: AccountSettingsOrderByWithRelationInput | AccountSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccountSettings
    **/
    _count?: true | AccountSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountSettingsMaxAggregateInputType
  }

  export type GetAccountSettingsAggregateType<T extends AccountSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateAccountSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccountSettings[P]>
      : GetScalarType<T[P], AggregateAccountSettings[P]>
  }




  export type AccountSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountSettingsWhereInput
    orderBy?: AccountSettingsOrderByWithAggregationInput | AccountSettingsOrderByWithAggregationInput[]
    by: AccountSettingsScalarFieldEnum[] | AccountSettingsScalarFieldEnum
    having?: AccountSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountSettingsCountAggregateInputType | true
    _min?: AccountSettingsMinAggregateInputType
    _max?: AccountSettingsMaxAggregateInputType
  }

  export type AccountSettingsGroupByOutputType = {
    id: string
    isTwoFactorEnabled: boolean
    showLastSeen: boolean
    profileVisible: boolean
    _count: AccountSettingsCountAggregateOutputType | null
    _min: AccountSettingsMinAggregateOutputType | null
    _max: AccountSettingsMaxAggregateOutputType | null
  }

  type GetAccountSettingsGroupByPayload<T extends AccountSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], AccountSettingsGroupByOutputType[P]>
        }
      >
    >


  export type AccountSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    isTwoFactorEnabled?: boolean
    showLastSeen?: boolean
    profileVisible?: boolean
    profile?: boolean | AccountSettings$profileArgs<ExtArgs>
  }, ExtArgs["result"]["accountSettings"]>

  export type AccountSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    isTwoFactorEnabled?: boolean
    showLastSeen?: boolean
    profileVisible?: boolean
  }, ExtArgs["result"]["accountSettings"]>

  export type AccountSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    isTwoFactorEnabled?: boolean
    showLastSeen?: boolean
    profileVisible?: boolean
  }, ExtArgs["result"]["accountSettings"]>

  export type AccountSettingsSelectScalar = {
    id?: boolean
    isTwoFactorEnabled?: boolean
    showLastSeen?: boolean
    profileVisible?: boolean
  }

  export type AccountSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "isTwoFactorEnabled" | "showLastSeen" | "profileVisible", ExtArgs["result"]["accountSettings"]>
  export type AccountSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | AccountSettings$profileArgs<ExtArgs>
  }
  export type AccountSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AccountSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AccountSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AccountSettings"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      isTwoFactorEnabled: boolean
      showLastSeen: boolean
      profileVisible: boolean
    }, ExtArgs["result"]["accountSettings"]>
    composites: {}
  }

  type AccountSettingsGetPayload<S extends boolean | null | undefined | AccountSettingsDefaultArgs> = $Result.GetResult<Prisma.$AccountSettingsPayload, S>

  type AccountSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountSettingsCountAggregateInputType | true
    }

  export interface AccountSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AccountSettings'], meta: { name: 'AccountSettings' } }
    /**
     * Find zero or one AccountSettings that matches the filter.
     * @param {AccountSettingsFindUniqueArgs} args - Arguments to find a AccountSettings
     * @example
     * // Get one AccountSettings
     * const accountSettings = await prisma.accountSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountSettingsFindUniqueArgs>(args: SelectSubset<T, AccountSettingsFindUniqueArgs<ExtArgs>>): Prisma__AccountSettingsClient<$Result.GetResult<Prisma.$AccountSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AccountSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountSettingsFindUniqueOrThrowArgs} args - Arguments to find a AccountSettings
     * @example
     * // Get one AccountSettings
     * const accountSettings = await prisma.accountSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountSettingsClient<$Result.GetResult<Prisma.$AccountSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccountSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountSettingsFindFirstArgs} args - Arguments to find a AccountSettings
     * @example
     * // Get one AccountSettings
     * const accountSettings = await prisma.accountSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountSettingsFindFirstArgs>(args?: SelectSubset<T, AccountSettingsFindFirstArgs<ExtArgs>>): Prisma__AccountSettingsClient<$Result.GetResult<Prisma.$AccountSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccountSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountSettingsFindFirstOrThrowArgs} args - Arguments to find a AccountSettings
     * @example
     * // Get one AccountSettings
     * const accountSettings = await prisma.accountSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountSettingsClient<$Result.GetResult<Prisma.$AccountSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AccountSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccountSettings
     * const accountSettings = await prisma.accountSettings.findMany()
     * 
     * // Get first 10 AccountSettings
     * const accountSettings = await prisma.accountSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountSettingsWithIdOnly = await prisma.accountSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountSettingsFindManyArgs>(args?: SelectSubset<T, AccountSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AccountSettings.
     * @param {AccountSettingsCreateArgs} args - Arguments to create a AccountSettings.
     * @example
     * // Create one AccountSettings
     * const AccountSettings = await prisma.accountSettings.create({
     *   data: {
     *     // ... data to create a AccountSettings
     *   }
     * })
     * 
     */
    create<T extends AccountSettingsCreateArgs>(args: SelectSubset<T, AccountSettingsCreateArgs<ExtArgs>>): Prisma__AccountSettingsClient<$Result.GetResult<Prisma.$AccountSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AccountSettings.
     * @param {AccountSettingsCreateManyArgs} args - Arguments to create many AccountSettings.
     * @example
     * // Create many AccountSettings
     * const accountSettings = await prisma.accountSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountSettingsCreateManyArgs>(args?: SelectSubset<T, AccountSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AccountSettings and returns the data saved in the database.
     * @param {AccountSettingsCreateManyAndReturnArgs} args - Arguments to create many AccountSettings.
     * @example
     * // Create many AccountSettings
     * const accountSettings = await prisma.accountSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AccountSettings and only return the `id`
     * const accountSettingsWithIdOnly = await prisma.accountSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AccountSettings.
     * @param {AccountSettingsDeleteArgs} args - Arguments to delete one AccountSettings.
     * @example
     * // Delete one AccountSettings
     * const AccountSettings = await prisma.accountSettings.delete({
     *   where: {
     *     // ... filter to delete one AccountSettings
     *   }
     * })
     * 
     */
    delete<T extends AccountSettingsDeleteArgs>(args: SelectSubset<T, AccountSettingsDeleteArgs<ExtArgs>>): Prisma__AccountSettingsClient<$Result.GetResult<Prisma.$AccountSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AccountSettings.
     * @param {AccountSettingsUpdateArgs} args - Arguments to update one AccountSettings.
     * @example
     * // Update one AccountSettings
     * const accountSettings = await prisma.accountSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountSettingsUpdateArgs>(args: SelectSubset<T, AccountSettingsUpdateArgs<ExtArgs>>): Prisma__AccountSettingsClient<$Result.GetResult<Prisma.$AccountSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AccountSettings.
     * @param {AccountSettingsDeleteManyArgs} args - Arguments to filter AccountSettings to delete.
     * @example
     * // Delete a few AccountSettings
     * const { count } = await prisma.accountSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountSettingsDeleteManyArgs>(args?: SelectSubset<T, AccountSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccountSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccountSettings
     * const accountSettings = await prisma.accountSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountSettingsUpdateManyArgs>(args: SelectSubset<T, AccountSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccountSettings and returns the data updated in the database.
     * @param {AccountSettingsUpdateManyAndReturnArgs} args - Arguments to update many AccountSettings.
     * @example
     * // Update many AccountSettings
     * const accountSettings = await prisma.accountSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AccountSettings and only return the `id`
     * const accountSettingsWithIdOnly = await prisma.accountSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AccountSettings.
     * @param {AccountSettingsUpsertArgs} args - Arguments to update or create a AccountSettings.
     * @example
     * // Update or create a AccountSettings
     * const accountSettings = await prisma.accountSettings.upsert({
     *   create: {
     *     // ... data to create a AccountSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccountSettings we want to update
     *   }
     * })
     */
    upsert<T extends AccountSettingsUpsertArgs>(args: SelectSubset<T, AccountSettingsUpsertArgs<ExtArgs>>): Prisma__AccountSettingsClient<$Result.GetResult<Prisma.$AccountSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AccountSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountSettingsCountArgs} args - Arguments to filter AccountSettings to count.
     * @example
     * // Count the number of AccountSettings
     * const count = await prisma.accountSettings.count({
     *   where: {
     *     // ... the filter for the AccountSettings we want to count
     *   }
     * })
    **/
    count<T extends AccountSettingsCountArgs>(
      args?: Subset<T, AccountSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccountSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountSettingsAggregateArgs>(args: Subset<T, AccountSettingsAggregateArgs>): Prisma.PrismaPromise<GetAccountSettingsAggregateType<T>>

    /**
     * Group by AccountSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountSettingsGroupByArgs['orderBy'] }
        : { orderBy?: AccountSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AccountSettings model
   */
  readonly fields: AccountSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AccountSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends AccountSettings$profileArgs<ExtArgs> = {}>(args?: Subset<T, AccountSettings$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AccountSettings model
   */ 
  interface AccountSettingsFieldRefs {
    readonly id: FieldRef<"AccountSettings", 'String'>
    readonly isTwoFactorEnabled: FieldRef<"AccountSettings", 'Boolean'>
    readonly showLastSeen: FieldRef<"AccountSettings", 'Boolean'>
    readonly profileVisible: FieldRef<"AccountSettings", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * AccountSettings findUnique
   */
  export type AccountSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountSettings
     */
    select?: AccountSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountSettings
     */
    omit?: AccountSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AccountSettings to fetch.
     */
    where: AccountSettingsWhereUniqueInput
  }

  /**
   * AccountSettings findUniqueOrThrow
   */
  export type AccountSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountSettings
     */
    select?: AccountSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountSettings
     */
    omit?: AccountSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AccountSettings to fetch.
     */
    where: AccountSettingsWhereUniqueInput
  }

  /**
   * AccountSettings findFirst
   */
  export type AccountSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountSettings
     */
    select?: AccountSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountSettings
     */
    omit?: AccountSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AccountSettings to fetch.
     */
    where?: AccountSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountSettings to fetch.
     */
    orderBy?: AccountSettingsOrderByWithRelationInput | AccountSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountSettings.
     */
    cursor?: AccountSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountSettings.
     */
    distinct?: AccountSettingsScalarFieldEnum | AccountSettingsScalarFieldEnum[]
  }

  /**
   * AccountSettings findFirstOrThrow
   */
  export type AccountSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountSettings
     */
    select?: AccountSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountSettings
     */
    omit?: AccountSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AccountSettings to fetch.
     */
    where?: AccountSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountSettings to fetch.
     */
    orderBy?: AccountSettingsOrderByWithRelationInput | AccountSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountSettings.
     */
    cursor?: AccountSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountSettings.
     */
    distinct?: AccountSettingsScalarFieldEnum | AccountSettingsScalarFieldEnum[]
  }

  /**
   * AccountSettings findMany
   */
  export type AccountSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountSettings
     */
    select?: AccountSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountSettings
     */
    omit?: AccountSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AccountSettings to fetch.
     */
    where?: AccountSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountSettings to fetch.
     */
    orderBy?: AccountSettingsOrderByWithRelationInput | AccountSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccountSettings.
     */
    cursor?: AccountSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountSettings.
     */
    skip?: number
    distinct?: AccountSettingsScalarFieldEnum | AccountSettingsScalarFieldEnum[]
  }

  /**
   * AccountSettings create
   */
  export type AccountSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountSettings
     */
    select?: AccountSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountSettings
     */
    omit?: AccountSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a AccountSettings.
     */
    data?: XOR<AccountSettingsCreateInput, AccountSettingsUncheckedCreateInput>
  }

  /**
   * AccountSettings createMany
   */
  export type AccountSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccountSettings.
     */
    data: AccountSettingsCreateManyInput | AccountSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccountSettings createManyAndReturn
   */
  export type AccountSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountSettings
     */
    select?: AccountSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccountSettings
     */
    omit?: AccountSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many AccountSettings.
     */
    data: AccountSettingsCreateManyInput | AccountSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccountSettings update
   */
  export type AccountSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountSettings
     */
    select?: AccountSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountSettings
     */
    omit?: AccountSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a AccountSettings.
     */
    data: XOR<AccountSettingsUpdateInput, AccountSettingsUncheckedUpdateInput>
    /**
     * Choose, which AccountSettings to update.
     */
    where: AccountSettingsWhereUniqueInput
  }

  /**
   * AccountSettings updateMany
   */
  export type AccountSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AccountSettings.
     */
    data: XOR<AccountSettingsUpdateManyMutationInput, AccountSettingsUncheckedUpdateManyInput>
    /**
     * Filter which AccountSettings to update
     */
    where?: AccountSettingsWhereInput
    /**
     * Limit how many AccountSettings to update.
     */
    limit?: number
  }

  /**
   * AccountSettings updateManyAndReturn
   */
  export type AccountSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountSettings
     */
    select?: AccountSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccountSettings
     */
    omit?: AccountSettingsOmit<ExtArgs> | null
    /**
     * The data used to update AccountSettings.
     */
    data: XOR<AccountSettingsUpdateManyMutationInput, AccountSettingsUncheckedUpdateManyInput>
    /**
     * Filter which AccountSettings to update
     */
    where?: AccountSettingsWhereInput
    /**
     * Limit how many AccountSettings to update.
     */
    limit?: number
  }

  /**
   * AccountSettings upsert
   */
  export type AccountSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountSettings
     */
    select?: AccountSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountSettings
     */
    omit?: AccountSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the AccountSettings to update in case it exists.
     */
    where: AccountSettingsWhereUniqueInput
    /**
     * In case the AccountSettings found by the `where` argument doesn't exist, create a new AccountSettings with this data.
     */
    create: XOR<AccountSettingsCreateInput, AccountSettingsUncheckedCreateInput>
    /**
     * In case the AccountSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountSettingsUpdateInput, AccountSettingsUncheckedUpdateInput>
  }

  /**
   * AccountSettings delete
   */
  export type AccountSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountSettings
     */
    select?: AccountSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountSettings
     */
    omit?: AccountSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountSettingsInclude<ExtArgs> | null
    /**
     * Filter which AccountSettings to delete.
     */
    where: AccountSettingsWhereUniqueInput
  }

  /**
   * AccountSettings deleteMany
   */
  export type AccountSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccountSettings to delete
     */
    where?: AccountSettingsWhereInput
    /**
     * Limit how many AccountSettings to delete.
     */
    limit?: number
  }

  /**
   * AccountSettings.profile
   */
  export type AccountSettings$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * AccountSettings without action
   */
  export type AccountSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountSettings
     */
    select?: AccountSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountSettings
     */
    omit?: AccountSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountSettingsInclude<ExtArgs> | null
  }


  /**
   * Model FriendRequest
   */

  export type AggregateFriendRequest = {
    _count: FriendRequestCountAggregateOutputType | null
    _min: FriendRequestMinAggregateOutputType | null
    _max: FriendRequestMaxAggregateOutputType | null
  }

  export type FriendRequestMinAggregateOutputType = {
    id: string | null
    senderId: string | null
    receiverId: string | null
    status: string | null
    createdAt: Date | null
  }

  export type FriendRequestMaxAggregateOutputType = {
    id: string | null
    senderId: string | null
    receiverId: string | null
    status: string | null
    createdAt: Date | null
  }

  export type FriendRequestCountAggregateOutputType = {
    id: number
    senderId: number
    receiverId: number
    status: number
    createdAt: number
    _all: number
  }


  export type FriendRequestMinAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    status?: true
    createdAt?: true
  }

  export type FriendRequestMaxAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    status?: true
    createdAt?: true
  }

  export type FriendRequestCountAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type FriendRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendRequest to aggregate.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FriendRequests
    **/
    _count?: true | FriendRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendRequestMaxAggregateInputType
  }

  export type GetFriendRequestAggregateType<T extends FriendRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateFriendRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriendRequest[P]>
      : GetScalarType<T[P], AggregateFriendRequest[P]>
  }




  export type FriendRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendRequestWhereInput
    orderBy?: FriendRequestOrderByWithAggregationInput | FriendRequestOrderByWithAggregationInput[]
    by: FriendRequestScalarFieldEnum[] | FriendRequestScalarFieldEnum
    having?: FriendRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendRequestCountAggregateInputType | true
    _min?: FriendRequestMinAggregateInputType
    _max?: FriendRequestMaxAggregateInputType
  }

  export type FriendRequestGroupByOutputType = {
    id: string
    senderId: string
    receiverId: string
    status: string
    createdAt: Date
    _count: FriendRequestCountAggregateOutputType | null
    _min: FriendRequestMinAggregateOutputType | null
    _max: FriendRequestMaxAggregateOutputType | null
  }

  type GetFriendRequestGroupByPayload<T extends FriendRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendRequestGroupByOutputType[P]>
            : GetScalarType<T[P], FriendRequestGroupByOutputType[P]>
        }
      >
    >


  export type FriendRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    createdAt?: boolean
    sender?: boolean | ProfileDefaultArgs<ExtArgs>
    receiver?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendRequest"]>

  export type FriendRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    createdAt?: boolean
    sender?: boolean | ProfileDefaultArgs<ExtArgs>
    receiver?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendRequest"]>

  export type FriendRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    createdAt?: boolean
    sender?: boolean | ProfileDefaultArgs<ExtArgs>
    receiver?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendRequest"]>

  export type FriendRequestSelectScalar = {
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type FriendRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "senderId" | "receiverId" | "status" | "createdAt", ExtArgs["result"]["friendRequest"]>
  export type FriendRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | ProfileDefaultArgs<ExtArgs>
    receiver?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type FriendRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | ProfileDefaultArgs<ExtArgs>
    receiver?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type FriendRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | ProfileDefaultArgs<ExtArgs>
    receiver?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $FriendRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FriendRequest"
    objects: {
      sender: Prisma.$ProfilePayload<ExtArgs>
      receiver: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      senderId: string
      receiverId: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["friendRequest"]>
    composites: {}
  }

  type FriendRequestGetPayload<S extends boolean | null | undefined | FriendRequestDefaultArgs> = $Result.GetResult<Prisma.$FriendRequestPayload, S>

  type FriendRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendRequestCountAggregateInputType | true
    }

  export interface FriendRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FriendRequest'], meta: { name: 'FriendRequest' } }
    /**
     * Find zero or one FriendRequest that matches the filter.
     * @param {FriendRequestFindUniqueArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendRequestFindUniqueArgs>(args: SelectSubset<T, FriendRequestFindUniqueArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FriendRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendRequestFindUniqueOrThrowArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestFindFirstArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendRequestFindFirstArgs>(args?: SelectSubset<T, FriendRequestFindFirstArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestFindFirstOrThrowArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FriendRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FriendRequests
     * const friendRequests = await prisma.friendRequest.findMany()
     * 
     * // Get first 10 FriendRequests
     * const friendRequests = await prisma.friendRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendRequestWithIdOnly = await prisma.friendRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendRequestFindManyArgs>(args?: SelectSubset<T, FriendRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FriendRequest.
     * @param {FriendRequestCreateArgs} args - Arguments to create a FriendRequest.
     * @example
     * // Create one FriendRequest
     * const FriendRequest = await prisma.friendRequest.create({
     *   data: {
     *     // ... data to create a FriendRequest
     *   }
     * })
     * 
     */
    create<T extends FriendRequestCreateArgs>(args: SelectSubset<T, FriendRequestCreateArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FriendRequests.
     * @param {FriendRequestCreateManyArgs} args - Arguments to create many FriendRequests.
     * @example
     * // Create many FriendRequests
     * const friendRequest = await prisma.friendRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendRequestCreateManyArgs>(args?: SelectSubset<T, FriendRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FriendRequests and returns the data saved in the database.
     * @param {FriendRequestCreateManyAndReturnArgs} args - Arguments to create many FriendRequests.
     * @example
     * // Create many FriendRequests
     * const friendRequest = await prisma.friendRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FriendRequests and only return the `id`
     * const friendRequestWithIdOnly = await prisma.friendRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FriendRequest.
     * @param {FriendRequestDeleteArgs} args - Arguments to delete one FriendRequest.
     * @example
     * // Delete one FriendRequest
     * const FriendRequest = await prisma.friendRequest.delete({
     *   where: {
     *     // ... filter to delete one FriendRequest
     *   }
     * })
     * 
     */
    delete<T extends FriendRequestDeleteArgs>(args: SelectSubset<T, FriendRequestDeleteArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FriendRequest.
     * @param {FriendRequestUpdateArgs} args - Arguments to update one FriendRequest.
     * @example
     * // Update one FriendRequest
     * const friendRequest = await prisma.friendRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendRequestUpdateArgs>(args: SelectSubset<T, FriendRequestUpdateArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FriendRequests.
     * @param {FriendRequestDeleteManyArgs} args - Arguments to filter FriendRequests to delete.
     * @example
     * // Delete a few FriendRequests
     * const { count } = await prisma.friendRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendRequestDeleteManyArgs>(args?: SelectSubset<T, FriendRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FriendRequests
     * const friendRequest = await prisma.friendRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendRequestUpdateManyArgs>(args: SelectSubset<T, FriendRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendRequests and returns the data updated in the database.
     * @param {FriendRequestUpdateManyAndReturnArgs} args - Arguments to update many FriendRequests.
     * @example
     * // Update many FriendRequests
     * const friendRequest = await prisma.friendRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FriendRequests and only return the `id`
     * const friendRequestWithIdOnly = await prisma.friendRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FriendRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, FriendRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FriendRequest.
     * @param {FriendRequestUpsertArgs} args - Arguments to update or create a FriendRequest.
     * @example
     * // Update or create a FriendRequest
     * const friendRequest = await prisma.friendRequest.upsert({
     *   create: {
     *     // ... data to create a FriendRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FriendRequest we want to update
     *   }
     * })
     */
    upsert<T extends FriendRequestUpsertArgs>(args: SelectSubset<T, FriendRequestUpsertArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FriendRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestCountArgs} args - Arguments to filter FriendRequests to count.
     * @example
     * // Count the number of FriendRequests
     * const count = await prisma.friendRequest.count({
     *   where: {
     *     // ... the filter for the FriendRequests we want to count
     *   }
     * })
    **/
    count<T extends FriendRequestCountArgs>(
      args?: Subset<T, FriendRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FriendRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FriendRequestAggregateArgs>(args: Subset<T, FriendRequestAggregateArgs>): Prisma.PrismaPromise<GetFriendRequestAggregateType<T>>

    /**
     * Group by FriendRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FriendRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendRequestGroupByArgs['orderBy'] }
        : { orderBy?: FriendRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FriendRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FriendRequest model
   */
  readonly fields: FriendRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FriendRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sender<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FriendRequest model
   */ 
  interface FriendRequestFieldRefs {
    readonly id: FieldRef<"FriendRequest", 'String'>
    readonly senderId: FieldRef<"FriendRequest", 'String'>
    readonly receiverId: FieldRef<"FriendRequest", 'String'>
    readonly status: FieldRef<"FriendRequest", 'String'>
    readonly createdAt: FieldRef<"FriendRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FriendRequest findUnique
   */
  export type FriendRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest findUniqueOrThrow
   */
  export type FriendRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest findFirst
   */
  export type FriendRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendRequests.
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendRequests.
     */
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * FriendRequest findFirstOrThrow
   */
  export type FriendRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendRequests.
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendRequests.
     */
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * FriendRequest findMany
   */
  export type FriendRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequests to fetch.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FriendRequests.
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * FriendRequest create
   */
  export type FriendRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a FriendRequest.
     */
    data: XOR<FriendRequestCreateInput, FriendRequestUncheckedCreateInput>
  }

  /**
   * FriendRequest createMany
   */
  export type FriendRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FriendRequests.
     */
    data: FriendRequestCreateManyInput | FriendRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FriendRequest createManyAndReturn
   */
  export type FriendRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * The data used to create many FriendRequests.
     */
    data: FriendRequestCreateManyInput | FriendRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FriendRequest update
   */
  export type FriendRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a FriendRequest.
     */
    data: XOR<FriendRequestUpdateInput, FriendRequestUncheckedUpdateInput>
    /**
     * Choose, which FriendRequest to update.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest updateMany
   */
  export type FriendRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FriendRequests.
     */
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyInput>
    /**
     * Filter which FriendRequests to update
     */
    where?: FriendRequestWhereInput
    /**
     * Limit how many FriendRequests to update.
     */
    limit?: number
  }

  /**
   * FriendRequest updateManyAndReturn
   */
  export type FriendRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * The data used to update FriendRequests.
     */
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyInput>
    /**
     * Filter which FriendRequests to update
     */
    where?: FriendRequestWhereInput
    /**
     * Limit how many FriendRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FriendRequest upsert
   */
  export type FriendRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the FriendRequest to update in case it exists.
     */
    where: FriendRequestWhereUniqueInput
    /**
     * In case the FriendRequest found by the `where` argument doesn't exist, create a new FriendRequest with this data.
     */
    create: XOR<FriendRequestCreateInput, FriendRequestUncheckedCreateInput>
    /**
     * In case the FriendRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendRequestUpdateInput, FriendRequestUncheckedUpdateInput>
  }

  /**
   * FriendRequest delete
   */
  export type FriendRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter which FriendRequest to delete.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest deleteMany
   */
  export type FriendRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendRequests to delete
     */
    where?: FriendRequestWhereInput
    /**
     * Limit how many FriendRequests to delete.
     */
    limit?: number
  }

  /**
   * FriendRequest without action
   */
  export type FriendRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
  }


  /**
   * Model Friendship
   */

  export type AggregateFriendship = {
    _count: FriendshipCountAggregateOutputType | null
    _min: FriendshipMinAggregateOutputType | null
    _max: FriendshipMaxAggregateOutputType | null
  }

  export type FriendshipMinAggregateOutputType = {
    id: string | null
    user1Id: string | null
    user2Id: string | null
    createdAt: Date | null
  }

  export type FriendshipMaxAggregateOutputType = {
    id: string | null
    user1Id: string | null
    user2Id: string | null
    createdAt: Date | null
  }

  export type FriendshipCountAggregateOutputType = {
    id: number
    user1Id: number
    user2Id: number
    createdAt: number
    _all: number
  }


  export type FriendshipMinAggregateInputType = {
    id?: true
    user1Id?: true
    user2Id?: true
    createdAt?: true
  }

  export type FriendshipMaxAggregateInputType = {
    id?: true
    user1Id?: true
    user2Id?: true
    createdAt?: true
  }

  export type FriendshipCountAggregateInputType = {
    id?: true
    user1Id?: true
    user2Id?: true
    createdAt?: true
    _all?: true
  }

  export type FriendshipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friendship to aggregate.
     */
    where?: FriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friendships to fetch.
     */
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friendships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Friendships
    **/
    _count?: true | FriendshipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendshipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendshipMaxAggregateInputType
  }

  export type GetFriendshipAggregateType<T extends FriendshipAggregateArgs> = {
        [P in keyof T & keyof AggregateFriendship]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriendship[P]>
      : GetScalarType<T[P], AggregateFriendship[P]>
  }




  export type FriendshipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendshipWhereInput
    orderBy?: FriendshipOrderByWithAggregationInput | FriendshipOrderByWithAggregationInput[]
    by: FriendshipScalarFieldEnum[] | FriendshipScalarFieldEnum
    having?: FriendshipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendshipCountAggregateInputType | true
    _min?: FriendshipMinAggregateInputType
    _max?: FriendshipMaxAggregateInputType
  }

  export type FriendshipGroupByOutputType = {
    id: string
    user1Id: string
    user2Id: string
    createdAt: Date
    _count: FriendshipCountAggregateOutputType | null
    _min: FriendshipMinAggregateOutputType | null
    _max: FriendshipMaxAggregateOutputType | null
  }

  type GetFriendshipGroupByPayload<T extends FriendshipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendshipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendshipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendshipGroupByOutputType[P]>
            : GetScalarType<T[P], FriendshipGroupByOutputType[P]>
        }
      >
    >


  export type FriendshipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user1Id?: boolean
    user2Id?: boolean
    createdAt?: boolean
    user1?: boolean | ProfileDefaultArgs<ExtArgs>
    user2?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendship"]>

  export type FriendshipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user1Id?: boolean
    user2Id?: boolean
    createdAt?: boolean
    user1?: boolean | ProfileDefaultArgs<ExtArgs>
    user2?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendship"]>

  export type FriendshipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user1Id?: boolean
    user2Id?: boolean
    createdAt?: boolean
    user1?: boolean | ProfileDefaultArgs<ExtArgs>
    user2?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendship"]>

  export type FriendshipSelectScalar = {
    id?: boolean
    user1Id?: boolean
    user2Id?: boolean
    createdAt?: boolean
  }

  export type FriendshipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user1Id" | "user2Id" | "createdAt", ExtArgs["result"]["friendship"]>
  export type FriendshipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user1?: boolean | ProfileDefaultArgs<ExtArgs>
    user2?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type FriendshipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user1?: boolean | ProfileDefaultArgs<ExtArgs>
    user2?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type FriendshipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user1?: boolean | ProfileDefaultArgs<ExtArgs>
    user2?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $FriendshipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Friendship"
    objects: {
      user1: Prisma.$ProfilePayload<ExtArgs>
      user2: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user1Id: string
      user2Id: string
      createdAt: Date
    }, ExtArgs["result"]["friendship"]>
    composites: {}
  }

  type FriendshipGetPayload<S extends boolean | null | undefined | FriendshipDefaultArgs> = $Result.GetResult<Prisma.$FriendshipPayload, S>

  type FriendshipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendshipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendshipCountAggregateInputType | true
    }

  export interface FriendshipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Friendship'], meta: { name: 'Friendship' } }
    /**
     * Find zero or one Friendship that matches the filter.
     * @param {FriendshipFindUniqueArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendshipFindUniqueArgs>(args: SelectSubset<T, FriendshipFindUniqueArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Friendship that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendshipFindUniqueOrThrowArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendshipFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friendship that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipFindFirstArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendshipFindFirstArgs>(args?: SelectSubset<T, FriendshipFindFirstArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friendship that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipFindFirstOrThrowArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendshipFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendshipFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Friendships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Friendships
     * const friendships = await prisma.friendship.findMany()
     * 
     * // Get first 10 Friendships
     * const friendships = await prisma.friendship.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendshipWithIdOnly = await prisma.friendship.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendshipFindManyArgs>(args?: SelectSubset<T, FriendshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Friendship.
     * @param {FriendshipCreateArgs} args - Arguments to create a Friendship.
     * @example
     * // Create one Friendship
     * const Friendship = await prisma.friendship.create({
     *   data: {
     *     // ... data to create a Friendship
     *   }
     * })
     * 
     */
    create<T extends FriendshipCreateArgs>(args: SelectSubset<T, FriendshipCreateArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Friendships.
     * @param {FriendshipCreateManyArgs} args - Arguments to create many Friendships.
     * @example
     * // Create many Friendships
     * const friendship = await prisma.friendship.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendshipCreateManyArgs>(args?: SelectSubset<T, FriendshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Friendships and returns the data saved in the database.
     * @param {FriendshipCreateManyAndReturnArgs} args - Arguments to create many Friendships.
     * @example
     * // Create many Friendships
     * const friendship = await prisma.friendship.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Friendships and only return the `id`
     * const friendshipWithIdOnly = await prisma.friendship.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendshipCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Friendship.
     * @param {FriendshipDeleteArgs} args - Arguments to delete one Friendship.
     * @example
     * // Delete one Friendship
     * const Friendship = await prisma.friendship.delete({
     *   where: {
     *     // ... filter to delete one Friendship
     *   }
     * })
     * 
     */
    delete<T extends FriendshipDeleteArgs>(args: SelectSubset<T, FriendshipDeleteArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Friendship.
     * @param {FriendshipUpdateArgs} args - Arguments to update one Friendship.
     * @example
     * // Update one Friendship
     * const friendship = await prisma.friendship.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendshipUpdateArgs>(args: SelectSubset<T, FriendshipUpdateArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Friendships.
     * @param {FriendshipDeleteManyArgs} args - Arguments to filter Friendships to delete.
     * @example
     * // Delete a few Friendships
     * const { count } = await prisma.friendship.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendshipDeleteManyArgs>(args?: SelectSubset<T, FriendshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friendships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Friendships
     * const friendship = await prisma.friendship.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendshipUpdateManyArgs>(args: SelectSubset<T, FriendshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friendships and returns the data updated in the database.
     * @param {FriendshipUpdateManyAndReturnArgs} args - Arguments to update many Friendships.
     * @example
     * // Update many Friendships
     * const friendship = await prisma.friendship.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Friendships and only return the `id`
     * const friendshipWithIdOnly = await prisma.friendship.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FriendshipUpdateManyAndReturnArgs>(args: SelectSubset<T, FriendshipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Friendship.
     * @param {FriendshipUpsertArgs} args - Arguments to update or create a Friendship.
     * @example
     * // Update or create a Friendship
     * const friendship = await prisma.friendship.upsert({
     *   create: {
     *     // ... data to create a Friendship
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Friendship we want to update
     *   }
     * })
     */
    upsert<T extends FriendshipUpsertArgs>(args: SelectSubset<T, FriendshipUpsertArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Friendships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipCountArgs} args - Arguments to filter Friendships to count.
     * @example
     * // Count the number of Friendships
     * const count = await prisma.friendship.count({
     *   where: {
     *     // ... the filter for the Friendships we want to count
     *   }
     * })
    **/
    count<T extends FriendshipCountArgs>(
      args?: Subset<T, FriendshipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendshipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Friendship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FriendshipAggregateArgs>(args: Subset<T, FriendshipAggregateArgs>): Prisma.PrismaPromise<GetFriendshipAggregateType<T>>

    /**
     * Group by Friendship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FriendshipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendshipGroupByArgs['orderBy'] }
        : { orderBy?: FriendshipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FriendshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Friendship model
   */
  readonly fields: FriendshipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Friendship.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendshipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user1<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user2<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Friendship model
   */ 
  interface FriendshipFieldRefs {
    readonly id: FieldRef<"Friendship", 'String'>
    readonly user1Id: FieldRef<"Friendship", 'String'>
    readonly user2Id: FieldRef<"Friendship", 'String'>
    readonly createdAt: FieldRef<"Friendship", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Friendship findUnique
   */
  export type FriendshipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendship to fetch.
     */
    where: FriendshipWhereUniqueInput
  }

  /**
   * Friendship findUniqueOrThrow
   */
  export type FriendshipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendship to fetch.
     */
    where: FriendshipWhereUniqueInput
  }

  /**
   * Friendship findFirst
   */
  export type FriendshipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendship to fetch.
     */
    where?: FriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friendships to fetch.
     */
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friendships.
     */
    cursor?: FriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friendships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friendships.
     */
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * Friendship findFirstOrThrow
   */
  export type FriendshipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendship to fetch.
     */
    where?: FriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friendships to fetch.
     */
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friendships.
     */
    cursor?: FriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friendships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friendships.
     */
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * Friendship findMany
   */
  export type FriendshipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendships to fetch.
     */
    where?: FriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friendships to fetch.
     */
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Friendships.
     */
    cursor?: FriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friendships.
     */
    skip?: number
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * Friendship create
   */
  export type FriendshipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * The data needed to create a Friendship.
     */
    data: XOR<FriendshipCreateInput, FriendshipUncheckedCreateInput>
  }

  /**
   * Friendship createMany
   */
  export type FriendshipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Friendships.
     */
    data: FriendshipCreateManyInput | FriendshipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Friendship createManyAndReturn
   */
  export type FriendshipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * The data used to create many Friendships.
     */
    data: FriendshipCreateManyInput | FriendshipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Friendship update
   */
  export type FriendshipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * The data needed to update a Friendship.
     */
    data: XOR<FriendshipUpdateInput, FriendshipUncheckedUpdateInput>
    /**
     * Choose, which Friendship to update.
     */
    where: FriendshipWhereUniqueInput
  }

  /**
   * Friendship updateMany
   */
  export type FriendshipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Friendships.
     */
    data: XOR<FriendshipUpdateManyMutationInput, FriendshipUncheckedUpdateManyInput>
    /**
     * Filter which Friendships to update
     */
    where?: FriendshipWhereInput
    /**
     * Limit how many Friendships to update.
     */
    limit?: number
  }

  /**
   * Friendship updateManyAndReturn
   */
  export type FriendshipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * The data used to update Friendships.
     */
    data: XOR<FriendshipUpdateManyMutationInput, FriendshipUncheckedUpdateManyInput>
    /**
     * Filter which Friendships to update
     */
    where?: FriendshipWhereInput
    /**
     * Limit how many Friendships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Friendship upsert
   */
  export type FriendshipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * The filter to search for the Friendship to update in case it exists.
     */
    where: FriendshipWhereUniqueInput
    /**
     * In case the Friendship found by the `where` argument doesn't exist, create a new Friendship with this data.
     */
    create: XOR<FriendshipCreateInput, FriendshipUncheckedCreateInput>
    /**
     * In case the Friendship was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendshipUpdateInput, FriendshipUncheckedUpdateInput>
  }

  /**
   * Friendship delete
   */
  export type FriendshipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter which Friendship to delete.
     */
    where: FriendshipWhereUniqueInput
  }

  /**
   * Friendship deleteMany
   */
  export type FriendshipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friendships to delete
     */
    where?: FriendshipWhereInput
    /**
     * Limit how many Friendships to delete.
     */
    limit?: number
  }

  /**
   * Friendship without action
   */
  export type FriendshipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    username: 'username',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    avatarUrl: 'avatarUrl',
    bio: 'bio',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    settingsId: 'settingsId'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const AccountSettingsScalarFieldEnum: {
    id: 'id',
    isTwoFactorEnabled: 'isTwoFactorEnabled',
    showLastSeen: 'showLastSeen',
    profileVisible: 'profileVisible'
  };

  export type AccountSettingsScalarFieldEnum = (typeof AccountSettingsScalarFieldEnum)[keyof typeof AccountSettingsScalarFieldEnum]


  export const FriendRequestScalarFieldEnum: {
    id: 'id',
    senderId: 'senderId',
    receiverId: 'receiverId',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type FriendRequestScalarFieldEnum = (typeof FriendRequestScalarFieldEnum)[keyof typeof FriendRequestScalarFieldEnum]


  export const FriendshipScalarFieldEnum: {
    id: 'id',
    user1Id: 'user1Id',
    user2Id: 'user2Id',
    createdAt: 'createdAt'
  };

  export type FriendshipScalarFieldEnum = (typeof FriendshipScalarFieldEnum)[keyof typeof FriendshipScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    userId?: StringFilter<"Profile"> | string
    username?: StringFilter<"Profile"> | string
    email?: StringFilter<"Profile"> | string
    firstName?: StringNullableFilter<"Profile"> | string | null
    lastName?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    bio?: StringNullableFilter<"Profile"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    settingsId?: StringFilter<"Profile"> | string
    settings?: XOR<AccountSettingsScalarRelationFilter, AccountSettingsWhereInput>
    sentRequests?: FriendRequestListRelationFilter
    receivedRequests?: FriendRequestListRelationFilter
    friendshipsInitiated?: FriendshipListRelationFilter
    friendshipsReceived?: FriendshipListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settingsId?: SortOrder
    settings?: AccountSettingsOrderByWithRelationInput
    sentRequests?: FriendRequestOrderByRelationAggregateInput
    receivedRequests?: FriendRequestOrderByRelationAggregateInput
    friendshipsInitiated?: FriendshipOrderByRelationAggregateInput
    friendshipsReceived?: FriendshipOrderByRelationAggregateInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    username?: string
    settingsId?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    email?: StringFilter<"Profile"> | string
    firstName?: StringNullableFilter<"Profile"> | string | null
    lastName?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    bio?: StringNullableFilter<"Profile"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    settings?: XOR<AccountSettingsScalarRelationFilter, AccountSettingsWhereInput>
    sentRequests?: FriendRequestListRelationFilter
    receivedRequests?: FriendRequestListRelationFilter
    friendshipsInitiated?: FriendshipListRelationFilter
    friendshipsReceived?: FriendshipListRelationFilter
  }, "id" | "userId" | "username" | "settingsId">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settingsId?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    userId?: StringWithAggregatesFilter<"Profile"> | string
    username?: StringWithAggregatesFilter<"Profile"> | string
    email?: StringWithAggregatesFilter<"Profile"> | string
    firstName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    bio?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"Profile"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    settingsId?: StringWithAggregatesFilter<"Profile"> | string
  }

  export type AccountSettingsWhereInput = {
    AND?: AccountSettingsWhereInput | AccountSettingsWhereInput[]
    OR?: AccountSettingsWhereInput[]
    NOT?: AccountSettingsWhereInput | AccountSettingsWhereInput[]
    id?: StringFilter<"AccountSettings"> | string
    isTwoFactorEnabled?: BoolFilter<"AccountSettings"> | boolean
    showLastSeen?: BoolFilter<"AccountSettings"> | boolean
    profileVisible?: BoolFilter<"AccountSettings"> | boolean
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
  }

  export type AccountSettingsOrderByWithRelationInput = {
    id?: SortOrder
    isTwoFactorEnabled?: SortOrder
    showLastSeen?: SortOrder
    profileVisible?: SortOrder
    profile?: ProfileOrderByWithRelationInput
  }

  export type AccountSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountSettingsWhereInput | AccountSettingsWhereInput[]
    OR?: AccountSettingsWhereInput[]
    NOT?: AccountSettingsWhereInput | AccountSettingsWhereInput[]
    isTwoFactorEnabled?: BoolFilter<"AccountSettings"> | boolean
    showLastSeen?: BoolFilter<"AccountSettings"> | boolean
    profileVisible?: BoolFilter<"AccountSettings"> | boolean
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
  }, "id">

  export type AccountSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    isTwoFactorEnabled?: SortOrder
    showLastSeen?: SortOrder
    profileVisible?: SortOrder
    _count?: AccountSettingsCountOrderByAggregateInput
    _max?: AccountSettingsMaxOrderByAggregateInput
    _min?: AccountSettingsMinOrderByAggregateInput
  }

  export type AccountSettingsScalarWhereWithAggregatesInput = {
    AND?: AccountSettingsScalarWhereWithAggregatesInput | AccountSettingsScalarWhereWithAggregatesInput[]
    OR?: AccountSettingsScalarWhereWithAggregatesInput[]
    NOT?: AccountSettingsScalarWhereWithAggregatesInput | AccountSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AccountSettings"> | string
    isTwoFactorEnabled?: BoolWithAggregatesFilter<"AccountSettings"> | boolean
    showLastSeen?: BoolWithAggregatesFilter<"AccountSettings"> | boolean
    profileVisible?: BoolWithAggregatesFilter<"AccountSettings"> | boolean
  }

  export type FriendRequestWhereInput = {
    AND?: FriendRequestWhereInput | FriendRequestWhereInput[]
    OR?: FriendRequestWhereInput[]
    NOT?: FriendRequestWhereInput | FriendRequestWhereInput[]
    id?: StringFilter<"FriendRequest"> | string
    senderId?: StringFilter<"FriendRequest"> | string
    receiverId?: StringFilter<"FriendRequest"> | string
    status?: StringFilter<"FriendRequest"> | string
    createdAt?: DateTimeFilter<"FriendRequest"> | Date | string
    sender?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    receiver?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type FriendRequestOrderByWithRelationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    sender?: ProfileOrderByWithRelationInput
    receiver?: ProfileOrderByWithRelationInput
  }

  export type FriendRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FriendRequestWhereInput | FriendRequestWhereInput[]
    OR?: FriendRequestWhereInput[]
    NOT?: FriendRequestWhereInput | FriendRequestWhereInput[]
    senderId?: StringFilter<"FriendRequest"> | string
    receiverId?: StringFilter<"FriendRequest"> | string
    status?: StringFilter<"FriendRequest"> | string
    createdAt?: DateTimeFilter<"FriendRequest"> | Date | string
    sender?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    receiver?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id">

  export type FriendRequestOrderByWithAggregationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: FriendRequestCountOrderByAggregateInput
    _max?: FriendRequestMaxOrderByAggregateInput
    _min?: FriendRequestMinOrderByAggregateInput
  }

  export type FriendRequestScalarWhereWithAggregatesInput = {
    AND?: FriendRequestScalarWhereWithAggregatesInput | FriendRequestScalarWhereWithAggregatesInput[]
    OR?: FriendRequestScalarWhereWithAggregatesInput[]
    NOT?: FriendRequestScalarWhereWithAggregatesInput | FriendRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FriendRequest"> | string
    senderId?: StringWithAggregatesFilter<"FriendRequest"> | string
    receiverId?: StringWithAggregatesFilter<"FriendRequest"> | string
    status?: StringWithAggregatesFilter<"FriendRequest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FriendRequest"> | Date | string
  }

  export type FriendshipWhereInput = {
    AND?: FriendshipWhereInput | FriendshipWhereInput[]
    OR?: FriendshipWhereInput[]
    NOT?: FriendshipWhereInput | FriendshipWhereInput[]
    id?: StringFilter<"Friendship"> | string
    user1Id?: StringFilter<"Friendship"> | string
    user2Id?: StringFilter<"Friendship"> | string
    createdAt?: DateTimeFilter<"Friendship"> | Date | string
    user1?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    user2?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type FriendshipOrderByWithRelationInput = {
    id?: SortOrder
    user1Id?: SortOrder
    user2Id?: SortOrder
    createdAt?: SortOrder
    user1?: ProfileOrderByWithRelationInput
    user2?: ProfileOrderByWithRelationInput
  }

  export type FriendshipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FriendshipWhereInput | FriendshipWhereInput[]
    OR?: FriendshipWhereInput[]
    NOT?: FriendshipWhereInput | FriendshipWhereInput[]
    user1Id?: StringFilter<"Friendship"> | string
    user2Id?: StringFilter<"Friendship"> | string
    createdAt?: DateTimeFilter<"Friendship"> | Date | string
    user1?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    user2?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id">

  export type FriendshipOrderByWithAggregationInput = {
    id?: SortOrder
    user1Id?: SortOrder
    user2Id?: SortOrder
    createdAt?: SortOrder
    _count?: FriendshipCountOrderByAggregateInput
    _max?: FriendshipMaxOrderByAggregateInput
    _min?: FriendshipMinOrderByAggregateInput
  }

  export type FriendshipScalarWhereWithAggregatesInput = {
    AND?: FriendshipScalarWhereWithAggregatesInput | FriendshipScalarWhereWithAggregatesInput[]
    OR?: FriendshipScalarWhereWithAggregatesInput[]
    NOT?: FriendshipScalarWhereWithAggregatesInput | FriendshipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Friendship"> | string
    user1Id?: StringWithAggregatesFilter<"Friendship"> | string
    user2Id?: StringWithAggregatesFilter<"Friendship"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Friendship"> | Date | string
  }

  export type ProfileCreateInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings: AccountSettingsCreateNestedOneWithoutProfileInput
    sentRequests?: FriendRequestCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestCreateNestedManyWithoutReceiverInput
    friendshipsInitiated?: FriendshipCreateNestedManyWithoutUser1Input
    friendshipsReceived?: FriendshipCreateNestedManyWithoutUser2Input
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settingsId: string
    sentRequests?: FriendRequestUncheckedCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestUncheckedCreateNestedManyWithoutReceiverInput
    friendshipsInitiated?: FriendshipUncheckedCreateNestedManyWithoutUser1Input
    friendshipsReceived?: FriendshipUncheckedCreateNestedManyWithoutUser2Input
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: AccountSettingsUpdateOneRequiredWithoutProfileNestedInput
    sentRequests?: FriendRequestUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUpdateManyWithoutReceiverNestedInput
    friendshipsInitiated?: FriendshipUpdateManyWithoutUser1NestedInput
    friendshipsReceived?: FriendshipUpdateManyWithoutUser2NestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settingsId?: StringFieldUpdateOperationsInput | string
    sentRequests?: FriendRequestUncheckedUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput
    friendshipsInitiated?: FriendshipUncheckedUpdateManyWithoutUser1NestedInput
    friendshipsReceived?: FriendshipUncheckedUpdateManyWithoutUser2NestedInput
  }

  export type ProfileCreateManyInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settingsId: string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settingsId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountSettingsCreateInput = {
    id?: string
    isTwoFactorEnabled?: boolean
    showLastSeen?: boolean
    profileVisible?: boolean
    profile?: ProfileCreateNestedOneWithoutSettingsInput
  }

  export type AccountSettingsUncheckedCreateInput = {
    id?: string
    isTwoFactorEnabled?: boolean
    showLastSeen?: boolean
    profileVisible?: boolean
    profile?: ProfileUncheckedCreateNestedOneWithoutSettingsInput
  }

  export type AccountSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    showLastSeen?: BoolFieldUpdateOperationsInput | boolean
    profileVisible?: BoolFieldUpdateOperationsInput | boolean
    profile?: ProfileUpdateOneWithoutSettingsNestedInput
  }

  export type AccountSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    showLastSeen?: BoolFieldUpdateOperationsInput | boolean
    profileVisible?: BoolFieldUpdateOperationsInput | boolean
    profile?: ProfileUncheckedUpdateOneWithoutSettingsNestedInput
  }

  export type AccountSettingsCreateManyInput = {
    id?: string
    isTwoFactorEnabled?: boolean
    showLastSeen?: boolean
    profileVisible?: boolean
  }

  export type AccountSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    showLastSeen?: BoolFieldUpdateOperationsInput | boolean
    profileVisible?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AccountSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    showLastSeen?: BoolFieldUpdateOperationsInput | boolean
    profileVisible?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FriendRequestCreateInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    sender: ProfileCreateNestedOneWithoutSentRequestsInput
    receiver: ProfileCreateNestedOneWithoutReceivedRequestsInput
  }

  export type FriendRequestUncheckedCreateInput = {
    id?: string
    senderId: string
    receiverId: string
    status?: string
    createdAt?: Date | string
  }

  export type FriendRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: ProfileUpdateOneRequiredWithoutSentRequestsNestedInput
    receiver?: ProfileUpdateOneRequiredWithoutReceivedRequestsNestedInput
  }

  export type FriendRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestCreateManyInput = {
    id?: string
    senderId: string
    receiverId: string
    status?: string
    createdAt?: Date | string
  }

  export type FriendRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipCreateInput = {
    id?: string
    createdAt?: Date | string
    user1: ProfileCreateNestedOneWithoutFriendshipsInitiatedInput
    user2: ProfileCreateNestedOneWithoutFriendshipsReceivedInput
  }

  export type FriendshipUncheckedCreateInput = {
    id?: string
    user1Id: string
    user2Id: string
    createdAt?: Date | string
  }

  export type FriendshipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user1?: ProfileUpdateOneRequiredWithoutFriendshipsInitiatedNestedInput
    user2?: ProfileUpdateOneRequiredWithoutFriendshipsReceivedNestedInput
  }

  export type FriendshipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user1Id?: StringFieldUpdateOperationsInput | string
    user2Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipCreateManyInput = {
    id?: string
    user1Id: string
    user2Id: string
    createdAt?: Date | string
  }

  export type FriendshipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user1Id?: StringFieldUpdateOperationsInput | string
    user2Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountSettingsScalarRelationFilter = {
    is?: AccountSettingsWhereInput
    isNot?: AccountSettingsWhereInput
  }

  export type FriendRequestListRelationFilter = {
    every?: FriendRequestWhereInput
    some?: FriendRequestWhereInput
    none?: FriendRequestWhereInput
  }

  export type FriendshipListRelationFilter = {
    every?: FriendshipWhereInput
    some?: FriendshipWhereInput
    none?: FriendshipWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FriendRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FriendshipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settingsId?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settingsId?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settingsId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type AccountSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    isTwoFactorEnabled?: SortOrder
    showLastSeen?: SortOrder
    profileVisible?: SortOrder
  }

  export type AccountSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    isTwoFactorEnabled?: SortOrder
    showLastSeen?: SortOrder
    profileVisible?: SortOrder
  }

  export type AccountSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    isTwoFactorEnabled?: SortOrder
    showLastSeen?: SortOrder
    profileVisible?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type FriendRequestCountOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type FriendRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type FriendRequestMinOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type FriendshipCountOrderByAggregateInput = {
    id?: SortOrder
    user1Id?: SortOrder
    user2Id?: SortOrder
    createdAt?: SortOrder
  }

  export type FriendshipMaxOrderByAggregateInput = {
    id?: SortOrder
    user1Id?: SortOrder
    user2Id?: SortOrder
    createdAt?: SortOrder
  }

  export type FriendshipMinOrderByAggregateInput = {
    id?: SortOrder
    user1Id?: SortOrder
    user2Id?: SortOrder
    createdAt?: SortOrder
  }

  export type AccountSettingsCreateNestedOneWithoutProfileInput = {
    create?: XOR<AccountSettingsCreateWithoutProfileInput, AccountSettingsUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AccountSettingsCreateOrConnectWithoutProfileInput
    connect?: AccountSettingsWhereUniqueInput
  }

  export type FriendRequestCreateNestedManyWithoutSenderInput = {
    create?: XOR<FriendRequestCreateWithoutSenderInput, FriendRequestUncheckedCreateWithoutSenderInput> | FriendRequestCreateWithoutSenderInput[] | FriendRequestUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutSenderInput | FriendRequestCreateOrConnectWithoutSenderInput[]
    createMany?: FriendRequestCreateManySenderInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type FriendRequestCreateNestedManyWithoutReceiverInput = {
    create?: XOR<FriendRequestCreateWithoutReceiverInput, FriendRequestUncheckedCreateWithoutReceiverInput> | FriendRequestCreateWithoutReceiverInput[] | FriendRequestUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutReceiverInput | FriendRequestCreateOrConnectWithoutReceiverInput[]
    createMany?: FriendRequestCreateManyReceiverInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type FriendshipCreateNestedManyWithoutUser1Input = {
    create?: XOR<FriendshipCreateWithoutUser1Input, FriendshipUncheckedCreateWithoutUser1Input> | FriendshipCreateWithoutUser1Input[] | FriendshipUncheckedCreateWithoutUser1Input[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser1Input | FriendshipCreateOrConnectWithoutUser1Input[]
    createMany?: FriendshipCreateManyUser1InputEnvelope
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
  }

  export type FriendshipCreateNestedManyWithoutUser2Input = {
    create?: XOR<FriendshipCreateWithoutUser2Input, FriendshipUncheckedCreateWithoutUser2Input> | FriendshipCreateWithoutUser2Input[] | FriendshipUncheckedCreateWithoutUser2Input[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser2Input | FriendshipCreateOrConnectWithoutUser2Input[]
    createMany?: FriendshipCreateManyUser2InputEnvelope
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
  }

  export type FriendRequestUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<FriendRequestCreateWithoutSenderInput, FriendRequestUncheckedCreateWithoutSenderInput> | FriendRequestCreateWithoutSenderInput[] | FriendRequestUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutSenderInput | FriendRequestCreateOrConnectWithoutSenderInput[]
    createMany?: FriendRequestCreateManySenderInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type FriendRequestUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<FriendRequestCreateWithoutReceiverInput, FriendRequestUncheckedCreateWithoutReceiverInput> | FriendRequestCreateWithoutReceiverInput[] | FriendRequestUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutReceiverInput | FriendRequestCreateOrConnectWithoutReceiverInput[]
    createMany?: FriendRequestCreateManyReceiverInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type FriendshipUncheckedCreateNestedManyWithoutUser1Input = {
    create?: XOR<FriendshipCreateWithoutUser1Input, FriendshipUncheckedCreateWithoutUser1Input> | FriendshipCreateWithoutUser1Input[] | FriendshipUncheckedCreateWithoutUser1Input[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser1Input | FriendshipCreateOrConnectWithoutUser1Input[]
    createMany?: FriendshipCreateManyUser1InputEnvelope
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
  }

  export type FriendshipUncheckedCreateNestedManyWithoutUser2Input = {
    create?: XOR<FriendshipCreateWithoutUser2Input, FriendshipUncheckedCreateWithoutUser2Input> | FriendshipCreateWithoutUser2Input[] | FriendshipUncheckedCreateWithoutUser2Input[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser2Input | FriendshipCreateOrConnectWithoutUser2Input[]
    createMany?: FriendshipCreateManyUser2InputEnvelope
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountSettingsUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<AccountSettingsCreateWithoutProfileInput, AccountSettingsUncheckedCreateWithoutProfileInput>
    connectOrCreate?: AccountSettingsCreateOrConnectWithoutProfileInput
    upsert?: AccountSettingsUpsertWithoutProfileInput
    connect?: AccountSettingsWhereUniqueInput
    update?: XOR<XOR<AccountSettingsUpdateToOneWithWhereWithoutProfileInput, AccountSettingsUpdateWithoutProfileInput>, AccountSettingsUncheckedUpdateWithoutProfileInput>
  }

  export type FriendRequestUpdateManyWithoutSenderNestedInput = {
    create?: XOR<FriendRequestCreateWithoutSenderInput, FriendRequestUncheckedCreateWithoutSenderInput> | FriendRequestCreateWithoutSenderInput[] | FriendRequestUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutSenderInput | FriendRequestCreateOrConnectWithoutSenderInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutSenderInput | FriendRequestUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: FriendRequestCreateManySenderInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutSenderInput | FriendRequestUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutSenderInput | FriendRequestUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type FriendRequestUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<FriendRequestCreateWithoutReceiverInput, FriendRequestUncheckedCreateWithoutReceiverInput> | FriendRequestCreateWithoutReceiverInput[] | FriendRequestUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutReceiverInput | FriendRequestCreateOrConnectWithoutReceiverInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutReceiverInput | FriendRequestUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: FriendRequestCreateManyReceiverInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutReceiverInput | FriendRequestUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutReceiverInput | FriendRequestUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type FriendshipUpdateManyWithoutUser1NestedInput = {
    create?: XOR<FriendshipCreateWithoutUser1Input, FriendshipUncheckedCreateWithoutUser1Input> | FriendshipCreateWithoutUser1Input[] | FriendshipUncheckedCreateWithoutUser1Input[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser1Input | FriendshipCreateOrConnectWithoutUser1Input[]
    upsert?: FriendshipUpsertWithWhereUniqueWithoutUser1Input | FriendshipUpsertWithWhereUniqueWithoutUser1Input[]
    createMany?: FriendshipCreateManyUser1InputEnvelope
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    update?: FriendshipUpdateWithWhereUniqueWithoutUser1Input | FriendshipUpdateWithWhereUniqueWithoutUser1Input[]
    updateMany?: FriendshipUpdateManyWithWhereWithoutUser1Input | FriendshipUpdateManyWithWhereWithoutUser1Input[]
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
  }

  export type FriendshipUpdateManyWithoutUser2NestedInput = {
    create?: XOR<FriendshipCreateWithoutUser2Input, FriendshipUncheckedCreateWithoutUser2Input> | FriendshipCreateWithoutUser2Input[] | FriendshipUncheckedCreateWithoutUser2Input[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser2Input | FriendshipCreateOrConnectWithoutUser2Input[]
    upsert?: FriendshipUpsertWithWhereUniqueWithoutUser2Input | FriendshipUpsertWithWhereUniqueWithoutUser2Input[]
    createMany?: FriendshipCreateManyUser2InputEnvelope
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    update?: FriendshipUpdateWithWhereUniqueWithoutUser2Input | FriendshipUpdateWithWhereUniqueWithoutUser2Input[]
    updateMany?: FriendshipUpdateManyWithWhereWithoutUser2Input | FriendshipUpdateManyWithWhereWithoutUser2Input[]
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
  }

  export type FriendRequestUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<FriendRequestCreateWithoutSenderInput, FriendRequestUncheckedCreateWithoutSenderInput> | FriendRequestCreateWithoutSenderInput[] | FriendRequestUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutSenderInput | FriendRequestCreateOrConnectWithoutSenderInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutSenderInput | FriendRequestUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: FriendRequestCreateManySenderInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutSenderInput | FriendRequestUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutSenderInput | FriendRequestUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<FriendRequestCreateWithoutReceiverInput, FriendRequestUncheckedCreateWithoutReceiverInput> | FriendRequestCreateWithoutReceiverInput[] | FriendRequestUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutReceiverInput | FriendRequestCreateOrConnectWithoutReceiverInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutReceiverInput | FriendRequestUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: FriendRequestCreateManyReceiverInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutReceiverInput | FriendRequestUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutReceiverInput | FriendRequestUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type FriendshipUncheckedUpdateManyWithoutUser1NestedInput = {
    create?: XOR<FriendshipCreateWithoutUser1Input, FriendshipUncheckedCreateWithoutUser1Input> | FriendshipCreateWithoutUser1Input[] | FriendshipUncheckedCreateWithoutUser1Input[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser1Input | FriendshipCreateOrConnectWithoutUser1Input[]
    upsert?: FriendshipUpsertWithWhereUniqueWithoutUser1Input | FriendshipUpsertWithWhereUniqueWithoutUser1Input[]
    createMany?: FriendshipCreateManyUser1InputEnvelope
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    update?: FriendshipUpdateWithWhereUniqueWithoutUser1Input | FriendshipUpdateWithWhereUniqueWithoutUser1Input[]
    updateMany?: FriendshipUpdateManyWithWhereWithoutUser1Input | FriendshipUpdateManyWithWhereWithoutUser1Input[]
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
  }

  export type FriendshipUncheckedUpdateManyWithoutUser2NestedInput = {
    create?: XOR<FriendshipCreateWithoutUser2Input, FriendshipUncheckedCreateWithoutUser2Input> | FriendshipCreateWithoutUser2Input[] | FriendshipUncheckedCreateWithoutUser2Input[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser2Input | FriendshipCreateOrConnectWithoutUser2Input[]
    upsert?: FriendshipUpsertWithWhereUniqueWithoutUser2Input | FriendshipUpsertWithWhereUniqueWithoutUser2Input[]
    createMany?: FriendshipCreateManyUser2InputEnvelope
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    update?: FriendshipUpdateWithWhereUniqueWithoutUser2Input | FriendshipUpdateWithWhereUniqueWithoutUser2Input[]
    updateMany?: FriendshipUpdateManyWithWhereWithoutUser2Input | FriendshipUpdateManyWithWhereWithoutUser2Input[]
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutSettingsInput = {
    create?: XOR<ProfileCreateWithoutSettingsInput, ProfileUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSettingsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUncheckedCreateNestedOneWithoutSettingsInput = {
    create?: XOR<ProfileCreateWithoutSettingsInput, ProfileUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSettingsInput
    connect?: ProfileWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProfileUpdateOneWithoutSettingsNestedInput = {
    create?: XOR<ProfileCreateWithoutSettingsInput, ProfileUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSettingsInput
    upsert?: ProfileUpsertWithoutSettingsInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutSettingsInput, ProfileUpdateWithoutSettingsInput>, ProfileUncheckedUpdateWithoutSettingsInput>
  }

  export type ProfileUncheckedUpdateOneWithoutSettingsNestedInput = {
    create?: XOR<ProfileCreateWithoutSettingsInput, ProfileUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSettingsInput
    upsert?: ProfileUpsertWithoutSettingsInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutSettingsInput, ProfileUpdateWithoutSettingsInput>, ProfileUncheckedUpdateWithoutSettingsInput>
  }

  export type ProfileCreateNestedOneWithoutSentRequestsInput = {
    create?: XOR<ProfileCreateWithoutSentRequestsInput, ProfileUncheckedCreateWithoutSentRequestsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSentRequestsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutReceivedRequestsInput = {
    create?: XOR<ProfileCreateWithoutReceivedRequestsInput, ProfileUncheckedCreateWithoutReceivedRequestsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutReceivedRequestsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutSentRequestsNestedInput = {
    create?: XOR<ProfileCreateWithoutSentRequestsInput, ProfileUncheckedCreateWithoutSentRequestsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutSentRequestsInput
    upsert?: ProfileUpsertWithoutSentRequestsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutSentRequestsInput, ProfileUpdateWithoutSentRequestsInput>, ProfileUncheckedUpdateWithoutSentRequestsInput>
  }

  export type ProfileUpdateOneRequiredWithoutReceivedRequestsNestedInput = {
    create?: XOR<ProfileCreateWithoutReceivedRequestsInput, ProfileUncheckedCreateWithoutReceivedRequestsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutReceivedRequestsInput
    upsert?: ProfileUpsertWithoutReceivedRequestsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutReceivedRequestsInput, ProfileUpdateWithoutReceivedRequestsInput>, ProfileUncheckedUpdateWithoutReceivedRequestsInput>
  }

  export type ProfileCreateNestedOneWithoutFriendshipsInitiatedInput = {
    create?: XOR<ProfileCreateWithoutFriendshipsInitiatedInput, ProfileUncheckedCreateWithoutFriendshipsInitiatedInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutFriendshipsInitiatedInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutFriendshipsReceivedInput = {
    create?: XOR<ProfileCreateWithoutFriendshipsReceivedInput, ProfileUncheckedCreateWithoutFriendshipsReceivedInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutFriendshipsReceivedInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutFriendshipsInitiatedNestedInput = {
    create?: XOR<ProfileCreateWithoutFriendshipsInitiatedInput, ProfileUncheckedCreateWithoutFriendshipsInitiatedInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutFriendshipsInitiatedInput
    upsert?: ProfileUpsertWithoutFriendshipsInitiatedInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutFriendshipsInitiatedInput, ProfileUpdateWithoutFriendshipsInitiatedInput>, ProfileUncheckedUpdateWithoutFriendshipsInitiatedInput>
  }

  export type ProfileUpdateOneRequiredWithoutFriendshipsReceivedNestedInput = {
    create?: XOR<ProfileCreateWithoutFriendshipsReceivedInput, ProfileUncheckedCreateWithoutFriendshipsReceivedInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutFriendshipsReceivedInput
    upsert?: ProfileUpsertWithoutFriendshipsReceivedInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutFriendshipsReceivedInput, ProfileUpdateWithoutFriendshipsReceivedInput>, ProfileUncheckedUpdateWithoutFriendshipsReceivedInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AccountSettingsCreateWithoutProfileInput = {
    id?: string
    isTwoFactorEnabled?: boolean
    showLastSeen?: boolean
    profileVisible?: boolean
  }

  export type AccountSettingsUncheckedCreateWithoutProfileInput = {
    id?: string
    isTwoFactorEnabled?: boolean
    showLastSeen?: boolean
    profileVisible?: boolean
  }

  export type AccountSettingsCreateOrConnectWithoutProfileInput = {
    where: AccountSettingsWhereUniqueInput
    create: XOR<AccountSettingsCreateWithoutProfileInput, AccountSettingsUncheckedCreateWithoutProfileInput>
  }

  export type FriendRequestCreateWithoutSenderInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    receiver: ProfileCreateNestedOneWithoutReceivedRequestsInput
  }

  export type FriendRequestUncheckedCreateWithoutSenderInput = {
    id?: string
    receiverId: string
    status?: string
    createdAt?: Date | string
  }

  export type FriendRequestCreateOrConnectWithoutSenderInput = {
    where: FriendRequestWhereUniqueInput
    create: XOR<FriendRequestCreateWithoutSenderInput, FriendRequestUncheckedCreateWithoutSenderInput>
  }

  export type FriendRequestCreateManySenderInputEnvelope = {
    data: FriendRequestCreateManySenderInput | FriendRequestCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type FriendRequestCreateWithoutReceiverInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    sender: ProfileCreateNestedOneWithoutSentRequestsInput
  }

  export type FriendRequestUncheckedCreateWithoutReceiverInput = {
    id?: string
    senderId: string
    status?: string
    createdAt?: Date | string
  }

  export type FriendRequestCreateOrConnectWithoutReceiverInput = {
    where: FriendRequestWhereUniqueInput
    create: XOR<FriendRequestCreateWithoutReceiverInput, FriendRequestUncheckedCreateWithoutReceiverInput>
  }

  export type FriendRequestCreateManyReceiverInputEnvelope = {
    data: FriendRequestCreateManyReceiverInput | FriendRequestCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type FriendshipCreateWithoutUser1Input = {
    id?: string
    createdAt?: Date | string
    user2: ProfileCreateNestedOneWithoutFriendshipsReceivedInput
  }

  export type FriendshipUncheckedCreateWithoutUser1Input = {
    id?: string
    user2Id: string
    createdAt?: Date | string
  }

  export type FriendshipCreateOrConnectWithoutUser1Input = {
    where: FriendshipWhereUniqueInput
    create: XOR<FriendshipCreateWithoutUser1Input, FriendshipUncheckedCreateWithoutUser1Input>
  }

  export type FriendshipCreateManyUser1InputEnvelope = {
    data: FriendshipCreateManyUser1Input | FriendshipCreateManyUser1Input[]
    skipDuplicates?: boolean
  }

  export type FriendshipCreateWithoutUser2Input = {
    id?: string
    createdAt?: Date | string
    user1: ProfileCreateNestedOneWithoutFriendshipsInitiatedInput
  }

  export type FriendshipUncheckedCreateWithoutUser2Input = {
    id?: string
    user1Id: string
    createdAt?: Date | string
  }

  export type FriendshipCreateOrConnectWithoutUser2Input = {
    where: FriendshipWhereUniqueInput
    create: XOR<FriendshipCreateWithoutUser2Input, FriendshipUncheckedCreateWithoutUser2Input>
  }

  export type FriendshipCreateManyUser2InputEnvelope = {
    data: FriendshipCreateManyUser2Input | FriendshipCreateManyUser2Input[]
    skipDuplicates?: boolean
  }

  export type AccountSettingsUpsertWithoutProfileInput = {
    update: XOR<AccountSettingsUpdateWithoutProfileInput, AccountSettingsUncheckedUpdateWithoutProfileInput>
    create: XOR<AccountSettingsCreateWithoutProfileInput, AccountSettingsUncheckedCreateWithoutProfileInput>
    where?: AccountSettingsWhereInput
  }

  export type AccountSettingsUpdateToOneWithWhereWithoutProfileInput = {
    where?: AccountSettingsWhereInput
    data: XOR<AccountSettingsUpdateWithoutProfileInput, AccountSettingsUncheckedUpdateWithoutProfileInput>
  }

  export type AccountSettingsUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    showLastSeen?: BoolFieldUpdateOperationsInput | boolean
    profileVisible?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AccountSettingsUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    showLastSeen?: BoolFieldUpdateOperationsInput | boolean
    profileVisible?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FriendRequestUpsertWithWhereUniqueWithoutSenderInput = {
    where: FriendRequestWhereUniqueInput
    update: XOR<FriendRequestUpdateWithoutSenderInput, FriendRequestUncheckedUpdateWithoutSenderInput>
    create: XOR<FriendRequestCreateWithoutSenderInput, FriendRequestUncheckedCreateWithoutSenderInput>
  }

  export type FriendRequestUpdateWithWhereUniqueWithoutSenderInput = {
    where: FriendRequestWhereUniqueInput
    data: XOR<FriendRequestUpdateWithoutSenderInput, FriendRequestUncheckedUpdateWithoutSenderInput>
  }

  export type FriendRequestUpdateManyWithWhereWithoutSenderInput = {
    where: FriendRequestScalarWhereInput
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyWithoutSenderInput>
  }

  export type FriendRequestScalarWhereInput = {
    AND?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
    OR?: FriendRequestScalarWhereInput[]
    NOT?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
    id?: StringFilter<"FriendRequest"> | string
    senderId?: StringFilter<"FriendRequest"> | string
    receiverId?: StringFilter<"FriendRequest"> | string
    status?: StringFilter<"FriendRequest"> | string
    createdAt?: DateTimeFilter<"FriendRequest"> | Date | string
  }

  export type FriendRequestUpsertWithWhereUniqueWithoutReceiverInput = {
    where: FriendRequestWhereUniqueInput
    update: XOR<FriendRequestUpdateWithoutReceiverInput, FriendRequestUncheckedUpdateWithoutReceiverInput>
    create: XOR<FriendRequestCreateWithoutReceiverInput, FriendRequestUncheckedCreateWithoutReceiverInput>
  }

  export type FriendRequestUpdateWithWhereUniqueWithoutReceiverInput = {
    where: FriendRequestWhereUniqueInput
    data: XOR<FriendRequestUpdateWithoutReceiverInput, FriendRequestUncheckedUpdateWithoutReceiverInput>
  }

  export type FriendRequestUpdateManyWithWhereWithoutReceiverInput = {
    where: FriendRequestScalarWhereInput
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyWithoutReceiverInput>
  }

  export type FriendshipUpsertWithWhereUniqueWithoutUser1Input = {
    where: FriendshipWhereUniqueInput
    update: XOR<FriendshipUpdateWithoutUser1Input, FriendshipUncheckedUpdateWithoutUser1Input>
    create: XOR<FriendshipCreateWithoutUser1Input, FriendshipUncheckedCreateWithoutUser1Input>
  }

  export type FriendshipUpdateWithWhereUniqueWithoutUser1Input = {
    where: FriendshipWhereUniqueInput
    data: XOR<FriendshipUpdateWithoutUser1Input, FriendshipUncheckedUpdateWithoutUser1Input>
  }

  export type FriendshipUpdateManyWithWhereWithoutUser1Input = {
    where: FriendshipScalarWhereInput
    data: XOR<FriendshipUpdateManyMutationInput, FriendshipUncheckedUpdateManyWithoutUser1Input>
  }

  export type FriendshipScalarWhereInput = {
    AND?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
    OR?: FriendshipScalarWhereInput[]
    NOT?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
    id?: StringFilter<"Friendship"> | string
    user1Id?: StringFilter<"Friendship"> | string
    user2Id?: StringFilter<"Friendship"> | string
    createdAt?: DateTimeFilter<"Friendship"> | Date | string
  }

  export type FriendshipUpsertWithWhereUniqueWithoutUser2Input = {
    where: FriendshipWhereUniqueInput
    update: XOR<FriendshipUpdateWithoutUser2Input, FriendshipUncheckedUpdateWithoutUser2Input>
    create: XOR<FriendshipCreateWithoutUser2Input, FriendshipUncheckedCreateWithoutUser2Input>
  }

  export type FriendshipUpdateWithWhereUniqueWithoutUser2Input = {
    where: FriendshipWhereUniqueInput
    data: XOR<FriendshipUpdateWithoutUser2Input, FriendshipUncheckedUpdateWithoutUser2Input>
  }

  export type FriendshipUpdateManyWithWhereWithoutUser2Input = {
    where: FriendshipScalarWhereInput
    data: XOR<FriendshipUpdateManyMutationInput, FriendshipUncheckedUpdateManyWithoutUser2Input>
  }

  export type ProfileCreateWithoutSettingsInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentRequests?: FriendRequestCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestCreateNestedManyWithoutReceiverInput
    friendshipsInitiated?: FriendshipCreateNestedManyWithoutUser1Input
    friendshipsReceived?: FriendshipCreateNestedManyWithoutUser2Input
  }

  export type ProfileUncheckedCreateWithoutSettingsInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentRequests?: FriendRequestUncheckedCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestUncheckedCreateNestedManyWithoutReceiverInput
    friendshipsInitiated?: FriendshipUncheckedCreateNestedManyWithoutUser1Input
    friendshipsReceived?: FriendshipUncheckedCreateNestedManyWithoutUser2Input
  }

  export type ProfileCreateOrConnectWithoutSettingsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutSettingsInput, ProfileUncheckedCreateWithoutSettingsInput>
  }

  export type ProfileUpsertWithoutSettingsInput = {
    update: XOR<ProfileUpdateWithoutSettingsInput, ProfileUncheckedUpdateWithoutSettingsInput>
    create: XOR<ProfileCreateWithoutSettingsInput, ProfileUncheckedCreateWithoutSettingsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutSettingsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutSettingsInput, ProfileUncheckedUpdateWithoutSettingsInput>
  }

  export type ProfileUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentRequests?: FriendRequestUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUpdateManyWithoutReceiverNestedInput
    friendshipsInitiated?: FriendshipUpdateManyWithoutUser1NestedInput
    friendshipsReceived?: FriendshipUpdateManyWithoutUser2NestedInput
  }

  export type ProfileUncheckedUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentRequests?: FriendRequestUncheckedUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput
    friendshipsInitiated?: FriendshipUncheckedUpdateManyWithoutUser1NestedInput
    friendshipsReceived?: FriendshipUncheckedUpdateManyWithoutUser2NestedInput
  }

  export type ProfileCreateWithoutSentRequestsInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings: AccountSettingsCreateNestedOneWithoutProfileInput
    receivedRequests?: FriendRequestCreateNestedManyWithoutReceiverInput
    friendshipsInitiated?: FriendshipCreateNestedManyWithoutUser1Input
    friendshipsReceived?: FriendshipCreateNestedManyWithoutUser2Input
  }

  export type ProfileUncheckedCreateWithoutSentRequestsInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settingsId: string
    receivedRequests?: FriendRequestUncheckedCreateNestedManyWithoutReceiverInput
    friendshipsInitiated?: FriendshipUncheckedCreateNestedManyWithoutUser1Input
    friendshipsReceived?: FriendshipUncheckedCreateNestedManyWithoutUser2Input
  }

  export type ProfileCreateOrConnectWithoutSentRequestsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutSentRequestsInput, ProfileUncheckedCreateWithoutSentRequestsInput>
  }

  export type ProfileCreateWithoutReceivedRequestsInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings: AccountSettingsCreateNestedOneWithoutProfileInput
    sentRequests?: FriendRequestCreateNestedManyWithoutSenderInput
    friendshipsInitiated?: FriendshipCreateNestedManyWithoutUser1Input
    friendshipsReceived?: FriendshipCreateNestedManyWithoutUser2Input
  }

  export type ProfileUncheckedCreateWithoutReceivedRequestsInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settingsId: string
    sentRequests?: FriendRequestUncheckedCreateNestedManyWithoutSenderInput
    friendshipsInitiated?: FriendshipUncheckedCreateNestedManyWithoutUser1Input
    friendshipsReceived?: FriendshipUncheckedCreateNestedManyWithoutUser2Input
  }

  export type ProfileCreateOrConnectWithoutReceivedRequestsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutReceivedRequestsInput, ProfileUncheckedCreateWithoutReceivedRequestsInput>
  }

  export type ProfileUpsertWithoutSentRequestsInput = {
    update: XOR<ProfileUpdateWithoutSentRequestsInput, ProfileUncheckedUpdateWithoutSentRequestsInput>
    create: XOR<ProfileCreateWithoutSentRequestsInput, ProfileUncheckedCreateWithoutSentRequestsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutSentRequestsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutSentRequestsInput, ProfileUncheckedUpdateWithoutSentRequestsInput>
  }

  export type ProfileUpdateWithoutSentRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: AccountSettingsUpdateOneRequiredWithoutProfileNestedInput
    receivedRequests?: FriendRequestUpdateManyWithoutReceiverNestedInput
    friendshipsInitiated?: FriendshipUpdateManyWithoutUser1NestedInput
    friendshipsReceived?: FriendshipUpdateManyWithoutUser2NestedInput
  }

  export type ProfileUncheckedUpdateWithoutSentRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settingsId?: StringFieldUpdateOperationsInput | string
    receivedRequests?: FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput
    friendshipsInitiated?: FriendshipUncheckedUpdateManyWithoutUser1NestedInput
    friendshipsReceived?: FriendshipUncheckedUpdateManyWithoutUser2NestedInput
  }

  export type ProfileUpsertWithoutReceivedRequestsInput = {
    update: XOR<ProfileUpdateWithoutReceivedRequestsInput, ProfileUncheckedUpdateWithoutReceivedRequestsInput>
    create: XOR<ProfileCreateWithoutReceivedRequestsInput, ProfileUncheckedCreateWithoutReceivedRequestsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutReceivedRequestsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutReceivedRequestsInput, ProfileUncheckedUpdateWithoutReceivedRequestsInput>
  }

  export type ProfileUpdateWithoutReceivedRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: AccountSettingsUpdateOneRequiredWithoutProfileNestedInput
    sentRequests?: FriendRequestUpdateManyWithoutSenderNestedInput
    friendshipsInitiated?: FriendshipUpdateManyWithoutUser1NestedInput
    friendshipsReceived?: FriendshipUpdateManyWithoutUser2NestedInput
  }

  export type ProfileUncheckedUpdateWithoutReceivedRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settingsId?: StringFieldUpdateOperationsInput | string
    sentRequests?: FriendRequestUncheckedUpdateManyWithoutSenderNestedInput
    friendshipsInitiated?: FriendshipUncheckedUpdateManyWithoutUser1NestedInput
    friendshipsReceived?: FriendshipUncheckedUpdateManyWithoutUser2NestedInput
  }

  export type ProfileCreateWithoutFriendshipsInitiatedInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings: AccountSettingsCreateNestedOneWithoutProfileInput
    sentRequests?: FriendRequestCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestCreateNestedManyWithoutReceiverInput
    friendshipsReceived?: FriendshipCreateNestedManyWithoutUser2Input
  }

  export type ProfileUncheckedCreateWithoutFriendshipsInitiatedInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settingsId: string
    sentRequests?: FriendRequestUncheckedCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestUncheckedCreateNestedManyWithoutReceiverInput
    friendshipsReceived?: FriendshipUncheckedCreateNestedManyWithoutUser2Input
  }

  export type ProfileCreateOrConnectWithoutFriendshipsInitiatedInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutFriendshipsInitiatedInput, ProfileUncheckedCreateWithoutFriendshipsInitiatedInput>
  }

  export type ProfileCreateWithoutFriendshipsReceivedInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings: AccountSettingsCreateNestedOneWithoutProfileInput
    sentRequests?: FriendRequestCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestCreateNestedManyWithoutReceiverInput
    friendshipsInitiated?: FriendshipCreateNestedManyWithoutUser1Input
  }

  export type ProfileUncheckedCreateWithoutFriendshipsReceivedInput = {
    id?: string
    userId: string
    username: string
    email: string
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    bio?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settingsId: string
    sentRequests?: FriendRequestUncheckedCreateNestedManyWithoutSenderInput
    receivedRequests?: FriendRequestUncheckedCreateNestedManyWithoutReceiverInput
    friendshipsInitiated?: FriendshipUncheckedCreateNestedManyWithoutUser1Input
  }

  export type ProfileCreateOrConnectWithoutFriendshipsReceivedInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutFriendshipsReceivedInput, ProfileUncheckedCreateWithoutFriendshipsReceivedInput>
  }

  export type ProfileUpsertWithoutFriendshipsInitiatedInput = {
    update: XOR<ProfileUpdateWithoutFriendshipsInitiatedInput, ProfileUncheckedUpdateWithoutFriendshipsInitiatedInput>
    create: XOR<ProfileCreateWithoutFriendshipsInitiatedInput, ProfileUncheckedCreateWithoutFriendshipsInitiatedInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutFriendshipsInitiatedInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutFriendshipsInitiatedInput, ProfileUncheckedUpdateWithoutFriendshipsInitiatedInput>
  }

  export type ProfileUpdateWithoutFriendshipsInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: AccountSettingsUpdateOneRequiredWithoutProfileNestedInput
    sentRequests?: FriendRequestUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUpdateManyWithoutReceiverNestedInput
    friendshipsReceived?: FriendshipUpdateManyWithoutUser2NestedInput
  }

  export type ProfileUncheckedUpdateWithoutFriendshipsInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settingsId?: StringFieldUpdateOperationsInput | string
    sentRequests?: FriendRequestUncheckedUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput
    friendshipsReceived?: FriendshipUncheckedUpdateManyWithoutUser2NestedInput
  }

  export type ProfileUpsertWithoutFriendshipsReceivedInput = {
    update: XOR<ProfileUpdateWithoutFriendshipsReceivedInput, ProfileUncheckedUpdateWithoutFriendshipsReceivedInput>
    create: XOR<ProfileCreateWithoutFriendshipsReceivedInput, ProfileUncheckedCreateWithoutFriendshipsReceivedInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutFriendshipsReceivedInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutFriendshipsReceivedInput, ProfileUncheckedUpdateWithoutFriendshipsReceivedInput>
  }

  export type ProfileUpdateWithoutFriendshipsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: AccountSettingsUpdateOneRequiredWithoutProfileNestedInput
    sentRequests?: FriendRequestUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUpdateManyWithoutReceiverNestedInput
    friendshipsInitiated?: FriendshipUpdateManyWithoutUser1NestedInput
  }

  export type ProfileUncheckedUpdateWithoutFriendshipsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settingsId?: StringFieldUpdateOperationsInput | string
    sentRequests?: FriendRequestUncheckedUpdateManyWithoutSenderNestedInput
    receivedRequests?: FriendRequestUncheckedUpdateManyWithoutReceiverNestedInput
    friendshipsInitiated?: FriendshipUncheckedUpdateManyWithoutUser1NestedInput
  }

  export type FriendRequestCreateManySenderInput = {
    id?: string
    receiverId: string
    status?: string
    createdAt?: Date | string
  }

  export type FriendRequestCreateManyReceiverInput = {
    id?: string
    senderId: string
    status?: string
    createdAt?: Date | string
  }

  export type FriendshipCreateManyUser1Input = {
    id?: string
    user2Id: string
    createdAt?: Date | string
  }

  export type FriendshipCreateManyUser2Input = {
    id?: string
    user1Id: string
    createdAt?: Date | string
  }

  export type FriendRequestUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiver?: ProfileUpdateOneRequiredWithoutReceivedRequestsNestedInput
  }

  export type FriendRequestUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: ProfileUpdateOneRequiredWithoutSentRequestsNestedInput
  }

  export type FriendRequestUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipUpdateWithoutUser1Input = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user2?: ProfileUpdateOneRequiredWithoutFriendshipsReceivedNestedInput
  }

  export type FriendshipUncheckedUpdateWithoutUser1Input = {
    id?: StringFieldUpdateOperationsInput | string
    user2Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipUncheckedUpdateManyWithoutUser1Input = {
    id?: StringFieldUpdateOperationsInput | string
    user2Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipUpdateWithoutUser2Input = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user1?: ProfileUpdateOneRequiredWithoutFriendshipsInitiatedNestedInput
  }

  export type FriendshipUncheckedUpdateWithoutUser2Input = {
    id?: StringFieldUpdateOperationsInput | string
    user1Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipUncheckedUpdateManyWithoutUser2Input = {
    id?: StringFieldUpdateOperationsInput | string
    user1Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}