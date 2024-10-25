import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../components/layout/Sidebar';
import Loader from '../components/layout/Loader';
import Upload from '../components/layout/Upload';
import MinutesDisplay from '../components/MinutesDisplay';

const TranscriptionPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [minutes, setMinutes] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const minutesRef = useRef<HTMLDivElement>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (minutes && minutesRef.current) {
      minutesRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [minutes]);

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
    setLoading(true);

    try {
      let token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/v1/transcribe/`,
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

      const { report } = response.data;
      setMinutes(report.minutes);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error uploading file or processing transcription.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setProgress(0);
    setMinutes(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen bg-[#B09AD9]">
      <Sidebar />
      <main className="flex-1 p-8 flex flex-col items-center" style={{ marginTop: '50px' }}>
        <h1 className="text-3xl font-bold text-white mb-6">
          Upload your audio or video file for transcription
        </h1>
        <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center justify-center w-full max-w-5xl">
          {!minutes ? (
            <>
              <Upload onFileChange={handleFileChange} />

              {loading ? (
                <Loader />
              ) : (
                <>
                  {progress > 0 && (
                    <div className="mb-4">
                      <p>Upload progress: {progress}%</p>
                    </div>
                  )}
                  <button
                    className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 mt-6 transition-colors duration-200"
                    onClick={handleUpload}
                  >
                    Upload and Transcribe
                  </button>
                </>
              )}
            </>
          ) : (
            <div 
              ref={minutesRef}
              className="w-full transition-all duration-500 ease-in-out"
            >
              <MinutesDisplay content={minutes} />

              <button
                className="fixed bottom-8 right-8 text-white px-6 py-3 rounded-full hover:bg-purple-800 transition-colors duration-200 shadow-lg flex items-center gap-2 z-10"
                style={{ backgroundColor: '#6A1B9A' }}
                onClick={handleReset}
              >
                <span>Start New Transcription</span>
              </button>
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-red-100 text-red-800 rounded-lg w-full">
              <p>{error}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TranscriptionPage;