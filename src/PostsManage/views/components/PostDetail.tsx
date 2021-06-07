import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

// eslint-disable-next-line local-rules/named-styles
const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: "20px",
    textAlign: "center"
    // color:
  },
  title: {
    fontSize: "1rem"
  },
  img: {
    width: 150,
    height: 150,
    objectFit: "contain",
    marginBottom: "0.875rem"
  },
  carousel: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  }
});

function PostDetail({ post }: any) {
  const classes = useStyles();
  const postInfo = post?.post;

  const tempContent = postInfo?.content && postInfo?.content.replace(/'/g, '"');
  const Mapping = postInfo
    ? {
        title: { title: "Title", value: postInfo.title || "" },
        description: {
          title: "Content:",
          value: JSON.parse(tempContent)?.content || ""
        }
      }
    : {};
  const isShowImg = post?.post.media.length > 0;
  return (
    <div>
      <Grid container>
        {Object.keys(Mapping).map((item, index) => (
          <Grid key={index} container item xs={12} sm={12}>
            <Grid item xs={3} sm={3}>
              <p style={{ fontWeight: "bolder" }} className={classes.title}>
                {Mapping[item].title}
              </p>
            </Grid>
            <Grid item xs={9} sm={9}>
              <p className={classes.title}>{Mapping[item].value}</p>
            </Grid>
          </Grid>
        ))}
        {isShowImg && (
          <Grid container item xs={12} sm={12}>
            <Grid item xs={3} sm={3}>
              <p style={{ fontWeight: "bolder" }} className={classes.title}>
                Carousel
              </p>
            </Grid>
            <Grid item xs={9} sm={9}>
              <div className={classes.carousel}>
                {post?.post.media.map((item, index) => (
                  <img
                    key={index}
                    src={`http://thachsanh.store:8080/media/${item.image}`}
                    alt=""
                    className={classes.img}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default PostDetail;
