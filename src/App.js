import GlobalStyle from "./components/styles/globalStyles";
import Upload from "./components/Upload";
import FileList from "./components/FileList";
import { Container, Content } from "./styles";
import { useState } from "react";
import { uniqueId } from "lodash";
import { filesize } from "filesize";
import api from "./services/api/api";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = (files) => {
    const filesUploading = files.map((file) => ({
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

    setUploadedFiles(uploadedFiles.concat([...filesUploading]));

    filesUploading.forEach(processUpload);
  };

  const updateFile = (id, data) => {
    const files = uploadedFiles.map((uploadedFile) =>
      id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile
    );
    setUploadedFiles([...files]);
  };

  const processUpload = (uploadingFile) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (e) => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));
        updateFile(uploadingFile.id, { progress });
      },
    };

    const data = new FormData();

    data.append("file", uploadingFile.file, uploadingFile.name);

    api.post("/tests/files/1", data, config);
  };

  return (
    <Container>
      <GlobalStyle />
      <Content>
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
      </Content>
    </Container>
  );
}

export default App;
