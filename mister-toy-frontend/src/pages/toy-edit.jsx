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
        price: Yup.string()
        .min(1, 'Too Short!')
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
        <div className="toy-edit flex column">
            <Formik 
                
                initialValues={{
                    name: `${toyToEdit.name}` ,
                    price: '',
                    labels: []
                }}
                validationSchema={SignupSchema}
                onSubmit={onSubmit} >

                {({ errors, touched }) => (
                    <Form className="formik flex column">
                        <Field as={CustomTextField} name="name" className="field" />
                        {errors.name && touched.name ? (
                            <div className="formik error">{errors.name}</div>
                        ) : null}
                        <Field as={CustomTextField} name="price" className="field" />
                        {errors.price && touched.price ? (
                            <div className="formik error">{errors.price}</div>
                        ) : null}

                        <Field as={MultiSelect} onSetLabels ={onSetLabels} name="labels" />

                        <button  className="btn-dark submit-btn" type="submit">Submit</button>

                    </Form>
                )}

            </Formik>
            <Link to={'/toy'}><button className="btn-light cancel-btn">Cancel</button></Link>
        </div>

    )
}