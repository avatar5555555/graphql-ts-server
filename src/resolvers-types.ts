import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";

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
  Date: any;
};

export type Artist = {
  __typename?: "Artist";
  id: Scalars["ID"];
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  user: User;
  artworks?: Maybe<Array<Artwork>>;
};

export type ArtistInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  userID: Scalars["String"];
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

export type AuthResponse = {
  __typename?: "AuthResponse";
  user: User;
  token: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  confirmEmail?: Maybe<AuthResponse>;
  createArtwork: Artwork;
  deleteArtwork: Artwork;
  /** @deprecated Use signUp */
  register?: Maybe<AuthResponse>;
  sendCode?: Maybe<SignUpResponse>;
  signIn?: Maybe<AuthResponse>;
  signUp?: Maybe<SignUpResponse>;
  updateArtist: Artist;
  updateArtwork: Artwork;
};

export type MutationConfirmEmailArgs = {
  email: Scalars["String"];
  code: Scalars["String"];
};

export type MutationCreateArtworkArgs = {
  input: ArtworkInput;
};

export type MutationDeleteArtworkArgs = {
  id: Scalars["ID"];
};

export type MutationRegisterArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSendCodeArgs = {
  email: Scalars["String"];
};

export type MutationSignInArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSignUpArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdateArtistArgs = {
  input: ArtistInput;
};

export type MutationUpdateArtworkArgs = {
  input: ArtworkInput;
};

export type Query = {
  __typename?: "Query";
  artist?: Maybe<Artist>;
  artists: Array<Artist>;
  artwork?: Maybe<Artwork>;
  artworks: Array<Artwork>;
  artworksByArtist: Array<Artwork>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type QueryArtistArgs = {
  id: Scalars["ID"];
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

export type SignUpResponse = {
  __typename?: "SignUpResponse";
  user: User;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  createdAt: Scalars["Date"];
  emailVerified: Scalars["Boolean"];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

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
  Artist: ResolverTypeWrapper<Artist>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  User: ResolverTypeWrapper<User>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Artwork: ResolverTypeWrapper<Artwork>;
  ArtworkType: ArtworkType;
  Mutation: ResolverTypeWrapper<{}>;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  ArtworkInput: ArtworkInput;
  SignUpResponse: ResolverTypeWrapper<SignUpResponse>;
  ArtistInput: ArtistInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  ID: Scalars["ID"];
  Artist: Artist;
  String: Scalars["String"];
  User: User;
  Date: Scalars["Date"];
  Boolean: Scalars["Boolean"];
  Artwork: Artwork;
  ArtworkType: ArtworkType;
  Mutation: {};
  AuthResponse: AuthResponse;
  ArtworkInput: ArtworkInput;
  SignUpResponse: SignUpResponse;
  ArtistInput: ArtistInput;
}>;

export type ArtistResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Artist"] = ResolversParentTypes["Artist"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  artworks?: Resolver<
    Maybe<Array<ResolversTypes["Artwork"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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

export type AuthResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AuthResponse"] = ResolversParentTypes["AuthResponse"]
> = ResolversObject<{
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  confirmEmail?: Resolver<
    Maybe<ResolversTypes["AuthResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationConfirmEmailArgs, "email" | "code">
  >;
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
    Maybe<ResolversTypes["AuthResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "email" | "password">
  >;
  sendCode?: Resolver<
    Maybe<ResolversTypes["SignUpResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSendCodeArgs, "email">
  >;
  signIn?: Resolver<
    Maybe<ResolversTypes["AuthResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, "email" | "password">
  >;
  signUp?: Resolver<
    Maybe<ResolversTypes["SignUpResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, "email" | "password">
  >;
  updateArtist?: Resolver<
    ResolversTypes["Artist"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateArtistArgs, "input">
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
  artist?: Resolver<
    Maybe<ResolversTypes["Artist"]>,
    ParentType,
    ContextType,
    RequireFields<QueryArtistArgs, "id">
  >;
  artists?: Resolver<Array<ResolversTypes["Artist"]>, ParentType, ContextType>;
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

export type SignUpResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SignUpResponse"] = ResolversParentTypes["SignUpResponse"]
> = ResolversObject<{
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  emailVerified?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Artist?: ArtistResolvers<ContextType>;
  Artwork?: ArtworkResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignUpResponse?: SignUpResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
