import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { Avatar, Box, Container, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckIcon from '@mui/icons-material/Check';
const StyledCell=styled(TableCell)({
fontWeight: "bold",
fontSize: "1rem",
color: "black",
})

const StyledDataCell=styled(TableCell)({
    fontWeight: "bold",
    fontSize: "1rem",
    color: "black",
    })


const BookTable=()=> {
    const [id,setId]=useState(0);
    const [isEdit,setIsEdit]=useState(0);
    const [loading,setLoading]=useState(false);
    const [bookRecords,setBookRecords]=useState([]);
    const [bookReturned,setBookReturned]=useState(false);
    const [editValues,setEditValues]=useState({
        Book:"",
        email:"",
        RecipientName:"",

    })

    const url="https://638a1152c5356b25a2112761.mockapi.io/books";
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setEditValues({...editValues,[e.target.name]:e.target.value});
    }

    const getBookRecords=async()=>{
        try {
            await axios.get(url).then(({data})=>setBookRecords(data));
            // console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteHandler=async(id)=>{
        try {
            setLoading(true)
            await axios.delete(url+`/${id}`);
            await getBookRecords();
            setLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    const returnBookHanlder=async(id)=>{
        const data=new Date().toLocaleDateString();
        try {

            setLoading(true);
            await axios.put(url+`/${id}`,{ReturnDate:data})
            await getBookRecords()
            setBookReturned(false);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }


    const editHandler =async(id)=>{
        await axios.get(url+`/${id}`).then(({data})=>setEditValues(data))
        setIsEdit(true);
        setId(id);
    }

    const editBookRecords=async(id)=>{
        try {
            setLoading(true);
            await axios.put(url+`/${id}`,editValues);
            await getBookRecords();
            setBookReturned(false);
            setIsEdit(false);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        axios.get(url).then(({data})=>setBookRecords(data))
        console.log("Data Loaded Successfully");
    },[url])
  return (
   <>
    {loading?(
        <Box
        sx={{
            height:"100vh",
            display:"flex",
            bgColor:"#f1f3f5",
            justifyContent:"center",
            alignItems: "center"}}
        >
            <Typography variant="h5" component="p">
            Please wait....
            </Typography>
        </Box>
    ):(
        <>
        <Container sx={{marginTop:"7rem"}}>
        <Stack sx={{marginBottom:"2rem"}}>
        <Typography variant="h3" component="h2">
         Book Data
        </Typography>;
        <Typography variant="h4" component="h2">
         Book Records
        </Typography>
        </Stack>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <StyledCell>Name</StyledCell>
          <StyledCell align="left">Email</StyledCell>
          <StyledCell align="left">Books</StyledCell>
          <StyledCell align="left">Borrowed</StyledCell>
          <StyledCell align="left">Returned</StyledCell>
          <StyledCell align="center">Actions</StyledCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {bookRecords.map((record,index)=>(
                <TableRow
                 sx={{"&:last-child td,&:last-child th":{border:0}}}
                 key={index}
                 >    
                 <TableCell component="th" scope="row">
                    <Stack 
                    direction="row"
                    sx={{gap:1,alignItems:"center"}}
                    >
                        <Avatar 
                        src={record.avatar}
                        sx={{height:"1.5rem",width:"1.5rem"}}
                        />
                        {isEdit&&id===record.id?(
                            <TextField
                            variant="standard"
                            value={editValues.ReceipientName}
                            placeholders={record.ReceipientName}
                            name="ReceipientName"
                            onChange={handleChange}
                            />
                        ):(
                            <Typography
                            sx={{
                                fontSize:"1rem",
                                color:"primary",
                                fontWeight:"bold",
                            }}
                            >
                                {record.ReceipientName}
                            </Typography>
                       )}
                    </Stack>
                 </TableCell>

                 <StyledDataCell align="left">
                 {isEdit&&id===record.id?(
                            <TextField
                            variant="standard"
                            value={editValues.email}
                            placeholders={record.email}
                            name="email"
                            onChange={handleChange}

                    />
                 ):(
                    record.email
                 )}
                 </StyledDataCell>
                 <StyledDataCell align="left">
                 {isEdit&&id===record.id?(
                            <TextField
                            variant="standard"
                            value={editValues.Book}
                            placeholders={record.Book}
                            name="Book"
                            onChange={handleChange}

                    />
                 ):(
                    record.Book
                 )}
                 </StyledDataCell>

                 <StyledDataCell align="left">
                    {record.IssueDate}
                 </StyledDataCell>

                 
                 <StyledDataCell align="left">
                    {record.ReturnDate}
                 </StyledDataCell>

                 <StyledDataCell>
                    {bookReturned?(
                        <IconButton
                        color="primary"
                        onClick={()=>returnBookHanlder(record.id)}
                        >
                            <CheckIcon/>
                        </IconButton>
                    ):isEdit&& id===record.id?(
                        <IconButton 
                        color="primary"
                        onClick={()=>editBookRecords(record.id)}
                        >
                            <CheckIcon/>
                        </IconButton>
                    ):(
                        <Stack direction="row">
                            <IconButton
                            color="primary"
                            onClick={()=>navigate('/register')}
                            >
                                <AddIcon/>
                            </IconButton>
                            <IconButton
                            color="primary"
                            onClick={()=>editHandler(record.id)}
                            >
                                <EditIcon/>
                            </IconButton>
                            <IconButton
                            onClick={()=>deleteHandler(record.id)}
                            >
                                <DeleteOutlineOutlinedIcon/>
                            </IconButton>
                        </Stack>
                    )}
                 </StyledDataCell>

                 
                </TableRow>
            ))}
          </TableBody>
          </Table>
        </Container>

     </>
    )}
    </>
  )
}

export default BookTable