import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MultiSelect } from "../cmps/multi-select"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/toy/toy.action"
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { Checkbox, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .required('Required'),
    price: Yup.number()
        .required('Required'),
    // labels: Yup.array()
    //     .required('Required')
});


const CustomTextField = (props) => {
    return <TextField id="outlined-basic" label={props.name} variant="outlined" {...props} />
}

export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
    }, [])



    function onSetLabels(labels) {
        setToyToEdit({ ...toyToEdit, labels })
    }

    const onSubmit = ({ name, price , labels }) => {
        const toyToSave ={...toyToEdit , name, price}
        saveToy(toyToSave)
            .then(() => {
                showSuccessMsg("Toy saved successfully")
                navigate('/toy')
            })
    }



    return (
        <div>
            <Formik
                
                initialValues={{
                    name: `${toyToEdit.name}` ,
                    price: 0,
                    labels: []
                }}
                validationSchema={SignupSchema}
                onSubmit={onSubmit} >

                {({ errors, touched }) => (
                    <Form className="formik">
                        <Field as={CustomTextField} name="name" />
                        {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                        ) : null}
                        <Field as={CustomTextField} name="price" />
                        {errors.price && touched.price ? (
                            <div>{errors.price}</div>
                        ) : null}

                        <Field as={MultiSelect} onSetLabels ={onSetLabels} name="labels" />
                        {/* {errors.labels && touched.labels ? (
                            <div>{errors.labels}</div>
                        ) : null} */}

                        <button type="submit">Submit</button>

                    </Form>
                )}

            </Formik>
            <Link to={'/toy'}><button className="cancel-btn">Cancel</button></Link>
        </div>



        // <form className="toy-edit" onSubmit={onSubmit}>
        //     <label htmlFor="name"></label>
        //     <input type="text"
        //         id="name"
        //         name="name"
        //         placeholder="Name..."
        //         required
        //         value={toyToEdit.name}
        //         onChange={handleChange} />

        //     <label htmlFor="price"></label>
        //     <input type="number"
        //         id="price"
        //         required
        //         name="price"
        //         value={toyToEdit.price}
        //         placeholder="Price..."
        //         onChange={handleChange} />

        //     <label htmlFor="labels"></label>
        //     <MultiSelect onSetLabels={onSetLabels} />

        //     <button className="save-btn">Save</button>
        // </form>
    )
}