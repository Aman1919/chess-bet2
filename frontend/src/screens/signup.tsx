import { useState } from "react"
import { BACKEND_URL } from "../constants/routes";
import axios from "axios";


type props = {
    admin:boolean
    }    

export default function SignUP({admin}:props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    
  async function onclick() {
    if (!email || !name || !password) {
        alert("Enter All details");
        return;
    }
    const url = !admin?`${BACKEND_URL}/auth/register`:`${BACKEND_URL}/admin/create-admin`;
    try {
        const response = await axios.post(
            url,
            {
                username: email,
                name: name,
                password: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = response.data;
        localStorage.setItem('token', data.token);
        
        setEmail("");
        setName("");
        setPassword("");
        
        console.log(data, response);
        alert(data.message);
        window.location.href = admin?"/dashboard":"/game";
    } catch (error) {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
    }
}


return <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  {admin?"Admin Signup":"Sign up to your account"}
              </h1>
              <div className="space-y-4 md:space-y-6">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email"  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                        </div>
                                        <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                      <input type="text" name="username"  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full name" required value={name} onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password"  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  </div>

                      <a href="#" className="text-sm font-medium text-white hover:underline ">Forgot password?</a>
                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    onClick={onclick}
                    >Sign Up</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account ? <a href={admin?"/adminlogin":"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log In</a>
                  </p>
              </div>
          </div>
      </div>
  </div>
</section>


}