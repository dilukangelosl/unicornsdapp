import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Form , Button} from 'react-bootstrap';
import toast from 'react-hot-toast';
const API ="https://iv9p3n7954.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/waitlist"
export default function WaitlistForm(props) {
    const [formError,setFormError] = useState("");
    const [formLoading, setFormloading] = useState(false);
    const [email, setEmail] = useState("");
  return (
    <div className='waitlistform'>
           <Form
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            setFormError("");
            setFormloading(true);
           
            const response = await axios.post(`${API}`, {
                address:props.account,
                email:email
            });
            const data = response.data;
            setFormloading(false);
            if (data.statusCode == 200) {
                toast.success("Thank you");
                props.closeForm();
            }else{
                setFormError(data.message);
            }
          } catch (error) {
            toast.error(error.message);
            setFormloading(false);
          }
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="abc@xyz.com"
            onChange={(e) => {
              if (formError != "") {
                setFormError("");
              }
              setEmail(e.target.value);
            }}
          />
        

          {formError !== "" && <h3 className="formerror">{formError}</h3>}
          <Form.Text className="text-muted">
            We will contact you once you submit your email
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" className="sbt">
          Join Now{" "}
          {formLoading && (
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          )}
        </Button>
      </Form>
    </div>
  )
}
