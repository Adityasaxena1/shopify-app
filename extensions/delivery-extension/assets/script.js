import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App';
// import ReactDOM from 'react-dom';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);





// document.addEventListener('DOMContentLoaded', () => {
//     const rootElement = document.getElementById('root');
//     if (rootElement) {
//       const root = createRoot(rootElement);
//       root.render(<App />);
//     }
//   });