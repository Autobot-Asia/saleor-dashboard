export interface PageCarouselFragment {
  __typename: "PageMedia";
  id: string;
  alt: string;
  sortOrder: number | null;
  url: string;
}

export interface PostMediaFragment {
  __typename: "PostMedia";
  id: string;
  alt: string;
  sortOrder: number | null;
  url: string;
  image?: any;
}

