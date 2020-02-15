import { GraphQLResolveInfo } from "graphql";

export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Artwork = {
  __typename?: "Artwork";
  id: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
  type: ArtworkType;
  source: Scalars["String"];
  thumbnail?: Maybe<Scalars["String"]>;
  author: User;
};

export type ArtworkInput = {
  name: Scalars["String"];
  description: Scalars["String"];
  type: ArtworkType;
  source: Scalars["String"];
  thumbnail?: Maybe<Scalars["String"]>;
  authorId: Scalars["String"];
};

export enum ArtworkType {
  Vimeo = "VIMEO",
  Youtube = "YOUTUBE",
  Image = "IMAGE",
}

export type Mutation = {
  __typename?: "Mutation";
  createArtwork: Artwork;
  deleteArtwork: Artwork;
  register: User;
  signIn: User;
  updateArtwork: Artwork;
};

export type MutationCreateArtworkArgs = {
  input: ArtworkInput;
};

export type MutationDeleteArtworkArgs = {
  id: Scalars["ID"];
};

export type MutationRegisterArgs = {
  input: UserInput;
};

export type MutationSignInArgs = {
  input: SingInInput;
};

export type MutationUpdateArtworkArgs = {
  input: ArtworkInput;
};

export type Query = {
  __typename?: "Query";
  artwork?: Maybe<Artwork>;
  artworks: Array<Artwork>;
  artworksByArtist: Array<Artwork>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type QueryArtworkArgs = {
  id: Scalars["ID"];
};

export type QueryArtworksByArtistArgs = {
  id: Scalars["ID"];
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type SingInInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  artworks?: Maybe<Array<Artwork>>;
};

export type UserInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo,
) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Artwork: ResolverTypeWrapper<Artwork>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  ArtworkType: ArtworkType;
  User: ResolverTypeWrapper<User>;
  Mutation: ResolverTypeWrapper<{}>;
  ArtworkInput: ArtworkInput;
  UserInput: UserInput;
  SingInInput: SingInInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  ID: Scalars["ID"];
  Artwork: Artwork;
  String: Scalars["String"];
  ArtworkType: ArtworkType;
  User: User;
  Mutation: {};
  ArtworkInput: ArtworkInput;
  UserInput: UserInput;
  SingInInput: SingInInput;
  Boolean: Scalars["Boolean"];
}>;

export type ArtworkResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Artwork"] = ResolversParentTypes["Artwork"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["ArtworkType"], ParentType, ContextType>;
  source?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  thumbnail?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  author?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  createArtwork?: Resolver<
    ResolversTypes["Artwork"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateArtworkArgs, "input">
  >;
  deleteArtwork?: Resolver<
    ResolversTypes["Artwork"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteArtworkArgs, "id">
  >;
  register?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "input">
  >;
  signIn?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, "input">
  >;
  updateArtwork?: Resolver<
    ResolversTypes["Artwork"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateArtworkArgs, "input">
  >;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  artwork?: Resolver<
    Maybe<ResolversTypes["Artwork"]>,
    ParentType,
    ContextType,
    RequireFields<QueryArtworkArgs, "id">
  >;
  artworks?: Resolver<
    Array<ResolversTypes["Artwork"]>,
    ParentType,
    ContextType
  >;
  artworksByArtist?: Resolver<
    Array<ResolversTypes["Artwork"]>,
    ParentType,
    ContextType,
    RequireFields<QueryArtworksByArtistArgs, "id">
  >;
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  artworks?: Resolver<
    Maybe<Array<ResolversTypes["Artwork"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Artwork?: ArtworkResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
