import React from "react";
import { Form } from "react-bootstrap";

export default function Currency(props) {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group
        onChange={(e) => {
         props.onSelected(e.target.value)
        }}
      >
        <Form.Check
          type="radio"
          name="group1"
          id={`default-radio`}
          label={`Pay with ETH`}
          onChange={(e) => {console.log(e)}}
          value={1}
          checked={props.initVal == 1?true:false}
         
        />
        {/* <Form.Check
          type="radio"
          name="group1"
          id={`default-radio`}
          label={`Pay with $METH`}
          value={2}
          checked={props.initVal == 2?true:false}
        /> */}
      </Form.Group>
    </Form>
  );
}
