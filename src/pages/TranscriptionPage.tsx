import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/layout/Sidebar'; // Importar el Sidebar

const TranscriptionPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [report, setReport] = useState<object | null>(null);  // Añadir estado para el reporte
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      let token = localStorage.getItem("token")
      //console.log(token)
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
      
      // Manejar la respuesta de transcripción y reporte
      const { transcription, report } = response.data;
      setTranscription(transcription);
      setReport(report);  // Guardar el reporte en el estado
      setError(null);  // Limpiar errores si el proceso es exitoso

    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error uploading file or processing transcription.');
    }
  };

  return (
    <div className="flex h-screen bg-[#B09AD9]">
      {/* Sidebar importado desde Dashboard */}
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-white mb-6">
          Upload your audio or video file for transcription
        </h1>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="mb-4">
            <input 
              type="file" 
              onChange={handleFileChange} 
              accept="audio/*, video/*" 
              className="w-full text-gray-700"
            />
          </div>

          {progress > 0 && (
            <div className="mb-4">
              <p>Upload progress: {progress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-purple-600 h-4 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
            onClick={handleUpload}
          >
            Upload and Transcribe
          </button>

          {transcription && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Transcription Result:</h2>
              <p>{transcription}</p>
            </div>
          )}

          {report && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Transcription Report:</h2>
              <pre className="text-gray-700">{JSON.stringify(report, null, 2)}</pre>
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
