import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  CardContent,
  CardActions,
  CardActionArea,
  Button,
} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import icon from "../images/icon.jpg";
import { likeScream, unlikeScream } from "../redux/actions/dataAction";
import MyButton from "../util/MyButton";
import { Chat as ChatIcon, BluetoothSearchingSharp } from "@material-ui/icons"; //
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import relativeTime from "dayjs/plugin/relativeTime";
import Blog from "./Blog";

const styles = {
  card: {
    maxWidth: 345,
  },
  // image: {
  //   minWidth: 200,
  // },
  // content: {
  //   padding: 25,
  //   objectFit: "cover",
  // },
};
class Scream extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.blogId === this.props.scream.blogId
      )
    )
      return true;
    else return false;
  };
  likeScream = () => {
    this.props.likeScream(this.props.scream.blogId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.blogId);
  };

  render() {
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
    dayjs.extend(relativeTime);
    const {
      classes,
      blogs,
      user: {
        authenticated,
        credentials: { name },
      },
    } = this.props;

    const mark = (
      <Carousel responsive={responsive}>
        {blogs.map((blog) => (
          <Blog scream={blog} />
        ))}
      </Carousel>
    );
    return <>{mark}</>;
  }
}
Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  likeScream,
  unlikeScream,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
