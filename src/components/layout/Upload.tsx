import React from "react";
import styled from "styled-components";

interface UploadProps {
  onFileChange: (file: File | null) => void;
}

const Upload: React.FC<UploadProps> = ({ onFileChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    } else {
      onFileChange(null);
    }
  };

  return (
    <StyledWrapper>
      <form className="file-upload-form">
        <label htmlFor="file" className="file-upload-label">
          <div className="file-upload-design">
            <svg viewBox="0 0 640 512" height="1em">
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
            </svg>
            <p>Upload your audio or video file</p>
            <p>or</p>
            <span className="browse-button">Browse file</span>
          </div>
          <input id="file" type="file" onChange={handleFileChange} />
        </label>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .file-upload-form {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .file-upload-label input {
    display: none;
  }
  .file-upload-label svg {
    height: 40px; /* Tamaño del ícono */
    fill: rgb(82, 82, 82);
    margin-bottom: 10px;
  }
  .file-upload-label {
    cursor: pointer;
    background-color: #ddd;
    padding: 10px 25px; /* Área de carga más pequeña */
    border-radius: 15px; /* Borde más pequeño */
    border: 2px dashed rgb(82, 82, 82);
    box-shadow: 0px 0px 50px -25px rgba(0, 0, 0, 0.719);
  }
  .file-upload-design {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
  }
  .browse-button {
    background-color: rgb(82, 82, 82);
    padding: 3px 10px; /* Botón más pequeño */
    border-radius: 8px;
    color: white;
    transition: all 0.3s;
  }
  .browse-button:hover {
    background-color: rgb(14, 14, 14);
  }
`;

export default Upload;
