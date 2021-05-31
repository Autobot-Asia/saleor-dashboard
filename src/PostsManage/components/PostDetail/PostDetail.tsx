import { loadPartialConfig } from "@babel/core";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Container from "@saleor/components/Container";
import ImageUpload from "@saleor/components/ImageUpload";
import MediaTile from "@saleor/components/MediaTile";
import PageHeader from "@saleor/components/PageHeader";
import { ProductMediaFragment } from "@saleor/fragments/types/ProductMediaFragment";
import { useAuth } from "@saleor/sdk";
import { makeStyles } from "@saleor/theme";
import { ReorderAction } from "@saleor/types";
import createMultiFileUploadHandler from "@saleor/utils/handlers/multiFileUploadHandler";
import classNames from "classnames";
import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
export enum ProductMediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO"
}
interface IProps {
  params: any;
}
// export interface ProductUpdatePageProps extends ListActions, ChannelProps {
//   placeholderImage: string;
//   media: ProductDetails_product_media[];
//   onImageDelete: (id: string) => () => void;
//   onImageEdit?(id: string);
//   onImageReorder?(event: { oldIndex: number; newIndex: number });
//   onImageUpload(file: File);
//   onMediaUrlUpload(mediaUrl: string);
// }
interface ProductMediaProps {
  placeholderImage?: string;
  media: ProductMediaFragment[];
  loading?: boolean;
  onImageDelete: (id: string) => () => void;
  onImageEdit: (id: string) => () => void;
  onImageReorder?: ReorderAction;
  onImageUpload(file: File);
  openMediaUrlModal();
}

const useStyles = makeStyles(
  theme => ({
    WrapperAll: {
      padding: "24px"
    },
    BtnPublish: {
      padding: "6px 16px",
      fontWeight: 500,
      color: "white",
      background: "#06847b",
      outline: "none",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "0.875rem",
      fontFamily: "Inter, roboto, sans-serif",
      lineHeight: "1.75"
    },
    BtnSelectMedia: {
      padding: "6px 16px",
      fontWeight: 500,
      color: "white",
      background: "#06847b",
      outline: "none",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "0.875rem",
      fontFamily: "Inter, roboto, sans-serif",
      lineHeight: "1.75"
    },
    Wrapper: {
      display: "flex",
      flex: 2
    },
    WrapperMedia: {
      // flex: 1
    },
    WrapperPublish: {
      // flex: 1,
      textAlign: "right"
    },
    TextArea: {
      margin: "0px",
      width: "100%",
      height: "20rem",
      outline: "none"
    },
    imageUpload: {
      height: "100%",
      left: 0,
      outline: 0,
      position: "absolute",
      top: 0,
      width: "100%"
    },
    imageUploadActive: {
      zIndex: 1
    },
    imageUploadIconActive: {
      display: "block"
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(2),
      gridTemplateColumns: "repeat(4, 1fr)",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(3, 1fr)"
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "repeat(2, 1fr)"
      }
    },
    rootDragActive: {
      opacity: 0.2
    }
  }),
  {
    name:
      "C:dashboardsaleor-dashboardsrccustomerscomponentsPostDetailPostDetail"
  }
);

interface SortableMediaProps {
  media: {
    id: string;
    alt?: string;
    url: string;
  };
  onEdit: (id: string) => void;
  onDelete: () => void;
}

const SortableMedia = SortableElement<SortableMediaProps>(
  ({ media, onEdit, onDelete }) => (
    <MediaTile
      media={media}
      onEdit={onEdit ? () => onEdit(media.id) : undefined}
      onDelete={onDelete}
    />
  )
);

interface MediaListContainerProps {
  className: string;
  media: ProductMediaFragment[];
  preview: ProductMediaFragment[];
  onDelete: (id: string) => () => void;
  onEdit: (id: string) => () => void;
}
const MediaListContainer = SortableContainer<MediaListContainerProps>(
  ({ media, preview, onDelete, onEdit, ...props }) => (
    <div>
      {media.map((mediaObj, index) => (
        <SortableMedia
          key={`item-${index}`}
          index={index}
          media={mediaObj}
          onEdit={onEdit ? onEdit(mediaObj.id) : null}
          onDelete={onDelete(mediaObj.id)}
        />
      ))}
      {preview
        .sort((a, b) => (a.sortOrder > b.sortOrder ? 1 : -1))
        .map((mediaObj, index) => (
          <MediaTile loading={true} media={mediaObj} key={index} />
        ))}
    </div>
  )
);

const PostDetail = (props: any) => {
  const {
    media,
    placeholderImage,
    onImageEdit,
    onImageDelete,
    onImageReorder,
    onImageUpload,
    openMediaUrlModal
  } = props;
  // eslint-disable-next-line no-console
  console.log("propsDetail", props);
  const classes = useStyles();
  const anchor = React.useRef<HTMLInputElement>(null);

  const handleImageUploadButtonClick = () => anchor.current?.click();
  const [imagesToUpload, setImagesToUpload] = React.useState<
    ProductMediaFragment[]
  >([]);
  const handleImageUpload = createMultiFileUploadHandler(onImageUpload, {
    onAfterUpload: () =>
      setImagesToUpload(prevImagesToUpload => prevImagesToUpload.slice(1)),
    onStart: files => {
      Array.from(files).forEach((file, fileIndex) => {
        const reader = new FileReader();
        reader.onload = event => {
          setImagesToUpload(prevImagesToUpload => [
            ...prevImagesToUpload,
            {
              __typename: "ProductMedia",
              alt: "",
              id: "",
              sortOrder: fileIndex,
              type: ProductMediaType.IMAGE,
              url: event.target.result as string,
              oembedData: null
            }
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  });
  return (
    <Container>
      <Card>
        <div className={classes.WrapperAll}>
          <div>
            <textarea
              name=""
              id=""
              maxLength={6000}
              className={classes.TextArea}
            ></textarea>
          </div>
          <img src="" alt="" />

          <div className={classes.WrapperMedia}>
            <button
              onClick={handleImageUploadButtonClick}
              className={classes.BtnSelectMedia}
            >
              Select Media
            </button>
            <input type="file" ref={anchor} style={{ display: "none" }} />
          </div>

          {/* <ImageUpload
            className={classes.imageUpload}
            isActiveClassName={classes.imageUploadActive}
            disableClick={true}
            hideUploadIcon={true}
            iconContainerActiveClassName={classes.imageUploadIconActive}
            onImageUpload={handleImageUpload}
          >
            {({ isDragActive }) => (
              <CardContent>
                <MediaListContainer
                  distance={20}
                  helperClass="dragged"
                  axis="xy"
                  media={media}
                  preview={imagesToUpload}
                  onSortEnd={onImageReorder}
                  className={classNames({
                    [classes.root]: true,
                    [classes.rootDragActive]: isDragActive
                  })}
                  onDelete={onImageDelete}
                  onEdit={onImageEdit}
                />
              </CardContent>
            )}
          </ImageUpload> */}
          <div className={classes.WrapperPublish}>
            <button className={classes.BtnPublish}>Publish</button>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default PostDetail;
