import React, {useState} from 'react'
import TimePicker from 'react-bootstrap-time-picker';
import moment from 'moment-timezone';
import { Form } from 'react-bootstrap';
;export default function ClockComponent() {

    const [value, setValue] = useState(null);
    const [timezone, setTimeZone] = useState("America/Los_Angeles");
    moment.tz.setDefault("America/Los_Angeles");

    moment.tz.names()

  return (
    <div className='mintpage clock'>
      <h1>Dont let Hershy confuse you.</h1>
      <div  className='whenhershy'>When hershy says <Form.Control className='timecontrol' type="datetime-local" placeholder="Enter the Date and Time Hershy Says on Chat" onChange={e => {
         setValue(e.target.value);
        }} /> Blah blah blah.</div>
        <div className="whenhershy">
        {value && <span>That means its <span className='tc'>{moment(value).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('MMMM DD, YYYY h:mma').toString()} </span>in your local Time</span>}
        </div>
      {/* <p>Hershys time is {moment(Date.now()).tz("America/Los_Angeles").format('MMMM DD, YYYY h:mma')}</p>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter the Date and Time Hershy Says on Chat</Form.Label>
        <Form.Control type="datetime-local" placeholder="Enter the Date and Time Hershy Says on Chat" onChange={e => {
         setValue(e.target.value);
        }} />
      </Form.Group> */}

     {value &&  <>
     
      <div className="timeset">
     {/* <Form.Select aria-label="Select Timezone" value={timezone} onChange={e => {console.log(e.target.value);setTimeZone(e.target.value)}}>
      <option>Select your Timezone</option>
     {moment.tz.names().map((item, i) => {
      return  <option value={item} key={i}>{item}</option>
     })}
     
    </Form.Select> */}


    
      </div>

        {/* <h2 className='ti'>Your Time<br></br>{moment(value).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('MMMM DD, YYYY h:mma').toString()}</h2> */}
      </>}
    </div>
  )
}
