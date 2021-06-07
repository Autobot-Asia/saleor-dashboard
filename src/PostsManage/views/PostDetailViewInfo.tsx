import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import React from "react";

import { usePostById } from "../queries";
import { postsManagementSection } from "../urls";
import PostDetailInfo from "./components/PostDetailInfo";

function PostDetailViewInfoComponent({ id }: any) {
  const navigate = useNavigator();
  const { data, loading } = usePostById({
    displayLoader: true,
    variables: { id }
  });

  return (
    <>
      <WindowTitle title="Post detail" />
      <PostDetailInfo
        disabled={loading}
        postId={id}
        initialValues={data}
        onBack={() => navigate(postsManagementSection)}
      />
    </>
  );
}

export default PostDetailViewInfoComponent;
