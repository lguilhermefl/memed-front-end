import React, { Component } from "react";
import { uniqueId } from "lodash";
import { filesize } from "filesize";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import api from "../services/api/api";

import Upload from "./Upload";
import FileList from "./FileList";

// const defineApiPostUrl = (id) => {
//   const location = useLocation();
//   const route = location.pathname;

//   if (route.contains("appointments")) return `/appointments/files/${id}`;

//   return `/tests/files/${id}`;
// };

export default class UploadBox extends Component {
  state = {
    uploadedFiles: [],
  };

  handleUpload = (files) => {
    const uploadedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
    });

    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      }),
    });
  };

  processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    api
      .post(`/tests/files/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  handleDelete = async (id) => {
    await api.delete(`/tests/files/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter((file) => file.id !== id),
    });
  };

  render() {
    const { uploadedFiles } = this.state;

    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={this.handleDelete} />
          )}
        </Content>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 30px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;
