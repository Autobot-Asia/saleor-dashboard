import placeholderImg from "@assets/images/placeholder255x255.png";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useAttributeValueDeleteMutation } from "@saleor/attributes/mutations";
import {
  getAttributesAfterFileAttributesUpdate,
  mergeAttributeValueDeleteErrors,
  mergeFileUploadErrors
} from "@saleor/attributes/utils/data";
import {
  handleDeleteMultipleAttributeValues,
  handleUploadMultipleFiles,
  prepareAttributesInput
} from "@saleor/attributes/utils/handlers";
import ActionDialog from "@saleor/components/ActionDialog";
import { AttributeInput } from "@saleor/components/Attributes";
import { WindowTitle } from "@saleor/components/WindowTitle";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@saleor/config";
import { useFileUploadMutation } from "@saleor/files/mutations";
import { AttributeErrorFragment } from "@saleor/fragments/types/AttributeErrorFragment";
import { PageErrorFragment } from "@saleor/fragments/types/PageErrorFragment";
import { UploadErrorFragment } from "@saleor/fragments/types/UploadErrorFragment";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import usePageSearch from "@saleor/searches/usePageSearch";
import useProductSearch from "@saleor/searches/useProductSearch";
import { getParsedDataForJsonStringField } from "@saleor/translations/utils";
import createMetadataUpdateHandler from "@saleor/utils/handlers/metadataUpdateHandler";
import {
  useMetadataUpdate,
  usePrivateMetadataUpdate
} from "@saleor/utils/metadata/updateMetadata";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { getStringOrPlaceholder, maybe } from "../../misc";
import { AttributeValueInput, PageInput } from "../../types/globalTypes";
import PageDetailsPage from "../components/PageDetailsPage";
import { PageData, PageSubmitData } from "../components/PageDetailsPage/form";
import {
  TypedListCarousel,
  usePageCarouselCreateMutation,
  usePageCarouselDeleteMutation,
  usePageRemoveMutation,
  usePageUpdateMutation
} from "../mutations";
import { usePageDetailsQuery } from "../queries";
import { PageCarouselVariables } from "../types/PageCarousel";
import { PageRemove } from "../types/PageRemove";
import { pageListUrl, pageUrl, PageUrlQueryParams } from "../urls";

export interface PageDetailsProps {
  id: string;
  params: PageUrlQueryParams;
}

const createPageInput = (
  data: PageData,
  updatedFileAttributes: AttributeValueInput[]
): PageInput => ({
  attributes: prepareAttributesInput({
    attributes: data.attributes,
    updatedFileAttributes
  }),
  content: getParsedDataForJsonStringField(data.content),
  isPublished: data.isPublished,
  publicationDate: data.publicationDate,
  seo: {
    description: data.seoDescription,
    title: data.seoTitle
  },
  slug: data.slug === "" ? null : data.slug,
  title: data.title
});

export const PageDetails: React.FC<PageDetailsProps> = ({ id, params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const [updateMetadata] = useMetadataUpdate({});

  const [rerender, setRerender] = React.useState(false);
  const [updatePrivateMetadata] = usePrivateMetadataUpdate({});

  const pageDetails = usePageDetailsQuery({
    variables: {
      id
    }
  });

  const [uploadFile, uploadFileOpts] = useFileUploadMutation({});

  const [pageUpdate, pageUpdateOpts] = usePageUpdateMutation({});

  const [
    deleteAttributeValue,
    deleteAttributeValueOpts
  ] = useAttributeValueDeleteMutation({});

  const [pageRemove, pageRemoveOpts] = usePageRemoveMutation({
    onCompleted: (data: PageRemove) => {
      if (data.pageDelete.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        navigate(pageListUrl());
      }
    }
  });

  const handleAssignAttributeReferenceClick = (attribute: AttributeInput) =>
    navigate(
      pageUrl(id, {
        action: "assign-attribute-value",
        id: attribute.id
      })
    );

  const handleUpdate = async (data: PageSubmitData) => {
    let errors: Array<
      AttributeErrorFragment | UploadErrorFragment | PageErrorFragment
    > = [];

    const uploadFilesResult = await handleUploadMultipleFiles(
      data.attributesWithNewFileValue,
      variables => uploadFile({ variables })
    );

    const deleteAttributeValuesResult = await handleDeleteMultipleAttributeValues(
      data.attributesWithNewFileValue,
      pageDetails?.data?.page?.attributes,
      variables => deleteAttributeValue({ variables })
    );

    const updatedFileAttributes = getAttributesAfterFileAttributesUpdate(
      data.attributesWithNewFileValue,
      uploadFilesResult
    );

    const updateResult = await pageUpdate({
      variables: {
        id,
        input: createPageInput(data, updatedFileAttributes)
      }
    });

    errors = [
      ...errors,
      ...mergeFileUploadErrors(uploadFilesResult),
      ...mergeAttributeValueDeleteErrors(deleteAttributeValuesResult),
      ...updateResult.data.pageUpdate.errors
    ];

    return errors;
  };

  const handleSubmit = createMetadataUpdateHandler(
    pageDetails.data?.page,
    handleUpdate,
    variables => updateMetadata({ variables }),
    variables => updatePrivateMetadata({ variables })
  );

  const {
    loadMore: loadMorePages,
    search: searchPages,
    result: searchPagesOpts
  } = usePageSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });

  const {
    loadMore: loadMoreProducts,
    search: searchProducts,
    result: searchProductsOpts
  } = useProductSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });

  const fetchMoreReferencePages = {
    hasMore: searchPagesOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchPagesOpts.loading,
    onFetchMore: loadMorePages
  };

  const fetchMoreReferenceProducts = {
    hasMore: searchProductsOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchProductsOpts.loading,
    onFetchMore: loadMoreProducts
  };

  let countImage: number = 0;
  const [prevLength, setPrevLength] = React.useState<number>();

  const createImageUploadHandler = (
    id: string,
    createCarouselImage: (variables: PageCarouselVariables) => void
  ) => (file: File) => {
    countImage++;
    if (countImage <= 5) {
      createCarouselImage({
        alt: "",
        image: file,
        page: id
      });
    } else {
      notify({
        status: "error",
        text: intl.formatMessage({
          defaultMessage: "You can upload maximum 5 images!"
        })
      });
    }
    setRerender(true);
  };

  const [createCarouselImage] = usePageCarouselCreateMutation({
    onCompleted: data => {
      const imageError = data.pageMediaCreate.pageErrors.length > 0;
      if (imageError) {
        notify({
          status: "error",
          text: intl.formatMessage(commonMessages.somethingWentWrong)
        });
      } else {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
      }
      setRerender(true);
    }
  });

  const handleImageUpload = createImageUploadHandler(id, variables =>
    createCarouselImage({ variables })
  );
  const [deletePageCarouselImage] = usePageCarouselDeleteMutation({
    onCompleted: () =>
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      })
  });
  const handleImageDelete = (id: string) => () => {
    setRerender(true);
    deletePageCarouselImage({
      variables: { mediaId: id, isActive: false, alt: "" }
    });
  };

  return (
    <>
      <WindowTitle title={maybe(() => pageDetails.data.page.title)} />
      <TypedListCarousel displayLoader={false}>
        {({ data, refetch }) => {
          if (rerender) {
            refetch();
            setRerender(false);
          }
          const dataCarousel =
            data &&
            data.pages?.edges?.reduce((acc, key) => {
              if (key.node.id !== id) {
                return acc;
              }
              const listImage = key.node.media.map(item => ({
                ...item,
                url: `http://thachsanh.store:8080/media/${item.image}`
              }));

              return [...acc, ...listImage];
            }, []);

          if (
            dataCarousel &&
            (countImage === 0 || dataCarousel.length !== prevLength)
          ) {
            setPrevLength(dataCarousel.length);
            countImage = dataCarousel.length;
          }

          return (
            <PageDetailsPage
              loading={
                pageDetails.loading ||
                pageUpdateOpts.loading ||
                uploadFileOpts.loading ||
                deleteAttributeValueOpts.loading
              }
              errors={pageUpdateOpts.data?.pageUpdate.errors || []}
              saveButtonBarState={pageUpdateOpts.status}
              page={pageDetails.data?.page}
              onBack={() => navigate(pageListUrl())}
              onRemove={() =>
                navigate(
                  pageUrl(id, {
                    action: "remove"
                  })
                )
              }
              onSubmit={handleSubmit}
              assignReferencesAttributeId={
                params.action === "assign-attribute-value" && params.id
              }
              onAssignReferencesClick={handleAssignAttributeReferenceClick}
              referencePages={searchPagesOpts.data?.search.edges.map(
                edge => edge.node
              )}
              referenceProducts={searchProductsOpts.data?.search.edges.map(
                edge => edge.node
              )}
              fetchReferencePages={searchPages}
              fetchMoreReferencePages={fetchMoreReferencePages}
              fetchReferenceProducts={searchProducts}
              fetchMoreReferenceProducts={fetchMoreReferenceProducts}
              onCloseDialog={() => navigate(pageUrl(id))}
              placeholderImage={placeholderImg}
              carousel={dataCarousel}
              onImageUpload={handleImageUpload}
              onImageDelete={handleImageDelete}
            />
          );
        }}
      </TypedListCarousel>
      <ActionDialog
        open={params.action === "remove"}
        confirmButtonState={pageRemoveOpts.status}
        title={intl.formatMessage({
          defaultMessage: "Delete Page",
          description: "dialog header"
        })}
        onClose={() => navigate(pageUrl(id))}
        onConfirm={() => pageRemove({ variables: { id } })}
        variant="delete"
      >
        <DialogContentText>
          <FormattedMessage
            defaultMessage="Are you sure you want to delete {title}?"
            description="delete page"
            values={{
              title: (
                <strong>
                  {getStringOrPlaceholder(pageDetails.data?.page?.title)}
                </strong>
              )
            }}
          />
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
PageDetails.displayName = "PageDetails";
export default PageDetails;
