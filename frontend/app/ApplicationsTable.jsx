import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaCheckCircle, FaEllipsisV, FaFileAlt, FaFileDownload } from "react-icons/fa";


const ApplicationsTable = ({ user }) => {
  
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState('');
  const [messageModalOpen, setMessageModalOpen] = useState(false);


  const handleApprove = ()=>{
    setMessageModalOpen(!messageModalOpen)
    
  }
  

  const downloadFile = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); // Set the download attribute with the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch("http://localhost:8000/applications");
      if (!response.ok) {
        throw new Error("Failed to fetch applications.");
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        throw new Error("Applications data is not an array.");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Error occurred while fetching applications. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(); // Fetch applications on component mount
  }, []);

  const handleApplicationAction = async (applicationId, action) => {
    try {
      const response = await fetch(`http://localhost:8000/applications/${applicationId}/${action}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });
      if (!response.ok) {
        throw new Error("Failed to perform action on application.");
      }

      if (action === "delete") {
        setSelectedApplication(null);
      } else {
        setMessage(`Application has been ${action}d successfully.`);
      }

      fetchApplications(); // Refresh applications list after action
    } catch (err) {
      console.error("Error performing action on application:", err);
      setError("Error occurred while processing the application. Please try again.");
    }
  };

  const handleCancel = () => {
    setSelectedApplication(null);
    setMessage("");
  };

  const handleSendMessage = async () => {
    const messagePayload = {
      user_id: selectedApplication.user_id, // replace with the actual user ID
      message: `Dear ${selectedApplication.submitted_by} Your Appplication for the job ${selectedApplication.job_name} has been Successfully Approved!\nEmployer Line 0978363746`,
    };

    const socketUrl = `ws://localhost:8000/ws/messages/${messagePayload.user_id}`;  
    const websocket = new WebSocket(socketUrl);

    // Connection opened
    websocket.onopen = (event) => {
        console.log("Connected to WebSocket");

        // Sending a new message to the WebSocket server
        const messageData = {
            new_message: messagePayload.message
        };
        
        websocket.send(JSON.stringify(messageData));
    }; 

    // Handling WebSocket closure
    websocket.onclose = (event) => {
        console.log("Disconnected from WebSocket");
    };

    // Handling WebSocket errors
    websocket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    // Close modal after sending the message
    setMessageModalOpen(false);
    setNewMessage(''); // Clear the message input
    handleApplicationAction(selectedApplication.application_id, "approve")
};


  const filteredApplications = user.isAdmin
    ? applications
    : applications.filter((app) => app.user_id === user.user_id);

  const columns = [
    {
      name: "#",
      selector: (row) => row.application_id,
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Job",
      selector: (row) => row.job_name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.approval_status,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date_submitted,
      sortable: true,
    },
    {
      name: "Submitted By",
      selector: (row) => row.submitted_by,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="relative">
          <button
            className="text-gray-600 hover:text-gray-800 transition"
            onClick={() => {
              setSelectedApplication(row)
              console.log(row)
              fetchApplications();
            }}
          >
            <FaEllipsisV />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }



  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Applications</h2>
      <DataTable
        columns={columns}
        data={filteredApplications}
        pagination
        highlightOnHover
        striped
      />

      {/* Modal for application details */}
      {selectedApplication && (
        <div className="flex flex-col justify-center items-center bg-white bg-opacity-90 rounded-lg shadow-md fixed right-[730px] top-[100px] w-[800px] h-[200px] ">
          <div className="mt-6 p-4 w-full rounded bg-gray-50 relative bg-white z-10">
            <h1 className="text-xs font-bold underline mb-4">Application Details</h1>
            <p><strong>Job Title:</strong> {selectedApplication.job_name}</p><br /><br />
            <p><strong>Status:</strong> {selectedApplication.approval_status}</p><br /><br />
            <p><strong>Submitted By:</strong> {selectedApplication.submitted_by}</p><br /><br />
            <p><strong>Date Submitted:</strong> {selectedApplication.date_submitted}</p><br /><br />

            {/* Attachments Section */}
            <div className="mt-4">
              <h4 className="text-lg font-medium mb-2">Attachments:</h4>
              <div className="flex flex-wrap">
                {selectedApplication.attachments &&
                  selectedApplication.attachments.map((attachment, index) => {
                    const baseUrl = "http://localhost:8000/";
                    const attachmentUrl = attachment.document_url.includes('/uploads')
                      ? `http://localhost:8000/${attachment.document_url}`
                      : `${baseUrl}${attachment.document_url}`;

                    return (
                      <div key={index} className="m-2">
                        {attachment.type === "image" ? (
                          <img
                            src={attachmentUrl}
                            alt="Attachment"
                            className="w-32 h-32 object-cover border"
                          />
                        ) : (
                          <a
                            href={attachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600"
                          >
                            <FaFileAlt className="mr-2" />
                            <h1 className="text-xs me-3 my-5">{attachment.name || "Document"}</h1>
                            <h1 className="text-xs bg-black px-2 py-1 rounded-xl text-white flex justify-center items-center"><strong className="me-2">Download</strong> <FaFileDownload className="ms-2"/></h1>
                          </a>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Action buttons based on admin status and application status */}
            <div className="mt-10 space-x-2 my-4">
              {user.isAdmin ? (
                <>
                  {
                    selectedApplication.approval_status === "approved" ? 
                    <button
                    className="bg-red-500 text-black px-4 py-1 rounded hover:bg-red-700"
                    onClick={() => handleApplicationAction(selectedApplication.application_id, "reject")}
                    >
                    Reject
                    </button>:
                    <button
                    className="bg-green-500 text-black px-4 py-1 rounded hover:bg-green-700"
                    onClick={() => {
                     handleSendMessage()
                    }}
                    >
                    Approve
                  </button>
                  }
                 
                </>
              ) : selectedApplication.approval_status === "pending" ? (
                <>
                
                  <button
                    className="bg-red-500 text-black px-4 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleApplicationAction(selectedApplication.application_id, "delete")}
                  >
                    Delete
                  </button>
                </>
              ) : selectedApplication.approval_status === "approved" ? (
                <>
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700"
                    onClick={() => handleApplicationAction(selectedApplication.application_id, "checkout")}
                  >
                    Checkout
                  </button>
                  <button
                    className="bg-red-500 text-black px-4 py-1 rounded hover:bg-blue-700 hover:text-red-500"
                    onClick={() => handleApplicationAction(selectedApplication.application_id, "delete")}
                  >
                    Delete
                  </button>
                </>
              ) : (
                selectedApplication.approval_status === "rejected" && (
                  <button
                    className="bg-red-500 text-black px-4 py-1 rounded hover:bg-red-700"
                    onClick={() => handleApplicationAction(selectedApplication.application_id, "delete")}
                  >
                    Delete
                  </button>
                )
              )}
              <button
                className="bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-700"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>

            {/* Display message for approve/reject actions */}
            {message && (
              <div className="mt-4 p-4 bg-green-100 rounded flex">
                <h1 className="text-xs text-green-500">{message}</h1>
                <FaCheckCircle className="mt-1 text-green-500 ms-2" />
              </div>
            )}
          </div>
        </div>
      )}
        
    </div>
  );
};

export default ApplicationsTable;
