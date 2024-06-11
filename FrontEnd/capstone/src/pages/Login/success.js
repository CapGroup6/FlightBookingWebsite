// Success.js
import React from 'react';
import Modal from 'react-modal';

function SuccessModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="成功"
    >
      <h2>成功</h2>
      <p>登录成功！</p>
      <button onClick={onRequestClose}>关闭</button>
    </Modal>
  );
}

export default SuccessModal;
