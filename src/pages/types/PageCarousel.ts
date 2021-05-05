//@ts-ignore
import { PageErrorCode } from "@saleor/types/globalTypes";


export interface PageCarouselCreate_pageCarouselCreate_errors {
    __typename: "ProductError";
    code: PageErrorCode;
    field: string | null;
  }

export interface PageCarouselCreate_pageCarouselCreate {
  __typename: "PageMediaCreate"
  pageErrors: PageCarouselCreate_pageCarouselCreate_errors[];
  page: {
    id:string
    __typename:"Page"
  } | null;
}
export interface PageCarouselCreate {
    pageMediaCreate: PageCarouselCreate_pageCarouselCreate | null;
}

export interface PageCarouselVariables {
    image?: any | null;
    alt?: string | null;
    page:string,
}
export interface PageCarouselDelete_pageCarouselDelete_errors {
  __typename: "ProductError";
  code: PageErrorCode;
  field: string | null;
}

export interface PageCarouselDelete_pageCarouselDelete_page_carousel {
  __typename: "PageCarousel";
  id: string;
}

export interface PageCarouselDelete_pageCarouselDelete_product {
  __typename: "Product";
  id: string;
  media: PageCarouselDelete_pageCarouselDelete_page_carousel[] | null;
}
export interface PageCarouselDelete_pageCarouselDelete {
  __typename: "PageCarouselDelete";
  errors: PageCarouselDelete_pageCarouselDelete_errors[];
  product: PageCarouselDelete_pageCarouselDelete_product | null;
}
export interface PageCarouselDelete {
  pageCarouselDelete: PageCarouselDelete_pageCarouselDelete | null;
}

export interface PageCarouselDeleteVariables {
  mediaId: string;
  isActive:boolean;
  alt:string
}

export interface ListCarouselRes{
  pages: {
    edges:DataListCarouselEdges[]
  }
}
export interface DataListCarouselEdges{
  node:{
    id:string
    title:string
    content:string
    media:DataListCarouselMedia[]
  }
}

export interface DataListCarouselMedia{
  id:string
  alt:string
  image:string
  __typename:string
  sortOrder:number
}