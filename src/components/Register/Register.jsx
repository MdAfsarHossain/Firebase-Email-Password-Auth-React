import React from 'react';

const Register = () => {

    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log('From register Successfully');
        console.log(email, password);
    }

    return (
        <div className='py-10'>
            <div className="md:w-1/2 mx-auto">
                <h2 className='mb-5 text-5xl text-center font-bold'>Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className='mb-4 w-full py-2 px-4 border-2 rounded' type="email" name='email' placeholder='email address'/>
                    <br />
                    <input className='mb-4 w-full py-2 px-4 border-2 rounded' type="password" name='password' placeholder='password'/>
                    <br />
                    <input className='btn btn-secondary mb-4 w-full' type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};

export default Register;