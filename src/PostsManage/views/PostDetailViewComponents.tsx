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

  // setRerender(true);

  // deletePageCarouselImage({
  //   variables: { mediaId: id, isActive: false, alt: "" }
  // });

  return (
    <>
      <WindowTitle title="Post" />
      {id !== "undefined" ? (
        <TypedListMedia displayLoader={false} variables={{ id }}>
          {({ data, refetch }) => {
            if (rerender) {
              refetch();
              setRerender(false);
            }
            const dataMedia =
              data &&
              data.post?.media.map(item => ({
                ...item,
                url: `http://thachsanh.store:8080/media/${item.image}`
              }));

            return (
              <PostDetail
                onBack={() => navigate(postsManagementSection)}
                placeholderImage={placeholderImg}
                carousel={dataMedia}
                onImageUpload={createPostMedia}
                // onImageDelete={handleImageDelete}
                post={id && data?.post}
                id={id}
              />
            );
          }}
        </TypedListMedia>
      ) : (
        <PostDetail
          onBack={() => navigate(postsManagementSection)}
          placeholderImage={placeholderImg}
          carousel={[]}
          onImageUpload={createPostMedia}
          onImageDelete={() => null}
          id={id}
        />
      )}
    </>
  );
}

export default PostDetailViewComponents;
