import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import { API_URL } from "../constants";
import { useDataFetching } from "../utils/dataFetching";
import AddIcon from '@mui/icons-material/Add';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vh',
    maxHeight: '80vh',
    color: '#e7edf1',
    border: '2px solid #fa1e4e',
    boxShadow: 24,
    p: 4,
    overflow: 'hidden',
    borderRadius: '10px',
    backdropFilter: 'blur(15px)',
    webkitBackdropFilter: 'blur(15px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column'
};

function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return date.toLocaleString('it-IT', options);
}

const isDate = (value) => {
    if (typeof value !== 'string') return false;
    const date = new Date(value);
    return !isNaN(date.getTime()) && value.includes('-');
};

const formatValue = (value) => {
    if (typeof value === 'boolean') {
        return value.toString();
    }
    if (typeof value === 'string' && isDate(value)) {
        return formatDate(value);
    }
    return value;
};

export default function MainContainer({ selectedButtonValue }) {
    const [selectedRow, setSelectedRow] = useState(null);
    const [editableRow, setEditableRow] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newRow, setNewRow] = useState({});

    const { data: dataReceived, error: errorData } = useDataFetching(`${API_URL}/${selectedButtonValue}`);

    if (!dataReceived || errorData) {
        return <Box sx={{ paddingTop: '30vh' }}>Loading or Error...</Box>;
    }

    const rows = selectedButtonValue === 'users' ? dataReceived : dataReceived.data;
    const columns = selectedButtonValue === 'users' ? Object.keys(rows[0]) : ['id', ...Object.keys(rows[0].attributes)];

    const handleRowClick = (row) => {
        setSelectedRow(row);
        setEditableRow(selectedButtonValue === 'users' ? { ...row } : { id: row.id, ...row.attributes });
        setIsEditing(false);
    };

    const handleClose = () => {
        setSelectedRow(null);
        setIsCreating(false);
        setNewRow({});
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (key, value) => {
        setEditableRow((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleNewInputChange = (key, value) => {
        setNewRow((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${API_URL}/${selectedButtonValue}/${editableRow.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: editableRow }),
            });
            if (response.ok) {
                const updatedRow = await response.json();
                setIsEditing(false);
                setSelectedRow(null);
                setEditableRow(null);
                console.log('Row updated successfully:', updatedRow);
                window.location.href = '/AdminArea';
            } else {
                console.error('Failed to update row:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating row:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/${selectedButtonValue}/${selectedRow.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setSelectedRow(null);
                setEditableRow(null);
                console.log('Row deleted successfully');
                window.location.href = '/AdminArea';
            } else {
                console.error('Failed to delete row:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting row:', error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await fetch(`${API_URL}/${selectedButtonValue}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: newRow }),
            });
            if (response.ok) {
                const createdRow = await response.json();
                console.log('Row created successfully:', createdRow);
                setIsCreating(false);
                setNewRow({});
                window.location.href = '/AdminArea';
            } else {
                console.error('Failed to create row:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating row:', error);
        }
    };

    return (
        <Box sx={{ paddingTop: '25vh', display: 'flex', justifyContent: 'center', height: '70vh' }}>
            <Box sx={{
                minWidth: 800,
                minHeight: 280,
                backdropFilter: 'blur(15px)',
                webkitBackdropFilter: 'blur(15px)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#e7edf1',
                margin: 5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0px 0px 15px #00000',
                borderRadius: '10px',
                maxHeight: 400,
            }}>
                <TableContainer component={Paper} sx={{ flexGrow: 1, overflowY: 'auto', backdropFilter: 'blur(15px)', webkitBackdropFilter: 'blur(15px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <Table sx={{ minWidth: '70vh' }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.195)' }, '&:nth-of-type(even)': { backgroundColor: 'rgba(0, 0, 0, 0.195)' }, borderBottom: '1px solid #3a3544' }}>
                                {columns.map((column) => (
                                    <TableCell key={column} sx={{ color: '#fa1e4e', fontSize: 20 }}>{column}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, rowIndex) => (
                                <TableRow
                                    key={rowIndex}
                                    sx={{
                                        '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.195)' },
                                        '&:nth-of-type(even)': { backgroundColor: 'rgba(0, 0, 0, 0.195)' },
                                        borderBottom: '1px solid #3a3544',
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: 'rgba(48, 48, 48, 0.252)' },
                                    }}
                                    onClick={() => handleRowClick(row)}
                                >
                                    {columns.map((column) => (
                                        <TableCell key={column} sx={{ color: '#e7edf1', borderBottom: 'none' }}>
                                            {formatValue(selectedButtonValue === 'users' ? row[column] : (column === 'id' ? row.id : row.attributes[column]))}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Modal
                open={!!selectedRow || isCreating}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <IconButton
                        sx={{ position: 'absolute', top: 8, right: 8, color: '#fa1e4e' }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h4" component="h2" color='#fa1e4e'>
                        {isCreating ? 'Create New Entry' : 'Details'}
                    </Typography>
                    <Box sx={{ flex: 1, overflowY: 'auto' }}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {(isCreating ? newRow : editableRow) && columns.map((column) => (
                                (isCreating ? (column !== 'id' && column !== 'createdAt' && column !== 'updatedAt' && column !== 'publishedAt') : (!isCreating && column !== 'id' && column !== 'createdAt' && column !== 'updatedAt' && column !== 'publishedAt')) && (
                                    <Box key={column} sx={{ marginBottom: '1rem' }}>
                                        <Typography color='#fa1e4e'>{column}:</Typography>
                                        {(isEditing || isCreating) && !isDate(editableRow ? editableRow[column] : newRow[column]) ? (
                                            <TextField
                                                variant="outlined"
                                                value={isCreating ? newRow[column] : editableRow[column]}
                                                onChange={(e) => isCreating ? handleNewInputChange(column, e.target.value) : handleInputChange(column, e.target.value)}
                                                sx={{
                                                    mt: 1,
                                                    width: '70vh',
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#b0b0b0',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#b0b0b0',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#b0b0b0',
                                                        },
                                                    },
                                                }}
                                                color="secondary"
                                                focused
                                                InputLabelProps={{ style: { color: '#e7edf1' } }}
                                                InputProps={{ style: { color: '#e7edf1' } }}
                                            />
                                        ) : (
                                            formatValue(editableRow ? editableRow[column] : newRow[column])
                                        )}
                                    </Box>
                                )
                            ))}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2 }}>
                        {selectedButtonValue !== 'users' && !isCreating && (
                            <Button variant="contained" color="primary" onClick={handleEditToggle}
                                sx={{
                                    border: '1px solid #fa1e4e',
                                    color: '#fff',
                                    '&:hover': {
                                        boxShadow: '0px 0px 5px #fa1e4e',
                                    },
                                    ml: 2
                                }}>
                                {isEditing ? 'Cancel' : 'Edit'}
                            </Button>
                        )}
                        {isEditing &&
                            <Button variant="contained" color="success" onClick={handleUpdate}
                                sx={{
                                    backgroundColor: '#4a3e65',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#4c516b',
                                    },
                                    ml: 2
                                }}>
                                Update
                            </Button>
                        }
                        {!isEditing && !isCreating &&
                            <Button variant="contained"
                                sx={{
                                    backgroundColor: '#fa1e4e',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#d0173c',
                                    },
                                    ml: 2
                                }}
                                onClick={handleDelete}>
                                Delete
                            </Button>
                        }
                        {isCreating &&
                            <Button variant="contained" color="success" onClick={handleCreate}
                                sx={{
                                    backgroundColor: '#fa1e4e',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#d0173c',
                                    },
                                    ml: 2
                                }}>
                                Create
                            </Button>
                        }
                    </Box>
                </Box>
            </Modal>

            {selectedButtonValue !== 'users' &&
                <Fab
                    aria-label="add"
                    sx={{
                        position: 'fixed',
                        bottom: '2vh',
                        right: '2vh',
                        backgroundColor: '#fa1e4e',
                        '&:hover': {
                            backgroundColor: '#d0173c',
                        },
                    }}
                    onClick={() => setIsCreating(true)}
                >
                    <AddIcon />
                </Fab>
            }
        </Box>
    );
}
