import React from 'react';

class ReactFirebaseFileUpload extends React.Component {
  render() {
    return (
      <div>
        <input type='file' onChange={this.props.handleChange} />
        <button type='button' onClick={this.props.handleUpload}>
          Upload image
        </button>
        {this.props.imageURL && (
          <img src={this.props.imageURL} width={40} height={40} alt='cat' />
        )}
      </div>
    );
  }
}

export default ReactFirebaseFileUpload;
