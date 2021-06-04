import {
  Button,
  Card,
  CardContent,
  Container,
  TextField
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import { PostMediaFragment } from "@saleor/fragments/types/PageCarouselFragment";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { postsManagementSection } from "@saleor/PostsManage/urls";
import React from "react";
import { useIntl } from "react-intl";

import { usePostCreateMutation, usePostUpdateMutation } from "../../queries";
import PostMedia from "../PostMedia";

function PostDetail({
  post,
  placeholderImage,
  carousel,
  onImageUpload,
  // onImageDelete,
  id
}: any) {
  const navigate = useNavigator();
  const intl = useIntl();
  const notify = useNotifier();
  const [imagesToUpload, setImagesToUpload] = React.useState<
    PostMediaFragment[]
  >([]);

  const [tempImgDelete, setTempImgDelete] = React.useState([]);

  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    if (post) {
      const tempContent = post?.content && post?.content.replace(/'/g, '"');
      setContent(JSON.parse(tempContent).content);
    }
    setImagesToUpload(carousel);
  }, [post]);

  const [createPost] = usePostCreateMutation({
    onCompleted: data => {
      const id = data?.postCreate?.post?.id;
      Promise.all(
        imagesToUpload.map((_, index) => {
          onImageUpload({
            variables: {
              post: id,
              ...imagesToUpload[index],
              image: imagesToUpload[index] && imagesToUpload[index].image
            }
          });
        })
      );
      if (data.postCreate.postErrors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        navigate(postsManagementSection);
      }
    }
  });

  const [updatePost] = usePostUpdateMutation({
    onCompleted: data => {
      const id = data?.postUpdate?.post?.id;
      Promise.all(
        imagesToUpload.map(item => {
          if (tempImgDelete.indexOf(item.id) > 0) {
            //  delete here
          }
          if (item.image.name) {
            onImageUpload({
              variables: {
                post: id,
                ...item,
                image: item && item.image
              }
            });
          }
        })
      );
      if (data.postUpdate.postErrors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        navigate(postsManagementSection);
      }
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (id !== "undefined") {
      updatePost({
        variables: {
          id,
          input: {
            title: "title",
            content: JSON.stringify({ content })
          }
        }
      });
    } else {
      createPost({
        variables: {
          title: "title",
          content: JSON.stringify({ content }),
          store: ""
        }
      });
    }

    // onSubmit();
  };

  const handleImageDelete = (id?: string) => () => {
    tempImgDelete.push(id);
    setTempImgDelete([...tempImgDelete]);
  };

  return (
    <Container>
      <Card>
        <CardTitle title={"Post Manage"} />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              value={content}
              onChange={e => setContent(e.target.value)}
              fullWidth
              label={intl.formatMessage({
                defaultMessage: "content"
              })}
              multiline
              rows={5}
            />
            <PostMedia
              carousel={imagesToUpload}
              placeholderImage={placeholderImage}
              onImageDelete={handleImageDelete}
              // onImageUpload={onImageUpload}
              imagesToUpload={imagesToUpload}
              setImagesToUpload={setImagesToUpload}
            />

            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PostDetail;
