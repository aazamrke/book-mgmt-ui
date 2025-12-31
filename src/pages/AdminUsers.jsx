import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      setUsers([
        { id: 1, username: "admin", email: "admin@example.com", role: "Admin", status: "Active" },
        { id: 2, username: "user1", email: "user1@example.com", role: "User", status: "Active" },
        { id: 3, username: "user2", email: "user2@example.com", role: "User", status: "Inactive" }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      name: 'Username',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span className={`status-badge ${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="action-buttons">
          <button className="btn btn-sm btn-primary">Edit</button>
          <button className="btn btn-sm btn-danger">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="card">
        <div className="page-header">
          <h2>User Management</h2>
          <button className="btn btn-primary">Add User</button>
        </div>
        <DataTable
          columns={columns}
          data={users}
          pagination
          paginationPerPage={10}
          progressPending={loading}
          highlightOnHover
          striped
          responsive
          noDataComponent="No users found"
        />
      </div>
    </div>
  );
}