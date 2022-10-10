import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled, { css } from "styled-components";

export default class Upload extends Component {
  renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return (
        <UploadMessage>
          <span>
            Arraste seus arquivos ou clique aqui para selecionar (5MB por
            arquivo (.jpg, .jpeg, .png e pdf) e limite de 5 arquivos)
          </span>
        </UploadMessage>
      );
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">
          <span>Arquivo não suportado</span>
        </UploadMessage>
      );
    }

    return (
      <UploadMessage type="success">
        <span>Solte os arquivos aqui</span>
      </UploadMessage>
    );
  };

  render() {
    const { onUpload } = this.props;
    const acceptedFileTypes = {
      "image/*": [".jpg", ".jpeg", ".png"],
      "application/pdf": [],
    };

    return (
      <Dropzone accept={acceptedFileTypes} onDropAccepted={onUpload}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {this.renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    );
  }
}
const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

const DropContainer = styled.div.attrs({ className: "dropzone" })`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

const messageColors = {
  default: "#999",
  error: "#e57878",
  success: "#78e5d5",
};

const UploadMessage = styled.div`
  display: flex;
  color: ${(props) => messageColors[props.type || "default"]};
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 15px 10px;
`;
