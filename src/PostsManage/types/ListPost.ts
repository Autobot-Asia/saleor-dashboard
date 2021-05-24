export interface ListPosts{
    posts : ListPosts_posts | null;

}

export interface ListPosts_posts{
    edges : ListPosts_posts_edges[];
    pageInfo: ListPosts_posts_pageInfo;

}

export interface ListPosts_posts_edges{
    __typename: "PostCountableConnection  ";
  node: ListPosts_posts_edges_node;
}

export interface ListPosts_posts_edges_node {
    __typename: "Post";
    id: string;
    content: string;
    title: string,
    media: ListPosts_posts_edges_node_media;
}

export interface ListPosts_posts_edges_node_media{
    __typename: "PostMedia";
    id: string;
    image: string;
    alt: string;
}
export interface ListPosts_posts_pageInfo{
    __typename: "PageInfo";
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
}

export interface ListPostsVariables {
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
  }