import React from 'react'
import '../assets/stylesheets/styles/pages/_contact.scss'

const Contact = () => {
  return (
    <div className='contact_container'>
       <div className='main_div'>
       <h1>Contact</h1>
       <form>
        <input type='text' placeholder='Name' required />
        <input type='email' placeholder='Email' required />
        <textarea type='text' placeholder='Message' required />
        <button>submit</button>
       </form>
       <p>This message will forward to TradeEx Official Mail</p>

       </div>

    </div>
  )
}

export default Contact
