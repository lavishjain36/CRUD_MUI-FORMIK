import * as yup from 'yup';

export const  basicSchema =yup.object().shape({
    Book:yup 
    .string("please enter valid book name")
    .min(4,"Books name must have greater than 4 characters"),
    email:yup
    .string("please enter a valid email address")
    .email("please enter a valid email address"),
    RecepientName:yup 
    .string("please enter a valid name")
    .min(4,"RecepientName name must be greater than 4 characters")
})