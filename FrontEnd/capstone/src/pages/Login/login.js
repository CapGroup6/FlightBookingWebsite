import * as React from "react";
import { useState } from 'react'; 
import Link from 'next/link';
import PreferencePopup from './preferencePopup'; 

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // 阻止表单默认提交行为

    try {
      const response = await fetch('/api/signin', { // 确保这个路径与你的API端点匹配
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 处理登录成功的情况，例如保存登录状态、重定向等
        console.log('Login successful:', data);
      } else {
        // 处理登录失败的情况
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed due to server error');
    }
  };

  return (
      <div className="pl-14 bg-white">
        <section className="flex gap-5 h-screen">
          <aside className="flex flex-col w-[40%]">
            <header className="flex flex-col mt-14">
              <div className="flex gap-3 text-3xl font-bold">
                <img
                  src="/images/airplane.png"
                  alt="Logo"
                />
                <h1 >
                  FlightSearch
                </h1>
              </div>
            </header>
            <div className="flex-grow flex items-center">
              <form className="max-w-xs mx-auto my-auto" onSubmit={handleSubmit}>
                <h2 className="text-xl">Sign in</h2>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username *"
                  className="p-2.5 mt-5 rounded border border-solid border-stone-300 w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password *"
                  className="p-2.5 mt-5 rounded border border-solid border-stone-300 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />             
                <button
                    type="submit"
                    className="flex gap-2 justify-center py-2 mt-8 text-base uppercase bg-black rounded text-white w-full" style={{backgroundColor: "#B0DDFE"}}
                  > 
                    Login
                      <img
                        src="/images/ArrowForward.png"
                        alt="forward arrow"
                        className=" my-auto"
                      />
                </button>
                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                <button
                  type="button"
                  className="py-2 mt-4 text-base uppercase bg-black rounded text-white w-full"
                >
                    <Link href="./signup">
                      Create New Account
                    </Link>
                </button>
              </form>
            </div>
          </aside>
          
          <aside className="w-[60%] max-md:ml-0 max-md:w-full">
            <div className="flex justify-center items-center" style={{backgroundImage: 'url("/images/loginback.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: "100%"
          }}>
            <img
              src="/images/login.png"
              alt="Flight Search"
              className="object-cover"
            />
            </div>
          </aside>
        </section>
      </div>
  );
}

export default Login;