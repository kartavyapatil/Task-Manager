// import React from 'react'
// import { Dialog } from 'primereact/dialog';
// import { ErrorMessage, Field, Formik, yupToFormErrors } from 'formik';
// import * as yup from "yup";
// import { toast } from 'sonner';
// import {  doc,updateDoc } from "firebase/firestore";
// import { auth, db } from "../firebase";

// const Model = ({visible,setVisible,docId}) => {
//     console.log(docId)

//   const validationScheme=yup.object({
//     task: yup.string().required("Name is required"),
//   })

//   const initialValues={
//     task:""
//     }
//     const handlesubmit= async(e,{resetForm})=>{
//         const user = auth.currentUser;
//         if (!user) {
//             console.log("User not logged in");
//             return;
//         }
//         const docRef = doc(db, "users", user.uid, "tasks", docId)
//       try {
//         await updateDoc(docRef, e);
//             console.log("Data updated successfully");
//       if (error) {
//         toast.error(error.data.message);
//         return;  
//       }

//         toast.success("update user")
//         resetForm()
//         setVisible(!visible)
//       } catch (e) {
//         toast.error(e)
//       }
//     }
//   return (
//   <>
//         <Dialog className='rounded-xl font-sans text-2xl flex justify-center m-4 p-3 bg-slate-400' header="update task" position='center' visible={visible} style={{ width: '50vw'}} onHide={() => {if (!visible) return; setVisible(false); }}>
//             {/* <p className="m-0"> */}
//               <Formik initialValues={initialValues} validationSchema={validationScheme} onSubmit={handlesubmit}>
//                 {({values,setFieldValue,handleSubmit})=>(
                  
//                   <form  onSubmit={handleSubmit}>
//                   <div className='flex justify-center flex-col p-4 m-3'>
//                   <label htmlFor='task'>Task<span className='text-red-800'>*</span></label>
//                   <Field id="task" name="task" className="rounded-lg bg-slate-100  py-2 px-2 outline-none m-5 "></Field>
//                   <ErrorMessage name='task' component={"p"} className='text-red-500'></ErrorMessage>
//                   <button type="submit" className='m-3 p-2 bg-purple-500 text-black font-sans text-xl'>Submit</button>
//                 </div>
//                 </form>
//                   )}
//               </Formik>
//         </Dialog>
//   </>
//   )
// }

// export default Model

import React from 'react';
import { Dialog } from 'primereact/dialog';
import { ErrorMessage, Field, Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Model = ({ visible, setVisible, docId, taskValue }) => {
    const validationScheme = yup.object({
        text: yup.string().required('Task is required'),
    });

    const initialValues = {
        text:'',
    };

    const handlesubmit = async (e, { resetForm }) => {
        const user = auth.currentUser;
        if (!user) {
            console.log('User not logged in');
            return;
        }

        const docRef = doc(db, 'users', user.uid, 'tasks', docId);
        try {
            await updateDoc(docRef, e);
            console.log('Data updated successfully');

            toast.success('Task updated successfully');
            resetForm();
            setVisible(false);
        } catch (err) {
            toast.error(err.message || 'Error updating task');
        }
    };

    return (
        <>
            <Dialog
                className="rounded-xl font-sans text-2xl flex justify-center m-4 p-3 bg-slate-400"
                header="Update Task"
                position="center"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationScheme}
                    onSubmit={handlesubmit}
                >
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-center flex-col p-4 m-3">
                                <label htmlFor="task">
                                    Task<span className="text-red-800">*</span>
                                </label>
                                <Field
                                    id="text"
                                    name="text"
                                    className="rounded-lg bg-slate-100 py-2 px-2 outline-none m-5"
                                ></Field>
                                <ErrorMessage
                                    name="text"
                                    component="p"
                                    className="text-red-500"
                                ></ErrorMessage>
                                <button
                                    type="submit"
                                    className="m-3 p-2 bg-purple-500 text-black font-sans text-xl"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </Dialog>
        </>
    );
};

export default Model;
