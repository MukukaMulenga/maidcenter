import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const ApplyModal = ({ applyModalIsOpen, setApplyModalIsOpen, jobDetails, user }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]); // Changed to store an array of error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [message,setMessage] = useState('')

  const handleFileChange = (event) => {
    const filesArray = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]); // Add to the existing list
  };

  const handleApplySubmit = async (event) => {
   
    
    setErrorMessages([]); // Clear previous error messages
   


    const formData = new FormData();
    formData.append('user_id', user.user_id); // Matches backend
    formData.append('job_id', jobDetails.job_id); // Matches backend
    formData.append('submitted_by', user.firstname); // Matches backend

    // Attach each file to 'files' key
    selectedFiles.forEach((file) => {
      formData.append('files', file); // 'files' should match backend
    });

    try {
      const response = await fetch('http://localhost:8000/applications/create', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json()
      if(response.ok){
        setMessage(result.detail)
        setTimeout(()=>{setMessage('')},3000)
      }else{
        setMessage(result.detail)
        setTimeout(()=>{setMessage('')},3000)
      }

     
    } catch (error) {
      console.error('Error submitting the application:', error);
      setErrorMessages(['Error submitting the application: ' + error.message]);
    }
  };

  // Function to check if the user has already applied for the job
  const checkIfUserApplied = async (userId, jobId) => {
    try {
      const response = await fetch(`http://localhost:8000/applications/check/${userId}/${jobId}`);
      const data = await response.json();
      return data.hasApplied; // Assuming the API returns { hasApplied: true/false }
    } catch (error) {
      console.error('Error checking application:', error);
      return false; // Default to false if an error occurs
    }
  };

  const renderFilePreview = (file) => {
    const fileType = file.type;

    if (fileType.startsWith('image/')) {
      // Render an image preview with dimensions 200x200 px
      return <div className='flex space-x-3'>
                <img src={URL.createObjectURL(file)} alt={file.name} className="object-cover mr-4 mb-4"  width={200} height={200}/>
             </div>
    } else {
      // Render the file name for non-image files
      return <p className="mr-4 mb-4">{file.name}</p>;
    }
  };

  return (
    <Modal isOpen={applyModalIsOpen} onRequestClose={() => setApplyModalIsOpen(false)}>
      <h2 className="text-lg font-bold mb-4">Apply for {jobDetails.title}</h2>
      {errorMessages.length > 0 && (
        <div className="mb-4">
          {errorMessages.map((msg, index) => (
            <p key={index} className="text-red-500">{msg}</p> // Render each error message
          ))}
        </div>
      )}
      <form onSubmit={handleApplySubmit}>
        {/* Job title */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Job Title:</label>
          <input
            type="text"
            value={jobDetails.title}
            readOnly
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        {/* Job description */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Description:</label>
          <textarea
            value={jobDetails.desc}
            readOnly
            className="border border-gray-300 rounded p-2 w-full"
            rows="4"
          />
        </div>
        {/* Job requirements */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Requirements:</label>
          <ul className="list-disc pl-5">
            {jobDetails.requirements.map((req, index) => (
              <li key={index} className="text-sm">{req}</li>
            ))}
          </ul>
        </div>
        {/* Attachments */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Attachments**:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        {/* Preview selected files */}
        {selectedFiles.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium">Selected Files:</label>
            <div className="flex flex-col">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center mb-2">
                  {renderFilePreview(file)}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button 
            type="submit" 
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </button>
          <button
            onClick={() => setApplyModalIsOpen(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 ml-2"
          >
            Cancel
          </button>
        </div>
        <h1 className='text-green-500'>{message}</h1>
      </form>
    </Modal>
  );
};

export default ApplyModal;
