import { Container } from "@material-ui/core";
import AppHeader from "@saleor/components/AppHeader";
import PageHeader from "@saleor/components/PageHeader";
import { commonMessages, sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import PostInfomation from "./PostInfomation";

function PostDetailInfo({ onBack, postId, initialValues }: any) {
  const intl = useIntl();
  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.posts)}
      </AppHeader>
      <PageHeader title={intl.formatMessage(commonMessages.postInfomation)} />
      <PostInfomation postId={postId} post={initialValues} />
    </Container>
  );
}

export default PostDetailInfo;
