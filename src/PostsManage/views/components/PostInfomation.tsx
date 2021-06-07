/* eslint-disable local-rules/named-styles */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles
} from "@material-ui/core";
import useNavigator from "@saleor/hooks/useNavigator";
import { postEditPath } from "@saleor/PostsManage/urls";
import PostDetail from "@saleor/PostsManage/views/components/PostDetail";
import React from "react";

const useStyles = makeStyles({
  cardTitle: {
    position: "relative"
  },
  Button: {
    margin: "0 0.5rem"
  }
});

function PostInfomation({ postId, post }: any) {
  const navigate = useNavigator();
  const classes = useStyles();
  return (
    <Card>
      <CardActions disableSpacing>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.Button}
            onClick={() => navigate(postEditPath(postId))}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.Button}
          >
            Deactivate
          </Button>
        </div>
      </CardActions>
      <CardContent>
        <PostDetail post={post} />
      </CardContent>
    </Card>
  );
}

export default PostInfomation;
