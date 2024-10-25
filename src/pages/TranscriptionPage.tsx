import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/layout/Sidebar';
import Loader from '../components/layout/Loader';
import Upload from '../components/layout/Upload'; // Importa el nuevo componente de subida
import Markdown from 'react-markdown'; // Para mostrar contenido en formato Markdown

const TranscriptionPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [minutes, setMinutes] = useState<string | null>(null); // Campo para los "minutes"
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true); // Activar el estado de carga

    try {
      let token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/v1/transcribe/`,  // URL del endpoint de FastAPI para la transcripción
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(percentCompleted);
            }
          },
        }
      );

      const { report } = response.data; // Obtenemos el 'report' de la respuesta
      setMinutes(report.minutes); // Extraemos el campo "minutes"
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error uploading file or processing transcription.');
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="flex h-screen bg-[#B09AD9]">
      <Sidebar />
      <main className="flex-1 p-8 flex flex-col items-center" style={{ marginTop: '50px' }}>
        <h1 className="text-3xl font-bold text-white mb-6">
          Upload your audio or video file for transcription
        </h1>
        <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center justify-center">
          {/* Solo mostrar el componente Upload y el botón si no se han mostrado los "minutes" */}
          {!minutes && (
            <>
              <Upload onFileChange={handleFileChange} />

              {progress > 0 && (
                <div className="mb-4">
                  <p>Upload progress: {progress}%</p>
                </div>
              )}

              <button
                className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 mt-6"
                onClick={handleUpload}
              >
                Upload and Transcribe
              </button>
            </>
          )}

          {loading && <Loader />} {/* Mostrar el loader mientras está en proceso */}

          {minutes && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Transcription Minutes:</h2>
              <Markdown>{minutes}</Markdown> {/* Renderiza el contenido de minutes en formato Markdown */}
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-red-100 text-red-800 rounded-lg">
              <p>{error}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TranscriptionPage;
