import React, { useState } from 'react';
import './LogIn.css';
import Popup from './Popup';

const LogIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 控制 Popup 显示
    const [popupMessage, setPopupMessage] = useState(''); // 存储 Popup 的消息

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // 发送登录请求到后端
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                localStorage.setItem('userId', data.userId); 
                setPopupMessage('Login successful!'); // 设置成功消息
                setIsPopupOpen(true); // 打开 Popup
                // 在这里处理登录成功后的逻辑，比如跳转到用户主页
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.error);
                setPopupMessage(`Login failed: ${errorData.error}`); // 设置错误消息
                setIsPopupOpen(true); // 打开 Popup
            }
        } catch (error) {
            console.error('Error during login:', error);
            setPopupMessage('An error occurred during login. Please try again.'); // 设置网络错误消息
            setIsPopupOpen(true); // 打开 Popup
        }console.log('Sending login request:', { email, password });
    };

    const closePopup = () => {
        setIsPopupOpen(false); // 关闭 Popup
    };

    return (
        <div className="login-container">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {/* 渲染 Popup 组件 */}
            <Popup
                isOpen={isPopupOpen}
                onClose={closePopup}
                message={popupMessage}
            />
        </div>
    );
};

export default LogIn;

//     return (
//         <div className="login-container">
//             <button onClick={toggleForm}>
//             ready to play? log in here!
//             </button>
//             {showForm && (

//                 <div>
//                     <h2>Login</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label htmlFor="email">Email:</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="password">Password:</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>
//                         <button type="submit">Login</button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Login;