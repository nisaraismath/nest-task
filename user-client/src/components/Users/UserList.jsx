import { useState, useEffect } from 'react';
import { 
  DataGrid,
  GridToolbar,
  GridActionsCellItem 
} from '@mui/x-data-grid';
import { 
  Edit as EditIcon,
  Delete as DeleteIcon,
  LockReset as LockResetIcon
} from '@mui/icons-material';
import userService from '../../services/users.service';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.row.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
        />,
        <GridActionsCellItem
          icon={<LockResetIcon color="info" />}
          label="Reset Password"
          onClick={() => handleResetPassword(params.row.id)}
        />,
      ],
    },
  ];

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        loading={loading}
        components={{ Toolbar: GridToolbar }}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}