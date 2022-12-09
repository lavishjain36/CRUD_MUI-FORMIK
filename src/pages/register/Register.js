import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import {  useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { basicSchema } from '../../schema/FormSchema';
const style={
  
}
const Register=() =>{
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();

  const onSubmit=async(value,option)=>{
    try {
      const url="https://638a1152c5356b25a2112761.mockapi.io/books";
      setLoading(true)
      await axios.post(url,formik.values);
      setLoading(false)
      navigate("/");
      
    } catch (error) {
      console.log(error)
    }
    option.resetForm();
  }

  const formik=useFormik({
    initialValues:{
      Book:"",
      email:"",
      ReceipientName:"",
      IssueDate:new Date().toLocaleDateString(),
      ReturnDate:"--"
    },
    validationSchema:basicSchema,
    onSubmit,
  })
  return (
   <>
    {loading?
    (
      <Box
      sx={{
        height:"100vh",
        display:"flex",
        bgColor:"black",
        justifyContent:"center",
        alignItems: "center",
      }}
      >
      <Typography variant="h5" component="p">
        Please wait...
      </Typography>
      </Box>
    ):(
      <Box sx={style}>
        <Typography
         variant="h6" component="h2"
         sx={{textAlign: 'center',marginBottom:"1rem"}}
         >
          Issue Book
         </Typography>
     
        <form 
        autoComplete='off'
        style={{display: "felx" ,flexDirection:"column",gap:"1rem"}}
        onSubmit={formik.handleSubmit}
        >
          <TextField
          type="text"
          id="Book"
          size="small"
          label="Book"
          variant="outlined"
          value={formik.values.Book}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.Book &&formik.touched.Book ?true : false}
          helperText={formik.touched.Book && formik.errors.Book}
          required
          />

        <TextField
          type="text"
          id="email"
          size="small"
          label="email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email &&formik.touched.email ?true : false}
          helperText={formik.touched.email && formik.errors.email}
          required
          />

          <TextField
          type="text"
          id="ReceipientName"
          size="small"
          label="ReceipientName"
          variant="outlined"
          value={formik.values.ReceipientName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.ReceipientName &&formik.touched.ReceipientName ?true : false}
          helperText={formik.touched.ReceipientName && formik.errors.ReceipientName}
          required
          />
          <Button variant="contained" type="submit">Confirm</Button>
        </form>
        </Box>
    )}
   </>
  )
}

export default Register