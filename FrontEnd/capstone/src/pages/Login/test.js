// Login.js
import React, { useState } from 'react';
import SuccessModal from './Success.js';

function Login() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogin = () => {
    // 这里是你的登录逻辑
    // 如果登录成功，显示弹窗
    openModal();
  };

  return (
    <>
      <button onClick={handleLogin}>
        登录
      </button>

      <SuccessModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </>
  );
}

export default Login;
