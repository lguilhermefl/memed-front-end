import React, { Component } from "react";
import { uniqueId } from "lodash";
import { filesize } from "filesize";
import styled from "styled-components";

import api from "../services/api/api";

import Upload from "./Upload";
import UploadFileList from "./UploadFileList";
import createConfig from "../utils/createConfig";

export default class UploadBox extends Component {
  state = {
    uploadedFiles: [],
  };

  componentWillUnmount() {
    this.state.uploadedFiles.forEach((file) =>
      URL.revokeObjectURL(file.preview)
    );
  }

  render() {
    const { uploadedFiles } = this.state;
    const { apiUploadFileUrl, apiDeleteFileUrl, setLoading } = this.props;

    const handleUpload = (files) => {
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

      uploadedFiles.forEach(processUpload);
    };

    const updateFile = (id, data) => {
      this.setState({
        uploadedFiles: this.state.uploadedFiles.map((uploadedFile) => {
          return id === uploadedFile.id
            ? { ...uploadedFile, ...data }
            : uploadedFile;
        }),
      });
    };

    const processUpload = (uploadedFile) => {
      const data = new FormData();

      data.append("file", uploadedFile.file, uploadedFile.name);
      const config = createConfig();

      api
        .post(apiUploadFileUrl, data, {
          ...config,
          onUploadProgress: (e) => {
            const progress = parseInt(Math.round((e.loaded * 100) / e.total));

            updateFile(uploadedFile.id, {
              progress,
            });
          },
        })
        .then((response) => {
          updateFile(uploadedFile.id, {
            uploaded: true,
            id: response.data._id,
            url: response.data.url,
          });
        })
        .catch(() => {
          updateFile(uploadedFile.id, {
            error: true,
          });
        });
    };

    const handleDelete = async (e, url) => {
      e.preventDefault();
      setLoading(true);
      try {
        const config = createConfig();
        const response = await api.get(apiUploadFileUrl, config);

        const fileToDelete = response.data.filter((file) => file.url === url);
        await api.delete(`${apiDeleteFileUrl}/${fileToDelete[0].id}`, config);

        this.setState({
          uploadedFiles: this.state.uploadedFiles.filter(
            (file) => file.url !== url
          ),
        });
        setLoading(false);
      } catch (error) {
        alert("Algo deu errado, tente novamente!");
        console.log(error);
        setLoading(false);
      }
    };

    return (
      <Container>
        <Content>
          <Upload onUpload={handleUpload} />
          {!!uploadedFiles.length && (
            <UploadFileList
              files={uploadedFiles}
              updateFilesInfo={this.updateFilesInfo}
              onDelete={handleDelete}
            />
          )}
        </Content>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;
