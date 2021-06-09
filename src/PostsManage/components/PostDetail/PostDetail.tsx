import {
  Button,
  Card,
  CardContent,
  Container,
  TextField
} from "@material-ui/core";
import AppHeader from "@saleor/components/AppHeader";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import { PostMediaFragment } from "@saleor/fragments/types/PageCarouselFragment";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages, sectionNames } from "@saleor/intl";
import { postsManagementSection } from "@saleor/PostsManage/urls";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import {
  usePostCreateMutation,
  usePostDeleteBulkMutation,
  usePostUpdateMutation
} from "../../queries";
import PostMedia from "../PostMedia";

function PostDetail({
  onBack,
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
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    if (post) {
      const tempContent = post?.content && post?.content.replace(/'/g, '"');
      setContent(JSON.parse(tempContent).content);
      setTitle(post?.title);
    }
    setImagesToUpload(carousel);
  }, [post]);

  const [deleteMedia] = usePostDeleteBulkMutation({
    onCompleted: data => {
      if (data.postMediaBulkDelete.menuErrors.length === 0) {
        notify({
          status: "success",
          text: `${data.postMediaBulkDelete.count} has been deleted!`
        });
        navigate(postsManagementSection);
      }
    }
  });

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
      deleteMedia({
        variables: {
          ids: tempImgDelete
        }
      });
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
    if (title === "") {
      notify({
        status: "error",
        text: "Title is Require"
      });
      return;
    }
    if (imagesToUpload.length === 0 && content === "") {
      notify({
        status: "error",
        text: "Carousel or content is not blank!"
      });
      return;
    }
    if (id !== "undefined") {
      updatePost({
        variables: {
          id,
          input: {
            title,
            content: JSON.stringify({ content })
          }
        }
      });
    } else {
      createPost({
        variables: {
          title,
          content: JSON.stringify({ content }),
          store: ""
        }
      });
    }
  };

  const handleImageDelete = (id?: string) => () => {
    tempImgDelete.push(id);
    setTempImgDelete([...tempImgDelete]);
    const index = imagesToUpload.findIndex(e => e.id === id);
    if (index !== -1) {
      imagesToUpload.splice(index, 1);
      setImagesToUpload([...imagesToUpload]);
    }
  };

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {id
          ? intl.formatMessage(sectionNames.posts)
          : intl.formatMessage(sectionNames.posts)}
      </AppHeader>
      <Card>
        <CardTitle title={"Post Manage"} />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              value={title}
              onChange={e => setTitle(e.target.value)}
              fullWidth
              label={intl.formatMessage({
                defaultMessage: "title"
              })}
            />
            <FormSpacer />
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

            <FormSpacer />

            <div style={{ textAlign: "right" }}>
              <Button color="primary" variant="contained" type="submit">
                <FormattedMessage
                  defaultMessage="Submit"
                  description="button"
                />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PostDetail;
