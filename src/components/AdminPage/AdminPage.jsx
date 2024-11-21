import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../store/slices/userSlice';
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const AdminPage = () => {
  const dispatch = useDispatch();
  const {isLoading, error, users} = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(fetchUsers());
    
  }, [dispatch]);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const renderUsers = React.useMemo(
    () =>
      users?.map((user) => (
        <TableRow key={user.id}>
          <TableCell align="center">{user.id}</TableCell>
          <TableCell align="center">{user.email}</TableCell>
          <TableCell align="center">{user.city}</TableCell>
          <TableCell align="center">{user.isadmin ? 'Да' : 'Нет'}</TableCell>
        </TableRow>
      )),
    [users]
  );

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography color="error">Ошибка: {error}</Typography>
        <Button variant="contained" color="primary" onClick={() => dispatch(fetchUsers())}>
          Попробовать снова
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleBackClick}
        style={{ marginBottom: '20px' }}
      >
        Назад
      </Button>
      <Typography variant="h4" align="center" gutterBottom>
        Список пользователей
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Город</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Администратор</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {renderUsers}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminPage;