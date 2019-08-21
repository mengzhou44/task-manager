import React, { Component } from "react";

import Dropzone from "react-dropzone";

class ImageZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  onDrop(files) {
    const reader = new FileReader();
    const that = this;
    reader.onload = function(upload) {
      const data = upload.target.result.replace(
        /^data:image\/(png|jpeg|jpg);base64,/,
        ""
      );

      that.props.onImageLoaded({
        type: files[0].type.replace("image/", ""),
        data
      });

      that.setState({ loaded: true });
    };

    reader.readAsDataURL(files[0]);
  }

  renderLoadedIcon() {
    if (this.state.loaded === true) {
      return <img src="/images/SVG/check_box.svg" alt="loaded" />;
    }
  }

  render() {
    return (
      <Dropzone onDrop={this.onDrop.bind(this)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className="image-zone">
              <input {...getInputProps()} />
              {this.renderLoadedIcon()}
              <button> {this.props.text} </button>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default ImageZone;
