import {Link, useNavigate} from "react-router-dom";
import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react";
import { useState } from "react";

export default function Signup() {
  const [ formData, setFormData ] = useState({});
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const handleChange=(e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()});

  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all fields.');
    }
    try{
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method:'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    }catch (e) {
      setErrorMessage(e.message);
    }
  }
  console.log(formData);
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left section*/}
        <div className="flex-1">
          <Link to="/" className="font-semibold text-3xl" >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                My Blog
            </span>
          </Link>
          <p className="text-sm mt-5">This is a demo project. You can sign up with your email and password or with Google.</p>
        </div>
        {/* Right section */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value='Username'/>
              <TextInput
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value='Email'/>
              <TextInput
                  type="text"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value='Password'/>
              <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" onClick={handleSubmit} disabled={loading}>
              {
                loading ? (
                    <>
                      <Spinner size='sm' />
                      <span className = 'pl-3'>Loading...</span>
                    </>
                ) : 'Sign Up'
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">
              Sign In
            </Link>
          </div>
          <div className="">
            {
              errorMessage && (
                <Alert className="mt-5" color='failure'>
                  {errorMessage}
                </Alert>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
