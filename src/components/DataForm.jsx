import { useState } from 'react';

function DataForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    let errs = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email';
    if (!phone.trim()) errs.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(phone)) errs.phone = 'Phone must be 10 digits';
    if (!dob) errs.dob = 'Date of birth is required';
    if (!address.trim()) errs.address = 'Address is required';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
    } else {
      setSubmitted(true);
    }
  }

  function handleReset() {
    setName(''); setEmail(''); setPhone('');
    setDob(''); setAddress('');
    setErrors({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="success-box">
        <h2>Form Submitted Successfully!</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>DOB:</strong> {dob}</p>
        <p><strong>Address:</strong> {address}</p>
        <button onClick={handleReset}>Submit Another</button>
      </div>
    );
  }

  return (
    <div className="form-box">
      <h2>Student Info Form</h2>
      <form onSubmit={handleSubmit}>

        <div className="field">
          <label>Full Name</label>
          <input
            placeholder="Enter your full name"
            value={name}
            onChange={e => { setName(e.target.value); setErrors({...errors, name: ''}); }}
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <p className="err">{errors.name}</p>}
        </div>

        <div className="field">
          <label>Email</label>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors({...errors, email: ''}); }}
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <p className="err">{errors.email}</p>}
        </div>

        <div className="field">
          <label>Phone</label>
          <input
            placeholder="10-digit phone number"
            value={phone}
            onChange={e => { setPhone(e.target.value); setErrors({...errors, phone: ''}); }}
            className={errors.phone ? 'error-input' : ''}
          />
          {errors.phone && <p className="err">{errors.phone}</p>}
        </div>

        <div className="field">
          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={e => { setDob(e.target.value); setErrors({...errors, dob: ''}); }}
            className={errors.dob ? 'error-input' : ''}
          />
          {errors.dob && <p className="err">{errors.dob}</p>}
        </div>

        <div className="field">
          <label>Address</label>
          <textarea
            placeholder="Enter your address"
            value={address}
            onChange={e => { setAddress(e.target.value); setErrors({...errors, address: ''}); }}
            className={errors.address ? 'error-input' : ''}
            rows={3}
          />
          {errors.address && <p className="err">{errors.address}</p>}
        </div>

        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default DataForm;
