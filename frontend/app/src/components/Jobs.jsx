import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import ApplyModal from '../../applyModal';
import { FaList, FaUserTie } from 'react-icons/fa';

const JobsTable = ({ detail }) => {

  const userRole = sessionStorage.getItem('userRole');
  const profileString = sessionStorage.getItem(`profile_${userRole}`)
  const profile = profileString ? JSON.parse(profileString) : null;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalCreateIsOpen, setCreateModal] = useState(false);
  const [viewJob, setViewJob] = useState(null);
  const [modalViewIsOpen, setModalViewIsOpen] = useState(false);
  const [applyModalIsOpen, setApplyModalIsOpen] = useState(false);
  const [jobDetails, setJobDetails] = useState({ title: '', category: '', desc: "", requirements: [],user_id:profile.user_id });
  const [jobCreationResponse, setJobCreationResponse] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isEditingModalOpen,setIsEditingModalOpen] = useState(false)
  const [editJobDetails, setEditJobDetails] = useState({ title: '', desc: '', requirements: [],job_id:null });




 

  useEffect(() => {
    fetchJobs();
  }, []);


  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/jobs/all');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setLoading(false);
  };

  const handleViewClick = (job) => {
    setViewJob(job);
    setModalViewIsOpen(true);
  };

  const handleApplyClick = (job) => {
    setJobDetails(job);
    setApplyModalIsOpen(true);
  };

  const handleDeleteClick = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
        try {
            const response = await fetch(`http://localhost:8000/jobs/delete/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                  // Add token if needed for authentication
                },
            });

            if (!response.ok) {
                throw new Error("Error deleting job");
            }

            const result = await response.json();
            console.log(result.message); // Log the success message from the server
            
            // Optionally refresh the job list or update the state to remove the deleted job
            fetchJobs(); // Call your function to fetch updated job listings
        } catch (error) {
            console.error("Failed to delete job:", error);
            // Optionally show an error message to the user
        }
    }
};


  const handleEditClick = (job) => {
    setEditJobDetails({
      title: job.title,
      category: job.category,
      desc: job.desc,
      requirements: job.requirements,
      job_id : job.job_id
    });
    setIsEditingModalOpen(true);  // Open the modal to edit the job
  };

  const updateJob = async (job_id, editJobDetails) => {
    try {
      const response = await fetch(`http://localhost:8000/jobs/update/${job_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editJobDetails),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update the job');
      }
      fetchJobs()
  
      const updatedJob = await response.json(); // Parse the response if needed
  
      // You can handle the response or update the UI accordingly
      console.log('Job updated successfully', updatedJob);
  
      // Close the edit modal or show a success message
      setIsEditingModalOpen(false); // Close modal
      // Optionally refresh job list or update job details in the frontend
    } catch (error) {
      console.error('Error updating job:', error);
      // Optionally display an error message to the user
    }
  };
  
  
  
  const handleNewJobClick = () => {
    setCreateModal(!modalCreateIsOpen);
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    console.log(jobDetails);

    try {
      const response = await fetch('http://localhost:8000/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobDetails),
      });

      const data = await response.json();
      setJobCreationResponse(data.message);
      setShowSuccessMessage(true);
      fetchJobs(); // Refresh the job listings
      setCreateModal(false); // Close the modal
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const columns = [
    {
      name: 'Job Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Requirements',
      selector: (row) => row.requirements.join(', '),
    },
    {
      name: 'Description',
      selector: (row) => row.desc,
    },
    {
      name: 'Date Posted',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          {detail.isAdmin ? (
            <>
              <button
                onClick={() => handleEditClick(row)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(row.job_id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
              >
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={() => handleViewClick(row)}
              className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
            >
              View
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className='flex justify-center items-center space-x-[880px] bg-white border-top'>
        <h1 className="text-xs text-black ms-3 border-gray-400 font-thin rounded h-[27px] my-4 bg-gray-200 w-[100px] flex items-center justify-center p-1">
          <FaList className='me-2 text-gray-400 '/>
          Jobs Listing
        </h1>
        {
          detail.isAdmin ? <button
          onClick={handleNewJobClick}
          className="bg-green-400 text-white px-4 py-1 rounded-md shadow hover:bg-green-600"
        >
          +
        </button> : <div></div>
        }
      </div> 

      <DataTable
        columns={columns}
        data={jobs}
        progressPending={loading}
        pagination
        highlightOnHover
        selectableRows
      />

      {/* Modal for creating a new job */}
      <Modal 
        isOpen={modalCreateIsOpen} 
        onRequestClose={() => setCreateModal(false)} 
        className="flex flex-col justify-center items-center p-6 bg-white bg-opacity-90 rounded fixed right-[330px] top-[100px]  w-[800px] h-auto "
      >
        <h2 className="text-sm font-bold mb-6">Create New Job</h2>
        <form onSubmit={handleCreateJob} className="flex flex-col space-y-4 w-full">
          <input 
            type="text" 
            placeholder="Job Title" 
            value={jobDetails.title} 
            onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })} 
            required 
            className="border p-2 rounded"
          />
        
          <textarea 
            placeholder="Description" 
            value={jobDetails.desc} 
            onChange={(e) => setJobDetails({ ...jobDetails, desc: e.target.value })} 
            required 
            className="border p-2 rounded h-[350px]"
          />
          <input 
            type="text" 
            placeholder="Requirements (comma separated)" 
            value={jobDetails.requirements.join(', ')} 
            onChange={(e) => setJobDetails({ ...jobDetails, requirements: e.target.value.split(',').map(req => req.trim()) })} 
            required 
            className="border p-2 rounded"
          />
          <button 
            type="submit" 
            className="bg-blue-700 text-gray-300 px-6 py-1 w-[20%] rounded hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Create Job
          </button>
          <button onClick={()=>handleNewJobClick()} className='bg-gray-200 w-[20%] px-6 py-2 rounded'>
            cancel
          </button>
        </form>
        {showSuccessMessage && (
          <p className="text-green-500 mt-4">{jobCreationResponse}</p>
        )}
      </Modal>


      {/* Modal for viewing job details */}
      <Modal 
        isOpen={modalViewIsOpen} 
        onRequestClose={() => setModalViewIsOpen(false)} 
        className="flex flex-col justify-center items-center px-1 bg-white bg-opacity-90 fixed right-[450px] top-[100px] shadow-md w-[800px] h-[70vh] "
      >
        <h2 className="text-sm font-bold flex justify-center items-center mb-6"><FaUserTie className='me-2 text-lg text-gray-400'/> Job Details</h2>
        {viewJob && (
          <div className="flex flex-col w-[600px] max-w-md">
            <p className="mb-4 text-lg mb-[30px]"><strong>Title:</strong> {viewJob.title}</p>
            <p className="mb-4 text-lg mb-[30px]"><strong>Description:</strong> {viewJob.desc}</p>
            <p className="mb-4 text-lg mb-[30px]"><strong>Requirements:</strong> {viewJob.requirements.join(', ')}</p>
            <p className="mb-4 text-lg mb-[30px]"><strong>Date Posted:</strong> {viewJob.date}</p>
            <div className="flex justify-left mt-10 w-full mt-6 space-x-[300px]">
              <button 
                onClick={() => handleApplyClick(viewJob)} 
                className="bg-blue-700 text-gray-300 px-6 py-1 rounded hover:bg-blue-600 transition duration-200 ease-in-out mr-4"
              >
                Apply
              </button>
              <button 
                onClick={() => setModalViewIsOpen(false)} 
                className="bg-gray-200 text-black px-6 py-1 rounded hover:bg-red-600 transition duration-200 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    
      <Modal
  isOpen={isEditingModalOpen}
  onRequestClose={() => setIsEditingModalOpen(false)}
  className="flex flex-col justify-center items-center p-6 bg-white bg-opacity-90 rounded fixed right-[330px] top-[100px]  w-[800px] h-auto"
>
  <h2 className="text-sm font-bold mb-6">Edit Job</h2>
  <form
    onSubmit={()=>updateJob(editJobDetails.job_id,editJobDetails)}
    className="flex flex-col space-y-4 w-full"
  >
    <input
      type="text"
      placeholder="Job Title"
      value={editJobDetails.title}
      onChange={(e) => setEditJobDetails({ ...editJobDetails, title: e.target.value })}
      required
      className="border p-2 rounded"
    />
    <textarea
      placeholder="Description"
      value={editJobDetails.desc}
      onChange={(e) => setEditJobDetails({ ...editJobDetails, desc: e.target.value })}
      required
      className="border p-2 rounded h-[150px]"
    />
    <input
      type="text"
      placeholder="Requirements (comma separated)"
      value={editJobDetails.requirements.join(', ')}
      onChange={(e) => setEditJobDetails({ ...editJobDetails, requirements: e.target.value.split(',').map(req => req.trim()) })}
      required
      className="border p-2 rounded"
    />
    <button
      type="submit"
      className="bg-blue-700 text-gray-300 px-6 py-1 w-[20%] rounded hover:bg-blue-600 transition duration-200 ease-in-out"
    >
      Save Changes
    </button>
    <button
      type="button"
      onClick={() => setIsEditingModalOpen(false)}
      className="bg-gray-200 w-[20%] px-6 py-2 rounded"
    >
      Cancel
    </button>
  </form>
</Modal>

      {/* Modal for applying to a job */}
      <ApplyModal 
        applyModalIsOpen={applyModalIsOpen}
        setApplyModalIsOpen={setApplyModalIsOpen}
        jobDetails={jobDetails} 
        user={detail}
      />
    </div>
  );
};

export default JobsTable;
