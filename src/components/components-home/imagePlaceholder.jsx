import React, { Fragment } from 'react';
import posterbackdrop from '../../assets/posterbackdrop';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  handleImageLoaded() {
    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;
    const imageStyle = !loaded ? { display: 'none' } : {};
    return (
      <div className='imageHolder'>
        {!loaded && <ImagePlaceholder />}
        <img
          src='http://someImage.png'
          style={imageStyle}
          onLoad={this.handleImageLoaded.bind(this)}
        />
      </div>
    );
  }
}
