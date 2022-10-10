import { filesize } from "filesize";
import { MdLink } from "react-icons/md";
import styled from "styled-components";

export default function FileList({ files, onDelete }) {
  return (
    <Container>
      {files?.map((file) => (
        <li key={file.id}>
          <FileInfo>
            <Preview src={file.url} />
            <div>
              <strong>{file.name}</strong>
              <span>
                {filesize(file.size)}{" "}
                <button onClick={(e) => onDelete(e, file.id)}>Excluir</button>
              </span>
            </div>
          </FileInfo>
          <div>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          </div>
        </li>
      ))}
    </Container>
  );
}

const Container = styled.ul`
  background: #fff;
  border-radius: 4px;
  padding: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;

    & + li {
      margin-top: 15px;
    }

    div {
      display: flex;
    }
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

const Preview = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;
