import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
function OtpModal({length = 6,onOtpSubmit = () =>{ },...props}) {

  const { phoneNumber } = useSelector(state => state.business)
  
  const {msg} =useSelector(state => state.otp)

  const [otp, setOtp] = useState(new Array(length).fill(''))
  console.log(otp.join('').toString())
  const inputRefs = useRef([])
  
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handleClick = (index) => {
   

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };
 
  

  // useEffect(() => {
  //   if (inputRefs.current[0]) {
  //     inputRefs.current[0].focus();
  //   }
  // },[])



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered 
     
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className='flex '>
          
          <div > <h3>OTP Verification</h3>
          <p>India's No.1 Local Search Engine</p>
            </div>
          </div>

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
   <div className='flex flex-col items-center justify-center'>     
        <h4 className='text-center'>Enter the code send to +91-{phoneNumber}</h4>

        {/* <div className='flex'>
        <input type="text"  className='border-2 border-gray-400  w-[50px] h-[] m-3 rounded-sm'/>
        <input type="text" className='border-2 border-gray-400  w-[50px] p-4 m-3 rounded-sm'/>
        <input type="text" className='border-2 border-gray-400  w-[50px] p-4 m-3 rounded-sm'/>
        <input type="text" className='border-2 border-gray-400  w-[50px] p-4 m-3 rounded-sm'/>
        <input type="text" className='border-2 border-gray-400  w-[50px] p-4 m-3 rounded-sm'/>
        <input type="text" className='border-2 border-gray-400  w-[50px] p-4 m-3 rounded-sm'/> 
       </div> */}
          
        <div>  {
            otp.map((value, index) => {
              return <input type="text"
                ref={(input) => (inputRefs.current[index] = input)}
                inputMode="numeric" // Better mobile keyboard behavior
                 maxLength={1}   
                key={index}
                value={value}
                className='border-2 border-gray-400  w-[80px] h-[100px] text-center text-2xl m-3 rounded-sm' 
                onChange={(e) => { handleChange(index, e) }}
                onClick={() => { handleClick(index) }}
                onKeyDown={(e) => { handleKeyDown(index, e) }}
                autoFocus={index === 0}
              />
            })
          }</div>
          <p>{msg}</p>
        <button className='bg-red-600 px-4 py-2 '>Verfify</button></div>

      </Modal.Body>
     
    </Modal>
  );
}

export default OtpModal;


