import { Button, Card } from "@material-ui/core";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import { PageListProps } from "@saleor/pages/components/PageList";
import { ListActions } from "@saleor/types";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import PostList from "../PostList/PostList";

interface IProps extends PageListProps, ListActions {
  posts?: any;
  onAdd?: () => void;
}

function PostListPage({ onAdd, ...postListProps }: IProps) {
  const intl = useIntl();

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.posts)}>
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage defaultMessage="Create Post" description="button" />
        </Button>
      </PageHeader>
      <Card>
        {/* <FilterBar
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Stores",
            description: "tab name"
          })}
          currentTab={currentTab}
          filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Store"
          })}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        /> */}
        <PostList {...postListProps} />
      </Card>
    </Container>
  );
}

export default PostListPage;
