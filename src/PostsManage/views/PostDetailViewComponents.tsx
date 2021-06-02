import placeholderImg from "@assets/images/placeholder255x255.png";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import PostDetail from "../components/PostDetail/PostDetail";
import { TypedListMedia, usePostMediaCreateMutation } from "../queries";
import { postsManagementSection } from "../urls";

function PostDetailViewComponents({ id }: any) {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const [rerender, setRerender] = React.useState(false);
  // const handleSubmit = (data: any) => {
  //   const variables: any = {};
  //   // createStore({
  //   //   variables
  //   // });
  // };
  // let countImage: number = 0;

  // const createImageUploadHandler = (
  //   id: string,
  //   createCarouselImage: (variables: any) => void
  // ) => (file: File) => {
  //   countImage++;
  //   if (countImage <= 5) {
  //     createCarouselImage({
  //       alt: "",
  //       image: file,
  //       page: id
  //     });
  //   } else {
  //     notify({
  //       status: "error",
  //       text: intl.formatMessage({
  //         defaultMessage: "You can upload maximum 5 images!"
  //       })
  //     });
  //   }
  //   setRerender(true);
  // };

  const [createPostMedia] = usePostMediaCreateMutation({
    onCompleted: data => {
      const imageError = data.postMediaCreate.postErrors.length > 0;
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
    }
  });

  // const handleImageUpload = createImageUploadHandler(id, variables =>
  //   createPostMedia({ variables })
  // );

  return (
    <>
      <WindowTitle title="Post" />
      <TypedListMedia displayLoader={false}>
        {({ data, refetch }) => {
          if (rerender) {
            refetch();
            setRerender(false);
          }
          const dataMedia =
            data &&
            data.pages?.edges?.reduce((acc, key) => {
              if (key.node.id !== id) {
                return acc;
              }
              const listImage = key.node.media.map(item => ({
                ...item,
                image: `http://thachsanh.store:8080/media/${item.image}`
              }));

              return [...acc, ...listImage];
            }, []);

          return (
            <PostDetail
              onBack={() => navigate(postsManagementSection)}
              // onSubmit={handleSubmit}
              placeholderImage={placeholderImg}
              carousel={dataMedia}
              onImageUpload={createPostMedia}
              onImageDelete={() => null}
            />
          );
        }}
      </TypedListMedia>
    </>
  );
}

export default PostDetailViewComponents;
