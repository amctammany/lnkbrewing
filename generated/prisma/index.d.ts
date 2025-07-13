
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
 * Model Style
 * 
 */
export type Style = $Result.DefaultSelection<Prisma.$StylePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StyleCategory: {
  beer: 'beer',
  mead: 'mead',
  cider: 'cider'
};

export type StyleCategory = (typeof StyleCategory)[keyof typeof StyleCategory]

}

export type StyleCategory = $Enums.StyleCategory

export const StyleCategory: typeof $Enums.StyleCategory

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Styles
 * const styles = await prisma.style.findMany()
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
   * // Fetch zero or more Styles
   * const styles = await prisma.style.findMany()
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
   * `prisma.style`: Exposes CRUD operations for the **Style** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Styles
    * const styles = await prisma.style.findMany()
    * ```
    */
  get style(): Prisma.StyleDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
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
    Style: 'Style'
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
      modelProps: "style"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Style: {
        payload: Prisma.$StylePayload<ExtArgs>
        fields: Prisma.StyleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StyleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StylePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StyleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StylePayload>
          }
          findFirst: {
            args: Prisma.StyleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StylePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StyleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StylePayload>
          }
          findMany: {
            args: Prisma.StyleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StylePayload>[]
          }
          create: {
            args: Prisma.StyleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StylePayload>
          }
          createMany: {
            args: Prisma.StyleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StyleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StylePayload>[]
          }
          delete: {
            args: Prisma.StyleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StylePayload>
          }
          update: {
            args: Prisma.StyleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StylePayload>
          }
          deleteMany: {
            args: Prisma.StyleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StyleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StyleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StylePayload>[]
          }
          upsert: {
            args: Prisma.StyleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StylePayload>
          }
          aggregate: {
            args: Prisma.StyleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStyle>
          }
          groupBy: {
            args: Prisma.StyleGroupByArgs<ExtArgs>
            result: $Utils.Optional<StyleGroupByOutputType>[]
          }
          count: {
            args: Prisma.StyleCountArgs<ExtArgs>
            result: $Utils.Optional<StyleCountAggregateOutputType> | number
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
    style?: StyleOmit
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
   * Models
   */

  /**
   * Model Style
   */

  export type AggregateStyle = {
    _count: StyleCountAggregateOutputType | null
    _avg: StyleAvgAggregateOutputType | null
    _sum: StyleSumAggregateOutputType | null
    _min: StyleMinAggregateOutputType | null
    _max: StyleMaxAggregateOutputType | null
  }

  export type StyleAvgAggregateOutputType = {
    id: number | null
    subcategoryId: number | null
    ibuLow: number | null
    ibuHigh: number | null
    ogLow: number | null
    ogHigh: number | null
    fgLow: number | null
    fgHigh: number | null
    srmLow: number | null
    srmHigh: number | null
    abvLow: number | null
    abvHigh: number | null
  }

  export type StyleSumAggregateOutputType = {
    id: number | null
    subcategoryId: number | null
    ibuLow: number | null
    ibuHigh: number | null
    ogLow: number | null
    ogHigh: number | null
    fgLow: number | null
    fgHigh: number | null
    srmLow: number | null
    srmHigh: number | null
    abvLow: number | null
    abvHigh: number | null
  }

  export type StyleMinAggregateOutputType = {
    id: number | null
    userId: string | null
    name: string | null
    slug: string | null
    category: $Enums.StyleCategory | null
    subcategoryId: number | null
    identifier: string | null
    overall: string | null
    aroma: string | null
    appearance: string | null
    flavor: string | null
    mouthfeel: string | null
    comments: string | null
    history: string | null
    ingredients: string | null
    comparison: string | null
    examples: string | null
    ibuLow: number | null
    ibuHigh: number | null
    ibuFlex: boolean | null
    ogLow: number | null
    ogHigh: number | null
    ogFlex: boolean | null
    fgLow: number | null
    fgHigh: number | null
    fgFlex: boolean | null
    srmLow: number | null
    srmHigh: number | null
    srmFlex: boolean | null
    abvLow: number | null
    abvHigh: number | null
    abvFlex: boolean | null
  }

  export type StyleMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    name: string | null
    slug: string | null
    category: $Enums.StyleCategory | null
    subcategoryId: number | null
    identifier: string | null
    overall: string | null
    aroma: string | null
    appearance: string | null
    flavor: string | null
    mouthfeel: string | null
    comments: string | null
    history: string | null
    ingredients: string | null
    comparison: string | null
    examples: string | null
    ibuLow: number | null
    ibuHigh: number | null
    ibuFlex: boolean | null
    ogLow: number | null
    ogHigh: number | null
    ogFlex: boolean | null
    fgLow: number | null
    fgHigh: number | null
    fgFlex: boolean | null
    srmLow: number | null
    srmHigh: number | null
    srmFlex: boolean | null
    abvLow: number | null
    abvHigh: number | null
    abvFlex: boolean | null
  }

  export type StyleCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    slug: number
    category: number
    subcategoryId: number
    identifier: number
    overall: number
    aroma: number
    appearance: number
    flavor: number
    mouthfeel: number
    comments: number
    history: number
    ingredients: number
    comparison: number
    examples: number
    ibuLow: number
    ibuHigh: number
    ibuFlex: number
    ogLow: number
    ogHigh: number
    ogFlex: number
    fgLow: number
    fgHigh: number
    fgFlex: number
    srmLow: number
    srmHigh: number
    srmFlex: number
    abvLow: number
    abvHigh: number
    abvFlex: number
    _all: number
  }


  export type StyleAvgAggregateInputType = {
    id?: true
    subcategoryId?: true
    ibuLow?: true
    ibuHigh?: true
    ogLow?: true
    ogHigh?: true
    fgLow?: true
    fgHigh?: true
    srmLow?: true
    srmHigh?: true
    abvLow?: true
    abvHigh?: true
  }

  export type StyleSumAggregateInputType = {
    id?: true
    subcategoryId?: true
    ibuLow?: true
    ibuHigh?: true
    ogLow?: true
    ogHigh?: true
    fgLow?: true
    fgHigh?: true
    srmLow?: true
    srmHigh?: true
    abvLow?: true
    abvHigh?: true
  }

  export type StyleMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    slug?: true
    category?: true
    subcategoryId?: true
    identifier?: true
    overall?: true
    aroma?: true
    appearance?: true
    flavor?: true
    mouthfeel?: true
    comments?: true
    history?: true
    ingredients?: true
    comparison?: true
    examples?: true
    ibuLow?: true
    ibuHigh?: true
    ibuFlex?: true
    ogLow?: true
    ogHigh?: true
    ogFlex?: true
    fgLow?: true
    fgHigh?: true
    fgFlex?: true
    srmLow?: true
    srmHigh?: true
    srmFlex?: true
    abvLow?: true
    abvHigh?: true
    abvFlex?: true
  }

  export type StyleMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    slug?: true
    category?: true
    subcategoryId?: true
    identifier?: true
    overall?: true
    aroma?: true
    appearance?: true
    flavor?: true
    mouthfeel?: true
    comments?: true
    history?: true
    ingredients?: true
    comparison?: true
    examples?: true
    ibuLow?: true
    ibuHigh?: true
    ibuFlex?: true
    ogLow?: true
    ogHigh?: true
    ogFlex?: true
    fgLow?: true
    fgHigh?: true
    fgFlex?: true
    srmLow?: true
    srmHigh?: true
    srmFlex?: true
    abvLow?: true
    abvHigh?: true
    abvFlex?: true
  }

  export type StyleCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    slug?: true
    category?: true
    subcategoryId?: true
    identifier?: true
    overall?: true
    aroma?: true
    appearance?: true
    flavor?: true
    mouthfeel?: true
    comments?: true
    history?: true
    ingredients?: true
    comparison?: true
    examples?: true
    ibuLow?: true
    ibuHigh?: true
    ibuFlex?: true
    ogLow?: true
    ogHigh?: true
    ogFlex?: true
    fgLow?: true
    fgHigh?: true
    fgFlex?: true
    srmLow?: true
    srmHigh?: true
    srmFlex?: true
    abvLow?: true
    abvHigh?: true
    abvFlex?: true
    _all?: true
  }

  export type StyleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Style to aggregate.
     */
    where?: StyleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Styles to fetch.
     */
    orderBy?: StyleOrderByWithRelationInput | StyleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StyleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Styles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Styles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Styles
    **/
    _count?: true | StyleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StyleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StyleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StyleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StyleMaxAggregateInputType
  }

  export type GetStyleAggregateType<T extends StyleAggregateArgs> = {
        [P in keyof T & keyof AggregateStyle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStyle[P]>
      : GetScalarType<T[P], AggregateStyle[P]>
  }




  export type StyleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StyleWhereInput
    orderBy?: StyleOrderByWithAggregationInput | StyleOrderByWithAggregationInput[]
    by: StyleScalarFieldEnum[] | StyleScalarFieldEnum
    having?: StyleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StyleCountAggregateInputType | true
    _avg?: StyleAvgAggregateInputType
    _sum?: StyleSumAggregateInputType
    _min?: StyleMinAggregateInputType
    _max?: StyleMaxAggregateInputType
  }

  export type StyleGroupByOutputType = {
    id: number
    userId: string | null
    name: string
    slug: string
    category: $Enums.StyleCategory
    subcategoryId: number
    identifier: string
    overall: string | null
    aroma: string | null
    appearance: string | null
    flavor: string | null
    mouthfeel: string | null
    comments: string | null
    history: string | null
    ingredients: string | null
    comparison: string | null
    examples: string | null
    ibuLow: number | null
    ibuHigh: number | null
    ibuFlex: boolean
    ogLow: number | null
    ogHigh: number | null
    ogFlex: boolean
    fgLow: number | null
    fgHigh: number | null
    fgFlex: boolean
    srmLow: number | null
    srmHigh: number | null
    srmFlex: boolean
    abvLow: number | null
    abvHigh: number | null
    abvFlex: boolean
    _count: StyleCountAggregateOutputType | null
    _avg: StyleAvgAggregateOutputType | null
    _sum: StyleSumAggregateOutputType | null
    _min: StyleMinAggregateOutputType | null
    _max: StyleMaxAggregateOutputType | null
  }

  type GetStyleGroupByPayload<T extends StyleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StyleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StyleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StyleGroupByOutputType[P]>
            : GetScalarType<T[P], StyleGroupByOutputType[P]>
        }
      >
    >


  export type StyleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    slug?: boolean
    category?: boolean
    subcategoryId?: boolean
    identifier?: boolean
    overall?: boolean
    aroma?: boolean
    appearance?: boolean
    flavor?: boolean
    mouthfeel?: boolean
    comments?: boolean
    history?: boolean
    ingredients?: boolean
    comparison?: boolean
    examples?: boolean
    ibuLow?: boolean
    ibuHigh?: boolean
    ibuFlex?: boolean
    ogLow?: boolean
    ogHigh?: boolean
    ogFlex?: boolean
    fgLow?: boolean
    fgHigh?: boolean
    fgFlex?: boolean
    srmLow?: boolean
    srmHigh?: boolean
    srmFlex?: boolean
    abvLow?: boolean
    abvHigh?: boolean
    abvFlex?: boolean
  }, ExtArgs["result"]["style"]>

  export type StyleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    slug?: boolean
    category?: boolean
    subcategoryId?: boolean
    identifier?: boolean
    overall?: boolean
    aroma?: boolean
    appearance?: boolean
    flavor?: boolean
    mouthfeel?: boolean
    comments?: boolean
    history?: boolean
    ingredients?: boolean
    comparison?: boolean
    examples?: boolean
    ibuLow?: boolean
    ibuHigh?: boolean
    ibuFlex?: boolean
    ogLow?: boolean
    ogHigh?: boolean
    ogFlex?: boolean
    fgLow?: boolean
    fgHigh?: boolean
    fgFlex?: boolean
    srmLow?: boolean
    srmHigh?: boolean
    srmFlex?: boolean
    abvLow?: boolean
    abvHigh?: boolean
    abvFlex?: boolean
  }, ExtArgs["result"]["style"]>

  export type StyleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    slug?: boolean
    category?: boolean
    subcategoryId?: boolean
    identifier?: boolean
    overall?: boolean
    aroma?: boolean
    appearance?: boolean
    flavor?: boolean
    mouthfeel?: boolean
    comments?: boolean
    history?: boolean
    ingredients?: boolean
    comparison?: boolean
    examples?: boolean
    ibuLow?: boolean
    ibuHigh?: boolean
    ibuFlex?: boolean
    ogLow?: boolean
    ogHigh?: boolean
    ogFlex?: boolean
    fgLow?: boolean
    fgHigh?: boolean
    fgFlex?: boolean
    srmLow?: boolean
    srmHigh?: boolean
    srmFlex?: boolean
    abvLow?: boolean
    abvHigh?: boolean
    abvFlex?: boolean
  }, ExtArgs["result"]["style"]>

  export type StyleSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    slug?: boolean
    category?: boolean
    subcategoryId?: boolean
    identifier?: boolean
    overall?: boolean
    aroma?: boolean
    appearance?: boolean
    flavor?: boolean
    mouthfeel?: boolean
    comments?: boolean
    history?: boolean
    ingredients?: boolean
    comparison?: boolean
    examples?: boolean
    ibuLow?: boolean
    ibuHigh?: boolean
    ibuFlex?: boolean
    ogLow?: boolean
    ogHigh?: boolean
    ogFlex?: boolean
    fgLow?: boolean
    fgHigh?: boolean
    fgFlex?: boolean
    srmLow?: boolean
    srmHigh?: boolean
    srmFlex?: boolean
    abvLow?: boolean
    abvHigh?: boolean
    abvFlex?: boolean
  }

  export type StyleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "slug" | "category" | "subcategoryId" | "identifier" | "overall" | "aroma" | "appearance" | "flavor" | "mouthfeel" | "comments" | "history" | "ingredients" | "comparison" | "examples" | "ibuLow" | "ibuHigh" | "ibuFlex" | "ogLow" | "ogHigh" | "ogFlex" | "fgLow" | "fgHigh" | "fgFlex" | "srmLow" | "srmHigh" | "srmFlex" | "abvLow" | "abvHigh" | "abvFlex", ExtArgs["result"]["style"]>

  export type $StylePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Style"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string | null
      name: string
      slug: string
      category: $Enums.StyleCategory
      subcategoryId: number
      identifier: string
      overall: string | null
      aroma: string | null
      appearance: string | null
      flavor: string | null
      mouthfeel: string | null
      comments: string | null
      history: string | null
      ingredients: string | null
      comparison: string | null
      examples: string | null
      ibuLow: number | null
      ibuHigh: number | null
      ibuFlex: boolean
      ogLow: number | null
      ogHigh: number | null
      ogFlex: boolean
      fgLow: number | null
      fgHigh: number | null
      fgFlex: boolean
      srmLow: number | null
      srmHigh: number | null
      srmFlex: boolean
      abvLow: number | null
      abvHigh: number | null
      abvFlex: boolean
    }, ExtArgs["result"]["style"]>
    composites: {}
  }

  type StyleGetPayload<S extends boolean | null | undefined | StyleDefaultArgs> = $Result.GetResult<Prisma.$StylePayload, S>

  type StyleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StyleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StyleCountAggregateInputType | true
    }

  export interface StyleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Style'], meta: { name: 'Style' } }
    /**
     * Find zero or one Style that matches the filter.
     * @param {StyleFindUniqueArgs} args - Arguments to find a Style
     * @example
     * // Get one Style
     * const style = await prisma.style.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StyleFindUniqueArgs>(args: SelectSubset<T, StyleFindUniqueArgs<ExtArgs>>): Prisma__StyleClient<$Result.GetResult<Prisma.$StylePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Style that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StyleFindUniqueOrThrowArgs} args - Arguments to find a Style
     * @example
     * // Get one Style
     * const style = await prisma.style.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StyleFindUniqueOrThrowArgs>(args: SelectSubset<T, StyleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StyleClient<$Result.GetResult<Prisma.$StylePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Style that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StyleFindFirstArgs} args - Arguments to find a Style
     * @example
     * // Get one Style
     * const style = await prisma.style.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StyleFindFirstArgs>(args?: SelectSubset<T, StyleFindFirstArgs<ExtArgs>>): Prisma__StyleClient<$Result.GetResult<Prisma.$StylePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Style that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StyleFindFirstOrThrowArgs} args - Arguments to find a Style
     * @example
     * // Get one Style
     * const style = await prisma.style.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StyleFindFirstOrThrowArgs>(args?: SelectSubset<T, StyleFindFirstOrThrowArgs<ExtArgs>>): Prisma__StyleClient<$Result.GetResult<Prisma.$StylePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Styles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StyleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Styles
     * const styles = await prisma.style.findMany()
     * 
     * // Get first 10 Styles
     * const styles = await prisma.style.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const styleWithIdOnly = await prisma.style.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StyleFindManyArgs>(args?: SelectSubset<T, StyleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StylePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Style.
     * @param {StyleCreateArgs} args - Arguments to create a Style.
     * @example
     * // Create one Style
     * const Style = await prisma.style.create({
     *   data: {
     *     // ... data to create a Style
     *   }
     * })
     * 
     */
    create<T extends StyleCreateArgs>(args: SelectSubset<T, StyleCreateArgs<ExtArgs>>): Prisma__StyleClient<$Result.GetResult<Prisma.$StylePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Styles.
     * @param {StyleCreateManyArgs} args - Arguments to create many Styles.
     * @example
     * // Create many Styles
     * const style = await prisma.style.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StyleCreateManyArgs>(args?: SelectSubset<T, StyleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Styles and returns the data saved in the database.
     * @param {StyleCreateManyAndReturnArgs} args - Arguments to create many Styles.
     * @example
     * // Create many Styles
     * const style = await prisma.style.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Styles and only return the `id`
     * const styleWithIdOnly = await prisma.style.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StyleCreateManyAndReturnArgs>(args?: SelectSubset<T, StyleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StylePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Style.
     * @param {StyleDeleteArgs} args - Arguments to delete one Style.
     * @example
     * // Delete one Style
     * const Style = await prisma.style.delete({
     *   where: {
     *     // ... filter to delete one Style
     *   }
     * })
     * 
     */
    delete<T extends StyleDeleteArgs>(args: SelectSubset<T, StyleDeleteArgs<ExtArgs>>): Prisma__StyleClient<$Result.GetResult<Prisma.$StylePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Style.
     * @param {StyleUpdateArgs} args - Arguments to update one Style.
     * @example
     * // Update one Style
     * const style = await prisma.style.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StyleUpdateArgs>(args: SelectSubset<T, StyleUpdateArgs<ExtArgs>>): Prisma__StyleClient<$Result.GetResult<Prisma.$StylePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Styles.
     * @param {StyleDeleteManyArgs} args - Arguments to filter Styles to delete.
     * @example
     * // Delete a few Styles
     * const { count } = await prisma.style.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StyleDeleteManyArgs>(args?: SelectSubset<T, StyleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Styles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StyleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Styles
     * const style = await prisma.style.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StyleUpdateManyArgs>(args: SelectSubset<T, StyleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Styles and returns the data updated in the database.
     * @param {StyleUpdateManyAndReturnArgs} args - Arguments to update many Styles.
     * @example
     * // Update many Styles
     * const style = await prisma.style.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Styles and only return the `id`
     * const styleWithIdOnly = await prisma.style.updateManyAndReturn({
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
    updateManyAndReturn<T extends StyleUpdateManyAndReturnArgs>(args: SelectSubset<T, StyleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StylePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Style.
     * @param {StyleUpsertArgs} args - Arguments to update or create a Style.
     * @example
     * // Update or create a Style
     * const style = await prisma.style.upsert({
     *   create: {
     *     // ... data to create a Style
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Style we want to update
     *   }
     * })
     */
    upsert<T extends StyleUpsertArgs>(args: SelectSubset<T, StyleUpsertArgs<ExtArgs>>): Prisma__StyleClient<$Result.GetResult<Prisma.$StylePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Styles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StyleCountArgs} args - Arguments to filter Styles to count.
     * @example
     * // Count the number of Styles
     * const count = await prisma.style.count({
     *   where: {
     *     // ... the filter for the Styles we want to count
     *   }
     * })
    **/
    count<T extends StyleCountArgs>(
      args?: Subset<T, StyleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StyleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Style.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StyleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StyleAggregateArgs>(args: Subset<T, StyleAggregateArgs>): Prisma.PrismaPromise<GetStyleAggregateType<T>>

    /**
     * Group by Style.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StyleGroupByArgs} args - Group by arguments.
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
      T extends StyleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StyleGroupByArgs['orderBy'] }
        : { orderBy?: StyleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StyleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStyleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Style model
   */
  readonly fields: StyleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Style.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StyleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Style model
   */
  interface StyleFieldRefs {
    readonly id: FieldRef<"Style", 'Int'>
    readonly userId: FieldRef<"Style", 'String'>
    readonly name: FieldRef<"Style", 'String'>
    readonly slug: FieldRef<"Style", 'String'>
    readonly category: FieldRef<"Style", 'StyleCategory'>
    readonly subcategoryId: FieldRef<"Style", 'Int'>
    readonly identifier: FieldRef<"Style", 'String'>
    readonly overall: FieldRef<"Style", 'String'>
    readonly aroma: FieldRef<"Style", 'String'>
    readonly appearance: FieldRef<"Style", 'String'>
    readonly flavor: FieldRef<"Style", 'String'>
    readonly mouthfeel: FieldRef<"Style", 'String'>
    readonly comments: FieldRef<"Style", 'String'>
    readonly history: FieldRef<"Style", 'String'>
    readonly ingredients: FieldRef<"Style", 'String'>
    readonly comparison: FieldRef<"Style", 'String'>
    readonly examples: FieldRef<"Style", 'String'>
    readonly ibuLow: FieldRef<"Style", 'Float'>
    readonly ibuHigh: FieldRef<"Style", 'Float'>
    readonly ibuFlex: FieldRef<"Style", 'Boolean'>
    readonly ogLow: FieldRef<"Style", 'Float'>
    readonly ogHigh: FieldRef<"Style", 'Float'>
    readonly ogFlex: FieldRef<"Style", 'Boolean'>
    readonly fgLow: FieldRef<"Style", 'Float'>
    readonly fgHigh: FieldRef<"Style", 'Float'>
    readonly fgFlex: FieldRef<"Style", 'Boolean'>
    readonly srmLow: FieldRef<"Style", 'Float'>
    readonly srmHigh: FieldRef<"Style", 'Float'>
    readonly srmFlex: FieldRef<"Style", 'Boolean'>
    readonly abvLow: FieldRef<"Style", 'Float'>
    readonly abvHigh: FieldRef<"Style", 'Float'>
    readonly abvFlex: FieldRef<"Style", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Style findUnique
   */
  export type StyleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Style
     */
    select?: StyleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Style
     */
    omit?: StyleOmit<ExtArgs> | null
    /**
     * Filter, which Style to fetch.
     */
    where: StyleWhereUniqueInput
  }

  /**
   * Style findUniqueOrThrow
   */
  export type StyleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Style
     */
    select?: StyleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Style
     */
    omit?: StyleOmit<ExtArgs> | null
    /**
     * Filter, which Style to fetch.
     */
    where: StyleWhereUniqueInput
  }

  /**
   * Style findFirst
   */
  export type StyleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Style
     */
    select?: StyleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Style
     */
    omit?: StyleOmit<ExtArgs> | null
    /**
     * Filter, which Style to fetch.
     */
    where?: StyleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Styles to fetch.
     */
    orderBy?: StyleOrderByWithRelationInput | StyleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Styles.
     */
    cursor?: StyleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Styles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Styles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Styles.
     */
    distinct?: StyleScalarFieldEnum | StyleScalarFieldEnum[]
  }

  /**
   * Style findFirstOrThrow
   */
  export type StyleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Style
     */
    select?: StyleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Style
     */
    omit?: StyleOmit<ExtArgs> | null
    /**
     * Filter, which Style to fetch.
     */
    where?: StyleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Styles to fetch.
     */
    orderBy?: StyleOrderByWithRelationInput | StyleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Styles.
     */
    cursor?: StyleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Styles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Styles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Styles.
     */
    distinct?: StyleScalarFieldEnum | StyleScalarFieldEnum[]
  }

  /**
   * Style findMany
   */
  export type StyleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Style
     */
    select?: StyleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Style
     */
    omit?: StyleOmit<ExtArgs> | null
    /**
     * Filter, which Styles to fetch.
     */
    where?: StyleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Styles to fetch.
     */
    orderBy?: StyleOrderByWithRelationInput | StyleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Styles.
     */
    cursor?: StyleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Styles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Styles.
     */
    skip?: number
    distinct?: StyleScalarFieldEnum | StyleScalarFieldEnum[]
  }

  /**
   * Style create
   */
  export type StyleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Style
     */
    select?: StyleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Style
     */
    omit?: StyleOmit<ExtArgs> | null
    /**
     * The data needed to create a Style.
     */
    data: XOR<StyleCreateInput, StyleUncheckedCreateInput>
  }

  /**
   * Style createMany
   */
  export type StyleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Styles.
     */
    data: StyleCreateManyInput | StyleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Style createManyAndReturn
   */
  export type StyleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Style
     */
    select?: StyleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Style
     */
    omit?: StyleOmit<ExtArgs> | null
    /**
     * The data used to create many Styles.
     */
    data: StyleCreateManyInput | StyleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Style update
   */
  export type StyleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Style
     */
    select?: StyleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Style
     */
    omit?: StyleOmit<ExtArgs> | null
    /**
     * The data needed to update a Style.
     */
    data: XOR<StyleUpdateInput, StyleUncheckedUpdateInput>
    /**
     * Choose, which Style to update.
     */
    where: StyleWhereUniqueInput
  }

  /**
   * Style updateMany
   */
  export type StyleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Styles.
     */
    data: XOR<StyleUpdateManyMutationInput, StyleUncheckedUpdateManyInput>
    /**
     * Filter which Styles to update
     */
    where?: StyleWhereInput
    /**
     * Limit how many Styles to update.
     */
    limit?: number
  }

  /**
   * Style updateManyAndReturn
   */
  export type StyleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Style
     */
    select?: StyleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Style
     */
    omit?: StyleOmit<ExtArgs> | null
    /**
     * The data used to update Styles.
     */
    data: XOR<StyleUpdateManyMutationInput, StyleUncheckedUpdateManyInput>
    /**
     * Filter which Styles to update
     */
    where?: StyleWhereInput
    /**
     * Limit how many Styles to update.
     */
    limit?: number
  }

  /**
   * Style upsert
   */
  export type StyleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Style
     */
    select?: StyleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Style
     */
    omit?: StyleOmit<ExtArgs> | null
    /**
     * The filter to search for the Style to update in case it exists.
     */
    where: StyleWhereUniqueInput
    /**
     * In case the Style found by the `where` argument doesn't exist, create a new Style with this data.
     */
    create: XOR<StyleCreateInput, StyleUncheckedCreateInput>
    /**
     * In case the Style was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StyleUpdateInput, StyleUncheckedUpdateInput>
  }

  /**
   * Style delete
   */
  export type StyleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Style
     */
    select?: StyleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Style
     */
    omit?: StyleOmit<ExtArgs> | null
    /**
     * Filter which Style to delete.
     */
    where: StyleWhereUniqueInput
  }

  /**
   * Style deleteMany
   */
  export type StyleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Styles to delete
     */
    where?: StyleWhereInput
    /**
     * Limit how many Styles to delete.
     */
    limit?: number
  }

  /**
   * Style without action
   */
  export type StyleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Style
     */
    select?: StyleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Style
     */
    omit?: StyleOmit<ExtArgs> | null
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


  export const StyleScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    slug: 'slug',
    category: 'category',
    subcategoryId: 'subcategoryId',
    identifier: 'identifier',
    overall: 'overall',
    aroma: 'aroma',
    appearance: 'appearance',
    flavor: 'flavor',
    mouthfeel: 'mouthfeel',
    comments: 'comments',
    history: 'history',
    ingredients: 'ingredients',
    comparison: 'comparison',
    examples: 'examples',
    ibuLow: 'ibuLow',
    ibuHigh: 'ibuHigh',
    ibuFlex: 'ibuFlex',
    ogLow: 'ogLow',
    ogHigh: 'ogHigh',
    ogFlex: 'ogFlex',
    fgLow: 'fgLow',
    fgHigh: 'fgHigh',
    fgFlex: 'fgFlex',
    srmLow: 'srmLow',
    srmHigh: 'srmHigh',
    srmFlex: 'srmFlex',
    abvLow: 'abvLow',
    abvHigh: 'abvHigh',
    abvFlex: 'abvFlex'
  };

  export type StyleScalarFieldEnum = (typeof StyleScalarFieldEnum)[keyof typeof StyleScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'StyleCategory'
   */
  export type EnumStyleCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StyleCategory'>
    


  /**
   * Reference to a field of type 'StyleCategory[]'
   */
  export type ListEnumStyleCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StyleCategory[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type StyleWhereInput = {
    AND?: StyleWhereInput | StyleWhereInput[]
    OR?: StyleWhereInput[]
    NOT?: StyleWhereInput | StyleWhereInput[]
    id?: IntFilter<"Style"> | number
    userId?: StringNullableFilter<"Style"> | string | null
    name?: StringFilter<"Style"> | string
    slug?: StringFilter<"Style"> | string
    category?: EnumStyleCategoryFilter<"Style"> | $Enums.StyleCategory
    subcategoryId?: IntFilter<"Style"> | number
    identifier?: StringFilter<"Style"> | string
    overall?: StringNullableFilter<"Style"> | string | null
    aroma?: StringNullableFilter<"Style"> | string | null
    appearance?: StringNullableFilter<"Style"> | string | null
    flavor?: StringNullableFilter<"Style"> | string | null
    mouthfeel?: StringNullableFilter<"Style"> | string | null
    comments?: StringNullableFilter<"Style"> | string | null
    history?: StringNullableFilter<"Style"> | string | null
    ingredients?: StringNullableFilter<"Style"> | string | null
    comparison?: StringNullableFilter<"Style"> | string | null
    examples?: StringNullableFilter<"Style"> | string | null
    ibuLow?: FloatNullableFilter<"Style"> | number | null
    ibuHigh?: FloatNullableFilter<"Style"> | number | null
    ibuFlex?: BoolFilter<"Style"> | boolean
    ogLow?: FloatNullableFilter<"Style"> | number | null
    ogHigh?: FloatNullableFilter<"Style"> | number | null
    ogFlex?: BoolFilter<"Style"> | boolean
    fgLow?: FloatNullableFilter<"Style"> | number | null
    fgHigh?: FloatNullableFilter<"Style"> | number | null
    fgFlex?: BoolFilter<"Style"> | boolean
    srmLow?: FloatNullableFilter<"Style"> | number | null
    srmHigh?: FloatNullableFilter<"Style"> | number | null
    srmFlex?: BoolFilter<"Style"> | boolean
    abvLow?: FloatNullableFilter<"Style"> | number | null
    abvHigh?: FloatNullableFilter<"Style"> | number | null
    abvFlex?: BoolFilter<"Style"> | boolean
  }

  export type StyleOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    name?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    subcategoryId?: SortOrder
    identifier?: SortOrder
    overall?: SortOrderInput | SortOrder
    aroma?: SortOrderInput | SortOrder
    appearance?: SortOrderInput | SortOrder
    flavor?: SortOrderInput | SortOrder
    mouthfeel?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    history?: SortOrderInput | SortOrder
    ingredients?: SortOrderInput | SortOrder
    comparison?: SortOrderInput | SortOrder
    examples?: SortOrderInput | SortOrder
    ibuLow?: SortOrderInput | SortOrder
    ibuHigh?: SortOrderInput | SortOrder
    ibuFlex?: SortOrder
    ogLow?: SortOrderInput | SortOrder
    ogHigh?: SortOrderInput | SortOrder
    ogFlex?: SortOrder
    fgLow?: SortOrderInput | SortOrder
    fgHigh?: SortOrderInput | SortOrder
    fgFlex?: SortOrder
    srmLow?: SortOrderInput | SortOrder
    srmHigh?: SortOrderInput | SortOrder
    srmFlex?: SortOrder
    abvLow?: SortOrderInput | SortOrder
    abvHigh?: SortOrderInput | SortOrder
    abvFlex?: SortOrder
  }

  export type StyleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    identifier?: string
    AND?: StyleWhereInput | StyleWhereInput[]
    OR?: StyleWhereInput[]
    NOT?: StyleWhereInput | StyleWhereInput[]
    userId?: StringNullableFilter<"Style"> | string | null
    name?: StringFilter<"Style"> | string
    category?: EnumStyleCategoryFilter<"Style"> | $Enums.StyleCategory
    subcategoryId?: IntFilter<"Style"> | number
    overall?: StringNullableFilter<"Style"> | string | null
    aroma?: StringNullableFilter<"Style"> | string | null
    appearance?: StringNullableFilter<"Style"> | string | null
    flavor?: StringNullableFilter<"Style"> | string | null
    mouthfeel?: StringNullableFilter<"Style"> | string | null
    comments?: StringNullableFilter<"Style"> | string | null
    history?: StringNullableFilter<"Style"> | string | null
    ingredients?: StringNullableFilter<"Style"> | string | null
    comparison?: StringNullableFilter<"Style"> | string | null
    examples?: StringNullableFilter<"Style"> | string | null
    ibuLow?: FloatNullableFilter<"Style"> | number | null
    ibuHigh?: FloatNullableFilter<"Style"> | number | null
    ibuFlex?: BoolFilter<"Style"> | boolean
    ogLow?: FloatNullableFilter<"Style"> | number | null
    ogHigh?: FloatNullableFilter<"Style"> | number | null
    ogFlex?: BoolFilter<"Style"> | boolean
    fgLow?: FloatNullableFilter<"Style"> | number | null
    fgHigh?: FloatNullableFilter<"Style"> | number | null
    fgFlex?: BoolFilter<"Style"> | boolean
    srmLow?: FloatNullableFilter<"Style"> | number | null
    srmHigh?: FloatNullableFilter<"Style"> | number | null
    srmFlex?: BoolFilter<"Style"> | boolean
    abvLow?: FloatNullableFilter<"Style"> | number | null
    abvHigh?: FloatNullableFilter<"Style"> | number | null
    abvFlex?: BoolFilter<"Style"> | boolean
  }, "id" | "slug" | "identifier">

  export type StyleOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    name?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    subcategoryId?: SortOrder
    identifier?: SortOrder
    overall?: SortOrderInput | SortOrder
    aroma?: SortOrderInput | SortOrder
    appearance?: SortOrderInput | SortOrder
    flavor?: SortOrderInput | SortOrder
    mouthfeel?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    history?: SortOrderInput | SortOrder
    ingredients?: SortOrderInput | SortOrder
    comparison?: SortOrderInput | SortOrder
    examples?: SortOrderInput | SortOrder
    ibuLow?: SortOrderInput | SortOrder
    ibuHigh?: SortOrderInput | SortOrder
    ibuFlex?: SortOrder
    ogLow?: SortOrderInput | SortOrder
    ogHigh?: SortOrderInput | SortOrder
    ogFlex?: SortOrder
    fgLow?: SortOrderInput | SortOrder
    fgHigh?: SortOrderInput | SortOrder
    fgFlex?: SortOrder
    srmLow?: SortOrderInput | SortOrder
    srmHigh?: SortOrderInput | SortOrder
    srmFlex?: SortOrder
    abvLow?: SortOrderInput | SortOrder
    abvHigh?: SortOrderInput | SortOrder
    abvFlex?: SortOrder
    _count?: StyleCountOrderByAggregateInput
    _avg?: StyleAvgOrderByAggregateInput
    _max?: StyleMaxOrderByAggregateInput
    _min?: StyleMinOrderByAggregateInput
    _sum?: StyleSumOrderByAggregateInput
  }

  export type StyleScalarWhereWithAggregatesInput = {
    AND?: StyleScalarWhereWithAggregatesInput | StyleScalarWhereWithAggregatesInput[]
    OR?: StyleScalarWhereWithAggregatesInput[]
    NOT?: StyleScalarWhereWithAggregatesInput | StyleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Style"> | number
    userId?: StringNullableWithAggregatesFilter<"Style"> | string | null
    name?: StringWithAggregatesFilter<"Style"> | string
    slug?: StringWithAggregatesFilter<"Style"> | string
    category?: EnumStyleCategoryWithAggregatesFilter<"Style"> | $Enums.StyleCategory
    subcategoryId?: IntWithAggregatesFilter<"Style"> | number
    identifier?: StringWithAggregatesFilter<"Style"> | string
    overall?: StringNullableWithAggregatesFilter<"Style"> | string | null
    aroma?: StringNullableWithAggregatesFilter<"Style"> | string | null
    appearance?: StringNullableWithAggregatesFilter<"Style"> | string | null
    flavor?: StringNullableWithAggregatesFilter<"Style"> | string | null
    mouthfeel?: StringNullableWithAggregatesFilter<"Style"> | string | null
    comments?: StringNullableWithAggregatesFilter<"Style"> | string | null
    history?: StringNullableWithAggregatesFilter<"Style"> | string | null
    ingredients?: StringNullableWithAggregatesFilter<"Style"> | string | null
    comparison?: StringNullableWithAggregatesFilter<"Style"> | string | null
    examples?: StringNullableWithAggregatesFilter<"Style"> | string | null
    ibuLow?: FloatNullableWithAggregatesFilter<"Style"> | number | null
    ibuHigh?: FloatNullableWithAggregatesFilter<"Style"> | number | null
    ibuFlex?: BoolWithAggregatesFilter<"Style"> | boolean
    ogLow?: FloatNullableWithAggregatesFilter<"Style"> | number | null
    ogHigh?: FloatNullableWithAggregatesFilter<"Style"> | number | null
    ogFlex?: BoolWithAggregatesFilter<"Style"> | boolean
    fgLow?: FloatNullableWithAggregatesFilter<"Style"> | number | null
    fgHigh?: FloatNullableWithAggregatesFilter<"Style"> | number | null
    fgFlex?: BoolWithAggregatesFilter<"Style"> | boolean
    srmLow?: FloatNullableWithAggregatesFilter<"Style"> | number | null
    srmHigh?: FloatNullableWithAggregatesFilter<"Style"> | number | null
    srmFlex?: BoolWithAggregatesFilter<"Style"> | boolean
    abvLow?: FloatNullableWithAggregatesFilter<"Style"> | number | null
    abvHigh?: FloatNullableWithAggregatesFilter<"Style"> | number | null
    abvFlex?: BoolWithAggregatesFilter<"Style"> | boolean
  }

  export type StyleCreateInput = {
    userId?: string | null
    name: string
    slug: string
    category: $Enums.StyleCategory
    subcategoryId: number
    identifier: string
    overall?: string | null
    aroma?: string | null
    appearance?: string | null
    flavor?: string | null
    mouthfeel?: string | null
    comments?: string | null
    history?: string | null
    ingredients?: string | null
    comparison?: string | null
    examples?: string | null
    ibuLow?: number | null
    ibuHigh?: number | null
    ibuFlex?: boolean
    ogLow?: number | null
    ogHigh?: number | null
    ogFlex?: boolean
    fgLow?: number | null
    fgHigh?: number | null
    fgFlex?: boolean
    srmLow?: number | null
    srmHigh?: number | null
    srmFlex?: boolean
    abvLow?: number | null
    abvHigh?: number | null
    abvFlex?: boolean
  }

  export type StyleUncheckedCreateInput = {
    id?: number
    userId?: string | null
    name: string
    slug: string
    category: $Enums.StyleCategory
    subcategoryId: number
    identifier: string
    overall?: string | null
    aroma?: string | null
    appearance?: string | null
    flavor?: string | null
    mouthfeel?: string | null
    comments?: string | null
    history?: string | null
    ingredients?: string | null
    comparison?: string | null
    examples?: string | null
    ibuLow?: number | null
    ibuHigh?: number | null
    ibuFlex?: boolean
    ogLow?: number | null
    ogHigh?: number | null
    ogFlex?: boolean
    fgLow?: number | null
    fgHigh?: number | null
    fgFlex?: boolean
    srmLow?: number | null
    srmHigh?: number | null
    srmFlex?: boolean
    abvLow?: number | null
    abvHigh?: number | null
    abvFlex?: boolean
  }

  export type StyleUpdateInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: EnumStyleCategoryFieldUpdateOperationsInput | $Enums.StyleCategory
    subcategoryId?: IntFieldUpdateOperationsInput | number
    identifier?: StringFieldUpdateOperationsInput | string
    overall?: NullableStringFieldUpdateOperationsInput | string | null
    aroma?: NullableStringFieldUpdateOperationsInput | string | null
    appearance?: NullableStringFieldUpdateOperationsInput | string | null
    flavor?: NullableStringFieldUpdateOperationsInput | string | null
    mouthfeel?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: NullableStringFieldUpdateOperationsInput | string | null
    comparison?: NullableStringFieldUpdateOperationsInput | string | null
    examples?: NullableStringFieldUpdateOperationsInput | string | null
    ibuLow?: NullableFloatFieldUpdateOperationsInput | number | null
    ibuHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    ibuFlex?: BoolFieldUpdateOperationsInput | boolean
    ogLow?: NullableFloatFieldUpdateOperationsInput | number | null
    ogHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    ogFlex?: BoolFieldUpdateOperationsInput | boolean
    fgLow?: NullableFloatFieldUpdateOperationsInput | number | null
    fgHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    fgFlex?: BoolFieldUpdateOperationsInput | boolean
    srmLow?: NullableFloatFieldUpdateOperationsInput | number | null
    srmHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    srmFlex?: BoolFieldUpdateOperationsInput | boolean
    abvLow?: NullableFloatFieldUpdateOperationsInput | number | null
    abvHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    abvFlex?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StyleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: EnumStyleCategoryFieldUpdateOperationsInput | $Enums.StyleCategory
    subcategoryId?: IntFieldUpdateOperationsInput | number
    identifier?: StringFieldUpdateOperationsInput | string
    overall?: NullableStringFieldUpdateOperationsInput | string | null
    aroma?: NullableStringFieldUpdateOperationsInput | string | null
    appearance?: NullableStringFieldUpdateOperationsInput | string | null
    flavor?: NullableStringFieldUpdateOperationsInput | string | null
    mouthfeel?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: NullableStringFieldUpdateOperationsInput | string | null
    comparison?: NullableStringFieldUpdateOperationsInput | string | null
    examples?: NullableStringFieldUpdateOperationsInput | string | null
    ibuLow?: NullableFloatFieldUpdateOperationsInput | number | null
    ibuHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    ibuFlex?: BoolFieldUpdateOperationsInput | boolean
    ogLow?: NullableFloatFieldUpdateOperationsInput | number | null
    ogHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    ogFlex?: BoolFieldUpdateOperationsInput | boolean
    fgLow?: NullableFloatFieldUpdateOperationsInput | number | null
    fgHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    fgFlex?: BoolFieldUpdateOperationsInput | boolean
    srmLow?: NullableFloatFieldUpdateOperationsInput | number | null
    srmHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    srmFlex?: BoolFieldUpdateOperationsInput | boolean
    abvLow?: NullableFloatFieldUpdateOperationsInput | number | null
    abvHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    abvFlex?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StyleCreateManyInput = {
    id?: number
    userId?: string | null
    name: string
    slug: string
    category: $Enums.StyleCategory
    subcategoryId: number
    identifier: string
    overall?: string | null
    aroma?: string | null
    appearance?: string | null
    flavor?: string | null
    mouthfeel?: string | null
    comments?: string | null
    history?: string | null
    ingredients?: string | null
    comparison?: string | null
    examples?: string | null
    ibuLow?: number | null
    ibuHigh?: number | null
    ibuFlex?: boolean
    ogLow?: number | null
    ogHigh?: number | null
    ogFlex?: boolean
    fgLow?: number | null
    fgHigh?: number | null
    fgFlex?: boolean
    srmLow?: number | null
    srmHigh?: number | null
    srmFlex?: boolean
    abvLow?: number | null
    abvHigh?: number | null
    abvFlex?: boolean
  }

  export type StyleUpdateManyMutationInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: EnumStyleCategoryFieldUpdateOperationsInput | $Enums.StyleCategory
    subcategoryId?: IntFieldUpdateOperationsInput | number
    identifier?: StringFieldUpdateOperationsInput | string
    overall?: NullableStringFieldUpdateOperationsInput | string | null
    aroma?: NullableStringFieldUpdateOperationsInput | string | null
    appearance?: NullableStringFieldUpdateOperationsInput | string | null
    flavor?: NullableStringFieldUpdateOperationsInput | string | null
    mouthfeel?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: NullableStringFieldUpdateOperationsInput | string | null
    comparison?: NullableStringFieldUpdateOperationsInput | string | null
    examples?: NullableStringFieldUpdateOperationsInput | string | null
    ibuLow?: NullableFloatFieldUpdateOperationsInput | number | null
    ibuHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    ibuFlex?: BoolFieldUpdateOperationsInput | boolean
    ogLow?: NullableFloatFieldUpdateOperationsInput | number | null
    ogHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    ogFlex?: BoolFieldUpdateOperationsInput | boolean
    fgLow?: NullableFloatFieldUpdateOperationsInput | number | null
    fgHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    fgFlex?: BoolFieldUpdateOperationsInput | boolean
    srmLow?: NullableFloatFieldUpdateOperationsInput | number | null
    srmHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    srmFlex?: BoolFieldUpdateOperationsInput | boolean
    abvLow?: NullableFloatFieldUpdateOperationsInput | number | null
    abvHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    abvFlex?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StyleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: EnumStyleCategoryFieldUpdateOperationsInput | $Enums.StyleCategory
    subcategoryId?: IntFieldUpdateOperationsInput | number
    identifier?: StringFieldUpdateOperationsInput | string
    overall?: NullableStringFieldUpdateOperationsInput | string | null
    aroma?: NullableStringFieldUpdateOperationsInput | string | null
    appearance?: NullableStringFieldUpdateOperationsInput | string | null
    flavor?: NullableStringFieldUpdateOperationsInput | string | null
    mouthfeel?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: NullableStringFieldUpdateOperationsInput | string | null
    comparison?: NullableStringFieldUpdateOperationsInput | string | null
    examples?: NullableStringFieldUpdateOperationsInput | string | null
    ibuLow?: NullableFloatFieldUpdateOperationsInput | number | null
    ibuHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    ibuFlex?: BoolFieldUpdateOperationsInput | boolean
    ogLow?: NullableFloatFieldUpdateOperationsInput | number | null
    ogHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    ogFlex?: BoolFieldUpdateOperationsInput | boolean
    fgLow?: NullableFloatFieldUpdateOperationsInput | number | null
    fgHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    fgFlex?: BoolFieldUpdateOperationsInput | boolean
    srmLow?: NullableFloatFieldUpdateOperationsInput | number | null
    srmHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    srmFlex?: BoolFieldUpdateOperationsInput | boolean
    abvLow?: NullableFloatFieldUpdateOperationsInput | number | null
    abvHigh?: NullableFloatFieldUpdateOperationsInput | number | null
    abvFlex?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
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

  export type EnumStyleCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.StyleCategory | EnumStyleCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.StyleCategory[] | ListEnumStyleCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.StyleCategory[] | ListEnumStyleCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumStyleCategoryFilter<$PrismaModel> | $Enums.StyleCategory
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StyleCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    subcategoryId?: SortOrder
    identifier?: SortOrder
    overall?: SortOrder
    aroma?: SortOrder
    appearance?: SortOrder
    flavor?: SortOrder
    mouthfeel?: SortOrder
    comments?: SortOrder
    history?: SortOrder
    ingredients?: SortOrder
    comparison?: SortOrder
    examples?: SortOrder
    ibuLow?: SortOrder
    ibuHigh?: SortOrder
    ibuFlex?: SortOrder
    ogLow?: SortOrder
    ogHigh?: SortOrder
    ogFlex?: SortOrder
    fgLow?: SortOrder
    fgHigh?: SortOrder
    fgFlex?: SortOrder
    srmLow?: SortOrder
    srmHigh?: SortOrder
    srmFlex?: SortOrder
    abvLow?: SortOrder
    abvHigh?: SortOrder
    abvFlex?: SortOrder
  }

  export type StyleAvgOrderByAggregateInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    ibuLow?: SortOrder
    ibuHigh?: SortOrder
    ogLow?: SortOrder
    ogHigh?: SortOrder
    fgLow?: SortOrder
    fgHigh?: SortOrder
    srmLow?: SortOrder
    srmHigh?: SortOrder
    abvLow?: SortOrder
    abvHigh?: SortOrder
  }

  export type StyleMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    subcategoryId?: SortOrder
    identifier?: SortOrder
    overall?: SortOrder
    aroma?: SortOrder
    appearance?: SortOrder
    flavor?: SortOrder
    mouthfeel?: SortOrder
    comments?: SortOrder
    history?: SortOrder
    ingredients?: SortOrder
    comparison?: SortOrder
    examples?: SortOrder
    ibuLow?: SortOrder
    ibuHigh?: SortOrder
    ibuFlex?: SortOrder
    ogLow?: SortOrder
    ogHigh?: SortOrder
    ogFlex?: SortOrder
    fgLow?: SortOrder
    fgHigh?: SortOrder
    fgFlex?: SortOrder
    srmLow?: SortOrder
    srmHigh?: SortOrder
    srmFlex?: SortOrder
    abvLow?: SortOrder
    abvHigh?: SortOrder
    abvFlex?: SortOrder
  }

  export type StyleMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    subcategoryId?: SortOrder
    identifier?: SortOrder
    overall?: SortOrder
    aroma?: SortOrder
    appearance?: SortOrder
    flavor?: SortOrder
    mouthfeel?: SortOrder
    comments?: SortOrder
    history?: SortOrder
    ingredients?: SortOrder
    comparison?: SortOrder
    examples?: SortOrder
    ibuLow?: SortOrder
    ibuHigh?: SortOrder
    ibuFlex?: SortOrder
    ogLow?: SortOrder
    ogHigh?: SortOrder
    ogFlex?: SortOrder
    fgLow?: SortOrder
    fgHigh?: SortOrder
    fgFlex?: SortOrder
    srmLow?: SortOrder
    srmHigh?: SortOrder
    srmFlex?: SortOrder
    abvLow?: SortOrder
    abvHigh?: SortOrder
    abvFlex?: SortOrder
  }

  export type StyleSumOrderByAggregateInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    ibuLow?: SortOrder
    ibuHigh?: SortOrder
    ogLow?: SortOrder
    ogHigh?: SortOrder
    fgLow?: SortOrder
    fgHigh?: SortOrder
    srmLow?: SortOrder
    srmHigh?: SortOrder
    abvLow?: SortOrder
    abvHigh?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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

  export type EnumStyleCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StyleCategory | EnumStyleCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.StyleCategory[] | ListEnumStyleCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.StyleCategory[] | ListEnumStyleCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumStyleCategoryWithAggregatesFilter<$PrismaModel> | $Enums.StyleCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStyleCategoryFilter<$PrismaModel>
    _max?: NestedEnumStyleCategoryFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumStyleCategoryFieldUpdateOperationsInput = {
    set?: $Enums.StyleCategory
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type NestedEnumStyleCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.StyleCategory | EnumStyleCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.StyleCategory[] | ListEnumStyleCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.StyleCategory[] | ListEnumStyleCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumStyleCategoryFilter<$PrismaModel> | $Enums.StyleCategory
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type NestedEnumStyleCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StyleCategory | EnumStyleCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.StyleCategory[] | ListEnumStyleCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.StyleCategory[] | ListEnumStyleCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumStyleCategoryWithAggregatesFilter<$PrismaModel> | $Enums.StyleCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStyleCategoryFilter<$PrismaModel>
    _max?: NestedEnumStyleCategoryFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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