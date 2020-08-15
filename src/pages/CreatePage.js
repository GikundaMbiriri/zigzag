import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import QuillEditor from "../components/QuillEditor";
import { Typography, Button, Form, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  input: {
    display: "none",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));
const { Title } = Typography;

function CreatePage(props) {
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [topi, setTopic] = useState("");
  const [tex, setText] = useState("");

  const [url, setImage] = useState("");
  const classes = useStyles();
  const onEditorChange = (value) => {
    setBody(value);
    console.log(body);
  };
  const ontextChange = (event) => {
    setText(event.target.value);
  };
  const onFilesChange = (files) => {
    setFiles(files);
  };
  const onTopicChange = (event) => {
    setTopic(event.target.value);
    console.log(topi);
  };
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    axios.post("/upload", formData).then((response) => {
      setImage(response.data);
    });
    //this.props.uploadImage(formData);
  };
  const onSubmit = (event) => {
    console.log("hut");
    event.preventDefault();

    setBody("");
    setTopic("");
    setText("");
    const variables = {
      body: body,
      topic: topi,
      image: url,
      catchy: tex,
    };

    axios
      .post("/blog", variables)
      .then((response) => {
        if (response) {
          console.log(response);

          setTimeout(() => {
            props.history.push("/blog");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log("sometjh");
      });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ text1Align: "center" }}>
        <Title level={2}> Editor</Title>
      </div>
      <QuillEditor
        placeholder={"Start Posting Something"}
        onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
      />
      <br />
      <Form onSubmit={onSubmit} method="post">
        <div style={{ text1Align: "center", margin: "2rem" }}>
          <div className={classes.root}>
            <div>
              <TextField
                label="Topic"
                id="margin-normal"
                value={topi}
                onChange={onTopicChange}
                className={classes.textField}
                helperText="Some important text"
                margin="normal"
              />
            </div>
            <div>
              <TextField
                id="standard-multiline-static"
                label="Multiline"
                value={tex}
                multiline
                rows={4}
                onChange={ontextChange}
              />
            </div>
          </div>

          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <Button size="large" htmlType="submit" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreatePage;
